#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Setting up Portfolio Showcase Environment...\n');

// Check if .env exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file from .env.example...');
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env file created successfully!');
  } else {
    console.log('❌ .env.example not found. Please create it manually.');
  }
} else {
  console.log('✅ .env file already exists.');
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('\n📦 Installing dependencies...');
  console.log('Please run: npm install');
} else {
  console.log('✅ Dependencies are installed.');
}

// Check directory structure
const requiredDirs = ['client', 'server', 'shared'];
const missingDirs = [];

for (const dir of requiredDirs) {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    missingDirs.push(dir);
  }
}

if (missingDirs.length > 0) {
  console.log(`\n❌ Missing directories: ${missingDirs.join(', ')}`);
  console.log('Please create these directories manually.');
} else {
  console.log('✅ All required directories exist.');
}

console.log('\n🎉 Environment setup complete!');
console.log('\nNext steps:');
console.log('1. Edit .env file with your database configuration');
console.log('2. Run: npm run db:push (after setting up database)');
console.log('3. Run: npm run dev (to start development server)');
console.log('\n📖 See README.md for detailed instructions.'); 