#!/usr/bin/env node
/**
 * Resmo Workspace Setup
 * Cross-platform script that clones all app repositories
 * 
 * Usage: node setup.js [OPTIONS]
 *   --https       Use HTTPS instead of SSH
 *   --org <name>  GitHub organization (default: your-org)
 */

const { execSync, spawnSync } = require('child_process');
const { existsSync, mkdirSync, copyFileSync } = require('fs');
const { join } = require('path');

// === CONFIGURATION ===
const config = {
  org: process.env.GIT_ORG || 'ahmedjaziri31',
  https: false,
  repos: [
    { repo: 'resmo-admin', folder: 'admin' },
    { repo: 'resmo-backend', folder: 'backend' },
    { repo: 'resmo-company', folder: 'company' },
    { repo: 'resmo-superadmin', folder: 'superadmin' },
    { repo: 'resmo-conseiller', folder: 'conseiller' },
  ]
};

// Parse CLI args
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--https') config.https = true;
  if (args[i] === '--org' && args[i + 1]) config.org = args[++i];
}

// === COLORS ===
const c = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

const log = {
  ok: (msg) => console.log(`${c.green}[OK]${c.reset} ${msg}`),
  skip: (msg) => console.log(`${c.yellow}[SKIP]${c.reset} ${msg}`),
  fail: (msg) => console.log(`${c.red}[FAIL]${c.reset} ${msg}`),
  step: (msg) => console.log(`\n${c.cyan}${msg}${c.reset}`),
};

const rootDir = __dirname;
const appsDir = join(rootDir, 'apps');

// === DETECT OS ===
const os = process.platform === 'win32' ? 'Windows' : process.platform === 'darwin' ? 'macOS' : 'Linux';

console.log(`\n${c.cyan}Resmo Workspace Setup${c.reset}`);
console.log(`OS: ${os}\n`);

// === CHECK PREREQUISITES ===
log.step('Checking prerequisites...');

function hasCommand(cmd) {
  try {
    execSync(process.platform === 'win32' ? `where ${cmd}` : `which ${cmd}`, { stdio: 'ignore' });
    return true;
  } catch { return false; }
}

if (hasCommand('git')) log.ok('Git installed');
else { log.fail('Git not found - install from git-scm.com'); process.exit(1); }

if (hasCommand('bun')) log.ok('Bun installed');
else log.skip('Bun not found - install from bun.sh');

// === CLONE REPOS ===
log.step('Cloning repositories...');

if (!existsSync(appsDir)) mkdirSync(appsDir, { recursive: true });

let cloned = 0, skipped = 0, failed = 0;

for (const { repo, folder } of config.repos) {
  const path = join(appsDir, folder);
  
  if (existsSync(path)) {
    log.skip(`${folder} (exists)`);
    skipped++;
    continue;
  }
  
  const url = config.https 
    ? `https://github.com/${config.org}/${repo}.git`
    : `git@github.com:${config.org}/${repo}.git`;
  
  const result = spawnSync('git', ['clone', '--quiet', url, path], { stdio: 'pipe' });
  
  if (result.status === 0) {
    log.ok(folder);
    cloned++;
  } else {
    log.fail(`${folder} (no access or not found)`);
    failed++;
  }
}

// === ENVIRONMENT ===
log.step('Setting up environment...');

const envFile = join(rootDir, '.env');
const envExample = join(rootDir, '.env.example');

if (!existsSync(envFile) && existsSync(envExample)) {
  copyFileSync(envExample, envFile);
  log.ok('Created .env from template');
  console.log(`    ${c.yellow}Edit .env with your secrets${c.reset}`);
} else if (existsSync(envFile)) {
  log.ok('.env exists');
} else {
  log.skip('No .env.example found');
}

// === INSTALL DEPS ===
if (hasCommand('bun')) {
  log.step('Installing dependencies...');
  const result = spawnSync('bun', ['install', '--silent'], { cwd: rootDir, stdio: 'pipe' });
  if (result.status === 0) log.ok('Dependencies installed');
  else log.fail('Install failed');
}

// === SUMMARY ===
console.log(`\n${c.cyan}Summary:${c.reset} ${cloned} cloned, ${skipped} skipped, ${failed} failed`);

if (failed > 0) {
  console.log(`${c.yellow}Some repos failed - check access permissions${c.reset}`);
}

console.log(`\n${c.green}Done!${c.reset} Run: ${c.cyan}bun run dev${c.reset}\n`);
