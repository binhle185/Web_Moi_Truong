import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/db';
import UserResponse from '@/src/models/UserResponse';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const response = await UserResponse.findOne({ userId }).sort({ createdAt: -1 });

    if (!response) {
      return NextResponse.json({ error: 'No response found' }, { status: 404 });
    }

    return NextResponse.json({
      score: response.score,
      recommendations: response.recommendations,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get result' }, { status: 500 });
  }
}