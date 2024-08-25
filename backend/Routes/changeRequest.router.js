import express from 'express';
import {
    fetchPendingChangeRequests,
    approveChanges,
    rejectChanges
} from '../Controllers/changeRequest.controller.js';

const router = express.Router();

// Route to fetch pending change requests for a file
router.get('/file/:fileId/pending', fetchPendingChangeRequests);

// Route to approve a change request
router.patch('/change-request/:changeRequestId/approve', approveChanges);

// Route to reject a change request
router.patch('/change-request/:changeRequestId/reject', rejectChanges);

export default router;
