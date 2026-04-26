'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { connection } from 'next/server';
import ScoreChart from '@/src/components/charts/ScoreChart';

export default async function ResultPage() {
  await connection();

  const [result, setResult] = useState<any>(null);
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  useEffect(() => {
    if (userId) {
      fetch(`/api/survey/result?userId=${userId}`)
        .then(res => res.json())
        .then(data => setResult(data));
    }
  }, [userId]);

  if (!result) return <div>Loading...</div>;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Kết quả khảo sát</h1>
      <p>Điểm số: {result.score}</p>
      <ScoreChart score={result.score} maxScore={30} />
      <h2>Khuyến nghị:</h2>
      <ul>
        {result.recommendations.map((rec: string, index: number) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
    </div>
  );
}