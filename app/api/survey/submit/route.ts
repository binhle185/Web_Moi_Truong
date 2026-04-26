import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/db';
import UserResponse from '@/src/models/UserResponse';
import { calculateScore, getRecommendations } from '@/src/modules/scoring';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { userId, responses } = await request.json();

    const score = calculateScore(responses);
    const recommendations = getRecommendations(score);

    const userResponse = new UserResponse({
      userId,
      responses,
      score,
      recommendations,
    });

    await userResponse.save();

    return NextResponse.json({ score, recommendations });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit survey' }, { status: 500 });
  }
}