```markdown
# VerifyHub – Identity & Compliance Verification Portal

**VerifyHub** is a modern, admin dashboard for verifying Nigerian identity records (NIN, BVN, CAC) and performing AML/PEP screenings. Built with Next.js 14, TypeScript, Tailwind CSS, and integrated with a backend API that provides real‑time verification, 2FA, and audit logging.

![Screenshot](/public/verify-img.png)

## ✨ Features

- **Authentication**
  - Admin login with email/password + mandatory 2FA (OTP via email)
  - HTTP‑only cookie storage for tokens, XSS‑safe
  - Protected dashboard routes via Next.js middleware

- **Verification Services**
  - **NIN Verification** – encrypt NIN with RSA‑OAEP, retrieve full name, DOB, phone, gender, photo
  - **NIN with Phone** – verify NIN and confirm phone match
  - **BVN Verification** – same encryption, returns name, DOB, gender, phone(s), photo
  - **BVN Retrieval by Phone** – lookup BVN using registered phone number
  - **CAC Business Search** – search by RC number + company type, get company details, status, address, email

- **Compliance Screening (AML/PEP)**
  - Screen individuals or organisations against global PEP, Sanctions, and Adverse Media lists
  - Real‑time risk level (Low/Medium/High) and match status (No Match/Potential/Confirmed)
  - Tabbed result view with article details for Adverse Media

- **Bulk Operations**
  - Upload Excel/CSV with personal details (Last Name, First Name, Middle Name, DOB, Gender, Phone)
  - Automatic NIN lookup by phone, row‑by‑row processing with progress indicator
  - Smart matching logic (first+last+DOB+gender+phone **or** first+middle+last+DOB+gender+phone)
  - Export results to Excel, view side‑by‑side comparison modal

- **Logging & Activity**
  - API Calls log (filter by service, status, date range, search) – ready for backend integration
  - Activity log (localStorage fallback) tracking user actions (login, verifications, screenings)

- **UI/UX**
  - Clean, futuristic design with glassmorphism, gradients, and smooth animations (Framer Motion)
  - Fully responsive (mobile, tablet, desktop)
  - Security badges (256‑bit encryption, NDPR compliant, instant results)

## 🛠 Tech Stack

| Category       | Technology |
|----------------|------------|
| Framework      | Next.js 14 (App Router) + TypeScript |
| Styling        | Tailwind CSS, shadcn/ui components |
| State Mgmt     | TanStack React Query |
| HTTP Client    | Axios (with interceptors for 401 handling) |
| Animations     | Framer Motion |
| Encryption     | Web Crypto API (RSA‑OAEP, SHA‑1) |
| File parsing   | SheetJS (XLSX) |
| Charts         | Recharts (dashboard) |
| Auth           | HTTP‑only cookies, JWT (via backend) |

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/            # login, verify-otp
│   ├── (dashboard)/       # all protected pages
│   │   ├── verifications/ # nin, nin-phone, bvn, bvn-phone, cac
│   │   ├── aml/           # AML/PEP screening
│   │   ├── logs/          # API calls + activity logs
│   │   └── ...
│   ├── api/               # Next.js API routes (proxies to backend)
│   └── layout.tsx
├── components/            # reusable UI (forms, result cards, tables, modals)
├── hooks/                 # custom React Query hooks (useLogin, useNinVerification, etc.)
├── services/              # API service layer (calls proxy routes)
├── lib/                   # utilities: axios, encryption, server‑api, cookies
├── types/                 # TypeScript interfaces
└── styles/                # global CSS
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Backend API (LifeData or compatible) – must provide endpoints for:
  - Admin login + 2FA (`/auth/login`, `/auth/verify-2fa`)
  - NIN lookup by phone (`/public/nin/verify-by-phone`)
  - CAC verification (`/admin/cac/verify`)
  - AML screening (`/admin/aml/screen`)
  - Audit logs (`/admin/audit-logs`) – optional

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Timonics/verification-portal.git
   cd verification-portal
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create `.env.local` in the root:
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-domain.com/api
   ```

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL of the backend API (including `/api`) |

## 📦 Deployment

Build for production:
```bash
npm run build
npm start
```

The app can be deployed to Vercel, Netlify, or any Node.js hosting. The API routes act as proxies, so no serverless function limits are exceeded.

## 🤝 Collaboration

This project was developed by a team of two:
- **Frontend** – [https://github.com/Timonics] (Oderinde Michael)
- **Backend** – Teammate (LifeData API integration, authentication, business logic)

## 📄 License

[MIT](LICENSE)

## 🙏 Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/) for accessible components
- [Lucide](https://lucide.dev/) for icons
```