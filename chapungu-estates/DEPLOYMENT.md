# Chapungu Estates — Deployment Guide

## Stack Overview
- **Framework:** Next.js 15 (App Router)
- **Database:** PostgreSQL via Prisma ORM
- **Hosting:** Vercel (Johannesburg region)
- **Email:** Resend
- **Fonts:** Google Fonts (Cormorant Garamond + Jost)

---

## Prerequisites
- Node.js 20+
- PostgreSQL 15+ database (Neon, Supabase, Railway, or self-hosted)
- Vercel account
- Resend account (https://resend.com)
- Custom domain pointed to Vercel

---

## Local Development Setup

### 1. Install dependencies
```bash
cd chapungu-estates
npm install
```

### 2. Configure environment
```bash
cp .env.example .env.local
# Fill in all values in .env.local
```

### 3. Set up the database
```bash
# Generate Prisma client
npx prisma generate

# Run migrations (creates all tables)
npx prisma migrate dev --name init

# Seed initial data (room types, menu categories, etc.)
npx prisma db seed
```

### 4. Start development server
```bash
npm run dev
# Open http://localhost:3000
```

---

## Vercel Deployment

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit — Chapungu Estates website"
git remote add origin https://github.com/YOUR_ORG/chapungu-estates.git
git push -u origin main
```

### 2. Import to Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Framework will auto-detect as Next.js
4. Set the **Region** to `jnb1` (Johannesburg) for lowest latency from Zimbabwe

### 3. Add Environment Variables
In Vercel dashboard → Settings → Environment Variables, add all variables from `.env.example`:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Your PostgreSQL connection string |
| `RESEND_API_KEY` | Your Resend API key |
| `ADMIN_EMAIL` | info@chapunguestates.co.zw |
| `NEXT_PUBLIC_GA_ID` | Your GA4 measurement ID |
| `NEXT_PUBLIC_META_PIXEL_ID` | Your Meta Pixel ID |
| `NEXT_PUBLIC_SITE_URL` | https://chapunguestates.co.zw |

### 4. Run database migrations on production
```bash
# Using Vercel CLI
npx vercel env pull .env.production.local
DATABASE_URL="your-prod-db-url" npx prisma migrate deploy
DATABASE_URL="your-prod-db-url" npx prisma db seed
```

### 5. Add Custom Domain
In Vercel dashboard → Settings → Domains:
- Add `chapunguestates.co.zw`
- Add `www.chapunguestates.co.zw`
- Follow DNS configuration instructions

---

## Database (Recommended: Neon)
1. Sign up at https://neon.tech
2. Create a project named `chapungu-estates`
3. Copy the connection string to `DATABASE_URL`
4. Neon has a generous free tier and auto-scales

---

## Email Setup (Resend)
1. Sign up at https://resend.com
2. Add and verify domain `chapunguestates.co.zw`
3. Create API key
4. Set `RESEND_API_KEY` and `ADMIN_EMAIL` in Vercel

---

## Images
All image references use `/images/...` paths. Create the following directory structure in `/public/images/`:

```
public/images/
  hero/          — homepage hero images
  rooms/         — room/suite photos (one per slug: presidential-1.jpg, etc.)
  restaurant/    — restaurant & food photos
  weddings/      — wedding venue photos
  events/        — events photos
  gallery/       — all gallery images
  about/         — estate aerial and team photos
  team/          — staff headshots
  og-image.jpg   — 1200x630 Open Graph image
```

**Recommended image sizes:**
- Hero images: 1920x1080px, WebP, <200KB
- Room images: 1200x800px, WebP, <150KB
- Gallery images: 1200x900px, WebP, <180KB
- OG image: 1200x630px, JPG, <100KB

---

## Post-Launch Checklist
- [ ] All images uploaded to `/public/images/`
- [ ] Database seeded with room data
- [ ] Test booking form end-to-end
- [ ] Test enquiry forms (wedding, conference, contact)
- [ ] Test restaurant reservation form
- [ ] Verify confirmation emails arrive correctly
- [ ] Submit sitemap to Google Search Console
- [ ] Set up GA4 property and verify data flowing
- [ ] Test on mobile devices
- [ ] Test WhatsApp links open correctly
- [ ] Verify Google Maps embed shows correct location
- [ ] Check page load speed (target: <3s)

---

## Ongoing Maintenance

### Updating Content
Most content is in the page files. Common updates:
- **Room prices:** `/src/app/accommodation/page.tsx` and `[slug]/page.tsx`
- **Menu items:** `/src/app/restaurant/page.tsx`
- **Event packages:** `/src/app/events/page.tsx`
- **Wedding packages:** `/src/app/weddings/page.tsx`

### Database Admin
Use Prisma Studio for a visual database browser:
```bash
npx prisma studio
```

### Analytics
Access GA4 dashboard at https://analytics.google.com
Access Meta Pixel data at https://business.facebook.com

---

## Support
For technical issues, contact your developer or refer to:
- Next.js docs: https://nextjs.org/docs
- Prisma docs: https://www.prisma.io/docs
- Vercel docs: https://vercel.com/docs
- Resend docs: https://resend.com/docs
