# Resmo – Test users (Company, Admin, Conseiller)

Use these accounts after running the backend seed:  
`cd backend && bun run seed`

Base URLs below use the workspace `.env` (localhost). Change the host if you use a different environment.

---

## Company (company owner)

| Field      | Value                          |
|-----------|---------------------------------|
| **App URL** | http://localhost:5174          |
| **Email**   | owner@demo-realestate.com      |
| **Password**| company123                     |

Login at: **http://localhost:5174** (Company dashboard)

---

## Admin (agency admin)

| Field      | Value                          |
|-----------|---------------------------------|
| **App URL** | http://localhost:5173          |
| **Email**   | admin@demo-realestate.com      |
| **Password**| admin123                       |

Login at: **http://localhost:5173** (Admin dashboard)

---

## Conseiller (2 users, same password)

| Field      | Value                          |
|-----------|---------------------------------|
| **App URL** | http://localhost:5176          |
| **Password**| conseiller123 (for both)       |

**Conseiller 1**

- **Email:** pierre@demo-realestate.com  
- Login at: **http://localhost:5176**

**Conseiller 2**

- **Email:** sophie@demo-realestate.com  
- Login at: **http://localhost:5176**

---

## Summary

| Role      | App URL (login page)   | Email                      | Password       |
|----------|-------------------------|----------------------------|----------------|
| Company  | http://localhost:5174   | owner@demo-realestate.com  | company123     |
| Admin    | http://localhost:5173   | admin@demo-realestate.com  | admin123       |
| Conseiller | http://localhost:5176 | pierre@demo-realestate.com | conseiller123  |
| Conseiller | http://localhost:5176 | sophie@demo-realestate.com | conseiller123  |

---

**Note:** Superadmin (e.g. admin@resmo.com / admin123) uses **http://localhost:5175** if you need it.
