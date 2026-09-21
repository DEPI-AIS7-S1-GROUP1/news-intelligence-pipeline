#!/usr/bin/env node

/**
 * Script to update the API base URL in .env file
 * Usage: node update-api-url.js <your-tunnel-url>
 * Example: node update-api-url.js https://abc-def-123.trycloudflare.com
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ENV_FILE = path.join(__dirname, '.env');

// Get URL from command line argument
const newUrl = process.argv[2];

if (!newUrl) {
  console.error('❌ Error: Please provide a URL');
  console.log('Usage: node update-api-url.js <your-tunnel-url>');
  console.log('Example: node update-api-url.js https://abc-def-123.trycloudflare.com');
  process.exit(1);
}

// Validate URL format
try {
  new URL(newUrl);
} catch (error) {
  console.error('❌ Error: Invalid URL format');
  console.log('Please provide a valid URL (including https://)');
  process.exit(1);
}

// Read or create .env file
let envContent = '';
if (fs.existsSync(ENV_FILE)) {
  envContent = fs.readFileSync(ENV_FILE, 'utf8');
} else {
  console.log('📝 .env file not found, creating new one...');
}

// Update or add VITE_API_BASE_URL
const urlPattern = /^VITE_API_BASE_URL=.*/m;

if (urlPattern.test(envContent)) {
  // Update existing
  envContent = envContent.replace(urlPattern, `VITE_API_BASE_URL=${newUrl}`);
  console.log('✅ Updated VITE_API_BASE_URL in .env');
} else {
  // Add new
  envContent += `\n# Backend API Configuration\nVITE_API_BASE_URL=${newUrl}\n`;
  console.log('✅ Added VITE_API_BASE_URL to .env');
}

// Write back to file
fs.writeFileSync(ENV_FILE, envContent, 'utf8');

console.log(`\n🔧 API Base URL set to: ${newUrl}`);
console.log('\n⚠️  Important: Restart your dev server for changes to take effect!');
console.log('   Press Ctrl+C in your dev terminal and run: npm run dev\n');
console.log('📝 Next steps:');
console.log(`   1. Add this URL to Backend CORS_ORIGINS: ${newUrl}`);
console.log('   2. Restart backend server');
console.log('   3. Restart frontend dev server');
console.log('   4. Hard refresh browser (Ctrl+Shift+R)\n');
