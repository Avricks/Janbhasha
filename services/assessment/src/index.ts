import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import assessmentRoutes from './routes/assessment.routes';

const app = express();
const PORT = parseInt(process.env.PORT || '3004', 10);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'healthy', service: 'assessment-service' });
});

app.use('/api/v1/assessments', assessmentRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[Assessment Service] Running on http://localhost:${PORT}`);
  });
}

export default app;
