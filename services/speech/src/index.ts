import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import speechRoutes from './routes/speech.routes';

const app = express();
const PORT = parseInt(process.env.PORT || '3002', 10);

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '25mb' }));

app.get('/health', (_req, res) => {
  res.json({ status: 'healthy', service: 'speech-service' });
});

app.use('/api/v1/speech', speechRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[Speech Service] Running on http://localhost:${PORT}`);
  });
}

export default app;
