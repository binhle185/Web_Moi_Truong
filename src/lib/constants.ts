export interface SurveyOption {
  text: string;
  value: string;
  score: number;
}

export interface QuestionDependency {
  questionId: number;
  allowedValues: string[];
}

export interface SurveyQuestion {
  id: number;
  question: string;
  section: string;
  type: 'multiple_choice' | 'number' | 'range' | 'text';
  options?: SurveyOption[];
  scoring?: (value: number) => number;
  placeholder?: string;
  unit?: string;
  min?: number;
  max?: number;
  dependency?: QuestionDependency;
}

export interface SurveyResponseValue {
  value: string | number;
  score: number;
  label?: string;
}

export const surveyQuestions: SurveyQuestion[] = [
  { id: 1, section: 'A', question: 'Anh/Chị hiện đang sinh sống và làm việc tại đâu?', type: 'text', placeholder: 'Nhập địa điểm' },
  { id: 2, section: 'A', question: 'Năm sinh của Anh/Chị', type: 'number', placeholder: 'Ví dụ: 2000', min: 1900, max: 2026, scoring: () => 0 },
  {
    id: 3, section: 'A', question: 'Giới tính', type: 'multiple_choice',
    options: [{ text: 'Nam', value: 'male', score: 0 }, { text: 'Nữ', value: 'female', score: 0 }, { text: 'Khác', value: 'other', score: 0 }],
  },
  {
    id: 4, section: 'A', question: 'Trình độ học vấn hiện tại', type: 'multiple_choice',
    options: [{ text: 'Tiểu học', value: 'primary', score: 0 }, { text: 'Trung học cơ sở', value: 'secondary', score: 0 }, { text: 'Trung học phổ thông', value: 'highschool', score: 0 }, { text: 'Đại học / Cao đẳng', value: 'college', score: 0 }, { text: 'Cao học', value: 'postgraduate', score: 0 }, { text: 'Khác', value: 'other', score: 0 }],
  },
  { id: 5, section: 'A', question: 'Công việc hiện tại của Anh/Chị', type: 'text', placeholder: 'Nhập nghề nghiệp' },
  {
    id: 6, section: 'A', question: 'Mức thu nhập hàng tháng (nếu đang đi làm)', type: 'multiple_choice',
    options: [{ text: 'Dưới 2 triệu đồng', value: 'lt2', score: 0 }, { text: '2 đến dưới 3 triệu đồng', value: '2to3', score: 0 }, { text: '3 đến dưới 7 triệu đồng', value: '3to7', score: 0 }, { text: '7 đến dưới 10 triệu đồng', value: '7to10', score: 0 }, { text: '10 đến dưới 15 triệu đồng', value: '10to15', score: 0 }, { text: 'Trên 15 triệu đồng', value: 'gt15', score: 0 }],
  },
  {
    id: 7, section: 'A', question: 'Mức độ quan tâm đến ô nhiễm không khí', type: 'multiple_choice',
    options: [{ text: 'Không quan tâm', value: 'none', score: 1 }, { text: 'Rất ít quan tâm', value: 'very_low', score: 2 }, { text: 'Ít quan tâm', value: 'low', score: 3 }, { text: 'Quan tâm', value: 'high', score: 4 }, { text: 'Rất quan tâm', value: 'very_high', score: 5 }],
  },
  {
    id: 8, section: 'B', question: 'Anh/Chị sử dụng phương tiện gì di chuyển hàng ngày?', type: 'multiple_choice',
    options: [{ text: 'Xe máy', value: 'motorbike', score: 1 }, { text: 'Xe ô tô', value: 'car', score: 1 }, { text: 'Xe máy điện', value: 'ebike', score: 4 }, { text: 'Xe ô tô điện', value: 'ecar', score: 4 }, { text: 'Xe đạp', value: 'bike', score: 5 }, { text: 'Phương tiện công cộng', value: 'public_transport', score: 5 }, { text: 'Đi bộ', value: 'walk', score: 5 }, { text: 'Khác', value: 'other', score: 3 }],
  },
  {
    id: 9, section: 'B', question: 'Tần suất đi làm bằng phương tiện ở câu 8', type: 'multiple_choice',
    options: [{ text: 'Ít', value: 'low', score: 5 }, { text: 'Thường xuyên', value: 'frequent', score: 2 }],
  },
  {
    id: 10, section: 'B', question: 'Nếu đi xe máy/ô tô, tần suất bảo dưỡng thay nhớt định kỳ?', type: 'multiple_choice',
    dependency: { questionId: 8, allowedValues: ['motorbike', 'car'] },
    options: [{ text: 'Khi xe hư', value: 'only_when_broken', score: 1 }, { text: '1 lần/năm', value: 'once_year', score: 2 }, { text: '2 lần/năm', value: 'twice_year', score: 4 }, { text: '3 lần/năm', value: 'three_year', score: 5 }, { text: 'Khác', value: 'other', score: 3 }],
  },
  {
    id: 11, section: 'B', question: 'Nếu dùng xe máy/ô tô nhiên liệu hóa thạch, tương lai có nhu cầu chuyển sang xe điện/công cộng?', type: 'multiple_choice',
    options: [{ text: 'Không', value: 'no', score: 1 }, { text: 'Có', value: 'yes', score: 5 }],
  },
  {
    id: 12, section: 'C', question: 'Anh/Chị có tắt đèn, quạt khi không sử dụng không?', type: 'multiple_choice',
    options: [{ text: 'Rất hay quên tắt', value: 'very_often_forget', score: 1 }, { text: 'Thỉnh thoảng quên tắt', value: 'sometimes_forget', score: 2 }, { text: 'Ít khi quên tắt', value: 'rarely_forget', score: 4 }, { text: 'Luôn luôn tắt', value: 'always_off', score: 5 }],
  },
  {
    id: 13, section: 'C', question: 'Quan tâm đến nhãn năng lượng trên thiết bị điện?', type: 'multiple_choice',
    options: [{ text: 'Không quan tâm', value: 'none', score: 1 }, { text: 'Rất ít quan tâm', value: 'very_low', score: 2 }, { text: 'Ít quan tâm', value: 'low', score: 3 }, { text: 'Quan tâm', value: 'high', score: 4 }, { text: 'Rất quan tâm', value: 'very_high', score: 5 }],
  },
  {
    id: 14, section: 'C', question: 'Hiện nay tại nhà Anh/Chị sử dụng gì để nấu nướng?', type: 'multiple_choice',
    options: [{ text: 'Than, củi', value: 'coal_wood', score: 1 }, { text: 'Bếp gas', value: 'gas', score: 3 }, { text: 'Bếp điện từ', value: 'induction', score: 5 }, { text: 'Khác', value: 'other', score: 3 }],
  },
  {
    id: 15, section: 'C', question: 'Tần suất nấu ăn tại nhà', type: 'multiple_choice',
    options: [{ text: 'Không nấu ăn tại nhà', value: 'never', score: 5 }, { text: 'Hiếm khi', value: 'very_rare', score: 4 }, { text: 'Ít khi', value: 'rare', score: 3 }, { text: 'Thỉnh thoảng', value: 'sometimes', score: 2 }, { text: 'Thường xuyên', value: 'frequent', score: 1 }],
  },
  { id: 16, section: 'C', question: 'Tại nhà có sử dụng năng lượng mặt trời hoặc năng lượng gió không?', type: 'multiple_choice', options: [{ text: 'Không', value: 'no', score: 1 }, { text: 'Có', value: 'yes', score: 5 }] },
  { id: 17, section: 'C', question: 'Anh/Chị có thường xuyên dọn dẹp nhà cửa trong tuần không?', type: 'multiple_choice', options: [{ text: 'Không', value: 'no', score: 1 }, { text: 'Có', value: 'yes', score: 5 }] },
  { id: 18, section: 'C', question: 'Anh/Chị có trồng cây cảnh trong nhà không?', type: 'multiple_choice', options: [{ text: 'Không', value: 'no', score: 1 }, { text: 'Có', value: 'yes', score: 5 }] },
  {
    id: 19, section: 'D', question: 'Quan tâm đến việc giảm thiểu túi nilon/túi nhựa dùng một lần?', type: 'multiple_choice',
    options: [{ text: 'Không quan tâm', value: 'none', score: 1 }, { text: 'Rất ít quan tâm', value: 'very_low', score: 2 }, { text: 'Ít quan tâm', value: 'low', score: 3 }, { text: 'Quan tâm', value: 'high', score: 4 }, { text: 'Rất quan tâm', value: 'very_high', score: 5 }],
  },
  { id: 20, section: 'D', question: 'Nếu có quan tâm, Anh/Chị đã hành động để giảm thiểu chưa?', type: 'multiple_choice', options: [{ text: 'Không', value: 'no', score: 1 }, { text: 'Có', value: 'yes', score: 5 }] },
  { id: 21, section: 'D', question: 'Anh/Chị có quan tâm đến nhãn sinh thái không?', type: 'multiple_choice', options: [{ text: 'Không', value: 'no', score: 1 }, { text: 'Có', value: 'yes', score: 5 }] },
  { id: 22, section: 'D', question: 'Anh/Chị có thói quen tái sử dụng, tái chế không?', type: 'multiple_choice', options: [{ text: 'Không', value: 'no', score: 1 }, { text: 'Có', value: 'yes', score: 5 }] },
  { id: 23, section: 'D', question: 'Anh/Chị có sử dụng sản phẩm tẩy rửa sinh học, thân thiện môi trường không?', type: 'multiple_choice', options: [{ text: 'Không', value: 'no', score: 1 }, { text: 'Có', value: 'yes', score: 5 }] },
  { id: 24, section: 'E', question: 'Anh/Chị có đang thực hiện phân loại rác thải sinh hoạt không?', type: 'multiple_choice', options: [{ text: 'Không', value: 'no', score: 1 }, { text: 'Có', value: 'yes', score: 5 }] },
  { id: 25, section: 'E', question: 'Anh/Chị có đem pin cũ/thiết bị điện tử hỏng đến điểm thu gom đúng quy định?', type: 'multiple_choice', options: [{ text: 'Không', value: 'no', score: 1 }, { text: 'Có', value: 'yes', score: 5 }] },
  { id: 26, section: 'E', question: 'Anh/Chị có thường xuyên kiểm tra ứng dụng dự báo chất lượng không khí?', type: 'multiple_choice', options: [{ text: 'Không', value: 'no', score: 1 }, { text: 'Có', value: 'yes', score: 5 }] },
  { id: 27, section: 'E', question: 'Anh/Chị có sẵn sàng thay đổi thói quen/hành vi để giảm ô nhiễm không khí không?', type: 'multiple_choice', options: [{ text: 'Không', value: 'no', score: 1 }, { text: 'Có', value: 'yes', score: 5 }] },
  {
    id: 28, section: 'E', question: 'Mức sẵn sàng chia sẻ kiến thức bảo vệ môi trường không khí', type: 'multiple_choice',
    options: [{ text: 'Không đồng ý', value: 'disagree', score: 1 }, { text: 'Hiếm khi', value: 'rare', score: 2 }, { text: 'Thỉnh thoảng', value: 'sometimes', score: 3 }, { text: 'Thường xuyên', value: 'frequent', score: 4 }, { text: 'Rất thường xuyên', value: 'very_frequent', score: 5 }],
  },
  {
    id: 29, section: 'E', question: 'Mức độ quan tâm ứng dụng dự báo chất lượng không khí', type: 'multiple_choice',
    options: [{ text: 'Không quan tâm', value: 'none', score: 1 }, { text: 'Rất ít quan tâm', value: 'very_low', score: 2 }, { text: 'Ít quan tâm', value: 'low', score: 3 }, { text: 'Quan tâm', value: 'high', score: 4 }, { text: 'Rất quan tâm', value: 'very_high', score: 5 }],
  },
  {
    id: 30, section: 'E', question: 'Động lực để thay đổi nhận thức và hành vi bảo vệ môi trường không khí', type: 'multiple_choice',
    options: [{ text: 'Lo ngại sức khỏe do ô nhiễm không khí', value: 'health', score: 5 }, { text: 'Ý thức trách nhiệm bản thân', value: 'responsibility', score: 5 }, { text: 'Chính sách và quy định xử phạt', value: 'policy', score: 4 }, { text: 'Phần thưởng', value: 'reward', score: 3 }, { text: 'Xu hướng sống xanh', value: 'green_trend', score: 4 }, { text: 'Khác', value: 'other', score: 3 }],
  },
  { id: 31, section: 'E', question: 'Anh/Chị có biết về Luật Bảo vệ môi trường 2020 và các văn bản liên quan không?', type: 'multiple_choice', options: [{ text: 'Không', value: 'no', score: 1 }, { text: 'Có', value: 'yes', score: 5 }] },
  { id: 32, section: 'F', question: 'Đánh giá mức độ ô nhiễm không khí hiện tại nơi sinh sống theo thang 1-10 (1 = rất tệ, 10 = rất tốt)', type: 'range', min: 1, max: 10, scoring: (value: number) => Math.max(1, Math.min(5, Math.round(value / 2))) },
  {
    id: 33, section: 'F', question: 'Anh/Chị có cho rằng hoạt động sinh hoạt của bản thân là nguyên nhân gây ô nhiễm không khí?', type: 'multiple_choice',
    options: [{ text: 'Hoàn toàn không đồng ý', value: 'strongly_disagree', score: 1 }, { text: 'Không đồng ý', value: 'disagree', score: 2 }, { text: 'Không có ý kiến', value: 'neutral', score: 3 }, { text: 'Đồng ý', value: 'agree', score: 4 }, { text: 'Hoàn toàn đồng ý', value: 'strongly_agree', score: 5 }],
  },
  { id: 34, section: 'F', question: 'Nếu cho rằng KHÔNG gây ô nhiễm, nguyên nhân do đâu?', type: 'text', placeholder: 'Nhập lý do của bạn' },
  { id: 35, section: 'F', question: 'Đánh giá mức độ tác động của các hoạt động đến môi trường không khí (ghi chú/nhận xét thêm)', type: 'text', placeholder: 'Nhập nhận xét của bạn' },
  { id: 36, section: 'F', question: 'Đề xuất giảm thiểu ô nhiễm không khí (nếu có)', type: 'text', placeholder: 'Nhập đề xuất của bạn' },
  { id: 37, section: 'G', question: 'Anh/Chị có thói quen tìm kiếm thông tin môi trường qua hình thức online không?', type: 'multiple_choice', options: [{ text: 'Không', value: 'no', score: 1 }, { text: 'Có', value: 'yes', score: 5 }] },
];

export function isQuestionVisible(question: SurveyQuestion, responses: Record<string, SurveyResponseValue | undefined>) {
  if (!question.dependency) return true;
  const answer = responses[question.dependency.questionId];
  if (!answer || typeof answer.value !== 'string') return false;
  return question.dependency.allowedValues.includes(answer.value);
}

export function getVisibleSurveyQuestions(responses: Record<string, SurveyResponseValue | undefined>) {
  return surveyQuestions.filter((question) => isQuestionVisible(question, responses));
}

export function getMaxPossibleScore(responses: Record<string, SurveyResponseValue | undefined>) {
  return getVisibleSurveyQuestions(responses).reduce((sum, question) => {
    if (question.options?.length) {
      const maxScore = Math.max(...question.options.map((option) => option.score));
      return sum + maxScore;
    }
    if (question.type === 'range' || question.type === 'number') {
      return sum + 5;
    }
    return sum;
  }, 0);
}