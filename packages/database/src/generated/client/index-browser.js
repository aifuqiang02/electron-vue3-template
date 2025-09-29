
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  uuid: 'uuid',
  email: 'email',
  username: 'username',
  password: 'password',
  avatar: 'avatar',
  role: 'role',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  settings: 'settings'
};

exports.Prisma.SSHConnectionScalarFieldEnum = {
  id: 'id',
  name: 'name',
  host: 'host',
  port: 'port',
  username: 'username',
  authType: 'authType',
  password: 'password',
  privateKey: 'privateKey',
  passphrase: 'passphrase',
  status: 'status',
  lastUsed: 'lastUsed',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  meta: 'meta',
  userId: 'userId'
};

exports.Prisma.ChatSessionScalarFieldEnum = {
  id: 'id',
  title: 'title',
  model: 'model',
  type: 'type',
  isActive: 'isActive',
  pinned: 'pinned',
  group: 'group',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  config: 'config',
  meta: 'meta',
  userId: 'userId'
};

exports.Prisma.TopicScalarFieldEnum = {
  id: 'id',
  title: 'title',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  meta: 'meta',
  sessionId: 'sessionId'
};

exports.Prisma.MessageScalarFieldEnum = {
  id: 'id',
  role: 'role',
  content: 'content',
  parentId: 'parentId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  meta: 'meta',
  extra: 'extra',
  tokens: 'tokens',
  fromModel: 'fromModel',
  fromProvider: 'fromProvider',
  plugin: 'plugin',
  pluginState: 'pluginState',
  translate: 'translate',
  tts: 'tts',
  userId: 'userId',
  sessionId: 'sessionId',
  topicId: 'topicId'
};

exports.Prisma.MessageFileScalarFieldEnum = {
  id: 'id',
  messageId: 'messageId',
  fileId: 'fileId',
  createdAt: 'createdAt'
};

exports.Prisma.FileScalarFieldEnum = {
  id: 'id',
  name: 'name',
  type: 'type',
  size: 'size',
  url: 'url',
  path: 'path',
  hash: 'hash',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  metadata: 'metadata',
  userId: 'userId'
};

exports.Prisma.CommandLogScalarFieldEnum = {
  id: 'id',
  command: 'command',
  output: 'output',
  error: 'error',
  exitCode: 'exitCode',
  duration: 'duration',
  isSuccess: 'isSuccess',
  safetyLevel: 'safetyLevel',
  executedAt: 'executedAt',
  metadata: 'metadata',
  userId: 'userId',
  connectionId: 'connectionId'
};

exports.Prisma.UsageStatsScalarFieldEnum = {
  id: 'id',
  date: 'date',
  commandsCount: 'commandsCount',
  aiRequestsCount: 'aiRequestsCount',
  tokensUsed: 'tokensUsed',
  connectionsUsed: 'connectionsUsed',
  createdAt: 'createdAt',
  userId: 'userId'
};

exports.Prisma.ApiKeyScalarFieldEnum = {
  id: 'id',
  name: 'name',
  key: 'key',
  type: 'type',
  isActive: 'isActive',
  expiresAt: 'expiresAt',
  lastUsed: 'lastUsed',
  createdAt: 'createdAt',
  scopes: 'scopes',
  userId: 'userId'
};

exports.Prisma.SystemConfigScalarFieldEnum = {
  id: 'id',
  key: 'key',
  value: 'value',
  type: 'type',
  description: 'description',
  category: 'category',
  isPublic: 'isPublic',
  updatedAt: 'updatedAt',
  createdAt: 'createdAt'
};

exports.Prisma.SessionGroupScalarFieldEnum = {
  id: 'id',
  name: 'name',
  sort: 'sort',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  meta: 'meta',
  userId: 'userId'
};

exports.Prisma.PluginScalarFieldEnum = {
  id: 'id',
  identifier: 'identifier',
  name: 'name',
  version: 'version',
  enabled: 'enabled',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  config: 'config',
  meta: 'meta',
  settings: 'settings',
  userId: 'userId'
};

exports.Prisma.KnowledgeBaseScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  type: 'type',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  config: 'config',
  meta: 'meta',
  userId: 'userId'
};

exports.Prisma.KnowledgeDocumentScalarFieldEnum = {
  id: 'id',
  title: 'title',
  content: 'content',
  type: 'type',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  metadata: 'metadata',
  embedding: 'embedding',
  knowledgeBaseId: 'knowledgeBaseId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.UserRole = exports.$Enums.UserRole = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  PREMIUM: 'PREMIUM'
};

exports.SSHAuthType = exports.$Enums.SSHAuthType = {
  PASSWORD: 'PASSWORD',
  PRIVATE_KEY: 'PRIVATE_KEY',
  SSH_AGENT: 'SSH_AGENT'
};

exports.ConnectionStatus = exports.$Enums.ConnectionStatus = {
  CONNECTED: 'CONNECTED',
  DISCONNECTED: 'DISCONNECTED',
  CONNECTING: 'CONNECTING',
  ERROR: 'ERROR'
};

exports.SessionType = exports.$Enums.SessionType = {
  CHAT: 'CHAT',
  SSH: 'SSH',
  MIXED: 'MIXED'
};

exports.MessageRole = exports.$Enums.MessageRole = {
  USER: 'USER',
  ASSISTANT: 'ASSISTANT',
  SYSTEM: 'SYSTEM',
  FUNCTION: 'FUNCTION',
  TOOL: 'TOOL'
};

exports.SafetyLevel = exports.$Enums.SafetyLevel = {
  SAFE: 'SAFE',
  CAUTION: 'CAUTION',
  DANGEROUS: 'DANGEROUS'
};

exports.ApiKeyType = exports.$Enums.ApiKeyType = {
  PERSONAL: 'PERSONAL',
  SERVICE: 'SERVICE',
  TEMPORARY: 'TEMPORARY'
};

exports.ConfigType = exports.$Enums.ConfigType = {
  STRING: 'STRING',
  NUMBER: 'NUMBER',
  BOOLEAN: 'BOOLEAN',
  JSON: 'JSON',
  ARRAY: 'ARRAY'
};

exports.KnowledgeType = exports.$Enums.KnowledgeType = {
  DOCUMENT: 'DOCUMENT',
  FAQ: 'FAQ',
  COMMAND: 'COMMAND',
  SCRIPT: 'SCRIPT'
};

exports.DocumentStatus = exports.$Enums.DocumentStatus = {
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED',
  DELETED: 'DELETED'
};

exports.Prisma.ModelName = {
  User: 'User',
  SSHConnection: 'SSHConnection',
  ChatSession: 'ChatSession',
  Topic: 'Topic',
  Message: 'Message',
  MessageFile: 'MessageFile',
  File: 'File',
  CommandLog: 'CommandLog',
  UsageStats: 'UsageStats',
  ApiKey: 'ApiKey',
  SystemConfig: 'SystemConfig',
  SessionGroup: 'SessionGroup',
  Plugin: 'Plugin',
  KnowledgeBase: 'KnowledgeBase',
  KnowledgeDocument: 'KnowledgeDocument'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
