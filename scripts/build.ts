#!/usr/bin/env node

import { readFileSync, existsSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, "..")

interface RegistryItem {
  name: string
  type: string
  path: string
}

interface Registry {
  $schema: string
  name: string
  description: string
  author: string
  items: RegistryItem[]
}

interface ComponentFile {
  path: string
  type: string
  target: string
}

interface Component {
  $schema: string
  name: string
  type: string
  files: ComponentFile[]
  dependencies: string[]
  registryDependencies: string[]
}

function validateRegistry(): boolean {
  console.log("🔍 Validating registry.json...")
  
  try {
    const registryPath = join(rootDir, "registry.json")
    if (!existsSync(registryPath)) {
      console.error("❌ registry.json not found")
      return false
    }

    const registryContent = readFileSync(registryPath, "utf-8")
    const registry: Registry = JSON.parse(registryContent)

    // Validate schema
    if (!registry.$schema) {
      console.error("❌ Missing $schema in registry.json")
      return false
    }

    // Validate required fields
    if (!registry.name || !registry.items) {
      console.error("❌ Missing required fields in registry.json")
      return false
    }

    console.log(`✅ registry.json is valid (${registry.items.length} items)`)

    // Validate each component
    let allValid = true
    for (const item of registry.items) {
      const componentPath = join(rootDir, item.path)
      if (!existsSync(componentPath)) {
        console.error(`❌ Component file not found: ${item.path}`)
        allValid = false
        continue
      }

      try {
        const componentContent = readFileSync(componentPath, "utf-8")
        const component: Component = JSON.parse(componentContent)

        // Validate component structure
        if (!component.name || !component.files) {
          console.error(`❌ Invalid component structure: ${item.name}`)
          allValid = false
          continue
        }

        // Validate component files exist
        for (const file of component.files) {
          const templatePath = join(rootDir, file.path)
          if (!existsSync(templatePath)) {
            console.error(`❌ Template file not found: ${file.path} (for ${item.name})`)
            allValid = false
          }
        }

        console.log(`✅ Component validated: ${item.name}`)
      } catch (error) {
        console.error(`❌ Failed to parse component ${item.name}:`, error)
        allValid = false
      }
    }

    return allValid
  } catch (error) {
    console.error("❌ Failed to validate registry:", error)
    return false
  }
}

function build(): void {
  console.log("🚀 Building registry...\n")

  const isValid = validateRegistry()

  if (!isValid) {
    console.error("\n❌ Build failed: Validation errors found")
    process.exit(1)
  }

  console.log("\n✅ Build completed successfully!")
  console.log("\n📦 Registry is ready to use:")
  console.log("   npx shadcn@latest add <component> --registry <your-registry-url>")
}

// Main execution
const args = process.argv.slice(2)
const validateOnly = args.includes("--validate")

if (validateOnly) {
  const isValid = validateRegistry()
  process.exit(isValid ? 0 : 1)
} else {
  build()
}

