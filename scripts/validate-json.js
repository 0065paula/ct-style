#!/usr/bin/env node

// Simple JSON validation script that doesn't require TypeScript
import { readFileSync, existsSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, "..")

function validateJSON(filePath, description) {
  try {
    if (!existsSync(filePath)) {
      console.error(`❌ ${description} not found: ${filePath}`)
      return false
    }
    const content = readFileSync(filePath, "utf-8")
    JSON.parse(content)
    console.log(`✅ ${description} is valid`)
    return true
  } catch (error) {
    console.error(`❌ ${description} is invalid:`, error.message)
    return false
  }
}

console.log("🔍 Validating JSON files...\n")

const results = [
  validateJSON(join(rootDir, "registry.json"), "registry.json"),
  validateJSON(join(rootDir, "components/button.json"), "button.json"),
  validateJSON(join(rootDir, "components/input.json"), "input.json"),
  validateJSON(join(rootDir, "components/card.json"), "card.json"),
  validateJSON(join(rootDir, "components/label.json"), "label.json"),
  validateJSON(join(rootDir, "components/utils.json"), "utils.json"),
]

const allValid = results.every(r => r)

if (allValid) {
  console.log("\n✅ All JSON files are valid!")
  process.exit(0)
} else {
  console.log("\n❌ Some JSON files are invalid")
  process.exit(1)
}

