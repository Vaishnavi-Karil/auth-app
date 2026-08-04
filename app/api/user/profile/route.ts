import { NextRequest, NextResponse } from 'next/server';

const mockUserProfile = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  bio: 'Welcome to my profile! I love building amazing applications.',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test',
  joinedDate: '2024-01-15',
  location: 'San Francisco, CA',
  website: 'https://example.com',
};

export async function GET(request: NextRequest) {
  return NextResponse.json(mockUserProfile);
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const updatedProfile = { ...mockUserProfile, ...body };

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: updatedProfile,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
