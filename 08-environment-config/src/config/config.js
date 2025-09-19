import { z } from 'zod';

const envSchema = z.object({
  ENVIROMENT: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().min(1000).max(65535),
});

const parseEnvironment = () => {
  try {
    return envSchema.parse({
      ENVIRONMENT: process.env.NODE_ENV,
      PORT: process.env.PORT,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log('error.errors', error);
    }
    process.exit(1);
  }
};

export const config = parseEnvironment();

// 환경별 헬퍼 함수들
export const isDevelopment = () => config.ENVIRONMENT === 'development';
export const isProduction = () => config.ENVIRONMENT === 'production';
export const isTest = () => config.ENVIRONMENT === 'test';
