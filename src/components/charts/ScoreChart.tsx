'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ScoreChartProps {
  score: number;
  maxScore: number;
}

export default function ScoreChart({ score, maxScore }: ScoreChartProps) {
  const data = [
    { name: 'Điểm của bạn', score },
    { name: 'Điểm tối đa', maxScore },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="score" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}