import fs from 'fs';
import path from 'path';

export type PolicyCategory = 'LUẬT' | 'NGHỊ ĐỊNH' | 'THÔNG TƯ';

export interface PolicyItem {
  stt: number;
  category: PolicyCategory;
  title: string;
  summary: string;
  sourceUrl: string;
  year: number | null;
}

interface PolicyCache {
  loadedAt: number;
  items: PolicyItem[];
}

const TEXT_FILE = path.join(process.cwd(), 'Luật_Nghị Định_Thông Tư.txt');

let cache: PolicyCache | null = null;

function normalizeText(value: string): string {
  return value.replace(/\s+/g, ' ').replace(/\s*,\s*/g, ', ').trim();
}

function normalizeCategory(value: string): PolicyCategory | null {
  const normalized = value.trim().toLowerCase();
  if (normalized === 'luật' || normalized === 'luat') return 'LUẬT';
  if (normalized === 'nghị định' || normalized === 'nghi dinh') return 'NGHỊ ĐỊNH';
  if (normalized === 'thông tư' || normalized === 'thong tu') return 'THÔNG TƯ';
  return null;
}

function parsePoliciesFromText(): PolicyItem[] {
  const content = fs.readFileSync(TEXT_FILE, 'utf8');
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const items: PolicyItem[] = [];

  for (const [index, line] of lines.entries()) {
    const parts = line.split('|').map((part) => normalizeText(part));
    if (parts.length < 3) continue;

    const category = normalizeCategory(parts[0]);
    const title = parts[1];
    const sourceUrl = parts[2];

    if (!category || !title || !sourceUrl) {
      continue;
    }

    const summary = title.includes(',') ? title.split(',').slice(1).join(',').trim() : title;
    const yearMatch = title.match(/20\d{2}/);
    const year = yearMatch ? Number(yearMatch[0]) : null;

    items.push({
      stt: index + 1,
      category,
      title,
      summary,
      sourceUrl,
      year,
    });
  }

  return items;
}

export function getPolicies(options?: { forceRefresh?: boolean }): PolicyCache {
  if (!options?.forceRefresh && cache) {
    return cache;
  }

  const items = parsePoliciesFromText();
  cache = {
    loadedAt: Date.now(),
    items,
  };

  return cache;
}
