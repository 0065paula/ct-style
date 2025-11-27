#!/bin/bash
# shadcn CLI 3.5.0 自定义 registry 包装脚本
# 使用方法: ./scripts/add-component.sh button
# 或: npm run add:component button

REGISTRY_URL="http://gitlab.smartx.com/product-design/internal-tool-ui/-/raw/main"
COMPONENT_NAME=${1:-""}

if [ -z "$COMPONENT_NAME" ]; then
  echo "❌ 错误: 请提供组件名称"
  echo "使用方法: $0 <component-name>"
  echo "示例: $0 button"
  exit 1
fi

echo "📦 从内部 registry 添加组件: $COMPONENT_NAME"
echo "🔗 Registry: $REGISTRY_URL"
echo ""

# 检查是否支持 --registry 参数
if npx shadcn@latest add --help 2>/dev/null | grep -q "registry"; then
  echo "✅ 使用 --registry 参数"
  npx shadcn@latest add "$COMPONENT_NAME" --registry "$REGISTRY_URL"
else
  echo "⚠️  CLI 不支持 --registry 参数，使用手动下载方式"
  
  # 创建临时目录
  TEMP_DIR=$(mktemp -d)
  cd "$TEMP_DIR" || exit 1
  
  # 下载组件 JSON
  echo "📥 下载组件定义..."
  COMPONENT_JSON_URL="${REGISTRY_URL}/components/${COMPONENT_NAME}.json"
  
  if command -v curl &> /dev/null; then
    curl -s "$COMPONENT_JSON_URL" > "${COMPONENT_NAME}.json" 2>/dev/null
  elif command -v wget &> /dev/null; then
    wget -qO "${COMPONENT_NAME}.json" "$COMPONENT_JSON_URL" 2>/dev/null
  else
    echo "❌ 需要 curl 或 wget 来下载文件"
    rm -rf "$TEMP_DIR"
    exit 1
  fi
  
  if [ ! -s "${COMPONENT_NAME}.json" ] || grep -q "<html" "${COMPONENT_NAME}.json" 2>/dev/null; then
    echo "❌ 无法下载组件定义，请检查："
    echo "   1. 网络连接"
    echo "   2. Registry URL: $COMPONENT_JSON_URL"
    echo "   3. 组件名称是否正确"
    rm -rf "$TEMP_DIR"
    exit 1
  fi
  
  echo "✅ 组件定义下载成功"
  echo ""
  echo "⚠️  请手动处理以下步骤："
  echo "   1. 查看组件定义: cat ${TEMP_DIR}/${COMPONENT_NAME}.json"
  echo "   2. 从 JSON 中提取 files 数组"
  echo "   3. 为每个文件创建对应的路径和内容"
  echo ""
  echo "💡 或使用 Node.js 脚本自动处理（见 scripts/add-component.js）"
  
  # 保留临时文件供用户查看
  echo ""
  echo "📁 临时文件位置: $TEMP_DIR"
  echo "   组件定义: $TEMP_DIR/${COMPONENT_NAME}.json"
fi

