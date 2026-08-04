# 📝 Blog Dashboard Application

## Overview
A modern, feature-rich blog dashboard built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**. Users can create, manage, and share posts/notes with granular visibility controls (public, private, or friends-only).

## Features

### 🎯 Core Functionality
- **Post Creation**: Write and publish posts with title and rich content
- **Visibility Control**: Choose between three privacy levels
  - 🌐 **Public**: Visible to everyone
  - 👥 **Friends Only**: Visible only to friends
  - 🔒 **Private**: Only you can see it
- **Post Management**: View all posts with filtering by visibility
- **Delete Posts**: Remove posts with confirmation
- **Real-time Updates**: Posts appear immediately after creation
- **Responsive Design**: Works seamlessly on desktop and mobile

### 📊 Dashboard Features
- **Post List**: Beautiful card-based layout with post previews
- **Filter Buttons**: Quick filter by visibility with post counts
- **Post Information**: Author name, creation date, and update timestamps
- **Search & Organization**: Easily find posts by visibility

## Project Structure

```
auth-app/
├── app/
│   ├── api/
│   │   └── posts/
│   │       ├── route.ts              # GET/POST for all posts
│   │       └── [id]/route.ts         # GET/PUT/DELETE for single post
│   ├── page.tsx                      # Main dashboard page
│   ├── layout.tsx                    # Root layout
│   └── globals.css                   # Global styles
├── components/
│   ├── Dashboard.tsx                 # Main dashboard component
│   ├── PostForm.tsx                  # Form for creating posts
│   ├── PostCard.tsx                  # Individual post display
│   └── VisibilitySelector.tsx        # Visibility picker
├── lib/
│   └── types.ts                      # TypeScript type definitions
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── tailwind.config.js                # Tailwind CSS config
└── postcss.config.js                 # PostCSS config
```

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
cd auth-app
npm install
```

### Development
```bash
npm run dev
```
Visit `http://localhost:3000` in your browser.

### Production Build
```bash
npm run build
npm start
```

## API Endpoints

### Posts
- **GET /api/posts** - Fetch all posts
- **POST /api/posts** - Create a new post
  ```json
  {
    "title": "My First Post",
    "content": "Post content here...",
    "visibility": "public"
  }
  ```

- **GET /api/posts/[id]** - Get a specific post
- **PUT /api/posts/[id]** - Update a post
- **DELETE /api/posts/[id]** - Delete a post

## Component Documentation

### Dashboard
Main component that orchestrates the entire app. Manages post state and API interactions.
- **State**: posts, loading, submitting, error, filterVisibility
- **Features**: Fetch, create, delete posts; filter by visibility

### PostForm
Reusable form component for creating new posts.
- **Props**: onSubmit (async), isLoading (boolean)
- **Validation**: Checks for title and content
- **Features**: Clear form after successful submission, error/success messages

### VisibilitySelector
Radio-button style selector for post visibility.
- **Props**: value, onChange
- **Options**: Public, Private, Friends
- **UI**: Visual indicators with descriptions

### PostCard
Displays individual post with metadata.
- **Props**: post, onDelete (optional), onEdit (optional)
- **Features**: Formatted dates, visibility badges, action buttons

## Type Definitions

```typescript
type PostVisibility = 'public' | 'private' | 'friends';

interface Post {
  id: string;
  title: string;
  content: string;
  visibility: PostVisibility;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

interface CreatePostInput {
  title: string;
  content: string;
  visibility: PostVisibility;
}
```

## Styling

The app uses **Tailwind CSS 4** for a modern, responsive design:
- Blue gradient background (`from-blue-50 to-indigo-100`)
- Card-based layout with shadows and hover effects
- Responsive grid (3-column on desktop, 1-column on mobile)
- Color-coded visibility indicators with emoji icons
- Smooth transitions and animations

## Current Storage

⚠️ **Note**: Currently uses in-memory storage. For production:
- Replace mock storage with a real database (PostgreSQL, MongoDB, etc.)
- Add authentication/authorization
- Implement friend relationships
- Add database persistence

## Future Enhancements

- 💾 Database Integration (PostgreSQL/MongoDB)
- 🔐 User Authentication & Authorization
- 👥 Friend Management System
- 📝 Post Editing Interface
- 🏷️ Tags & Categories
- 💬 Comments & Likes
- 🔍 Search Functionality
- 📱 Mobile App (React Native)
- 🌙 Dark Mode Theme
- 📧 Email Notifications

## Troubleshooting

### Port 3000 in use
```bash
# Kill the process using port 3000
taskkill /PID <PID> /F

# Or use a different port
PORT=3001 npm run dev
```

### TypeScript Errors
```bash
npm run lint
```

### Build Failures
```bash
rm -rf .next node_modules
npm install
npm run build
```

## Dependencies

- **next**: 16.2.9 - React framework
- **react**: 19.2.4 - UI library
- **react-dom**: 19.2.4 - DOM rendering
- **tailwindcss**: 4 - Utility-first CSS
- **@tailwindcss/postcss**: 4 - PostCSS plugin

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## License

MIT License - Feel free to use and modify for your projects.

---

**Happy Blogging! 📝✨**
