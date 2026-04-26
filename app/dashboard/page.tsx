'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics/summary')
      .then(res => res.json())
      .then(data => {
        setAnalytics(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="clay-card text-center">
          <div className="text-2xl text-[#3B82F6]">Đang tải dữ liệu...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="clay-card mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1C398E]" style={{ fontFamily: 'var(--font-be-vietnam-pro)' }}>
            Dashboard Phân Tích
          </h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="clay-card text-center">
            <div className="text-sm text-[#64748B] mb-2">Tổng số phản hồi</div>
            <div className="text-4xl font-bold text-[#3B82F6]" style={{ fontFamily: 'var(--font-be-vietnam-pro)' }}>
              {analytics?.totalResponses || 0}
            </div>
          </div>
          <div className="clay-card text-center">
            <div className="text-sm text-[#64748B] mb-2">Điểm trung bình</div>
            <div className="text-4xl font-bold text-[#16A34A]" style={{ fontFamily: 'var(--font-be-vietnam-pro)' }}>
              {analytics?.averageScore || 0}
            </div>
          </div>
          <div className="clay-card text-center">
            <div className="text-sm text-[#64748B] mb-2">Điểm cao nhất</div>
            <div className="text-4xl font-bold text-[#D97706]" style={{ fontFamily: 'var(--font-be-vietnam-pro)' }}>
              {analytics?.maxScore || 0}
            </div>
          </div>
        </div>

        {/* Score Distribution */}
        {analytics?.scoreDistribution && (
          <div className="clay-card mb-6">
            <h2 className="text-xl font-bold text-[#1C398E] mb-4" style={{ fontFamily: 'var(--font-be-vietnam-pro)' }}>
              Phân bố điểm số
            </h2>
            <div className="space-y-3">
              {Object.entries(analytics.scoreDistribution).map(([range, count]: [string, any]) => (
                <div key={range} className="flex items-center gap-3">
                  <span className="w-20 text-sm text-[#1C398E]">{range}</span>
                  <div className="flex-1 h-6 bg-[#E0F2FE] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] rounded-full"
                      style={{ width: `${(count / (analytics?.totalResponses || 1)) * 100}%` }}
                    />
                  </div>
                  <span className="w-12 text-sm text-[#64748B] text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/survey" className="clay-button">
            Làm khảo sát
          </Link>
          <Link href="/" className="clay-button" style={{ background: 'linear-gradient(145deg, #64748B, #475569)' }}>
            Trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}