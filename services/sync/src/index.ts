import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import syncRoutes from './routes/sync.routes';

const app = express();
const PORT = parseInt(process.env.PORT || '3005', 10);

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '15mb' }));

app.get('/health', (_req, res) => {
  res.json({ status: 'healthy', service: 'sync-service' });
});

app.use('/api/v1/sync', syncRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[Sync Service] Running on http://localhost:${PORT}`);
  });
}

export default app;
