<template>
  <div class="settings-view p-6 bg-vscode-bg-light h-full">
    <div class="settings-header mb-6">
      <h2 class="text-2xl font-bold text-vscode-fg">设置</h2>
      <p class="text-vscode-fg-muted">配置应用程序选项</p>
    </div>
    
    <div class="settings-content space-y-6">
      <!-- 主题设置 -->
      <div class="setting-group bg-vscode-bg rounded-lg p-4 border border-vscode-border">
        <h3 class="text-lg font-semibold mb-3 text-vscode-fg">外观</h3>
        
        <div class="setting-item flex items-center justify-between mb-4">
          <label class="text-vscode-fg-muted">主题模式</label>
          <select 
            v-model="theme" 
            class="px-3 py-2 border rounded-md bg-vscode-bg-light border-vscode-border text-vscode-fg"
          >
            <option value="light">浅色</option>
            <option value="dark">深色</option>
            <option value="auto">跟随系统</option>
          </select>
        </div>
        
        <div class="setting-item flex items-center justify-between">
          <label class="text-vscode-fg-muted">字体大小</label>
          <select 
            v-model="fontSize" 
            class="px-3 py-2 border rounded-md bg-vscode-bg-light border-vscode-border text-vscode-fg"
          >
            <option value="small">小</option>
            <option value="medium">中</option>
            <option value="large">大</option>
          </select>
        </div>
      </div>
      
      <!-- SSH 设置 -->
      <div class="setting-group bg-vscode-bg rounded-lg p-4 border border-vscode-border">
        <h3 class="text-lg font-semibold mb-3 text-vscode-fg">SSH 配置</h3>
        
        <div class="setting-item mb-4">
          <label class="block text-vscode-fg-muted mb-2">默认超时时间 (秒)</label>
          <input 
            v-model="sshTimeout" 
            type="number" 
            class="w-full px-3 py-2 border rounded-md bg-vscode-bg-light border-vscode-border text-vscode-fg"
            min="10"
            max="300"
          />
        </div>
        
        <div class="setting-item flex items-center justify-between">
          <label class="text-vscode-fg-muted">保持连接</label>
          <input 
            v-model="keepAlive" 
            type="checkbox" 
            class="w-4 h-4 text-vscode-accent bg-vscode-bg-light border-vscode-border rounded"
          />
        </div>
      </div>
      
      <!-- 保存按钮 -->
      <div class="settings-actions">
        <button 
          @click="saveSettings"
          class="px-6 py-2 bg-vscode-accent text-white rounded-md hover:bg-vscode-accent-hover transition-colors"
        >
          保存设置
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const theme = ref('light')
const fontSize = ref('medium')
const sshTimeout = ref(30)
const keepAlive = ref(true)

const saveSettings = () => {
  // 保存设置逻辑
  console.log('Settings saved:', {
    theme: theme.value,
    fontSize: fontSize.value,
    sshTimeout: sshTimeout.value,
    keepAlive: keepAlive.value
  })
  
  // 显示保存成功消息
  alert('设置已保存！')
}

onMounted(() => {
  // 加载已保存的设置
  console.log('SettingsView mounted')
})
</script>

<style scoped>
.settings-view {
  max-height: 100vh;
  overflow-y: auto;
}
</style>
