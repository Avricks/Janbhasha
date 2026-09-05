import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import contentRoutes from './routes/content.routes';

const app = express();
const PORT = parseInt(process.env.PORT || '3003', 10);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'healthy', service: 'content-service' });
});

app.use('/api/v1/content', contentRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[Content Service] Running on http://localhost:${PORT}`);
  });
}

export default app;
