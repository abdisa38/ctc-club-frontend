# Testing Guide - Community & Settings Updates

## Quick Testing Checklist

---

## ✅ Settings Page - Avatar Upload

### Step-by-Step Test:

1. **Login to your account**
   - Go to: https://ctc-club-frontend.vercel.app/login
   - Login with your credentials

2. **Navigate to Settings**
   - Click your profile icon (top right)
   - Click "Settings" or go to `/app/settings`

3. **Test Avatar Upload**
   - Look for the "Profile Picture" card at the top
   - You should see:
     - Your current avatar on the LEFT
     - "Choose Image" button
     - "Remove" button
     - Small avatar on the RIGHT CORNER with your email below it
   
4. **Upload a New Image**
   - Click "Choose Image" button
   - Select an image from your computer (JPG, PNG, or GIF)
   - Image should upload and appear in both avatars
   - Success message should appear

5. **Test Validation**
   - Try uploading a non-image file (like .txt or .pdf)
     - Should show error: "Please select a valid image file"
   - Try uploading a very large image (>5MB)
     - Should show error: "Image size must be less than 5MB"

6. **Verify Layout**
   - Check that profile photo appears in RIGHT CORNER
   - Check that your email appears BELOW the right corner photo
   - Check responsive design on mobile (resize browser)

---

## ✅ Settings Page - Removed Cards

### What Should Be GONE:

Open Settings → Profile tab and verify these cards are **NOT visible**:

- ❌ **Social Links Card** (GitHub, LinkedIn, Website inputs)
- ❌ **Platform Status Card** (XP progress, Level, Enrollment stats)
- ❌ **About Card** (Bio preview section)
- ❌ **Recent Project Submissions Card** (Project history)
- ❌ **Recent Notifications Card** (Notification preview)

### What Should REMAIN:

- ✅ **Profile Picture Card** (with file upload)
- ✅ **Personal Information Card** (First Name, Last Name, Headline, Bio)
- ✅ **Account Security Tab** (Password, Email, Logout)
- ✅ **Notifications Tab** (Email preferences)
- ✅ **Appearance Tab** (Theme settings)

---

## ✅ Community Page - Edit/Delete Functionality

### Test as STUDENT:

1. **Login as a student account**

2. **Create a Post**
   - Go to Community page: `/app/community`
   - Fill in title and content
   - Click "Create Post"

3. **Edit Your Own Post**
   - Find your post in the list
   - Look for the **pencil icon (Edit)** button - should be visible
   - Click Edit
   - Modify title or content
   - Click "Save" (checkmark icon)
   - Verify changes appear

4. **Delete Your Own Post**
   - Find your post
   - Look for the **trash icon (Delete)** button - should be visible
   - Click Delete
   - Confirm deletion in the dialog
   - Post should disappear

5. **Try to Delete Another Student's Post**
   - Find a post created by another student
   - **Delete button should NOT appear** (you can't delete others' posts)
   - Only Edit button should appear on your own posts

6. **Test Replies**
   - Click "Replies" on any post
   - Write a reply and submit
   - Your reply should show Edit and Delete buttons
   - Other users' replies should NOT show Edit/Delete buttons

---

### Test as INSTRUCTOR or ADMIN:

1. **Login as instructor or admin account**

2. **View Any Post**
   - Go to Community page
   - Find ANY post (even from students)
   - **Delete button should appear** on ALL posts

3. **Delete Any Post**
   - Click Delete on any post
   - Confirm deletion
   - Post should be removed
   - This works even if you didn't create the post

4. **Delete Any Reply**
   - Open replies on any post
   - **Delete button should appear** on ALL replies
   - Click Delete on any reply
   - Reply should be removed

5. **Edit Your Own Posts**
   - Edit button should appear on posts you created
   - You can edit your own posts
   - You CANNOT edit other users' posts (only delete them)

---

## Permission Matrix

| Action | Student (Own Content) | Student (Others' Content) | Instructor/Admin (Any Content) |
|--------|----------------------|---------------------------|-------------------------------|
| Edit Post | ✅ Yes | ❌ No | ✅ Yes (own only) |
| Delete Post | ✅ Yes | ❌ No | ✅ Yes (all posts) |
| Edit Reply | ✅ Yes | ❌ No | ✅ Yes (own only) |
| Delete Reply | ✅ Yes | ❌ No | ✅ Yes (all replies) |

---

## Expected Behavior

### ✅ CORRECT Behavior:

- Students can edit/delete ONLY their own posts and replies
- Instructors can delete ANY post or reply (but edit only their own)
- Admins can delete ANY post or reply (but edit only their own)
- Edit button appears only on content you created
- Delete button appears based on role permissions
- Confirmation dialog appears before deletion
- Success/error messages appear after actions

### ❌ INCORRECT Behavior (Report if you see this):

- Student can delete another student's post
- Edit/Delete buttons don't appear on own content
- No confirmation dialog before deletion
- Changes don't save after editing
- Error messages don't appear for invalid actions

---

## Troubleshooting

### Avatar Upload Not Working:
- Clear browser cache (Ctrl + Shift + R)
- Check file size (must be < 5MB)
- Check file type (must be JPG, PNG, or GIF)
- Check browser console for errors (F12)

### Cards Still Visible:
- Hard refresh the page (Ctrl + Shift + R)
- Clear browser cache
- Wait 2-3 minutes for Vercel deployment
- Check you're on the correct URL

### Edit/Delete Buttons Not Appearing:
- Verify you're logged in
- Check your role (student/instructor/admin)
- Refresh the page
- Check browser console for errors

---

## Reporting Issues

If you find any bugs or issues, please report them with:

1. **What you were doing** (step-by-step)
2. **What you expected to happen**
3. **What actually happened**
4. **Your role** (student/instructor/admin)
5. **Browser and device** (Chrome on Windows, Safari on iPhone, etc.)
6. **Screenshots** (if possible)

**Contact**:
- Email: abdisaawel313@gmail.com
- Phone: 0938890645
- Telegram: @bdisa38

---

## Deployment Status

**Frontend**: https://ctc-club-frontend.vercel.app/
**Backend**: https://ctc-14efa787b23a.herokuapp.com/api

Changes are automatically deployed to Vercel when pushed to GitHub.
Wait 2-3 minutes after push for deployment to complete.

---

## Summary

✅ **Community Edit/Delete**: Already working perfectly with role-based permissions
✅ **Avatar Upload**: Now supports file upload from computer with validation
✅ **Settings Cleanup**: Removed 5 unnecessary cards for cleaner interface
✅ **Profile Layout**: Photo moved to right corner with email below

All changes have been tested and pushed to production!
