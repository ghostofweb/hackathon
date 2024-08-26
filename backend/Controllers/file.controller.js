import { File } from '../models/file.model.js';
import { Project } from '../models/project.model.js';
import { User } from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';

import uploadOnCloudinary from '../utils/cloudinary.js';

// View Files for a Project
export const viewFiles = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    const files = await File.find({ projectId })
        .populate('uploadedBy', 'name') // Populate uploader's name
        .exec();

    if (!files.length) {
        throw new ApiError(404, 'No files found for this project');
    }

    res.status(200).json(new ApiResponse(200, files, 'Files fetched successfully'));
});

// Download File
export const downloadFile = asyncHandler(async (req, res) => {
    const { fileId } = req.params;

    const file = await File.findById(fileId);

    if (!file) {
        throw new ApiError(404, 'File not found');
    }

    res.redirect(file.fileUrl); // Redirect to the file URL to download
});

// Upload Updated File
export const uploadUpdatedFile = asyncHandler(async (req, res) => {
    const { fileId } = req.params;
    const file = req.file;

    if (!file) {
        throw new ApiError(400, 'No file uploaded');
    }

    const existingFile = await File.findById(fileId);

    if (!existingFile) {
        throw new ApiError(404, 'File not found');
    }

    const imageUploadResponse = await uploadOnCloudinary(file.path);
    const updatedFileUrl = imageUploadResponse.secure_url;

    existingFile.fileUrl = updatedFileUrl;
    existingFile.uploadedAt = Date.now();
    await existingFile.save();

    res.status(200).json(new ApiResponse(200, existingFile, 'File updated successfully'));
});

// Request Change Approval
export const requestChangeApproval = asyncHandler(async (req, res) => {
    const { fileId } = req.params;

    const file = await File.findById(fileId).populate('projectId');

    if (!file) {
        throw new ApiError(404, 'File not found');
    }

    const project = file.projectId;
    const projectLeader = await User.findById(project.leader);

    if (!projectLeader) {
        throw new ApiError(404, 'Project leader not found');
    }

    // Here you would send a notification or email to the project leader.
    // For simplicity, we'll just return a response.

    res.status(200).json(new ApiResponse(200, null, 'Change approval requested successfully'));
});
