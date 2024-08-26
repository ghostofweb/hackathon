// app.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import userRouter from './routes/user.router.js';
import projectRouter from './routes/project.router.js';
import fileRoutes from './routes/file.router.js';
import changeRequestRoutes from './routes/changeRequest.router.js';

dotenv.config({ path: './.env' }); // Adjust the path as needed based on your directory structure



const app = express();


// Middleware
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// Test route
app.get('/test', (req, res) => {
    res.send('hello world');
});
app.use(cors());
// API Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/files', fileRoutes);
app.use('/api/v1/change-requests', changeRequestRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        message: err.message || 'An unexpected error occurred.',
        success: false,
    });
});

export default app;
