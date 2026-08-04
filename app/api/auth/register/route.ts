import { NextRequest, NextResponse } from 'next/server';
import * as crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const hashedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');

    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      message: 'User registered successfully',
      user: { id: newUser.id, name, email },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
