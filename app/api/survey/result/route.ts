import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/db';
import UserResponse from '@/src/models/UserResponse';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const responseId = searchParams.get('responseId');

    if (responseId) {
      const response = await UserResponse.findById(responseId);

      if (!response) {
        return NextResponse.json({ error: 'No response found' }, { status: 404 });
      }

      return NextResponse.json({
        score: response.score,
        recommendations: response.recommendations,
        userId: response.userId,
      });
    }

    if (!userId) {
      return NextResponse.json({ error: 'userId or responseId is required' }, { status: 400 });
    }

    const normalizedUserId = userId.trim();
    if (!normalizedUserId) {
      return NextResponse.json({ error: 'userId cannot be empty' }, { status: 400 });
    }

    const response = await UserResponse.findOne({ userId: normalizedUserId }).sort({ createdAt: -1 });

    if (!response) {
      return NextResponse.json({ error: 'No response found' }, { status: 404 });
    }

    return NextResponse.json({
      score: response.score,
      recommendations: response.recommendations,
      userId: response.userId,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get result' }, { status: 500 });
  }
}