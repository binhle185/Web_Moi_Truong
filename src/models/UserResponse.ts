import mongoose from 'mongoose';

const UserResponseSchema = new mongoose.Schema({
  userId: { type: String, required: false, default: null },
  responses: { type: Map, of: mongoose.Schema.Types.Mixed },
  score: { type: Number, required: true },
  recommendations: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.UserResponse || mongoose.model('UserResponse', UserResponseSchema);