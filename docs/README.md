# AI SSH Assistant 开发文档

## 项目概述

AI SSH Assistant 是一个基于人工智能的 SSH 远程服务器管理助手，支持自然语言交互和智能命令生成。

## 技术架构

### 前端技术栈
- **框架**: Vue 3 + Composition API
- **桌面**: Electron
- **UI 库**: Tailwind CSS + Bootstrap 5
- **状态管理**: Pinia
- **终端**: xterm.js

### 后端技术栈
- **运行时**: Node.js 20+
- **框架**: Fastify
- **数据库**: PostgreSQL + Prisma ORM
- **缓存**: Redis
- **AI 服务**: OpenAI API + Anthropic API

## 快速开始

### 环境要求
- Node.js 20+
- PostgreSQL 14+
- Redis 6+
- Docker & Docker Compose
- pnpm 8+

### 安装和运行

1. **克隆项目**
```bash
git clone <repository-url>
cd ai-ssh-assistant
```

2. **配置环境变量**
```bash
cp env.example .env
# 编辑 .env 文件，填入必要的配置
```

3. **启动开发环境**
```bash
# 使用开发脚本（推荐）
chmod +x scripts/dev.sh
./scripts/dev.sh

# 或手动启动（详细步骤说明）
pnpm install                          # 安装所有项目依赖包（前端、后端、共享包）
docker-compose up -d postgres redis   # 启动 PostgreSQL 数据库和 Redis 缓存服务（后台运行）
pnpm db:generate                      # 根据 Prisma schema 生成数据库客户端代码
pnpm db:push                          # 将数据库模式推送到 PostgreSQL，创建表结构
pnpm db:seed                          # 向数据库插入初始种子数据（测试用户、系统配置等）
pnpm dev                              # 并行启动所有开发服务（前端 + 后端）
```

### 构建生产版本

```bash
# 使用构建脚本
chmod +x scripts/build.sh
./scripts/build.sh

# 构建 Docker 镜像
./scripts/build.sh --docker

# 打包桌面应用
./scripts/build.sh --package
```

## 项目结构

```
ai-ssh-assistant/
├── apps/                     # 应用程序
│   ├── desktop/             # Electron 桌面应用
│   └── web/                 # Web 前端应用
├── packages/                # 共享包
│   ├── server/              # Node.js 后端服务
│   ├── database/            # 数据库层 (Prisma)
│   └── shared/              # 共享类型和工具
├── docs/                    # 文档
├── scripts/                 # 构建和部署脚本
├── docker/                  # Docker 配置
└── docker-compose.yml       # 开发环境服务
```

## 开发指南

### 数据库设计

项目采用 Prisma ORM，数据库 Schema 位于 `packages/database/prisma/schema.prisma`。

主要数据表：
- **users**: 用户表
- **ssh_connections**: SSH 连接配置
- **chat_sessions**: AI 对话会话
- **messages**: 聊天消息
- **command_logs**: 命令执行日志
- **usage_stats**: 使用统计

### API 设计

后端 API 遵循 RESTful 设计，主要路由：

- `POST /api/v1/auth/login` - 用户登录
- `GET /api/v1/ssh/connections` - 获取 SSH 连接列表
- `POST /api/v1/ssh/execute` - 执行 SSH 命令
- `POST /api/v1/ai/chat` - AI 对话
- `POST /api/v1/ai/generate-command` - 生成命令

API 文档：http://localhost:3000/docs

### 前端开发

#### 目录结构
```
apps/desktop/src/
├── components/          # Vue 组件
│   ├── chat/           # 聊天相关组件
│   ├── ssh/            # SSH 相关组件
│   ├── terminal/       # 终端组件
│   └── common/         # 通用组件
├── views/              # 页面视图
├── stores/             # Pinia 状态管理
├── router/             # 路由配置
└── utils/              # 工具函数
```

#### 状态管理

使用 Pinia 进行状态管理，主要 Store：
- `useAppStore` - 应用全局状态
- `useAuthStore` - 用户认证状态
- `useSSHStore` - SSH 连接状态
- `useChatStore` - AI 对话状态

#### 样式系统

采用 Tailwind CSS + Bootstrap 5 混合方案：
- Tailwind CSS 用于快速样式编写
- Bootstrap 组件用于复杂 UI 组件
- 自定义 CSS 变量支持主题切换

### 后端开发

#### 目录结构
```
packages/server/src/
├── controllers/        # 控制器层
├── services/          # 业务逻辑层
├── middleware/        # 中间件
├── routes/            # 路由定义
├── config/            # 配置文件
├── utils/             # 工具函数
└── types/             # 类型定义
```

#### 服务层设计

- `AuthService` - 用户认证服务
- `SSHService` - SSH 连接管理
- `AIService` - AI 服务集成
- `CacheService` - Redis 缓存服务

### 部署

#### Docker 部署

```bash
# 构建镜像
docker-compose build

# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f
```

#### 生产环境配置

1. 设置环境变量
2. 配置数据库连接
3. 设置 AI API 密钥
4. 配置 Redis 缓存
5. 设置 HTTPS 证书

## 测试

### 运行测试

```bash
# 运行所有测试
pnpm test

# 运行覆盖率测试
pnpm test:coverage

# 运行特定包的测试
pnpm --filter @ai-ssh/server test
```

### 测试策略

- 单元测试：使用 Vitest
- 集成测试：API 端点测试
- E2E 测试：桌面应用功能测试

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

### 代码规范

- 使用 ESLint + Prettier 进行代码格式化
- 遵循 TypeScript 严格模式
- 编写单元测试
- 添加适当的注释和文档

## 常见问题

### Q: 如何添加新的 AI 模型？
A: 在 `AIService` 中添加新的模型支持，并更新配置文件。

### Q: 如何自定义 UI 主题？
A: 修改 `tailwind.config.js` 和 CSS 变量定义。

### Q: 如何添加新的 SSH 认证方式？
A: 在 `SSHService` 中添加新的认证逻辑，并更新数据库 Schema。

## 许可证

MIT License - 详见 LICENSE 文件
