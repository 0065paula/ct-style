#!/usr/bin/env tsx
/**
 * 迁移到官方 registry 目录结构
 * 
 * 1. 创建 registry/default/[NAME]/ 目录结构
 * 2. 移动组件文件
 * 3. 更新导入路径
 * 4. 更新 registry.json 中的路径
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';

const rootDir = process.cwd();
const templatesDir = join(rootDir, 'templates');
const registryDir = join(rootDir, 'registry');
const defaultStyleDir = join(registryDir, 'default');
const publicDir = join(rootDir, 'public');
const publicRDir = join(publicDir, 'r');

interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  files: Array<{
    path: string;
    type: string;
    target?: string;
  }>;
  dependencies?: string[];
  registryDependencies?: string[];
}

interface Registry {
  $schema: string;
  name: string;
  homepage: string;
  items: RegistryItem[];
}

// 需要更新的导入路径映射
const importPathMappings: Record<string, string> = {
  '@/lib/utils': '@/registry/default/utils/utils',
  '@/components/ui/': '@/registry/default/',
};

function createDirectoryStructure(): void {
  console.log('📁 创建目录结构...\n');

  // 创建 registry/default 目录
  if (!existsSync(defaultStyleDir)) {
    mkdirSync(defaultStyleDir, { recursive: true });
    console.log(`✅ 创建目录: ${defaultStyleDir}`);
  }

  // 创建 public/r 目录
  if (!existsSync(publicRDir)) {
    mkdirSync(publicRDir, { recursive: true });
    console.log(`✅ 创建目录: ${publicRDir}`);
  }
}

function moveComponentFiles(): void {
  console.log('\n📦 移动组件文件...\n');

  const componentDir = join(templatesDir, 'component');
  const utilsDir = join(templatesDir, 'utils');

  // 移动组件文件
  if (existsSync(componentDir)) {
    const files = readdirSync(componentDir);
    for (const file of files) {
      if (file.endsWith('.tsx')) {
        const componentName = file.replace('.tsx', '');
        const targetDir = join(defaultStyleDir, componentName);
        
        if (!existsSync(targetDir)) {
          mkdirSync(targetDir, { recursive: true });
        }

        const sourcePath = join(componentDir, file);
        const targetPath = join(targetDir, file);

        copyFileSync(sourcePath, targetPath);
        console.log(`✅ 移动: ${file} → registry/default/${componentName}/${file}`);
      }
    }
  }

  // 移动工具文件
  if (existsSync(utilsDir)) {
    const files = readdirSync(utilsDir);
    for (const file of files) {
      if (file.endsWith('.ts')) {
        const componentName = file.replace('.ts', '');
        const targetDir = join(defaultStyleDir, componentName);
        
        if (!existsSync(targetDir)) {
          mkdirSync(targetDir, { recursive: true });
        }

        const sourcePath = join(utilsDir, file);
        const targetPath = join(targetDir, file);

        copyFileSync(sourcePath, targetPath);
        console.log(`✅ 移动: ${file} → registry/default/${componentName}/${file}`);
      }
    }
  }
}

function updateImportPaths(filePath: string): string {
  let content = readFileSync(filePath, 'utf-8');
  let updated = false;

  // 更新 @/lib/utils 导入
  if (content.includes('@/lib/utils')) {
    content = content.replace(/from\s+["']@\/lib\/utils["']/g, "from '@/registry/default/utils/utils'");
    updated = true;
  }

  // 更新 @/components/ui/ 导入
  const componentImportRegex = /from\s+["']@\/components\/ui\/([^"']+)["']/g;
  const matches = Array.from(content.matchAll(componentImportRegex));
  
  for (const match of matches) {
    const componentName = match[1];
    const newPath = `@/registry/default/${componentName}/${componentName}`;
    content = content.replace(match[0], `from '${newPath}'`);
    updated = true;
  }

  if (updated) {
    writeFileSync(filePath, content, 'utf-8');
    return content;
  }

  return content;
}

function updateAllComponentImports(): void {
  console.log('\n🔄 更新导入路径...\n');

  // 更新 registry/default 下的所有文件
  if (existsSync(defaultStyleDir)) {
    const items = readdirSync(defaultStyleDir);
    for (const item of items) {
      const itemPath = join(defaultStyleDir, item);
      if (statSync(itemPath).isDirectory()) {
        const files = readdirSync(itemPath);
        for (const file of files) {
          if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            const filePath = join(itemPath, file);
            updateImportPaths(filePath);
            console.log(`✅ 更新导入: ${item}/${file}`);
          }
        }
      }
    }
  }
}

function updateRegistryJson(): void {
  console.log('\n📝 更新 registry.json...\n');

  const registryPath = join(rootDir, 'registry.json');
  if (!existsSync(registryPath)) {
    console.error('❌ registry.json 不存在');
    return;
  }

  const registryContent = readFileSync(registryPath, 'utf-8');
  const registry: Registry = JSON.parse(registryContent);

  // 更新每个 item 的文件路径
  for (const item of registry.items) {
    for (const file of item.files) {
      // 更新路径从 templates/component/ 到 registry/default/
      if (file.path.startsWith('templates/component/')) {
        const fileName = file.path.replace('templates/component/', '');
        const componentName = fileName.replace('.tsx', '');
        file.path = `registry/default/${componentName}/${fileName}`;
        console.log(`✅ 更新路径: ${item.name} → ${file.path}`);
      } else if (file.path.startsWith('templates/utils/')) {
        const fileName = file.path.replace('templates/utils/', '');
        const componentName = fileName.replace('.ts', '');
        file.path = `registry/default/${componentName}/${fileName}`;
        console.log(`✅ 更新路径: ${item.name} → ${file.path}`);
      }
    }
  }

  // 备份原文件
  const backupPath = join(rootDir, 'registry.json.backup2');
  writeFileSync(backupPath, registryContent, 'utf-8');
  console.log(`\n💾 已备份到: registry.json.backup2`);

  // 写入更新后的文件
  writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf-8');
  console.log(`✅ 已更新 registry.json\n`);
}

function main(): void {
  console.log('🚀 开始迁移到官方目录结构...\n');

  try {
    // 1. 创建目录结构
    createDirectoryStructure();

    // 2. 移动文件
    moveComponentFiles();

    // 3. 更新导入路径
    updateAllComponentImports();

    // 4. 更新 registry.json
    updateRegistryJson();

    console.log('✨ 迁移完成！\n');
    console.log('📋 下一步：');
    console.log('  1. 检查 registry/default/ 目录下的文件');
    console.log('  2. 验证导入路径是否正确');
    console.log('  3. 运行 shadcn build 测试构建');
    console.log('  4. 检查 public/r/ 目录下的输出文件');

  } catch (error) {
    console.error('❌ 迁移失败:', error);
    process.exit(1);
  }
}

main();

