/**
 * Copies marketing-related locale subtrees from apps/company to apps/admin and apps/conseiller
 * so shared marketing UI (Vite aliases) resolves i18n keys.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const TARGET_APPS = ['admin', 'conseiller'] as const
const LANGS = ['en', 'fr', 'ar'] as const

const SETTINGS_MARKETING_KEYS = ['automatedListings', 'emailAutomation', 'whatsapp', 'sms'] as const

const TOP_LEVEL_FROM_COMPANY = [
  'intelligence',
  'analytics',
  'messaging',
  'digitalAssets',
  'socialProof',
  'socialMedia',
] as const

function mergeMissing(target: Record<string, unknown>, source: Record<string, unknown>): void {
  for (const [k, v] of Object.entries(source)) {
    if (v === null || typeof v !== 'object' || Array.isArray(v)) {
      if (target[k] === undefined) target[k] = v
    } else {
      const t = target[k]
      if (t === undefined || typeof t !== 'object' || t === null || Array.isArray(t)) {
        target[k] = structuredClone(v)
      } else {
        mergeMissing(t as Record<string, unknown>, v as Record<string, unknown>)
      }
    }
  }
}

for (const lang of LANGS) {
  const companyPath = join(root, 'apps/company/src/locales', `${lang}.json`)
  const company = JSON.parse(readFileSync(companyPath, 'utf8')) as Record<string, unknown>
  const companyDashboard = company.dashboard as Record<string, unknown> | undefined
  if (!companyDashboard?.marketing) {
    throw new Error(`company ${lang}.json: missing dashboard.marketing`)
  }

  for (const app of TARGET_APPS) {
    const path = join(root, `apps/${app}/src/locales`, `${lang}.json`)
    const data = JSON.parse(readFileSync(path, 'utf8')) as Record<string, unknown>

    const dash = (data.dashboard ?? {}) as Record<string, unknown>
    dash.marketing = structuredClone(companyDashboard.marketing)
    data.dashboard = dash

    if (company.growth) data.growth = structuredClone(company.growth)

    for (const key of TOP_LEVEL_FROM_COMPANY) {
      if (company[key] !== undefined) {
        data[key] = structuredClone(company[key])
      }
    }

    const settings = (data.settings ?? {}) as Record<string, unknown>
    const companySettings = company.settings as Record<string, unknown> | undefined
    if (companySettings) {
      for (const key of SETTINGS_MARKETING_KEYS) {
        if (companySettings[key] !== undefined) {
          settings[key] = structuredClone(companySettings[key])
        }
      }
    }
    data.settings = settings

    const companyCommon = company.common as Record<string, unknown> | undefined
    if (companyCommon) {
      data.common = (data.common ?? {}) as Record<string, unknown>
      mergeMissing(data.common as Record<string, unknown>, companyCommon)
    }

    writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`)
  }
}

console.log('Synced marketing locales: admin + conseiller (en, fr, ar).')
