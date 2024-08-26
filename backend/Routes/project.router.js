import express from 'express';
import multer from 'multer';
import { createProject, getAllProjects, getProjectById, updateProjectById, deleteProjectById, addTeamMember, removeTeamMember, joinProject } from '../controllers/project.controller.js';
import { verifyJWT } from '../Middlewares/auth.middlewere.js';

const router = express.Router();

const uploadImage = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, '../public/temp'),
        filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
    })
});

router.post('/create', verifyJWT, uploadImage.single('image'), createProject);
router.get('/', verifyJWT, getAllProjects);
router.get('/:id', verifyJWT, getProjectById);
router.put('/:id', verifyJWT, updateProjectById);
router.delete('/:id', verifyJWT, deleteProjectById);
router.post('/add-member', verifyJWT, addTeamMember);
router.post('/remove-member', verifyJWT, removeTeamMember);
router.post('/join', verifyJWT, joinProject);

export default router;
