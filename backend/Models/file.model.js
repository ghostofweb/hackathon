import { Schema, model } from "mongoose";

const FileSchema = new Schema({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

export const File = model('File', FileSchema);
