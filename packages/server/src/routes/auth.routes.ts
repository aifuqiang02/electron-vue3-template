import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { logger } from '../utils/logger.js'

interface LoginBody {
  username: string
  password: string
  rememberMe?: boolean
}

interface RegisterBody {
  username: string
  email: string
  password: string
  confirmPassword: string
}

interface RefreshTokenBody {
  refreshToken: string
}

export async function authRoutes(fastify: FastifyInstance) {
  // 用户登录
  fastify.post<{ Body: LoginBody }>('/login', {
    schema: {
      description: '用户登录',
      tags: ['认证'],
      body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string', minLength: 3, maxLength: 50 },
          password: { type: 'string', minLength: 6, maxLength: 100 },
          rememberMe: { type: 'boolean', default: false }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
              type: 'object',
              properties: {
                user: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    username: { type: 'string' },
                    email: { type: 'string' },
                    role: { type: 'string' },
                    lastLogin: { type: 'string' }
                  }
                },
                accessToken: { type: 'string' },
                refreshToken: { type: 'string' },
                expiresIn: { type: 'number' }
              }
            }
          }
        },
        401: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            code: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Body: LoginBody }>, reply: FastifyReply) => {
    try {
      const { username, password, rememberMe } = request.body

      // 模拟用户验证
      if (username === 'admin' && password === 'admin123') {
        const user = {
          id: '1',
          username: 'admin',
          email: 'admin@example.com',
          role: 'admin',
          lastLogin: new Date().toISOString()
        }

        const accessToken = fastify.jwt.sign(
          { 
            userId: user.id, 
            username: user.username, 
            role: user.role 
          },
          { 
            expiresIn: rememberMe ? '7d' : '1d' 
          }
        )

        const refreshToken = fastify.jwt.sign(
          { 
            userId: user.id, 
            type: 'refresh' 
          },
          { 
            expiresIn: '30d' 
          }
        )

        logger.info(`User ${username} logged in successfully`)

        return reply.send({
          success: true,
          message: '登录成功',
          data: {
            user,
            accessToken,
            refreshToken,
            expiresIn: rememberMe ? 7 * 24 * 60 * 60 : 24 * 60 * 60 // seconds
          }
        })
      }

      return reply.status(401).send({
        success: false,
        message: '用户名或密码错误',
        code: 'INVALID_CREDENTIALS'
      })
    } catch (error) {
      logger.error('Login error:', error)
      return reply.status(500).send({
        success: false,
        message: '登录失败',
        code: 'LOGIN_ERROR'
      })
    }
  })

  // 用户注册
  fastify.post<{ Body: RegisterBody }>('/register', {
    schema: {
      description: '用户注册',
      tags: ['认证'],
      body: {
        type: 'object',
        required: ['username', 'email', 'password', 'confirmPassword'],
        properties: {
          username: { type: 'string', minLength: 3, maxLength: 50 },
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6, maxLength: 100 },
          confirmPassword: { type: 'string', minLength: 6, maxLength: 100 }
        }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: {
              type: 'object',
              properties: {
                user: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    username: { type: 'string' },
                    email: { type: 'string' },
                    role: { type: 'string' },
                    createdAt: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Body: RegisterBody }>, reply: FastifyReply) => {
    try {
      const { username, email, password, confirmPassword } = request.body

      // 验证密码确认
      if (password !== confirmPassword) {
        return reply.status(400).send({
          success: false,
          message: '密码确认不匹配',
          code: 'PASSWORD_MISMATCH'
        })
      }

      // 模拟用户创建
      const user = {
        id: Date.now().toString(),
        username,
        email,
        role: 'user',
        createdAt: new Date().toISOString()
      }

      logger.info(`New user registered: ${username}`)

      return reply.status(201).send({
        success: true,
        message: '注册成功',
        data: { user }
      })
    } catch (error) {
      logger.error('Register error:', error)
      return reply.status(500).send({
        success: false,
        message: '注册失败',
        code: 'REGISTER_ERROR'
      })
    }
  })

  // 刷新令牌
  fastify.post<{ Body: RefreshTokenBody }>('/refresh', {
    schema: {
      description: '刷新访问令牌',
      tags: ['认证'],
      body: {
        type: 'object',
        required: ['refreshToken'],
        properties: {
          refreshToken: { type: 'string' }
        }
      }
    }
  }, async (request: FastifyRequest<{ Body: RefreshTokenBody }>, reply: FastifyReply) => {
    try {
      const { refreshToken } = request.body

      // 验证刷新令牌
      const decoded = fastify.jwt.verify(refreshToken) as any

      if (decoded.type !== 'refresh') {
        return reply.status(401).send({
          success: false,
          message: '无效的刷新令牌',
          code: 'INVALID_REFRESH_TOKEN'
        })
      }

      // 生成新的访问令牌
      const accessToken = fastify.jwt.sign(
        { 
          userId: decoded.userId, 
          username: decoded.username, 
          role: decoded.role 
        },
        { 
          expiresIn: '1d' 
        }
      )

      return reply.send({
        success: true,
        message: '令牌刷新成功',
        data: {
          accessToken,
          expiresIn: 24 * 60 * 60 // 24 hours in seconds
        }
      })
    } catch (error) {
      logger.error('Token refresh error:', error)
      return reply.status(401).send({
        success: false,
        message: '令牌刷新失败',
        code: 'TOKEN_REFRESH_ERROR'
      })
    }
  })

  // 用户登出
  fastify.post('/logout', {
    schema: {
      description: '用户登出',
      tags: ['认证'],
      security: [{ bearerAuth: [] }]
    },
    preHandler: [fastify.authenticate]
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // 这里可以将令牌加入黑名单
      logger.info(`User ${(request.user as any)?.username} logged out`)

      return reply.send({
        success: true,
        message: '登出成功'
      })
    } catch (error) {
      logger.error('Logout error:', error)
      return reply.status(500).send({
        success: false,
        message: '登出失败',
        code: 'LOGOUT_ERROR'
      })
    }
  })

  // 验证令牌
  fastify.get('/verify', {
    schema: {
      description: '验证访问令牌',
      tags: ['认证'],
      security: [{ bearerAuth: [] }]
    },
    preHandler: [fastify.authenticate]
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = request.user as any

      return reply.send({
        success: true,
        message: '令牌验证成功',
        data: {
          user: {
            id: user.userId,
            username: user.username,
            role: user.role
          }
        }
      })
    } catch (error) {
      logger.error('Token verify error:', error)
      return reply.status(401).send({
        success: false,
        message: '令牌验证失败',
        code: 'TOKEN_VERIFY_ERROR'
      })
    }
  })
}
