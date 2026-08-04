import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for demonstration (replace with database in production)
const posts: any[] = [];

export async function GET(request: NextRequest) {
  try {
    // Filter posts based on visibility and user context
    // For now, return all posts (in production, filter based on user authentication)
    return NextResponse.json({
      success: true,
      data: posts,
      count: posts.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, visibility } = body;

    // Validate input
    if (!title || !content || !visibility) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!['public', 'private', 'friends'].includes(visibility)) {
      return NextResponse.json(
        { success: false, error: 'Invalid visibility setting' },
        { status: 400 }
      );
    }

    const newPost = {
      id: `post_${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      visibility,
      authorId: 'current_user',
      authorName: 'John Doe', // In production, get from session/auth
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    posts.unshift(newPost); // Add to beginning for newest first

    return NextResponse.json(
      {
        success: true,
        data: newPost,
        message: 'Post created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
