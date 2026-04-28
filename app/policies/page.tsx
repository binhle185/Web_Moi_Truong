import Link from 'next/link';
import { getPolicies, PolicyCategory } from '@/src/modules/policy-reader';

type FilterValue = 'ALL' | PolicyCategory;

const FILTER_OPTIONS: Array<{ label: string; value: FilterValue }> = [
  { label: 'Tất cả', value: 'ALL' },
  { label: 'Thông tư', value: 'THÔNG TƯ' },
  { label: 'Nghị định', value: 'NGHỊ ĐỊNH' },
  { label: 'Luật', value: 'LUẬT' },
];

interface PoliciesPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

function parseFilter(raw: string | string[] | undefined): FilterValue {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (value === 'THÔNG TƯ' || value === 'NGHỊ ĐỊNH' || value === 'LUẬT') {
    return value;
  }
  return 'ALL';
}

export default async function PoliciesPage({ searchParams }: PoliciesPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const selectedFilter = parseFilter(params?.category);
  const { items, loadedAt } = getPolicies();
  const filteredItems =
    selectedFilter === 'ALL'
      ? items
      : items.filter((item) => item.category === selectedFilter);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="clay-card mb-6">
        <h1
          className="text-2xl md:text-3xl font-bold text-[#1C398E] mb-2"
          style={{ fontFamily: 'var(--font-poppins)' }}
        >
          Danh sách thông tư, nghị định và luật
        </h1>
        <p className="mt-2 text-sm text-[#64748B]">
          Cập nhật lần cuối: {new Date(loadedAt).toLocaleString('vi-VN')}
        </p>
      </div>

      <section className="mb-6">
        <div className="flex flex-wrap gap-2">
          {FILTER_OPTIONS.map((option) => {
            const isActive = option.value === selectedFilter;
            const href = option.value === 'ALL' ? '/policies' : `/policies?category=${encodeURIComponent(option.value)}`;

            return (
              <Link
                key={option.value}
                href={href}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                  isActive
                    ? 'bg-[#1C398E] text-white border-[#1C398E]'
                    : 'bg-white/80 text-[#1C398E] border-[#1C398E]/20 hover:bg-white'
                }`}
              >
                {option.label}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-[#1C398E] mb-4">
          {selectedFilter === 'ALL' ? 'Tất cả văn bản' : `Danh sách ${selectedFilter.toLowerCase()}`}
        </h2>
        <div className="grid gap-4">
          {filteredItems.map((item) => (
            <article key={`${item.category}-${item.stt}`} className="clay-card">
              <p className="text-xs uppercase tracking-wide text-[#64748B] mb-2">
                {item.category} {item.year ? `• ${item.year}` : ''}
              </p>
              <h3 className="text-lg font-semibold text-[#1C398E] mb-2">{item.title}</h3>
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-4 py-2 rounded-lg bg-[#1C398E] text-white text-sm font-medium"
              >
                Xem văn bản
              </a>
            </article>
          ))}
        </div>
        {filteredItems.length === 0 && (
          <p className="text-sm text-[#64748B] mt-4">Không có văn bản phù hợp với bộ lọc đã chọn.</p>
        )}
      </section>
    </div>
  );
}
