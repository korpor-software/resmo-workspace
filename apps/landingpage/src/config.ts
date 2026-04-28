const dev = import.meta.env.DEV;

export const APP_URLS = {
  superadmin: dev ? 'http://localhost:5175' : 'https://superadmin.resmo.com',
  company:    dev ? 'http://localhost:5174' : 'https://company.resmo.com',
  conseiller: dev ? 'http://localhost:5176' : 'https://conseiller.resmo.com',
  admin:      dev ? 'http://localhost:5173' : 'https://admin.resmo.com',
} as const;