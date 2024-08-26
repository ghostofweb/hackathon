import express from 'express';
import { viewFiles, downloadFile, uploadUpdatedFile, requestChangeApproval } from '../controllers/file.controller.js';
import { upload } from '../Middlewares/multer.middlewere.js'; // Updated to match capitalized directory

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
