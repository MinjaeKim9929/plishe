import 'dotenv/config';
import { createApp } from './app';
import { prisma } from './lib/prisma';

function validateEnv(): void {
	const required = ['DATABASE_URL'];
	const missing = required.filter((key) => !process.env[key]);
	if (missing.length > 0) {
		throw new Error(`Missing env vars: ${missing.join(', ')}`);
	}
}

async function gracefulShutdown(signal: string): Promise<void> {
	console.log(`\n[server] ${signal} received. Shutting down...`);
	await prisma.$disconnect();
	process.exit(0);
}

async function main(): Promise<void> {
	validateEnv();

	const app = createApp();
	const PORT = parseInt(process.env.PORT || '4000', 10);

	app.listen(PORT, () => {
		console.log(`[server] Running on http://localhost:${PORT}`);
		console.log(`[server] Health: http://localhost:${PORT}/health`);
		console.log(`[server] API: http://localhost:${PORT}/api/v1`);
	});

	process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
	process.on('SIGINT', () => gracefulShutdown('SIGINT'));
}

main().catch((err) => {
	console.error('[server] Failed to start:', err);
	process.exit(1);
});
