'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    fetch('/api/analytics/summary')
      .then(res => res.json())
      .then(data => setAnalytics(data));
  }, []);

  if (!analytics) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Dashboard Analytics</h1>
      <p>Tổng số phản hồi: {analytics.totalResponses}</p>
      <p>Điểm trung bình: {analytics.averageScore}</p>
    </div>
  );
}