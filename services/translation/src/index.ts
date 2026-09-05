import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import translateRoutes from './routes/translate.routes';

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'healthy', service: 'translation-service' });
});

app.use('/api/v1/translation', translateRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[Translation Service] Running on http://localhost:${PORT}`);
  });
}

export default app;
