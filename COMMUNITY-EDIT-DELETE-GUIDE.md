# Community Discussion Edit/Delete Feature Guide

## Overview
Added edit and delete functionality to the Community Discussion page with role-based permissions.

## Features Added

### 1. Edit Posts
- **Who can edit**: Only the post owner (student who created it)
- **What can be edited**: Title, content, and tags
- **UI**: Edit button (pencil icon) appears next to posts you own
- **How it works**:
  1. Click the edit button on your post
  2. Edit the title, content, or tags inline
  3. Click "Save" to update or "Cancel" to discard changes

### 2. Delete Posts
- **Who can delete**:
  - **Students**: Can delete ONLY their own posts
  - **Instructors**: Can delete ANY post
  - **Admins**: Can delete ANY post
- **UI**: Delete button (trash icon) appears based on permissions
- **How it works**:
  1. Click the delete button
  2. Confirm the deletion in the popup
  3. Post is removed from the list

### 3. Edit Replies
- **Who can edit**: Only the reply owner (student who created it)
- **What can be edited**: Reply content
- **UI**: Edit button appears next to replies you own
- **How it works**:
  1. Click the edit button on your reply
  2. Edit the content inline
  3. Click "Save" to update or "Cancel" to discard changes

### 4. Delete Replies
- **Who can delete**:
  - **Students**: Can delete ONLY their own replies
  - **Instructors**: Can delete ANY reply
  - **Admins**: Can delete ANY reply
- **UI**: Delete button appears based on permissions
- **How it works**:
  1. Click the delete button
  2. Confirm the deletion in the popup
  3. Reply is removed and reply count is updated

## Permission Summary

| Action | Student (Own) | Student (Others) | Instructor | Admin |
|--------|---------------|------------------|------------|-------|
| Edit Post | ✅ Yes | ❌ No | ❌ No | ❌ No |
| Delete Post | ✅ Yes | ❌ No | ✅ Yes | ✅ Yes |
| Edit Reply | ✅ Yes | ❌ No | ❌ No | ❌ No |
| Delete Reply | ✅ Yes | ❌ No | ✅ Yes | ✅ Yes |

## Technical Implementation

### Backend Changes
**Files Modified:**
- `abdisa38-ctc-club-backend/src/controllers/communityController.ts`
- `abdisa38-ctc-club-backend/src/routes/communityRoutes.ts`

**New Endpoints:**
1. `PUT /api/community/posts/:postId` - Edit a post
2. `PUT /api/community/posts/:postId/replies/:replyId` - Edit a reply
3. `DELETE /api/community/posts/:postId/replies/:replyId` - Delete a reply

**Permission Logic:**
- Edit operations: Only post/reply owner can edit
- Delete operations: Owner, instructors, and admins can delete

### Frontend Changes
**Files Modified:**
- `CTC-Club1/src/app/pages/Community.tsx`
- `CTC-Club1/src/app/services/api.ts`

**New Functions:**
- `editCommunityPost()` - API call to edit post
- `editCommunityReply()` - API call to edit reply
- `deleteCommunityReply()` - API call to delete reply
- `handleEditPost()` - UI handler for editing posts
- `handleDeletePost()` - UI handler for deleting posts
- `handleEditReply()` - UI handler for editing replies
- `handleDeleteReply()` - UI handler for deleting replies
- `canEditPost()` - Permission check for editing posts
- `canDeletePost()` - Permission check for deleting posts
- `canEditReply()` - Permission check for editing replies
- `canDeleteReply()` - Permission check for deleting replies

## Deployment Status

✅ **Backend**: Pushed to GitHub → Auto-deployed to Heroku
✅ **Frontend**: Pushed to GitHub → Auto-deployed to Vercel

## Testing Instructions

### As a Student:
1. Go to Community page
2. Create a new post
3. You should see edit and delete buttons on YOUR post only
4. Click edit to modify your post
5. Click delete to remove your post
6. Reply to any post
7. You should see edit and delete buttons on YOUR reply only
8. Try editing and deleting your reply

### As an Instructor/Admin:
1. Go to Community page
2. You should see delete buttons on ALL posts and replies
3. You should NOT see edit buttons on posts/replies you don't own
4. Test deleting other users' posts and replies

## Notes
- All deletions require confirmation
- Edit mode shows inline with Save/Cancel buttons
- Deleted posts and replies are soft-deleted (marked as deleted in database)
- Reply count is automatically updated when replies are deleted
- Error messages are displayed if operations fail

## URLs
- **Frontend**: https://ctc-club-frontend.vercel.app/
- **Backend**: https://ctc-14efa787b23a.herokuapp.com/api
- **Community Page**: https://ctc-club-frontend.vercel.app/app/community
