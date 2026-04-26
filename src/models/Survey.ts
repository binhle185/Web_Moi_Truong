import mongoose from 'mongoose';

const SurveySchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.Mixed }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Survey || mongoose.model('Survey', SurveySchema);