# 🚀 GitHub Pages Deployment Guide

## Quick Setup (5 minutes)

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** button → **"New repository"**
3. Repository name: `TestBusiness` (or any name you prefer)
4. Make it **Public** (required for free GitHub Pages)
5. **DO NOT** initialize with README (we already have files)
6. Click **"Create repository"**

### Step 2: Push Your Code

Copy and run these commands in your terminal:

```bash
# Add GitHub as remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/TestBusiness.git

# Set main branch as default
git branch -M main

# Push code to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select **"GitHub Actions"**
5. The GitHub Actions workflow will automatically deploy your site

### Step 4: Access Your Live Website

Your website will be available at:
```
https://YOUR_USERNAME.github.io/TestBusiness
```

**Note**: It may take 5-10 minutes for the first deployment to complete.

## 🔧 Advanced Setup

### Custom Domain (Optional)

1. In repository **Settings** → **Pages**
2. Add your custom domain in **"Custom domain"** field
3. Add a `CNAME` file to your repository:
   ```bash
   echo "yourdomain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

### Branch Protection

1. Go to **Settings** → **Branches**
2. Add rule for `main` branch
3. Enable **"Require status checks to pass before merging"**
4. Select **"Deploy to GitHub Pages"** check

### Environment Variables

If you need environment variables:
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add your secrets/variables
3. Reference them in `.github/workflows/deploy.yml`

## 📊 Monitoring

### Check Deployment Status

1. Go to **Actions** tab in your repository
2. View workflow runs and logs
3. Green checkmark = successful deployment
4. Red X = deployment failed (check logs)

### Update Website

To update your website:
```bash
# Make your changes
git add .
git commit -m "Update website content"
git push
```

The GitHub Actions workflow will automatically redeploy your site.

## 🛠️ Troubleshooting

### Common Issues

**Issue**: 404 Page Not Found
- **Solution**: Check if `index.html` exists in root directory
- **Solution**: Verify GitHub Pages is enabled in Settings

**Issue**: CSS/JS not loading
- **Solution**: Use relative paths (`./styles/main.css` not `/styles/main.css`)
- **Solution**: Check file names for case sensitivity

**Issue**: Deployment failed
- **Solution**: Check Actions tab for error logs
- **Solution**: Verify all file paths are correct

**Issue**: Changes not appearing
- **Solution**: Clear browser cache (Ctrl+F5)
- **Solution**: Wait 5-10 minutes for CDN cache to update

### Force Refresh Cache

Add these meta tags to your HTML `<head>` during development:
```html
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```

**Remove these in production!**

## 📈 Analytics Setup

### Google Analytics

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add to your HTML `<head>`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Microsoft Clarity

1. Sign up at [clarity.microsoft.com](https://clarity.microsoft.com)
2. Add tracking code to HTML `<head>`

## 🔒 Security Headers

Add these to improve security (create `.htaccess` file):

```apache
# Security Headers
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-Content-Type-Options "nosniff"
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
```

## 📱 PWA Setup (Future Enhancement)

To make your site installable as an app:

1. Create `manifest.json`
2. Add service worker
3. Add to HTML:
   ```html
   <link rel="manifest" href="/manifest.json">
   ```

## 🎯 SEO Optimization

### Meta Tags Checklist
- ✅ Title tags (unique per page)
- ✅ Meta descriptions
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Canonical URLs
- ✅ Alt text for images

### Sitemap
Create `sitemap.xml` in root:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://YOUR_USERNAME.github.io/TestBusiness/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://YOUR_USERNAME.github.io/TestBusiness/courses/budgeting.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

## 🚀 Performance Tips

1. **Optimize Images**: Use WebP format, compress images
2. **Minify CSS/JS**: Use build tools in production
3. **Enable Caching**: Leverage browser caching
4. **CDN**: Use CDNs for third-party libraries
5. **Lazy Loading**: Implement for images and content

---

**Need Help?** 
- 📧 Create an issue in the repository
- 📖 Check [GitHub Pages documentation](https://docs.github.com/en/pages)
- 💬 Ask in GitHub Community forums