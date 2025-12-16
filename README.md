# TedGit Web Service

一个简单而优雅的Node.js网页服务，显示"Hello Ted!"，支持容器化部署和自动化CI/CD流程。

## ✨ 特性

- 🚀 **高性能**: 基于Node.js + Express构建，提供快速响应
- 🐳 **容器化**: 支持Docker部署，便于跨平台运行
- 🔄 **自动化**: GitHub Actions CI/CD，自动构建和部署
- 🔒 **安全**: 配置了安全头、CORS和非root用户运行
- 📱 **响应式**: 现代化设计，支持各种设备
- 💚 **健康检查**: 内置健康检查端点
- 🎨 **美观界面**: 大字体显示，现代化UI设计

## 🚀 快速开始

### 本地开发

1. **克隆仓库**
   ```bash
   git clone https://github.com/yourusername/tedgit.git
   cd tedgit
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **访问应用**
   
   打开浏览器访问 [http://localhost:8222](http://localhost:8222)

### 生产部署

1. **启动生产服务器**
   ```bash
   npm start
   ```

2. **使用PM2管理进程（推荐）**
   ```bash
   npm install -g pm2
   pm2 start server.js --name tedgit
   ```

## 🐳 Docker 部署

### 使用预构建镜像

1. **拉取镜像**
   ```bash
   docker pull ghcr.io/yourusername/tedgit:latest
   ```

2. **运行容器**
   ```bash
   docker run -d \
     --name tedgit \
     -p 8222:8222 \
     --restart unless-stopped \
     ghcr.io/yourusername/tedgit:latest
   ```

### 从源码构建

1. **构建镜像**
   ```bash
   docker build -t tedgit .
   ```

2. **运行容器**
   ```bash
   docker run -d \
     --name tedgit \
     -p 8222:8222 \
     --restart unless-stopped \
     tedgit
   ```

### Docker Compose

创建 `docker-compose.yml` 文件：

```yaml
version: '3.8'
services:
  tedgit:
    image: ghcr.io/yourusername/tedgit:latest
    ports:
      - "8222:8222"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - HOST=0.0.0.0
      - PORT=8222
```

启动服务：
```bash
docker-compose up -d
```

## 📡 API 端点

| 端点 | 方法 | 描述 |
|------|------|------|
| `/` | GET | 主页面，显示"Hello Ted!" |
| `/health` | GET | 健康检查端点 |
| `/api/info` | GET | 服务信息端点 |

### 健康检查响应示例

```json
{
  "status": "OK",
  "timestamp": "2025-12-16T22:30:00.000Z",
  "uptime": 3600.123,
  "environment": "production"
}
```

### 服务信息响应示例

```json
{
  "name": "TedGit Web Service",
  "version": "1.0.0",
  "description": "A simple web service displaying Hello Ted!",
  "endpoints": {
    "health": "/health",
    "main": "/",
    "info": "/api/info"
  }
}
```

## ⚙️ 配置

### 环境变量

| 变量名 | 默认值 | 描述 |
|--------|--------|------|
| `PORT` | 8222 | 服务端口 |
| `HOST` | 0.0.0.0 | 监听地址 |
| `NODE_ENV` | development | 运行环境 |
| `ALLOWED_ORIGINS` | * | 允许的CORS源（逗号分隔） |

### 示例配置

```bash
# .env 文件
NODE_ENV=production
PORT=8222
HOST=0.0.0.0
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

## 🔧 开发

### 项目结构

```
tedgit/
├── package.json                 # 项目配置和依赖
├── server.js                   # Express服务器主文件
├── public/                     # 静态资源目录
│   ├── index.html             # 主页面
│   ├── css/
│   │   └── style.css          # 样式文件
│   └── js/
│       └── main.js            # 客户端JavaScript
├── Dockerfile                  # Docker镜像构建文件
├── .dockerignore              # Docker忽略文件
├── .gitignore                 # Git忽略文件
├── .github/
│   └── workflows/
│       └── docker-publish.yml # GitHub Actions工作流
└── README.md                  # 项目说明文档
```

### 可用脚本

```bash
# 启动生产服务器
npm start

# 启动开发服务器（自动重启）
npm run dev

# 安装依赖
npm install

# 安装生产依赖
npm ci --only=production
```

## 🔄 CI/CD

项目使用GitHub Actions进行自动化构建和部署：

- **触发条件**: 推送到main分支或创建PR
- **构建步骤**: 测试 → 构建Docker镜像 → 推送到GHCR → 安全扫描
- **多平台支持**: linux/amd64, linux/arm64
- **自动标签**: 基于分支、标签和语义化版本

### 手动触发构建

1. 推送到main分支：
   ```bash
   git push origin main
   ```

2. 创建版本标签：
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

## 🔒 安全特性

- **非root用户**: Docker容器使用非特权用户运行
- **安全头**: 使用Helmet.js设置安全HTTP头
- **CORS配置**: 可配置的跨域资源共享策略
- **健康检查**: 内置健康检查和监控
- **最小化镜像**: 使用Alpine Linux基础镜像
- **依赖扫描**: 自动扫描容器镜像漏洞

## 📊 监控和日志

### 健康检查

```bash
# 检查服务状态
curl http://localhost:8222/health

# 检查服务信息
curl http://localhost:8222/api/info
```

### 日志

```bash
# Docker容器日志
docker logs tedgit

# 实时日志
docker logs -f tedgit
```

## 🤝 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Express.js](https://expressjs.com/) - Web框架
- [Helmet.js](https://helmetjs.github.io/) - 安全中间件
- [Docker](https://www.docker.com/) - 容器化平台
- [GitHub Actions](https://github.com/features/actions) - CI/CD平台

## 📞 支持

如果您有任何问题或建议，请：

- 创建 [Issue](https://github.com/yourusername/tedgit/issues)
- 发送邮件至 your-email@example.com

---

**TedGit Web Service** - 用 ❤️ 制作