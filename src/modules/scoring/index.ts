import { getMaxPossibleScore, SurveyResponseValue } from '@/src/lib/constants';

// Scoring algorithm normalized to 0-100
export function calculateScore(responses: Record<string, SurveyResponseValue | undefined>): number {
  const totalScore = Object.values(responses).reduce((sum, answer) => sum + (answer?.score ?? 0), 0);
  const maxScore = getMaxPossibleScore(responses);
  if (maxScore <= 0) return 0;
  return Math.round((totalScore / maxScore) * 100);
}

export function getRecommendations(score: number): string[] {
  if (score >= 80) {
    return [
      'Bạn đang duy trì lối sống xanh tốt, hãy tiếp tục phát huy.',
      'Chia sẻ thói quen tích cực với gia đình và cộng đồng.',
    ];
  }

  if (score >= 60) {
    return [
      'Ưu tiên phương tiện công cộng/xe điện/đi bộ khi có thể.',
      'Tăng cường phân loại rác và giảm đồ nhựa dùng một lần.',
      'Theo dõi chỉ số AQI thường xuyên để bảo vệ sức khỏe.',
    ];
  }

  if (score >= 40) {
    return [
      'Giảm tần suất dùng xe cá nhân chạy nhiên liệu hóa thạch.',
      'Duy trì tắt thiết bị điện khi không sử dụng.',
      'Chuyển dần sang sản phẩm thân thiện với môi trường.',
    ];
  }

  return [
    'Bắt đầu từ các thay đổi nhỏ: tắt điện, tái chế, phân loại rác.',
    'Xem xét thay thế dần phương tiện phát thải cao.',
    'Tìm hiểu thêm về luật và kiến thức bảo vệ môi trường không khí.',
  ];
}