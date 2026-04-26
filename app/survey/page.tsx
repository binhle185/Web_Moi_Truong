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
    const data = await res.json();
    router.push(`/result?userId=${userId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Khảo sát hành động bảo vệ môi trường</h1>
      <input
        type="text"
        placeholder="Nhập ID người dùng"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="mb-4 p-2 border"
      />
      <SurveyForm onSubmit={handleSubmit} />
    </div>
  );
}