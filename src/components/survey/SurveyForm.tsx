'use client';

import { useState } from 'react';
import {
  SurveyResponseValue,
  getVisibleSurveyQuestions,
} from '@/src/lib/constants';

export default function SurveyForm({ onSubmit }: { onSubmit: (responses: Record<string, any>) => void }) {
  const [responses, setResponses] = useState<Record<string, SurveyResponseValue | undefined>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const visibleQuestions = getVisibleSurveyQuestions(responses);
  const question = visibleQuestions[currentQuestion];
  const progress = visibleQuestions.length > 0 ? ((currentQuestion + 1) / visibleQuestions.length) * 100 : 0;

  const handleAnswer = (questionId: number, answer: SurveyResponseValue) => {
    const nextResponses = { ...responses, [questionId]: answer };
    setResponses(nextResponses);
  };

  const nextQuestion = () => {
    if (!question) return;

    if (currentQuestion < visibleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onSubmit(responses);
    }
  };
  const selectedAnswer = question ? responses[question.id] : undefined;

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      {/* Progress Bar */}
      <div className="clay-card mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-[#1C398E]">Câu hỏi {currentQuestion + 1}/{visibleQuestions.length}</span>
          <span className="text-sm font-medium text-[#3B82F6]">{Math.round(progress)}%</span>
        </div>
        <div className="h-3 bg-[#E0F2FE] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="clay-card">
        {!question && (
          <div className="text-center text-[#1C398E]">
            Không có câu hỏi khả dụng.
          </div>
        )}

        {question && (
          <>
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-[#1C398E]" style={{ fontFamily: 'var(--font-be-vietnam-pro)' }}>
          <span className="text-sm block mb-2 text-[#64748B]">Mục {question.section}</span>
          {question.question}
        </h2>

        {/* Multiple Choice */}
        {question.type === 'multiple_choice' && (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(question.id, { value: option.value, label: option.text, score: option.score })}
                className={`clay-option w-full text-left ${selectedAnswer?.value === option.value ? 'selected' : ''}`}
              >
                <span className="text-[#1C398E]">{option.text}</span>
              </button>
            ))}
          </div>
        )}

        {/* Range/Number Input */}
        {(question.type === 'range' || question.type === 'number') && (
          <div>
            <input
              type="number"
              value={typeof selectedAnswer?.value === 'number' ? selectedAnswer.value : ''}
              min={question.min}
              max={question.max}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (Number.isNaN(value)) {
                  handleAnswer(question.id, { value: 0, score: 0 });
                  return;
                }
                const score = question.scoring ? question.scoring(value) : 0;
                handleAnswer(question.id, { value, score });
              }}
              placeholder={question.placeholder || 'Nhập số...'}
              className="clay-input w-full text-lg"
            />
            {question.unit && (
              <p className="mt-2 text-sm text-[#64748B]">{question.unit}</p>
            )}
          </div>
        )}

        {question.type === 'text' && (
          <div>
            <textarea
              value={typeof selectedAnswer?.value === 'string' ? selectedAnswer.value : ''}
              onChange={(e) => handleAnswer(question.id, { value: e.target.value, score: 0 })}
              placeholder={question.placeholder || 'Nhập câu trả lời...'}
              className="clay-input w-full text-base min-h-24"
            />
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => {
              if (currentQuestion > 0) {
                setCurrentQuestion(currentQuestion - 1);
              }
            }}
            disabled={currentQuestion === 0}
            className={`clay-button ${currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{ background: currentQuestion === 0 ? '#94A3B8' : 'linear-gradient(145deg, #64748B, #475569)' }}
          >
            ← Trước
          </button>
          <button
            onClick={nextQuestion}
            disabled={!selectedAnswer || selectedAnswer.value === ''}
            className={`clay-button ${!selectedAnswer || selectedAnswer.value === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {currentQuestion < visibleQuestions.length - 1 ? 'Tiếp theo' : 'Hoàn thành'} →
          </button>
        </div>
          </>
        )}
      </div>
    </div>
  );
}