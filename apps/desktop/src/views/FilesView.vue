<template>
  <div class="files-view p-6">
    <div class="files-header mb-6">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white">文件管理</h2>
      <p class="text-gray-600 dark:text-gray-300">浏览和管理远程服务器文件</p>
    </div>
    
    <!-- 路径导航 -->
    <div class="path-nav bg-white dark:bg-gray-800 rounded-lg p-3 mb-4 shadow">
      <div class="flex items-center gap-2">
        <button
          @click="goBack"
          :disabled="currentPath === '/'"
          class="px-2 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50"
        >
          ←
        </button>
        <span class="text-gray-700 dark:text-gray-300 font-mono">{{ currentPath }}</span>
      </div>
    </div>
    
    <!-- 文件列表 -->
    <div class="files-list bg-white dark:bg-gray-800 rounded-lg shadow">
      <div class="files-header-row grid grid-cols-4 gap-4 p-3 border-b font-medium text-gray-700 dark:text-gray-300">
        <div>名称</div>
        <div>类型</div>
        <div>大小</div>
        <div>修改时间</div>
      </div>
      
      <div v-if="files.length === 0" class="text-center text-gray-500 py-10">
        目录为空
      </div>
      
      <div 
        v-for="file in files" 
        :key="file.name"
        @click="handleFileClick(file)"
        class="file-item grid grid-cols-4 gap-4 p-3 border-b hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
      >
        <div class="flex items-center gap-2">
          <span 
            :class="[
              'text-lg',
              file.type === 'directory' ? 'text-blue-600' : 'text-gray-600'
            ]"
          >
            {{ file.type === 'directory' ? '📁' : '📄' }}
          </span>
          <span class="text-gray-800 dark:text-gray-200">{{ file.name }}</span>
        </div>
        <div class="text-gray-600 dark:text-gray-400">
          {{ file.type === 'directory' ? '目录' : '文件' }}
        </div>
        <div class="text-gray-600 dark:text-gray-400">
          {{ file.type === 'directory' ? '-' : formatFileSize(file.size) }}
        </div>
        <div class="text-gray-600 dark:text-gray-400">
          {{ formatDate(file.modifiedTime) }}
        </div>
      </div>
    </div>
    
    <!-- 文件操作按钮 -->
    <div class="file-actions mt-4 flex gap-2">
      <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        上传文件
      </button>
      <button class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
        新建文件夹
      </button>
      <button class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
        刷新
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface FileItem {
  name: string
  type: 'file' | 'directory'
  size: number
  modifiedTime: Date
}

const currentPath = ref('/')
const files = ref<FileItem[]>([
  {
    name: 'Documents',
    type: 'directory',
    size: 0,
    modifiedTime: new Date('2024-01-15')
  },
  {
    name: 'config.json',
    type: 'file',
    size: 1024,
    modifiedTime: new Date('2024-01-20')
  },
  {
    name: 'backup.tar.gz',
    type: 'file',
    size: 1048576,
    modifiedTime: new Date('2024-01-18')
  },
  {
    name: 'logs',
    type: 'directory',
    size: 0,
    modifiedTime: new Date('2024-01-22')
  }
])

const goBack = () => {
  if (currentPath.value !== '/') {
    const pathParts = currentPath.value.split('/').filter(p => p)
    pathParts.pop()
    currentPath.value = '/' + pathParts.join('/')
    if (currentPath.value === '/') {
      currentPath.value = '/'
    }
  }
}

const handleFileClick = (file: FileItem) => {
  if (file.type === 'directory') {
    if (currentPath.value === '/') {
      currentPath.value = `/${file.name}`
    } else {
      currentPath.value = `${currentPath.value}/${file.name}`
    }
    // 模拟加载新目录的文件
    loadDirectory()
  } else {
    console.log('Open file:', file.name)
    // 打开文件的逻辑
  }
}

const loadDirectory = () => {
  // 模拟加载目录内容
  files.value = [
    {
      name: 'file1.txt',
      type: 'file',
      size: 512,
      modifiedTime: new Date()
    }
  ]
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('zh-CN') + ' ' + date.toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

onMounted(() => {
  console.log('FilesView mounted')
})
</script>

<style scoped>
.files-view {
  max-height: 100vh;
  overflow-y: auto;
}
</style>
