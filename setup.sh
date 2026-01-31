#!/usr/bin/env bash
# Resmo Workspace Setup - Clones all app repositories
# Usage: ./setup.sh [OPTIONS]
# Options:
#   --https    Use HTTPS instead of SSH
#   --org ORG  Set GitHub organization (default: your-org)

set -e

# === CONFIGURATION ===
GIT_ORG="${GIT_ORG:-korpor-software}"
USE_HTTPS=false

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --https) USE_HTTPS=true; shift ;;
        --org) GIT_ORG="$2"; shift 2 ;;
        *) shift ;;
    esac
done

# === REPOSITORIES ===
REPOS="resmo-admin:admin resmo-backend:backend resmo-company:company resmo-superadmin:superadmin resmo-conseiller:conseiller"

# === COLORS ===
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; NC='\033[0m'

log_ok() { echo -e "${GREEN}[OK]${NC} $1"; }
log_skip() { echo -e "${YELLOW}[SKIP]${NC} $1"; }
log_fail() { echo -e "${RED}[FAIL]${NC} $1"; }
log_step() { echo -e "\n${CYAN}$1${NC}"; }

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APPS_DIR="$SCRIPT_DIR/apps"

echo -e "\n${CYAN}Resmo Workspace Setup${NC}\n"

# === PREREQUISITES ===
log_step "Checking prerequisites..."

command -v git &>/dev/null && log_ok "Git installed" || { log_fail "Git not found - install from git-scm.com"; exit 1; }
command -v bun &>/dev/null && log_ok "Bun installed" || log_skip "Bun not found - install from bun.sh"

# === CLONE REPOS ===
log_step "Cloning repositories..."
mkdir -p "$APPS_DIR"

CLONED=0; SKIPPED=0; FAILED=0

for entry in $REPOS; do
    repo="${entry%%:*}"
    folder="${entry##*:}"
    path="$APPS_DIR/$folder"
    
    if [ -d "$path" ]; then
        log_skip "$folder (exists)"
        ((SKIPPED++))
        continue
    fi
    
    [ "$USE_HTTPS" = true ] && url="https://github.com/$GIT_ORG/$repo.git" || url="git@github.com:$GIT_ORG/$repo.git"
    
    if git clone --quiet "$url" "$path" 2>/dev/null; then
        log_ok "$folder"
        ((CLONED++))
    else
        log_fail "$folder (no access or repo not found)"
        ((FAILED++))
    fi
done

# === ENVIRONMENT ===
log_step "Setting up environment..."

if [ ! -f "$SCRIPT_DIR/.env" ] && [ -f "$SCRIPT_DIR/.env.example" ]; then
    cp "$SCRIPT_DIR/.env.example" "$SCRIPT_DIR/.env"
    log_ok "Created .env from template"
    echo -e "    ${YELLOW}Edit .env with your secrets${NC}"
else
    [ -f "$SCRIPT_DIR/.env" ] && log_ok ".env exists" || log_skip "No .env.example found"
fi

# === INSTALL ===
if command -v bun &>/dev/null; then
    log_step "Installing dependencies..."
    cd "$SCRIPT_DIR" && bun install --silent && log_ok "Dependencies installed"
fi

# === SUMMARY ===
echo -e "\n${CYAN}Summary:${NC} $CLONED cloned, $SKIPPED skipped, $FAILED failed"

[ $FAILED -gt 0 ] && echo -e "${YELLOW}Some repos failed - check access permissions${NC}"

echo -e "\n${GREEN}Done!${NC} Run: ${CYAN}bun run dev${NC}\n"
