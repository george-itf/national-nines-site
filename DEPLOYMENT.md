# National Nines Golf - Deployment Guide

## Quick Deploy to Cloudflare Pages

### Prerequisites
1. A Cloudflare account (free)
2. A GitHub account (or upload directly)

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin git@github.com:YOUR_USERNAME/national-nines-site.git
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages:**
   - Go to [Cloudflare Pages](https://pages.cloudflare.com)
   - Click "Create a project" > "Connect to Git"
   - Select your repository
   - Configure build settings:
     - **Build command:** `npm run build`
     - **Build output directory:** `dist`
     - **Root directory:** `/` (leave default)

3. **Environment Variables (optional):**
   - None required for basic deployment

4. **Deploy:**
   - Click "Save and Deploy"
   - Wait for build to complete (~1-2 minutes)

### Option 2: Direct Upload

1. **Build locally:**
   ```bash
   # For production (nationalninesgolf.co.uk)
   cp astro.config.prod.mjs astro.config.mjs
   npm run build
   ```

2. **Upload to Cloudflare:**
   - Go to Cloudflare Pages
   - Create new project > "Direct upload"
   - Upload the `dist` folder

## Custom Domain Setup

### Connect nationalninesgolf.co.uk

1. In Cloudflare Pages, go to your project settings
2. Click "Custom domains" > "Set up a custom domain"
3. Enter `nationalninesgolf.co.uk`
4. Update your domain's DNS:
   - **If using Cloudflare DNS:** Automatic
   - **If using external DNS:** Add CNAME record pointing to `<project>.pages.dev`

### DNS Records
```
Type    Name    Value
CNAME   @       national-nines.pages.dev
CNAME   www     national-nines.pages.dev
```

## Configuration Files

### GitHub Pages (Preview/Staging)
Use `astro.config.mjs`:
```js
site: 'https://george-itf.github.io',
base: '/national-nines-site',
```

### Production (nationalninesgolf.co.uk)
Use `astro.config.prod.mjs`:
```js
site: 'https://nationalninesgolf.co.uk',
// No base path needed
```

## Form Handling

Forms are configured to use FormSubmit.co:
- Contact form → info@nationalninesgolf.co.uk
- Entry forms → info@nationalninesgolf.co.uk

To change the email, update the `action` attribute in:
- `src/pages/contact.astro`
- `src/pages/events/kent-nines.astro`
- `src/pages/events/essex-nines.astro`

## Future Enhancements

### Stripe Integration
When ready to accept payments:
1. Create Stripe account at stripe.com
2. Set up products:
   - Kent Nines Entry (£150)
   - Essex Nines Entry (£50)
3. Get payment links or integrate Stripe Checkout
4. Update entry form buttons to redirect to Stripe

### Product Images
1. Add product photos to `public/images/products/`
2. Update `src/data/products.json` with image paths

### OG Image
1. Create a 1200x630px social share image
2. Save as `public/images/og-default.jpg`

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Updating Content

### Products
Edit `src/data/products.json`:
```json
{
  "id": "9",
  "slug": "new-product",
  "name": "New Product",
  "description": "Description here",
  "price": 25,
  "category": "clubs",
  "inStock": true,
  "shippingAvailable": true,
  "collectionAvailable": true
}
```

### Event Details
Edit the corresponding file in `src/pages/events/`:
- Kent Nines: `kent-nines.astro`
- Essex Nines: `essex-nines.astro`

### Contact Info
Update in `src/layouts/BaseLayout.astro` (footer) and `src/pages/contact.astro`

---

*Last updated: 2026-01-29*
