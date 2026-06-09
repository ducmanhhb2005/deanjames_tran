import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { artistRouter } from './routes/artist.routes.js';
import { messageRouter } from './routes/message.routes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();
const port = Number(process.env.PORT || 4000);
const clientOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  })
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || clientOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'deanjames-tran-cosmic-api' });
});

app.use('/api', artistRouter);
app.use('/api', messageRouter);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Cosmic API running on port ${port}`);
  console.log(`Allowed client origins: ${clientOrigins.join(', ')}`);
});

function shutdown(signal) {
  console.log(`${signal} received. Closing server...`);
  server.close(() => process.exit(0));
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
