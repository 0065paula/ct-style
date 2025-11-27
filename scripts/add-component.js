#!/usr/bin/env node
/**
 * shadcn CLI 3.5.0 自定义 registry 包装脚本 (Node.js 版本)
 * 自动从内部 registry 下载并安装组件
 * 
 * 使用方法:
 *   node scripts/add-component.js button
 *   或: npm run add:component button
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REGISTRY_URL = 'http://gitlab.smartx.com/product-design/internal-tool-ui/-/raw/main';
const COMPONENT_NAME = process.argv[2];

if (!COMPONENT_NAME) {
  console.error('❌ 错误: 请提供组件名称');
  console.error('使用方法: node scripts/add-component.js <component-name>');
  console.error('示例: node scripts/add-component.js button');
  process.exit(1);
}

// 读取 components.json
const componentsJsonPath = path.join(process.cwd(), 'components.json');
if (!fs.existsSync(componentsJsonPath)) {
  console.error('❌ 错误: 未找到 components.json 文件');
  console.error('请先运行: npx shadcn@latest init');
  process.exit(1);
}

const componentsConfig = JSON.parse(fs.readFileSync(componentsJsonPath, 'utf-8'));

// 获取组件 JSON
async function fetchComponentJson(componentName) {
  const url = `${REGISTRY_URL}/components/${componentName}.json`;
  console.log(`📥 下载组件定义: ${url}`);
  
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        return;
      }
      
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`无法解析 JSON: ${e.message}`));
        }
      });
    }).on('error', reject);
  });
}

// 下载文件内容
async function fetchFileContent(filePath) {
  const url = `${REGISTRY_URL}/${filePath}`;
  console.log(`  📄 下载: ${filePath}`);
  
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        return;
      }
      
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// 创建文件
function createFile(filePath, content) {
  const fullPath = path.join(process.cwd(), filePath);
  const dir = path.dirname(fullPath);
  
  // 创建目录
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // 写入文件
  fs.writeFileSync(fullPath, content, 'utf-8');
  console.log(`  ✅ 创建: ${filePath}`);
}

// 安装依赖
function installDependencies(dependencies) {
  if (!dependencies || dependencies.length === 0) {
    return;
  }
  
  console.log(`📦 安装依赖: ${dependencies.join(', ')}`);
  try {
    execSync(`npm install ${dependencies.join(' ')}`, { stdio: 'inherit' });
  } catch (e) {
    console.warn(`⚠️  依赖安装失败，请手动安装: npm install ${dependencies.join(' ')}`);
  }
}

// 处理 registry 依赖
async function handleRegistryDependencies(registryDependencies, componentConfig) {
  if (!registryDependencies || registryDependencies.length === 0) {
    return;
  }
  
  console.log(`🔗 处理 registry 依赖: ${registryDependencies.join(', ')}`);
  for (const dep of registryDependencies) {
    await main(dep);
  }
}

// 主函数
async function main(componentName) {
  try {
    console.log(`\n📦 添加组件: ${componentName}`);
    console.log(`🔗 Registry: ${REGISTRY_URL}\n`);
    
    // 获取组件定义
    const componentDef = await fetchComponentJson(componentName);
    console.log(`✅ 组件定义获取成功\n`);
    
    // 处理依赖
    if (componentDef.dependencies) {
      installDependencies(componentDef.dependencies);
    }
    
    // 处理 registry 依赖（递归）
    if (componentDef.registryDependencies) {
      await handleRegistryDependencies(componentDef.registryDependencies, componentDef);
    }
    
    // 下载并创建文件
    if (componentDef.files && componentDef.files.length > 0) {
      console.log(`\n📝 创建组件文件:`);
      for (const file of componentDef.files) {
        try {
          const content = await fetchFileContent(file.path);
          
          // 替换路径别名
          let targetPath = file.target || file.path;
          if (componentsConfig.aliases) {
            Object.entries(componentsConfig.aliases).forEach(([alias, aliasPath]) => {
              targetPath = targetPath.replace(`@${alias}`, aliasPath);
            });
          }
          
          // 替换 @/ 别名
          if (componentsConfig.aliases?.components) {
            targetPath = targetPath.replace('@/components', componentsConfig.aliases.components);
          }
          if (componentsConfig.aliases?.utils) {
            targetPath = targetPath.replace('@/lib/utils', componentsConfig.aliases.utils);
          }
          
          createFile(targetPath, content);
        } catch (e) {
          console.error(`  ❌ 下载失败: ${file.path} - ${e.message}`);
        }
      }
    }
    
    console.log(`\n✅ 组件 ${componentName} 添加成功！\n`);
    
  } catch (error) {
    console.error(`\n❌ 错误: ${error.message}`);
    console.error(`\n请检查:`);
    console.error(`  1. 网络连接`);
    console.error(`  2. Registry URL: ${REGISTRY_URL}`);
    console.error(`  3. 组件名称是否正确`);
    console.error(`  4. 是否有访问权限\n`);
    process.exit(1);
  }
}

// 运行
main(COMPONENT_NAME);

