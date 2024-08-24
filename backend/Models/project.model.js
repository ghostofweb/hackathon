import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/150',
  },
  leader: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  teamMembers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  files: [{
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
  }],
  changeRequests: [{
    requester: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    fileId: {
      type: Schema.Types.ObjectId,
      ref: 'File',
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
  }],
  joinLink: {
    type: String,
    unique: true,
    required: true,
  },
}, {
  timestamps: true,
});

export const Project = model('Project', ProjectSchema);
