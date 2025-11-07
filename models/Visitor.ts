import mongoose, { Schema, Model, models } from 'mongoose';

export interface IVisitor {
  sessionId: string;
  userAgent?: string;
  ipAddress?: string;
  referrer?: string;
  timestamp: Date;
  pathname?: string;
}

const VisitorSchema = new Schema<IVisitor>({
  sessionId: {
    type: String,
    required: true,
    index: true,
  },
  userAgent: {
    type: String,
  },
  ipAddress: {
    type: String,
  },
  referrer: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  pathname: {
    type: String,
  },
});

// Create indexes for better query performance
VisitorSchema.index({ sessionId: 1, timestamp: -1 });
VisitorSchema.index({ timestamp: -1 });

// Prevent model recompilation during development hot reloads
const Visitor: Model<IVisitor> = models.Visitor || mongoose.model<IVisitor>('Visitor', VisitorSchema);

export default Visitor;
