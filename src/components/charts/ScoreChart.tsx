'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ScoreChartProps {
  score: number;
  maxScore: number;
}

export default function ScoreChart({ score, maxScore }: ScoreChartProps) {
  const getScoreColor = (value: number) => {
    if (value >= 80) return '#16A34A';
    if (value >= 60) return '#3B82F6';
    if (value >= 40) return '#D97706';
    return '#DC2626';
  };

  const data = [
    { name: 'Điểm của bạn', score, fill: getScoreColor(score) },
    { name: 'Trung bình', value: Math.round(maxScore * 0.6), fill: '#94A3B8' },
    { name: 'Điểm tối đa', value: maxScore, fill: '#E0F2FE' },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} barSize={50}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E0F2FE" />
        <XAxis 
          dataKey="name" 
          tick={{ fill: '#1C398E', fontSize: 12 }}
          axisLine={{ stroke: '#3B82F6' }}
        />
        <YAxis 
          tick={{ fill: '#1C398E', fontSize: 12 }}
          axisLine={{ stroke: '#3B82F6' }}
        />
        <Tooltip 
          contentStyle={{ 
            background: '#FFFFFF', 
            borderRadius: '16px',
            boxShadow: '4px 4px 8px rgba(59, 130, 246, 0.15), -4px -4px 8px rgba(255, 255, 255, 0.8)',
            border: 'none'
          }}
          labelStyle={{ color: '#1C398E', fontWeight: 600 }}
        />
        <Bar dataKey="score" radius={[8, 8, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}