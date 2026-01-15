import express, { type Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import v1Routes from './routes/v1';
import { notFoundHandler } from './middleware/not-found';
import { errorHandler } from './middleware/error-handler';

export function createApp(): Express {
	const app = express();

	// Security headers
	app.use(helmet());

	// CORS
	const allowedOrigins = [
		'http://localhost:3000', //
		'http://localhost:4000',
		process.env.WEB_URL,
	].filter(Boolean) as string[];

	app.use(
		cors({
			origin: (origin, callback) => {
				if (!origin) return callback(null, true);
				if (allowedOrigins.includes(origin)) return callback(null, true);
				if (process.env.NODE_ENV !== 'production') return callback(null, true);
				callback(new Error('Not allowed by CORS'));
			},
			credentials: true,
			methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
			allowedHeaders: ['Content-Type', 'Authorization'],
		})
	);

	// Body parsing
	app.use(express.json({ limit: '10kb' }));
	app.use(express.urlencoded({ extended: true, limit: '10kb' }));

	// Health check
	app.get('/health', (_req, res) => {
		res.json({ status: 'ok', timestamp: new Date().toISOString() });
	});

	// API routes
	app.use('/api/v1', v1Routes);

	// Error handling
	app.use(notFoundHandler);
	app.use(errorHandler);

	return app;
}
