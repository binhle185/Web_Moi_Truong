'use client';

import { useState } from 'react';
import { surveyQuestions } from '@/src/lib/constants';

export default function SurveyForm({ onSubmit }: { onSubmit: (responses: Record<string, any>) => void }) {
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswer = (questionId: number, answer: any) => {
    setResponses({ ...responses, [questionId]: answer });
  };

  const nextQuestion = () => {
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onSubmit(responses);
    }
  };

  const question = surveyQuestions[currentQuestion];

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl mb-4">{question.question}</h2>
      {question.type === 'multiple_choice' && (
        <div>
          {question.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(question.id, option.score)}
              className="block w-full mb-2 p-2 border"
            >
              {option.text}
            </button>
          ))}
        </div>
      )}
      {question.type === 'yes_no' && (
        <div>
          <button onClick={() => handleAnswer(question.id, question.yesScore)} className="mr-2 p-2 border">Có</button>
          <button onClick={() => handleAnswer(question.id, question.noScore)} className="p-2 border">Không</button>
        </div>
      )}
      {question.type === 'range' && (
        <input
          type="number"
          onChange={(e) => handleAnswer(question.id, parseInt(e.target.value))}
          className="p-2 border"
        />
      )}
      {question.type === 'number' && (
        <input
          type="number"
          onChange={(e) => handleAnswer(question.id, parseInt(e.target.value))}
          className="p-2 border"
        />
      )}
      <button onClick={nextQuestion} className="mt-4 p-2 bg-blue-500 text-white">
        {currentQuestion < surveyQuestions.length - 1 ? 'Tiếp theo' : 'Hoàn thành'}
      </button>
    </div>
  );
}