const { spawn } = require('child_process')
const path = require('path')
const fs = require('fs')

const rootEnvPath = path.resolve(__dirname, '.env')
const envVars = {}
if (fs.existsSync(rootEnvPath)) {
  const lines = fs.readFileSync(rootEnvPath, 'utf8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIndex = trimmed.indexOf('=')
    if (eqIndex === -1) continue
    const key = trimmed.slice(0, eqIndex).trim()
    let value = trimmed.slice(eqIndex + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    envVars[key] = value
  }
}

const systemPath = process.env.PATH || ''
const win32Paths = 'C:\\Windows\\System32;C:\\Windows;C:\\Windows\\System32\\Wbem'
const mergedEnv = {
  ...process.env,
  ...envVars,
  FORCE_COLOR: '1',
  PATH: process.platform === 'win32'
    ? `${win32Paths};${systemPath}`
    : systemPath,
}

const apps = [
  { name: 'backend',    cwd: 'apps/backend',    cmd: 'bun', args: ['run', 'dev'], color: '\x1b[36m' },
  { name: 'admin',      cwd: 'apps/admin',      cmd: 'bun', args: ['run', 'dev'], color: '\x1b[32m' },
  { name: 'company',    cwd: 'apps/company',     cmd: 'bun', args: ['run', 'dev'], color: '\x1b[33m' },
  { name: 'superadmin', cwd: 'apps/superadmin',  cmd: 'bun', args: ['run', 'dev'], color: '\x1b[35m' },
  { name: 'conseiller', cwd: 'apps/conseiller',  cmd: 'bun', args: ['run', 'dev'], color: '\x1b[34m' },
  { name: 'landing',    cwd: 'apps/landing',    cmd: 'bun', args: ['run', 'dev'], color: '\x1b[37m' },
]

const reset = '\x1b[0m'
const children = []
let shuttingDown = false

function killAll() {
  if (shuttingDown) return
  shuttingDown = true
  console.log(`\n${reset}\x1b[1m\x1b[31m[dev] Shutting down all apps...${reset}`)

  for (const child of children) {
    try {
      if (process.platform === 'win32') {
        spawn('taskkill', ['/pid', String(child.pid), '/f', '/t'], { stdio: 'ignore' })
      } else {
        process.kill(-child.pid, 'SIGTERM')
      }
    } catch (_) {}
  }

  setTimeout(() => {
    console.log(`\x1b[1m\x1b[32m[dev] All apps stopped.${reset}`)
    process.exit(0)
  }, 1500)
}

process.on('SIGINT', killAll)
process.on('SIGTERM', killAll)
process.on('SIGHUP', killAll)

console.log(`\x1b[1m[dev] Starting ${apps.length} apps...\n${reset}`)

for (const app of apps) {
  const cwd = path.resolve(__dirname, app.cwd)
  const prefix = `${app.color}[${app.name.padEnd(11)}]${reset}`

  const isWin = process.platform === 'win32'
  const actualCmd = isWin ? 'C:\\Users\\JayJay\\.bun\\bin\\bun.exe' : app.cmd

  console.log(`${prefix} spawning in: ${cwd}`)

  if (!fs.existsSync(cwd)) {
    console.log(`${prefix} ERROR: folder does not exist: ${cwd}`)
    continue
  }

  const child = spawn(actualCmd, app.args, {
    cwd,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: false,
    env: mergedEnv,
  })

  children.push(child)

  child.on('error', (err) => {
    console.log(`${prefix} SPAWN ERROR: ${err.message}`)
  })

  child.stdout.on('data', (data) => {
    const lines = data.toString().split('\n').filter(Boolean)
    for (const line of lines) {
      console.log(`${prefix} ${line}`)
    }
  })

  child.stderr.on('data', (data) => {
    const lines = data.toString().split('\n').filter(Boolean)
    for (const line of lines) {
      console.log(`${prefix} ${line}`)
    }
  })

  child.on('exit', (code) => {
    if (!shuttingDown) {
      console.log(`${prefix} exited with code ${code}`)
    }
  })
}
