import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/src/lib/db';
import UserResponse from '@/src/models/UserResponse';

export async function GET() {
  try {
    await dbConnect();
    const responses = await UserResponse.find({});
    const totalResponses = responses.length;
    const averageScore = responses.reduce((sum, r) => sum + r.score, 0) / totalResponses || 0;

    return NextResponse.json({
      totalResponses,
      averageScore: Math.round(averageScore * 100) / 100,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get analytics' }, { status: 500 });
  }
}