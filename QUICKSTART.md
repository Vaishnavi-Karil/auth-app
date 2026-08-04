# 🚀 Quick Start Guide

## Get Started in 2 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to **http://localhost:3000**

---

## 🎯 Using the Dashboard

### Creating a Post
1. Fill in the **Title** field
2. Write your **Content**
3. Select a **Visibility** option:
   - 🌐 Public - Everyone can see
   - 👥 Friends Only - Friends can see
   - 🔒 Private - Only you can see
4. Click **Publish Post**

### Managing Posts
- **View All Posts**: Scroll through the posts section
- **Filter**: Use visibility buttons to filter posts
- **Delete**: Click "Delete" on any post card

---

## 📁 File Structure Overview

```
Components/
├── Dashboard.tsx       ← Main dashboard
├── PostForm.tsx        ← Create post form
├── PostCard.tsx        ← Display posts
└── VisibilitySelector  ← Privacy selector

API Routes/
├── /api/posts          ← Manage all posts
└── /api/posts/[id]     ← Manage single post

Types/
└── lib/types.ts        ← TypeScript definitions
```

---

## 🔗 Key Features

✅ Create posts with visibility control  
✅ Public/Private/Friends visibility  
✅ Delete posts with confirmation  
✅ Filter by visibility  
✅ Real-time updates  
✅ Responsive design  
✅ Beautiful UI with Tailwind CSS  

---

## 🐛 Common Issues

**Port 3000 already in use?**
```bash
PORT=3001 npm run dev
```

**Build failed?**
```bash
npm run build
```

**TypeScript errors?**
```bash
npm run lint
```

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)

---

**Ready to blog? 📝 Let's go!**
