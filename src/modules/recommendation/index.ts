// Personalized recommendations
export function generateRecommendations(responses: Record<string, any>): string[] {
  const recommendations: string[] = [];
  // Based on responses, generate recommendations
  if (responses[1] === 1) { // Car
    recommendations.push('Hãy thử sử dụng phương tiện công cộng hoặc xe đạp.');
  }
  // Add more logic
  return recommendations;
}