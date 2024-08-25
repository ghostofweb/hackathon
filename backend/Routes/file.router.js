import express from 'express';
import { viewFiles, downloadFile, uploadUpdatedFile, requestChangeApproval } from '../Controllers/file.controller.js';
import upload from '../utils/multer.js'; // Assuming the multer setup is in utils/multer.js

const router = express.Router();

// Route to view files in a project
router.get('/project/:projectId', viewFiles);

// Route to download a file
router.get('/file/:fileId/download', downloadFile);

// Route to upload an updated file
router.put('/file/:fileId/update', upload.single('file'), uploadUpdatedFile);

// Route to request change approval for a file
router.post('/file/:fileId/request-approval', requestChangeApproval);

export default router;
