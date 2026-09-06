import dotenv from 'dotenv';
import path from 'path';

// Load local or root .env
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'janbhasha-dev-jwt-secret-key-32-chars-long!',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'janbhasha-dev-jwt-refresh-secret-32-chars!',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://janbhasha:janbhasha@localhost:5432/janbhasha',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  huggingFaceApiKey: process.env.HUGGING_FACE_API_KEY || '',
};
