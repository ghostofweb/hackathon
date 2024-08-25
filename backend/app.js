import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

// Middleware
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// Test route
app.get('/test', (req, res) => {
    res.send('hello world');
});

// Import routes
import userRouter from './Routes/user.router.js';
import projectRouter from './Routes/project.router.js';
import fileRoutes from './Routes/file.router.js';
import changeRequestRoutes from './Routes/changeRequest.router.js';

// Routing
app.use('/api/v1/users', userRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/files', fileRoutes);
app.use('/api/v1/change-requests', changeRequestRoutes);

export default app;
