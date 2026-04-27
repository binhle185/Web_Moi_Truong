'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SurveyForm from '@/src/components/survey/SurveyForm';

export default function SurveyPage() {
  const [userId, setUserId] = useState('');
  const router = useRouter();

  const handleSubmit = async (responses: Record<string, any>) => {
    const res = await fetch('/api/survey/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, responses }),
    });

    if (!res.ok) {
      return;
    }

    const data = await res.json();
    const params = new URLSearchParams();

    if (data.responseId) {
      params.set('responseId', data.responseId);
    }

    if (data.userId) {
      params.set('userId', data.userId);
    }

    router.push(`/result?${params.toString()}`);
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-lg mx-auto">
        <div className="clay-card mb-6">
          <h1 className="text-2xl font-bold text-center text-[#1C398E]" style={{ fontFamily: 'var(--font-be-vietnam-pro)' }}>
            Khảo sát hành động bảo vệ môi trường
          </h1>
        </div>
        
        <div className="clay-card mb-6">
          <label className="block text-sm font-medium text-[#1C398E] mb-2">
            Mã người dùng
          </label>
          <input
            type="text"
            placeholder="Nhập mã của bạn"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="clay-input w-full"
          />
          <p className="mt-2 text-xs text-[#64748B]">
            Nhập mã để lưu kết quả và xem lại sau
          </p>
        </div>
        
        <SurveyForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}