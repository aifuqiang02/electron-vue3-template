<template>
  <div class="connections-view p-6">
    <div class="connections-header mb-6">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white">连接管理</h2>
      <p class="text-gray-600 dark:text-gray-300">管理已保存的 SSH 连接</p>
    </div>
    
    <div class="connections-list space-y-4">
      <div v-if="connections.length === 0" class="text-center text-gray-500 py-10">
        还没有保存的连接，去创建一个吧！
      </div>
      
      <div 
        v-for="connection in connections" 
        :key="connection.id"
        class="connection-card bg-white dark:bg-gray-800 rounded-lg p-4 shadow border"
      >
        <div class="flex items-center justify-between">
          <div class="connection-info">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
              {{ connection.name }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ connection.username }}@{{ connection.host }}:{{ connection.port }}
            </p>
            <div class="mt-2 flex items-center gap-2">
              <span 
                :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  connection.status === 'connected' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                ]"
              >
                {{ connection.status === 'connected' ? '已连接' : '未连接' }}
              </span>
              <span class="text-xs text-gray-500">
                最后连接: {{ formatDate(connection.lastConnected) }}
              </span>
            </div>
          </div>
          
          <div class="connection-actions flex gap-2">
            <button
              @click="connectToServer(connection)"
              :class="[
                'px-3 py-2 rounded-md text-sm font-medium',
                connection.status === 'connected'
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              ]"
            >
              {{ connection.status === 'connected' ? '断开' : '连接' }}
            </button>
            <button
              @click="editConnection(connection)"
              class="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
            >
              编辑
            </button>
            <button
              @click="deleteConnection(connection.id)"
              class="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
            >
              删除
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="connections-actions mt-6">
      <button
        @click="addNewConnection"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        新建连接
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Connection {
  id: string
  name: string
  host: string
  port: number
  username: string
  status: 'connected' | 'disconnected'
  lastConnected: Date
}

const connections = ref<Connection[]>([
  {
    id: '1',
    name: '测试服务器',
    host: '192.168.1.100',
    port: 22,
    username: 'root',
    status: 'disconnected',
    lastConnected: new Date('2024-01-01')
  },
  {
    id: '2',
    name: '生产服务器',
    host: '10.0.0.50',
    port: 22,
    username: 'admin',
    status: 'connected',
    lastConnected: new Date()
  }
])

const connectToServer = (connection: Connection) => {
  if (connection.status === 'connected') {
    connection.status = 'disconnected'
    console.log(`Disconnected from ${connection.name}`)
  } else {
    connection.status = 'connected'
    connection.lastConnected = new Date()
    console.log(`Connected to ${connection.name}`)
  }
}

const editConnection = (connection: Connection) => {
  console.log('Edit connection:', connection.name)
  // 导航到编辑页面的逻辑
}

const deleteConnection = (id: string) => {
  if (confirm('确定要删除这个连接吗？')) {
    connections.value = connections.value.filter(conn => conn.id !== id)
  }
}

const addNewConnection = () => {
  console.log('Add new connection')
  // 导航到新建连接页面的逻辑
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('zh-CN') + ' ' + date.toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

onMounted(() => {
  console.log('ConnectionsView mounted')
})
</script>

<style scoped>
.connections-view {
  max-height: 100vh;
  overflow-y: auto;
}
</style>
