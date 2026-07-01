# Firestore Setup Guide

## Current Implementation Status ✅

Your forms are **already configured** to store data in Firestore! Here's what's implemented:

### 1. Firebase Configuration
- ✅ Firebase SDK installed (`firebase: ^12.6.0`)
- ✅ Firebase config in `src/firebase.js`
- ✅ Firestore database initialized

### 2. Data Storage Services
- ✅ `jobApplicationsService` - stores job applications
- ✅ `guardRequestsService` - stores guard requests
- ✅ Both services save to Firestore collections

### 3. Form Integration
- ✅ All 4 forms save to Firestore:
  - `RequiredGuardsForm.tsx`
  - `RequiredGuardsFormModal.tsx`
  - `JobOpeningsForm.tsx`
  - `JobOpeningsFormModal.tsx`

### 4. Admin Panel Integration
- ✅ Reads real data from Firestore
- ✅ Displays submitted forms
- ✅ Delete functionality

## Firestore Collections Structure

```
ashoksecurity-cb796 (your project)
├── jobApplications/
│   ├── [document-id]/
│   │   ├── fullName: string
│   │   ├── email: string
│   │   ├── phone: string
│   │   ├── position: string
│   │   ├── experience: string
│   │   ├── qualification: string
│   │   ├── age: string
│   │   ├── message: string
│   │   ├── submittedAt: timestamp
│   │   └── status: "pending"
│   └── ...
└── guardRequests/
    ├── [document-id]/
    │   ├── companyName: string
    │   ├── contactPerson: string
    │   ├── phone: string
    │   ├── whatsappNumber: string
    │   ├── email: string
    │   ├── numberOfGuards: string
    │   ├── guardDesignation: string
    │   ├── location: string
    │   ├── message: string
    │   ├── submittedAt: timestamp
    │   └── status: "pending"
    └── ...
```

## Troubleshooting Steps

### 1. Check Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `ashoksecurity-cb796`
3. Go to **Firestore Database**
4. Check if collections `jobApplications` and `guardRequests` exist

### 2. Check Firestore Rules
Make sure your Firestore rules allow read/write:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 3. Test Firebase Connection
1. Go to Admin Panel
2. Click "Test Firebase" button
3. Check browser console for results

### 4. Check Browser Console
When submitting forms, check browser console for:
- ✅ "Submitting [form type]:" logs
- ✅ "[Form type] submitted successfully:" logs
- ❌ Any error messages

## Common Issues & Solutions

### Issue: "Firebase is not available"
**Solution:** Check if Firebase is properly initialized in browser console

### Issue: "Permission denied"
**Solution:** Update Firestore security rules (see step 2 above)

### Issue: "Network error"
**Solution:** Check internet connection and Firebase project status

### Issue: Forms submit but no data in Firestore
**Solution:** 
1. Check Firestore rules
2. Verify project ID in config
3. Check browser network tab for failed requests

## Verification Steps

1. **Submit a test form** (either job application or guard request)
2. **Check browser console** for success logs
3. **Go to Firebase Console** → Firestore Database
4. **Look for new documents** in `jobApplications` or `guardRequests` collections
5. **Check Admin Panel** to see if data appears

## Current Firebase Config
```javascript
Project ID: ashoksecurity-cb796
Auth Domain: ashoksecurity-cb796.firebaseapp.com
API Key: AIzaSyAvCwGgrhsEYdhRA7pkxfXhxTNJUvzKdHA
```

Your Firestore integration is **complete and ready**! If you're still seeing errors, please check the troubleshooting steps above.