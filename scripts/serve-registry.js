#!/usr/bin/env node

/**
 * 简单的 HTTP 服务器，用于本地测试 registry
 * 使用方式: node scripts/serve-registry.js [port]
 */

import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const port = process.argv[2] || 3002

const mimeTypes = {
  '.json': 'application/json',
  '.tsx': 'text/typescript',
  '.ts': 'text/typescript',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.html': 'text/html',
  '.md': 'text/markdown',
}

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  return mimeTypes[ext] || 'text/plain'
}

function serveFile(filePath, res) {
  const fullPath = path.join(rootDir, filePath)
  
  // 安全检查：确保文件在根目录内
  if (!fullPath.startsWith(rootDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' })
    res.end('Forbidden')
    return
  }

  fs.readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('File not found')
      return
    }

    const mimeType = getMimeType(fullPath)
    res.writeHead(200, {
      'Content-Type': mimeType,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
    res.end(data)
  })
}

const server = http.createServer((req, res) => {
  // 处理 CORS 预检请求
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
    res.end()
    return
  }

  if (req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'text/plain' })
    res.end('Method not allowed')
    return
  }

  // 移除查询参数和 hash
  const urlPath = new URL(req.url, `http://${req.headers.host}`).pathname

  // 默认返回 registry.json
  if (urlPath === '/' || urlPath === '/registry.json') {
    serveFile('registry.json', res)
    return
  }

  // 移除开头的斜杠
  const filePath = urlPath.startsWith('/') ? urlPath.slice(1) : urlPath

  // 检查文件是否存在
  const fullPath = path.join(rootDir, filePath)
  fs.stat(fullPath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('File not found')
      return
    }

    serveFile(filePath, res)
  })
})

server.listen(port, () => {
  console.log(`✅ Registry server running at http://localhost:${port}`)
  console.log(`📦 Registry URL: http://localhost:${port}`)
  console.log(`\n💡 在项目中使用:`)
  console.log(`   npx shadcn@latest add button --registry http://localhost:${port}`)
  console.log(`\n按 Ctrl+C 停止服务器`)
})

