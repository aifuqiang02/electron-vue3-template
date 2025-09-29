import { ipcMain } from 'electron'
import { Client } from 'ssh2'
import fs from 'fs/promises'
import path from 'path'
import { windowEvents } from '../shared/events'

interface SSHConnection {
  id: string
  name: string
  host: string
  port: number
  username: string
  password?: string
  privateKey?: string
  client?: Client
  isConnected: boolean
  lastUsed: Date
}

class SSHManager {
  private connections: Map<string, SSHConnection> = new Map()
  private configPath: string

  constructor() {
    this.configPath = path.join(process.env.HOME || process.env.USERPROFILE || '', '.ai-ssh-assistant', 'connections.json')
    this.loadConnections()
  }

  private async loadConnections() {
    try {
      const data = await fs.readFile(this.configPath, 'utf-8')
      const connections = JSON.parse(data)
      connections.forEach((conn: SSHConnection) => {
        this.connections.set(conn.id, { ...conn, isConnected: false, client: undefined })
      })
    } catch (error) {
      // 文件不存在或格式错误，使用空的连接列表
      console.log('No existing connections file found, starting with empty list')
    }
  }

  private async saveConnections() {
    try {
      const configDir = path.dirname(this.configPath)
      await fs.mkdir(configDir, { recursive: true })
      
      const connections = Array.from(this.connections.values()).map(conn => ({
        id: conn.id,
        name: conn.name,
        host: conn.host,
        port: conn.port,
        username: conn.username,
        password: conn.password,
        privateKey: conn.privateKey,
        lastUsed: conn.lastUsed
      }))
      
      await fs.writeFile(this.configPath, JSON.stringify(connections, null, 2))
    } catch (error) {
      console.error('Failed to save connections:', error)
      throw error
    }
  }

  async connect(config: Omit<SSHConnection, 'id' | 'client' | 'isConnected' | 'lastUsed'>): Promise<string> {
    const id = Date.now().toString()
    const client = new Client()

    return new Promise((resolve, reject) => {
      client.on('ready', () => {
        const connection: SSHConnection = {
          ...config,
          id,
          client,
          isConnected: true,
          lastUsed: new Date()
        }
        
        this.connections.set(id, connection)
        
        // 通知前端连接状态变化
        windowEvents.sendToRenderer('ssh:connection-status-changed', {
          id,
          status: 'connected',
          config
        })
        
        resolve(id)
      })

      client.on('error', (error) => {
        console.error('SSH connection error:', error)
        reject(error)
      })

      client.on('close', () => {
        const connection = this.connections.get(id)
        if (connection) {
          connection.isConnected = false
          connection.client = undefined
        }
        
        // 通知前端连接状态变化
        windowEvents.sendToRenderer('ssh:connection-status-changed', {
          id,
          status: 'disconnected'
        })
      })

      // 连接配置
      const connectConfig: any = {
        host: config.host,
        port: config.port,
        username: config.username
      }

      if (config.password) {
        connectConfig.password = config.password
      }

      if (config.privateKey) {
        connectConfig.privateKey = config.privateKey
      }

      client.connect(connectConfig)
    })
  }

  async disconnect(id: string): Promise<void> {
    const connection = this.connections.get(id)
    if (!connection || !connection.client) {
      throw new Error('Connection not found or not connected')
    }

    connection.client.end()
    connection.isConnected = false
    connection.client = undefined
  }

  async execute(id: string, command: string): Promise<string> {
    const connection = this.connections.get(id)
    if (!connection || !connection.client || !connection.isConnected) {
      throw new Error('Connection not found or not connected')
    }

    return new Promise((resolve, reject) => {
      connection.client!.exec(command, (err, stream) => {
        if (err) {
          reject(err)
          return
        }

        let output = ''
        let errorOutput = ''

        stream.on('close', (code: number) => {
          if (code !== 0 && errorOutput) {
            reject(new Error(errorOutput))
          } else {
            resolve(output)
          }
        })

        stream.on('data', (data: Buffer) => {
          const chunk = data.toString()
          output += chunk
          
          // 实时发送输出到前端
          windowEvents.sendToRenderer('ssh:terminal-output', {
            id,
            output: chunk,
            type: 'stdout'
          })
        })

        stream.stderr.on('data', (data: Buffer) => {
          const chunk = data.toString()
          errorOutput += chunk
          
          // 实时发送错误输出到前端
          windowEvents.sendToRenderer('ssh:terminal-output', {
            id,
            output: chunk,
            type: 'stderr'
          })
        })
      })
    })
  }

  getConnections(): SSHConnection[] {
    return Array.from(this.connections.values()).map(conn => ({
      ...conn,
      client: undefined // 不序列化 client 对象
    }))
  }

  async saveConnection(config: Omit<SSHConnection, 'id' | 'client' | 'isConnected' | 'lastUsed'>): Promise<string> {
    const id = Date.now().toString()
    const connection: SSHConnection = {
      ...config,
      id,
      isConnected: false,
      lastUsed: new Date()
    }

    this.connections.set(id, connection)
    await this.saveConnections()
    return id
  }

  async deleteConnection(id: string): Promise<void> {
    const connection = this.connections.get(id)
    if (connection && connection.isConnected) {
      await this.disconnect(id)
    }
    
    this.connections.delete(id)
    await this.saveConnections()
  }

  async testConnection(config: Omit<SSHConnection, 'id' | 'client' | 'isConnected' | 'lastUsed'>): Promise<boolean> {
    const client = new Client()

    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        client.end()
        resolve(false)
      }, 10000) // 10秒超时

      client.on('ready', () => {
        clearTimeout(timeout)
        client.end()
        resolve(true)
      })

      client.on('error', () => {
        clearTimeout(timeout)
        resolve(false)
      })

      const connectConfig: any = {
        host: config.host,
        port: config.port,
        username: config.username
      }

      if (config.password) {
        connectConfig.password = config.password
      }

      if (config.privateKey) {
        connectConfig.privateKey = config.privateKey
      }

      client.connect(connectConfig)
    })
  }
}

// 创建 SSH 管理器实例
const sshManager = new SSHManager()

// 注册 IPC 处理器
ipcMain.handle('ssh:connect', async (_, config) => {
  try {
    return await sshManager.connect(config)
  } catch (error) {
    console.error('SSH connect error:', error)
    throw error
  }
})

ipcMain.handle('ssh:disconnect', async (_, id: string) => {
  try {
    await sshManager.disconnect(id)
    return true
  } catch (error) {
    console.error('SSH disconnect error:', error)
    throw error
  }
})

ipcMain.handle('ssh:execute', async (_, id: string, command: string) => {
  try {
    return await sshManager.execute(id, command)
  } catch (error) {
    console.error('SSH execute error:', error)
    throw error
  }
})

ipcMain.handle('ssh:get-connections', () => {
  return sshManager.getConnections()
})

ipcMain.handle('ssh:save-connection', async (_, config) => {
  try {
    return await sshManager.saveConnection(config)
  } catch (error) {
    console.error('SSH save connection error:', error)
    throw error
  }
})

ipcMain.handle('ssh:delete-connection', async (_, id: string) => {
  try {
    await sshManager.deleteConnection(id)
    return true
  } catch (error) {
    console.error('SSH delete connection error:', error)
    throw error
  }
})

ipcMain.handle('ssh:test-connection', async (_, config) => {
  try {
    return await sshManager.testConnection(config)
  } catch (error) {
    console.error('SSH test connection error:', error)
    return false
  }
})

export { sshManager }
