import { NextRequest, NextResponse } from 'next/server';
import { getPolicies, PolicyCategory, PolicyItem } from '@/src/modules/policy-reader';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

function parsePositiveInt(value: string | null, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return Math.floor(parsed);
}

function sortPolicies(items: PolicyItem[], sortBy: string | null): PolicyItem[] {
  const copied = [...items];

  if (sortBy === 'oldest') {
    copied.sort((a, b) => (a.year ?? 0) - (b.year ?? 0) || a.stt - b.stt);
    return copied;
  }

  if (sortBy === 'title') {
    copied.sort((a, b) => a.title.localeCompare(b.title, 'vi'));
    return copied;
  }

  copied.sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.stt - b.stt);
  return copied;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword')?.trim().toLowerCase() ?? '';
    const category = searchParams.get('category')?.trim().toUpperCase() as PolicyCategory | null;
    const page = parsePositiveInt(searchParams.get('page'), DEFAULT_PAGE);
    const limit = Math.min(parsePositiveInt(searchParams.get('limit'), DEFAULT_LIMIT), MAX_LIMIT);
    const sortBy = searchParams.get('sortBy');

    const { items, loadedAt } = getPolicies();

    let filtered = items;

    if (category && ['LUẬT', 'NGHỊ ĐỊNH', 'THÔNG TƯ'].includes(category)) {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (keyword) {
      filtered = filtered.filter((item) => {
        const candidate = `${item.title} ${item.summary}`.toLowerCase();
        return candidate.includes(keyword);
      });
    }

    const sorted = sortPolicies(filtered, sortBy);
    const total = sorted.length;
    const totalPages = total > 0 ? Math.ceil(total / limit) : 1;
    const safePage = Math.min(page, totalPages);
    const offset = (safePage - 1) * limit;
    const data = sorted.slice(offset, offset + limit);

    return NextResponse.json({
      data,
      pagination: {
        page: safePage,
        limit,
        total,
        totalPages,
      },
      filters: {
        keyword: keyword || null,
        category: category || null,
        sortBy: sortBy || 'latest',
      },
      refreshedAt: new Date(loadedAt).toISOString(),
    });
  } catch (error) {
    console.error('Policy list error:', error);
    return NextResponse.json({ error: 'Failed to get policy list' }, { status: 500 });
  }
}
