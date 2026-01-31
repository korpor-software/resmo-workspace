# Resmo Workspace Setup - Clones all app repositories
# Usage: .\setup.ps1 [OPTIONS]
# Options:
#   -GitOrg ORG    Set GitHub organization (default: your-org)
#   -UseHTTPS      Use HTTPS instead of SSH

param(
    [string]$GitOrg = "ahmedjaziri31",
    [switch]$UseHTTPS
)

$ErrorActionPreference = "Stop"

# === REPOSITORIES ===
$repos = @(
    @{ repo = "resmo-admin"; folder = "admin" },
    @{ repo = "resmo-backend"; folder = "backend" },
    @{ repo = "resmo-company"; folder = "company" },
    @{ repo = "resmo-superadmin"; folder = "superadmin" },
    @{ repo = "resmo-conseiller"; folder = "conseiller" }
)

# === HELPERS ===
function Log-Ok { param($msg) Write-Host "[OK] " -ForegroundColor Green -NoNewline; Write-Host $msg }
function Log-Skip { param($msg) Write-Host "[SKIP] " -ForegroundColor Yellow -NoNewline; Write-Host $msg }
function Log-Fail { param($msg) Write-Host "[FAIL] " -ForegroundColor Red -NoNewline; Write-Host $msg }
function Log-Step { param($msg) Write-Host "`n$msg" -ForegroundColor Cyan }

$appsDir = Join-Path $PSScriptRoot "apps"

Write-Host "`nResmo Workspace Setup`n" -ForegroundColor Cyan

# === PREREQUISITES ===
Log-Step "Checking prerequisites..."

if (Get-Command git -ErrorAction SilentlyContinue) { Log-Ok "Git installed" }
else { Log-Fail "Git not found - install from git-scm.com"; exit 1 }

if (Get-Command bun -ErrorAction SilentlyContinue) { Log-Ok "Bun installed" }
else { Log-Skip "Bun not found - install from bun.sh" }

# === CLONE REPOS ===
Log-Step "Cloning repositories..."

if (-not (Test-Path $appsDir)) { New-Item -ItemType Directory -Path $appsDir | Out-Null }

$cloned = 0; $skipped = 0; $failed = 0

foreach ($r in $repos) {
    $path = Join-Path $appsDir $r.folder
    
    if (Test-Path $path) {
        Log-Skip "$($r.folder) (exists)"
        $skipped++
        continue
    }
    
    $url = if ($UseHTTPS) { "https://github.com/$GitOrg/$($r.repo).git" } else { "git@github.com:${GitOrg}/$($r.repo).git" }
    
    $result = git clone --quiet $url $path 2>&1
    if ($LASTEXITCODE -eq 0) {
        Log-Ok $r.folder
        $cloned++
    } else {
        Log-Fail "$($r.folder) (no access or repo not found)"
        $failed++
    }
}

# === ENVIRONMENT ===
Log-Step "Setting up environment..."

$envFile = Join-Path $PSScriptRoot ".env"
$envExample = Join-Path $PSScriptRoot ".env.example"

if (-not (Test-Path $envFile) -and (Test-Path $envExample)) {
    Copy-Item $envExample $envFile
    Log-Ok "Created .env from template"
    Write-Host "    Edit .env with your secrets" -ForegroundColor Yellow
} elseif (Test-Path $envFile) {
    Log-Ok ".env exists"
} else {
    Log-Skip "No .env.example found"
}

# === INSTALL ===
if (Get-Command bun -ErrorAction SilentlyContinue) {
    Log-Step "Installing dependencies..."
    Push-Location $PSScriptRoot
    try {
        bun install --silent 2>$null
        Log-Ok "Dependencies installed"
    } catch {
        Log-Fail "Install failed"
    }
    Pop-Location
}

# === SUMMARY ===
Write-Host "`nSummary: " -ForegroundColor Cyan -NoNewline
Write-Host "$cloned cloned, $skipped skipped, $failed failed"

if ($failed -gt 0) {
    Write-Host "Some repos failed - check access permissions" -ForegroundColor Yellow
}

Write-Host "`nDone! " -ForegroundColor Green -NoNewline
Write-Host "Run: " -NoNewline
Write-Host "bun run dev" -ForegroundColor Cyan
Write-Host ""
