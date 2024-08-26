import { File } from '../models/file.model.js';
import { ChangeRequest } from '../models/changeRequest.model.js'; // Assuming you have a ChangeRequest model
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { Project } from '../models/project.model.js';
import { User } from '../models/user.model.js';
import ApiResponse from '../utils/ApiResponse.js';

// Fetch Pending Change Requests
export const fetchPendingChangeRequests = asyncHandler(async (req, res) => {
    const { fileId } = req.params;

    const changeRequests = await ChangeRequest.find({ fileId, status: 'Pending' })
        .populate('requester', 'name') // Populate requester’s name
        .exec();

    if (!changeRequests.length) {
        throw new ApiError(404, 'No pending change requests found for this file');
    }

    res.status(200).json(new ApiResponse(200, changeRequests, 'Pending change requests fetched successfully'));
});

// Approve Changes
export const approveChanges = asyncHandler(async (req, res) => {
    const { changeRequestId } = req.params;

    const changeRequest = await ChangeRequest.findById(changeRequestId)
        .populate('fileId') // Populate the file associated with the change request
        .exec();

    if (!changeRequest) {
        throw new ApiError(404, 'Change request not found');
    }

    if (changeRequest.status !== 'Pending') {
        throw new ApiError(400, 'Change request is not pending');
    }

    const file = changeRequest.fileId;

    // Update the file with the new details from the change request
    file.fileUrl = changeRequest.newFileUrl;
    file.uploadedAt = Date.now(); // Update timestamp
    await file.save();

    // Mark the change request as approved
    changeRequest.status = 'Approved';
    await changeRequest.save();

    res.status(200).json(new ApiResponse(200, file, 'Changes approved successfully'));
});

// Reject Changes
export const rejectChanges = asyncHandler(async (req, res) => {
    const { changeRequestId } = req.params;

    const changeRequest = await ChangeRequest.findById(changeRequestId);

    if (!changeRequest) {
        throw new ApiError(404, 'Change request not found');
    }

    if (changeRequest.status !== 'Pending') {
        throw new ApiError(400, 'Change request is not pending');
    }

    // Mark the change request as rejected
    changeRequest.status = 'Rejected';
    await changeRequest.save();

    res.status(200).json(new ApiResponse(200, null, 'Changes rejected successfully'));
});
