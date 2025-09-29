<template>
  <div class="history-view p-6">
    <div class="history-header mb-6">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white">历史记录</h2>
      <p class="text-gray-600 dark:text-gray-300">查看命令执行历史和连接记录</p>
    </div>
    
    <!-- 过滤器 -->
    <div class="history-filters bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 shadow">
      <div class="flex gap-4 items-center">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            类型
          </label>
          <select 
            v-model="filterType" 
            class="px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          >
            <option value="all">全部</option>
            <option value="command">命令</option>
            <option value="connection">连接</option>
            <option value="file">文件操作</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            时间范围
          </label>
          <select 
            v-model="filterTime" 
            class="px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          >
            <option value="all">全部时间</option>
            <option value="today">今天</option>
            <option value="week">本周</option>
            <option value="month">本月</option>
          </select>
        </div>
        
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            搜索
          </label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索历史记录..."
            class="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          />
        </div>
        
        <div class="pt-6">
          <button
            @click="clearHistory"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            清空历史
          </button>
        </div>
      </div>
    </div>
    
    <!-- 历史记录列表 -->
    <div class="history-list space-y-3">
      <div v-if="filteredHistory.length === 0" class="text-center text-gray-500 py-10">
        没有找到匹配的历史记录
      </div>
      
      <div 
        v-for="item in filteredHistory" 
        :key="item.id"
        class="history-item bg-white dark:bg-gray-800 rounded-lg p-4 shadow border"
      >
        <div class="flex items-start justify-between">
          <div class="history-content flex-1">
            <div class="flex items-center gap-2 mb-2">
              <span 
                :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  getTypeColor(item.type)
                ]"
              >
                {{ getTypeLabel(item.type) }}
              </span>
              <span class="text-sm text-gray-500">
                {{ formatDate(item.timestamp) }}
              </span>
              <span 
                v-if="item.server"
                class="text-sm text-gray-600 dark:text-gray-400"
              >
                @ {{ item.server }}
              </span>
            </div>
            
            <div class="history-details">
              <div class="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                {{ item.content }}
              </div>
              
              <div v-if="item.result" class="mt-2">
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">执行结果:</div>
                <div class="font-mono text-xs bg-gray-50 dark:bg-gray-900 p-2 rounded max-h-32 overflow-y-auto">
                  {{ item.result }}
                </div>
              </div>
            </div>
          </div>
          
          <div class="history-actions ml-4">
            <button
              @click="repeatAction(item)"
              class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              重复执行
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface HistoryItem {
  id: string
  type: 'command' | 'connection' | 'file'
  content: string
  result?: string
  server?: string
  timestamp: Date
  status: 'success' | 'error' | 'info'
}

const filterType = ref('all')
const filterTime = ref('all')
const searchQuery = ref('')

const history = ref<HistoryItem[]>([
  {
    id: '1',
    type: 'command',
    content: 'ls -la /home',
    result: 'total 24\ndrwxr-xr-x 3 user user 4096 Jan 20 10:30 .\ndrwxr-xr-x 3 root root 4096 Jan 15 09:20 ..',
    server: '192.168.1.100',
    timestamp: new Date('2024-01-20T10:30:00'),
    status: 'success'
  },
  {
    id: '2',
    type: 'connection',
    content: '连接到服务器 192.168.1.100',
    server: '192.168.1.100',
    timestamp: new Date('2024-01-20T10:25:00'),
    status: 'success'
  },
  {
    id: '3',
    type: 'file',
    content: '下载文件: /home/user/backup.tar.gz',
    server: '192.168.1.100',
    timestamp: new Date('2024-01-20T10:35:00'),
    status: 'success'
  },
  {
    id: '4',
    type: 'command',
    content: 'sudo systemctl restart nginx',
    result: 'Failed to restart nginx.service: Unit nginx.service not found.',
    server: '192.168.1.100',
    timestamp: new Date('2024-01-20T10:40:00'),
    status: 'error'
  }
])

const filteredHistory = computed(() => {
  let filtered = history.value

  // 按类型过滤
  if (filterType.value !== 'all') {
    filtered = filtered.filter(item => item.type === filterType.value)
  }

  // 按时间过滤
  if (filterTime.value !== 'all') {
    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const startOfWeek = new Date(startOfDay.getTime() - (startOfDay.getDay() * 24 * 60 * 60 * 1000))
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    filtered = filtered.filter(item => {
      switch (filterTime.value) {
        case 'today':
          return item.timestamp >= startOfDay
        case 'week':
          return item.timestamp >= startOfWeek
        case 'month':
          return item.timestamp >= startOfMonth
        default:
          return true
      }
    })
  }

  // 按搜索查询过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item => 
      item.content.toLowerCase().includes(query) ||
      (item.server && item.server.toLowerCase().includes(query)) ||
      (item.result && item.result.toLowerCase().includes(query))
    )
  }

  return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
})

const getTypeLabel = (type: string): string => {
  const labels = {
    command: '命令',
    connection: '连接',
    file: '文件'
  }
  return labels[type as keyof typeof labels] || type
}

const getTypeColor = (type: string): string => {
  const colors = {
    command: 'bg-blue-100 text-blue-800',
    connection: 'bg-green-100 text-green-800',
    file: 'bg-purple-100 text-purple-800'
  }
  return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('zh-CN') + ' ' + date.toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  })
}

const repeatAction = (item: HistoryItem) => {
  console.log('Repeat action:', item.content)
  // 重复执行的逻辑
}

const clearHistory = () => {
  if (confirm('确定要清空所有历史记录吗？此操作不可撤销。')) {
    history.value = []
  }
}

onMounted(() => {
  console.log('HistoryView mounted')
})
</script>

<style scoped>
.history-view {
  max-height: 100vh;
  overflow-y: auto;
}
</style>
