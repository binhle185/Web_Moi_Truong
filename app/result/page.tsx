'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ScoreChart from '@/src/components/charts/ScoreChart';

export default function ResultPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  useEffect(() => {
    if (userId) {
      fetch(`/api/survey/result?userId=${userId}`)
        .then(res => res.json())
        .then(data => {
          setResult(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="clay-card text-center">
          <div className="text-2xl text-[#3B82F6]">Đang tải kết quả...</div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="clay-card text-center max-w-md">
          <h2 className="text-xl font-bold text-[#DC2626] mb-4">Không tìm thấy kết quả</h2>
          <p className="text-[#64748B] mb-6">Vui lòng thực hiện khảo sát trước.</p>
          <Link href="/survey" className="clay-button inline-block">
            Làm khảo sát ngay
          </Link>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#16A34A';
    if (score >= 60) return '#3B82F6';
    if (score >= 40) return '#D97706';
    return '#DC2626';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return 'Xuất sắc! Bạn là người bảo vệ môi trường xuất sắc.';
    if (score >= 60) return 'Tốt! Bạn đang có những hành động tích cực.';
    if (score >= 40) return 'Khá! Cần cải thiện thêm.';
    return 'Cần cải thiện nhiều hơn.';
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="clay-card mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1C398E]" style={{ fontFamily: 'var(--font-be-vietnam-pro)' }}>
            Kết quả khảo sát
          </h1>
          <p className="text-[#64748B] mt-2">Mã: {userId}</p>
        </div>

        {/* Score Card */}
        <div className="clay-card mb-6 text-center">
          <div className="text-sm text-[#64748B] mb-2">Điểm số của bạn</div>
          <div 
            className="text-5xl md:text-6xl font-bold mb-2"
            style={{ color: getScoreColor(result.score), fontFamily: 'var(--font-be-vietnam-pro)' }}
          >
            {result.score}
            <span className="text-2xl text-[#64748B]">/100</span>
          </div>
          <p className="text-lg text-[#1C398E]">{getScoreMessage(result.score)}</p>
        </div>

        {/* Chart */}
        <div className="clay-card mb-6">
          <ScoreChart score={result.score} maxScore={100} />
        </div>

        {/* Recommendations */}
        <div className="clay-card">
          <h2 className="text-xl font-bold text-[#1C398E] mb-4" style={{ fontFamily: 'var(--font-be-vietnam-pro)' }}>
            Khuyến nghị cải thiện
          </h2>
          <ul className="space-y-3">
            {result.recommendations?.map((rec: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3B82F6] text-white flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                <span className="text-[#1C398E]">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link href="/survey" className="clay-button">
            Làm lại khảo sát
          </Link>
          <Link href="/" className="clay-button" style={{ background: 'linear-gradient(145deg, #64748B, #475569)' }}>
            Trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}