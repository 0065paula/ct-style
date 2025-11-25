#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

// HSL to HEX conversion mapping
const hslToHex = {
  'hsl(var(--background))': 'var(--background)',
  'hsl(var(--foreground))': 'var(--foreground)',
  'hsl(var(--border))': 'var(--border)',
  'hsl(var(--muted))': 'var(--muted)',
  'hsl(var(--muted-foreground))': 'var(--muted-foreground)',
  'hsl(var(--brand))': 'var(--brand)',
  'hsl(var(--brand-foreground))': 'var(--brand-foreground)',
  'hsl(var(--destructive))': 'var(--destructive)',
  'hsl(var(--destructive-foreground))': 'var(--destructive-foreground)',
  'hsl(var(--secondary))': 'var(--secondary)',
  'hsl(var(--secondary-foreground))': 'var(--secondary-foreground)',
  'hsl(var(--accent))': 'var(--accent)',
  'hsl(var(--accent-foreground))': 'var(--accent-foreground)',
  'hsl(var(--ring))': 'var(--ring)',
  'hsl(var(--input))': 'var(--input)',
  'hsl(var(--card))': 'var(--card)',
  'hsl(var(--card-foreground))': 'var(--card-foreground)',
  'hsl(222.2 84% 4.9%)': '#0A0E27',
  'hsl(210 40% 98%)': '#F8FAFC',
  'hsl(222.2 84% 8%)': '#0F1529',
  'hsl(222.2 84% 12%)': '#141A2F',
};

// Patterns with opacity
const patterns = [
  { from: /hsl\(var\(--brand\)\s*\/\s*0\.9\)/g, to: 'rgba(0, 128, 255, 0.9)' },
  { from: /hsl\(var\(--destructive\)\s*\/\s*0\.9\)/g, to: 'rgba(240, 72, 62, 0.9)' },
  { from: /hsl\(var\(--secondary\)\s*\/\s*0\.8\)/g, to: 'rgba(241, 245, 249, 0.8)' },
  { from: /hsl\(var\(--muted\)\s*\/\s*0\.5\)/g, to: 'rgba(241, 245, 249, 0.5)' },
  { from: /hsl\(var\(--foreground\)\s*\/\s*0\.7\)/g, to: 'rgba(10, 14, 39, 0.7)' },
  { from: /hsl\(var\(--foreground\)\s*\/\s*0\.05\)/g, to: 'rgba(10, 14, 39, 0.05)' },
  { from: /hsl\(var\(--ring\)\s*\/\s*0\.2\)/g, to: 'rgba(10, 14, 39, 0.2)' },
];

async function convertFiles() {
  const files = await glob(['docs/**/*.html', 'preview.html']);
  
  for (const file of files) {
    let content = readFileSync(file, 'utf-8');
    let changed = false;
    
    // Replace direct HSL references
    for (const [from, to] of Object.entries(hslToHex)) {
      if (content.includes(from)) {
        content = content.replaceAll(from, to);
        changed = true;
      }
    }
    
    // Replace patterns with regex
    for (const { from, to } of patterns) {
      if (from.test(content)) {
        content = content.replace(from, to);
        changed = true;
      }
    }
    
    if (changed) {
      writeFileSync(file, content, 'utf-8');
      console.log(`✅ Updated: ${file}`);
    }
  }
}

convertFiles().catch(console.error);

