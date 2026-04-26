// Survey questions for environmental scoring
// TODO: Update these questions based on the content in "Câu hỏi khảo sát.pdf"
export const surveyQuestions = [
  {
    id: 1,
    question: "Bạn di chuyển bằng phương tiện gì chủ yếu?",
    type: "multiple_choice",
    options: [
      { text: "Ô tô cá nhân", score: 1 },
      { text: "Xe máy", score: 2 },
      { text: "Xe buýt/xe điện", score: 4 },
      { text: "Đi bộ/xe đạp", score: 5 },
    ],
  },
  {
    id: 2,
    question: "Bạn có tái chế rác thải không?",
    type: "yes_no",
    yesScore: 5,
    noScore: 1,
  },
  {
    id: 3,
    question: "Bạn sử dụng bao nhiêu điện mỗi tháng? (kWh)",
    type: "number",
    scoring: (value: number) => value < 100 ? 5 : value < 300 ? 3 : 1,
  },
  {
    id: 4,
    question: "Bạn có trồng cây xanh không?",
    type: "yes_no",
    yesScore: 5,
    noScore: 1,
  },
  {
    id: 5,
    question: "Bạn sử dụng bao nhiêu nước mỗi ngày? (lít)",
    type: "number",
    scoring: (value: number) => value < 50 ? 5 : value < 100 ? 3 : 1,
  },
  {
    id: 6,
    question: "Bạn có tham gia các hoạt động bảo vệ môi trường không?",
    type: "yes_no",
    yesScore: 5,
    noScore: 1,
  },
];

export const scoringRules = {
  // Define scoring logic
};