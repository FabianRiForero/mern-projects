import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import postsRouter from './routes/posts.routes.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.static(join(__dirname, '../../client/build')))
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(morgan('dev'));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}));

// Routes
app.use('/posts', postsRouter);

export default app;