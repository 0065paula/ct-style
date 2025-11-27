#!/usr/bin/env tsx
/**
 * 迁移 registry.json 到官方格式
 * 
 * 将传统的两层结构（registry.json + components/*.json）
 * 迁移到官方格式（所有内容在 registry.json 中）
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const rootDir = process.cwd();
const registryPath = join(rootDir, 'registry.json');
const componentsDir = join(rootDir, 'components');

interface ComponentFile {
  path: string;
  type: string;
  target?: string;
}

interface ComponentDef {
  $schema?: string;
  name: string;
  type: string;
  title?: string;
  description?: string;
  files: ComponentFile[];
  dependencies?: string[];
  registryDependencies?: string[];
}

interface RegistryItem {
  name: string;
  type: string;
  path: string;
}

interface Registry {
  $schema: string;
  name: string;
  homepage: string;
  description?: string;
  author?: string;
  items: RegistryItem[];
}

// 组件名称到标题的映射
const componentTitles: Record<string, string> = {
  'button': 'Button',
  'input': 'Input',
  'card': 'Card',
  'label': 'Label',
  'checkbox': 'Checkbox',
  'radio-group': 'Radio Group',
  'switch': 'Switch',
  'tabs': 'Tabs',
  'button-group': 'Button Group',
  'select': 'Select',
  'dropdown-menu': 'Dropdown Menu',
  'popover': 'Popover',
  'command': 'Command',
  'combobox': 'Combobox',
  'context-menu': 'Context Menu',
  'skeleton': 'Skeleton',
  'spinner': 'Spinner',
  'sonner': 'Sonner',
  'field': 'Field',
  'breadcrumb': 'Breadcrumb',
  'separator': 'Separator',
  'scroll-area': 'Scroll Area',
  'progress': 'Progress',
  'tooltip': 'Tooltip',
  'textarea': 'Textarea',
  'resizable': 'Resizable',
  'table': 'Table',
  'data-table': 'Data Table',
  'slider': 'Slider',
  'pagination': 'Pagination',
  'item': 'Item',
  'dialog': 'Dialog',
  'sheet': 'Sheet',
  'sidebar': 'Sidebar',
  'accordion': 'Accordion',
  'alert-dialog': 'Alert Dialog',
  'badge': 'Badge',
  'calendar': 'Calendar',
  'date-picker': 'Date Picker',
  'utils': 'Utils',
};

// 组件描述
const componentDescriptions: Record<string, string> = {
  'button': 'A customizable button component with multiple variants.',
  'input': 'A form input component.',
  'card': 'A card component for displaying content.',
  'label': 'A label component for form inputs.',
  'checkbox': 'A checkbox component.',
  'radio-group': 'A radio group component.',
  'switch': 'A switch/toggle component.',
  'tabs': 'A tabs component for organizing content.',
  'button-group': 'A button group component.',
  'select': 'A select dropdown component.',
  'dropdown-menu': 'A dropdown menu component.',
  'popover': 'A popover component.',
  'command': 'A command palette component.',
  'combobox': 'A combobox component.',
  'context-menu': 'A context menu component.',
  'skeleton': 'A skeleton loading component.',
  'spinner': 'A spinner loading component.',
  'sonner': 'A toast notification component.',
  'field': 'A form field component.',
  'breadcrumb': 'A breadcrumb navigation component.',
  'separator': 'A separator component.',
  'scroll-area': 'A scrollable area component.',
  'progress': 'A progress bar component.',
  'tooltip': 'A tooltip component.',
  'textarea': 'A textarea component.',
  'resizable': 'A resizable panel component.',
  'table': 'A table component.',
  'data-table': 'A data table component with sorting and filtering.',
  'slider': 'A slider component.',
  'pagination': 'A pagination component.',
  'item': 'An item component.',
  'dialog': 'A dialog/modal component.',
  'sheet': 'A sheet/sidebar component.',
  'sidebar': 'A sidebar navigation component.',
  'accordion': 'An accordion component.',
  'alert-dialog': 'An alert dialog component.',
  'badge': 'A badge component.',
  'calendar': 'A calendar component.',
  'date-picker': 'A date picker component.',
  'utils': 'Utility functions for className merging.',
};

function migrateRegistry(): void {
  console.log('🔄 开始迁移 registry.json 到官方格式...\n');

  // 读取当前的 registry.json
  if (!existsSync(registryPath)) {
    console.error('❌ registry.json 不存在');
    process.exit(1);
  }

  const registryContent = readFileSync(registryPath, 'utf-8');
  const registry: Registry = JSON.parse(registryContent);

  console.log(`📦 找到 ${registry.items.length} 个组件\n`);

  // 迁移每个组件
  const migratedItems: any[] = [];

  for (const item of registry.items) {
    const componentJsonPath = join(componentsDir, `${item.name}.json`);
    
    if (!existsSync(componentJsonPath)) {
      console.warn(`⚠️  组件文件不存在: ${componentJsonPath}`);
      continue;
    }

    try {
      const componentContent = readFileSync(componentJsonPath, 'utf-8');
      const componentDef: ComponentDef = JSON.parse(componentContent);

      // 构建迁移后的 item
      const migratedItem: any = {
        name: componentDef.name,
        type: convertType(componentDef.type),
        title: componentTitles[componentDef.name] || capitalize(componentDef.name),
        description: componentDescriptions[componentDef.name] || `${componentTitles[componentDef.name] || capitalize(componentDef.name)} component.`,
      };

      // 添加 files（更新 type 字段）
      if (componentDef.files && componentDef.files.length > 0) {
        migratedItem.files = componentDef.files.map(file => ({
          path: file.path,
          type: convertFileType(file.type),
          ...(file.target && { target: file.target }),
        }));
      }

      // 添加 dependencies
      if (componentDef.dependencies && componentDef.dependencies.length > 0) {
        migratedItem.dependencies = componentDef.dependencies;
      }

      // 添加 registryDependencies
      if (componentDef.registryDependencies && componentDef.registryDependencies.length > 0) {
        migratedItem.registryDependencies = componentDef.registryDependencies;
      }

      migratedItems.push(migratedItem);
      console.log(`✅ 已迁移: ${componentDef.name}`);
    } catch (error) {
      console.error(`❌ 迁移失败 ${item.name}:`, error);
    }
  }

  // 构建新的 registry.json
  const newRegistry = {
    $schema: registry.$schema,
    name: registry.name,
    homepage: registry.homepage,
    items: migratedItems,
  };

  // 备份原文件
  const backupPath = join(rootDir, 'registry.json.backup');
  writeFileSync(backupPath, registryContent, 'utf-8');
  console.log(`\n💾 已备份原文件到: registry.json.backup`);

  // 写入新文件
  writeFileSync(registryPath, JSON.stringify(newRegistry, null, 2) + '\n', 'utf-8');
  console.log(`✅ 已生成新的 registry.json\n`);

  console.log(`📊 迁移统计:`);
  console.log(`   - 总组件数: ${migratedItems.length}`);
  console.log(`   - 成功: ${migratedItems.length}`);
  console.log(`\n✨ 迁移完成！`);
}

function convertType(type: string): string {
  if (type === 'component') {
    return 'registry:component';
  }
  if (type === 'lib') {
    return 'registry:lib';
  }
  // 如果已经是 registry: 开头，保持不变
  if (type.startsWith('registry:')) {
    return type;
  }
  return `registry:${type}`;
}

function convertFileType(type: string): string {
  if (type === 'component') {
    return 'registry:component';
  }
  if (type === 'lib') {
    return 'registry:lib';
  }
  // 如果已经是 registry: 开头，保持不变
  if (type.startsWith('registry:')) {
    return type;
  }
  return `registry:${type}`;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 运行迁移
migrateRegistry();

