import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/db';
import UserResponse from '@/src/models/UserResponse';
import { calculateScore, getRecommendations } from '@/src/modules/scoring';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { userId, responses } = await request.json();

    if (!responses || typeof responses !== 'object') {
      return NextResponse.json({ error: 'Responses are required' }, { status: 400 });
    }

    const normalizedUserId =
      typeof userId === 'string' && userId.trim().length > 0 ? userId.trim() : null;

    const score = calculateScore(responses);
    const recommendations = getRecommendations(score);

    const userResponse = new UserResponse({
      userId: normalizedUserId,
      responses,
      score,
      recommendations,
    });

    await userResponse.save();

    return NextResponse.json({
      score,
      recommendations,
      responseId: userResponse._id.toString(),
      userId: normalizedUserId,
    });
  } catch (error) {
    console.error('Survey submit error:', error);
    
    // Kiểm tra loại lỗi để trả về status code phù hợp
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }
    
    return NextResponse.json({ error: 'Failed to submit survey' }, { status: 500 });
  }
}