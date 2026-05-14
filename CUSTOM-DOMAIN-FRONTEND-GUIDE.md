# 🌐 Frontend Custom Domain Setup Guide

## ✅ GOOD NEWS!

Your frontend is already configured correctly! The API URLs are hardcoded to your Heroku backend:
- `https://ctc-14efa787b23a.herokuapp.com/api`

This means your frontend will work with your new custom domain **without any code changes**! 🎉

## 📋 WHAT YOU NEED TO DO

### STEP 1: Verify Vercel Deployment

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Find your CTC Club frontend project
   - Click on it

2. **Check Current Deployment**
   - Make sure your latest code is deployed
   - Check the "Deployments" tab
   - The most recent deployment should show "Ready"

### STEP 2: No Environment Variables Needed! ✅

Unlike some projects, your frontend doesn't use environment variables for the API URL. It's hardcoded in:
- `src/app/utils/api.ts`
- `src/app/services/api.ts`

This is actually **good** because:
- ✅ No environment variables to configure
- ✅ Works immediately with custom domain
- ✅ No need to redeploy

### STEP 3: Test Your Custom Domain

Once your DNS propagates (10-30 minutes after configuring Name.com):

1. **Visit your custom domain**: https://ctc2026.codes
2. **Test these features**:
   - [ ] Homepage loads correctly
   - [ ] Login works
   - [ ] Browse courses
   - [ ] View course details
   - [ ] Check if API calls work (F12 → Network tab)

3. **Check for errors**:
   - Open browser console (F12 → Console)
   - Look for any red errors
   - Should see no CORS errors (backend is configured)

## 🔍 VERIFICATION CHECKLIST

- [ ] Custom domain loads the site (https://ctc2026.codes)
- [ ] HTTPS is working (🔒 lock icon in browser)
- [ ] Login functionality works
- [ ] API calls succeed (check Network tab in F12)
- [ ] No CORS errors in console
- [ ] All features work as expected

## 🎯 CURRENT CONFIGURATION

### Frontend (Vercel):
```
Domain: ctc2026.codes
API URL: https://ctc-14efa787b23a.herokuapp.com/api
Platform: Vercel
HTTPS: Auto-enabled by Vercel
```

### Backend (Heroku):
```
URL: https://ctc-14efa787b23a.herokuapp.com
Allowed Origins:
  - https://ctc2026.codes
  - https://www.ctc2026.codes
  - http://localhost:5173 (for development)
```

## 🚨 TROUBLESHOOTING

### Problem: Custom domain not loading

**Check DNS propagation:**
1. Go to https://dnschecker.org
2. Enter: `ctc2026.codes`
3. Check if it resolves to Vercel's IP (76.76.21.21)
4. If not, wait longer (up to 48 hours)

**Verify Vercel domain settings:**
1. Go to Vercel → Your Project → Settings → Domains
2. Make sure `ctc2026.codes` shows ✅ "Valid Configuration"
3. Make sure SSL shows "Active"

### Problem: Site loads but API calls fail

**Check CORS configuration:**
1. Open browser console (F12)
2. Look for CORS errors
3. If you see CORS errors, verify backend CLIENT_URL is set correctly on Heroku

**Verify backend is running:**
1. Visit: https://ctc-14efa787b23a.herokuapp.com/api
2. Should see: `{"message":"Welcome to the CTC Club API"}`
3. If not, check Heroku logs: `heroku logs --tail`

### Problem: HTTPS not working

**Solution:**
- Vercel automatically provisions SSL certificates
- This can take up to 24 hours after DNS propagates
- Check Vercel → Settings → Domains for SSL status
- If stuck, try removing and re-adding the domain

### Problem: www subdomain not working

**Solution:**
1. Add `www.ctc2026.codes` in Vercel (Settings → Domains)
2. Vercel will use the CNAME record you added on Name.com
3. Set one as primary (the other will redirect)

## 📝 OPTIONAL: Use Environment Variables (Future Improvement)

If you want to make your API URL configurable in the future:

### Step 1: Create .env file in frontend
```env
VITE_API_URL=https://ctc-14efa787b23a.herokuapp.com/api
```

### Step 2: Update code to use environment variable

In `src/app/utils/api.ts`:
```typescript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://ctc-14efa787b23a.herokuapp.com/api',
  withCredentials: true,
});
```

### Step 3: Add to Vercel
1. Go to Vercel → Settings → Environment Variables
2. Add: `VITE_API_URL` = `https://ctc-14efa787b23a.herokuapp.com/api`
3. Redeploy

**Note:** This is optional and not required for your custom domain to work!

## 🎉 SUMMARY

### What's Already Done:
- ✅ Frontend code is ready (no changes needed)
- ✅ API URLs are correctly configured
- ✅ Backend CORS is updated to allow your custom domain
- ✅ Heroku will auto-deploy the backend changes

### What You Need to Do:
1. ✅ Configure DNS on Name.com (A and CNAME records)
2. ✅ Add domain to Vercel
3. ✅ Update CLIENT_URL on Heroku (see UPDATE-CUSTOM-DOMAIN.md in backend)
4. ✅ Wait for DNS propagation (10-30 minutes)
5. ✅ Test everything works!

### Timeline:
- DNS Configuration: 5 minutes
- DNS Propagation: 10-30 minutes (up to 48 hours)
- SSL Certificate: Automatic (within 24 hours)
- Total: Usually working within 30 minutes!

---

**You're almost done! Just follow the DNS setup steps and update the Heroku CLIENT_URL, then your custom domain will be live!** 🚀
