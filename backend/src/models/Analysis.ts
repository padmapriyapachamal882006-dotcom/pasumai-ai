import mongoose, { Schema, Document } from 'mongoose';

interface IAnalysis extends Document {
  imageUrl: string;
  type: 'leaf' | 'soil' | 'land';
  disease: string;
  confidence: number;
  severity: string;
  recommendations: string[];
  rawImageData: Buffer;
  createdAt: Date;
  updatedAt: Date;
}

const analysisSchema = new Schema<IAnalysis>(
  {
    imageUrl: { type: String, required: true },
    type: { type: String, enum: ['leaf', 'soil', 'land'], required: true },
    disease: { type: String, required: true },
    confidence: { type: Number, required: true, min: 0, max: 1 },
    severity: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    recommendations: [String],
    rawImageData: Buffer,
  },
  { timestamps: true }
);

export const Analysis = mongoose.model<IAnalysis>('Analysis', analysisSchema);
export type { IAnalysis };
