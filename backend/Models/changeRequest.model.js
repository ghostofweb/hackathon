import { Schema, model } from "mongoose";

const ChangeRequestSchema = new Schema({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  requester: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fileId: {
    type: Schema.Types.ObjectId,
    ref: 'File',
    required: true,
  },
  changes: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Denied'],
    default: 'Pending',
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

export const ChangeRequest = model('ChangeRequest', ChangeRequestSchema);
