# AI SSH Assistant 简化构建脚本 (PowerShell)

Write-Host "🏗️  Building AI SSH Assistant for Production" -ForegroundColor Green

# 清理之前的构建
Write-Host "🧹 Cleaning previous builds..." -ForegroundColor Yellow
try {
    pnpm clean
} catch {
    Write-Host "⚠️  Clean command failed, continuing with build..." -ForegroundColor Yellow
    
    # 手动清理关键目录
    Write-Host "   Manually cleaning critical directories..." -ForegroundColor Gray
    Remove-Item -Recurse -Force -ErrorAction SilentlyContinue "packages/server/dist"
    Remove-Item -Recurse -Force -ErrorAction SilentlyContinue "packages/shared/dist"
    Remove-Item -Recurse -Force -ErrorAction SilentlyContinue "packages/database/dist"
    Remove-Item -Recurse -Force -ErrorAction SilentlyContinue "apps/desktop/dist"
    Remove-Item -Recurse -Force -ErrorAction SilentlyContinue "apps/desktop/dist-electron"
    Remove-Item -Recurse -Force -ErrorAction SilentlyContinue "apps/desktop/node_modules/.vite"
    
    Write-Host "   Manual cleanup completed" -ForegroundColor Gray
}

# 安装依赖
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
pnpm install --frozen-lockfile

# 生成 Prisma 客户端
Write-Host "🔧 Generating Prisma client..." -ForegroundColor Yellow
try {
    pnpm db:generate
} catch {
    Write-Host "⚠️  Prisma client generation failed, continuing with build..." -ForegroundColor Yellow
}

# 构建项目
Write-Host "🔨 Building projects..." -ForegroundColor Green

# 构建共享包
Write-Host "   📚 Building shared packages..." -ForegroundColor Cyan
try {
    pnpm build:shared
    Write-Host "   ✅ Shared packages built successfully" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Failed to build shared packages" -ForegroundColor Red
    exit 1
}

# 构建桌面应用
Write-Host "   💻 Building desktop app..." -ForegroundColor Cyan
try {
    pnpm build:desktop
    Write-Host "   ✅ Desktop app built successfully" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Failed to build desktop app" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completed successfully!" -ForegroundColor Green

# 显示构建结果
Write-Host ""
Write-Host "📊 Build Results:" -ForegroundColor Blue
Write-Host "   - Shared: packages/shared/dist/" -ForegroundColor Gray
Write-Host "   - Desktop: apps/desktop/dist/ & apps/desktop/dist-electron/" -ForegroundColor Gray
Write-Host ""

Write-Host "🎉 Build process completed!" -ForegroundColor Green
