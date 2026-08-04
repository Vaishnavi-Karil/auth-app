import { NextRequest, NextResponse } from 'next/server';
import * as crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Missing email or password' },
        { status: 400 }
      );
    }

    const mockUsers: Record<string, any> = {
      'test@example.com': {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        password: crypto.createHash('sha256').update('password123').digest('hex'),
        bio: 'Welcome to my profile!',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test',
      },
    };

    const user = mockUsers[email];

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const hashedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');

    if (user.password !== hashedPassword) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    const token = crypto.randomUUID();

    return NextResponse.json(
      {
        message: 'Login successful',
        token,
        user: { id: user.id, name: user.name, email: user.email },
      },
      {
        headers: {
          'Set-Cookie': `token=${token}; Path=/; HttpOnly; Max-Age=86400`,
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
