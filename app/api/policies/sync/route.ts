import { NextResponse } from 'next/server';
import { getPolicies } from '@/src/modules/policy-reader';

export async function POST() {
  try {
    const { items, loadedAt } = getPolicies({ forceRefresh: true });

    return NextResponse.json({
      message: 'Policies synced successfully',
      total: items.length,
      refreshedAt: new Date(loadedAt).toISOString(),
    });
  } catch (error) {
    console.error('Policy sync error:', error);
    return NextResponse.json({ error: 'Failed to sync policies' }, { status: 500 });
  }
}
