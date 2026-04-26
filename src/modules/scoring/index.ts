// Scoring algorithm for environmental actions
export function calculateScore(responses: Record<string, any>): number {
  let totalScore = 0;
  Object.entries(responses).forEach(([key, value]: [string, any]) => {
    if (typeof value === 'number') {
      // For number questions, apply scoring function if available
      const questionId = parseInt(key);
      if (questionId === 3) { // Electricity
        totalScore += value < 100 ? 5 : value < 300 ? 3 : 1;
      } else if (questionId === 5) { // Water
        totalScore += value < 50 ? 5 : value < 100 ? 3 : 1;
      } else {
        totalScore += value;
      }
    } else {
      totalScore += value;
    }
  });
  return totalScore;
}

export function getRecommendations(score: number): string[] {
  if (score > 15) {
    return ['Tiếp tục duy trì các hành động tốt!', 'Chia sẻ kinh nghiệm với người khác.'];
  } else if (score > 10) {
    return ['Hãy thử đi xe đạp nhiều hơn.', 'Tái chế rác thải.'];
  } else {
    return ['Giảm sử dụng ô tô cá nhân.', 'Tiết kiệm năng lượng.'];
  }
}