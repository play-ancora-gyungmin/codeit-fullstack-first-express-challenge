import express from 'express';
import { router } from './routes/index.js';
import { logger } from './middlewares/logger.js';
import { requestTimer } from './middlewares/requestTImer.js';
import { cors } from './middlewares/cors.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { config, isDevelopment } from './config/config.js';

const app = express();

// JSON 파싱 미들웨어
app.use(express.json());
// URL 인코딩 파싱
app.use(express.urlencoded({ extended: true }));
// cors
app.use(cors);

// 범용 미들웨어
if (isDevelopment()) {
  app.use(logger);
  app.use(requestTimer);
}

// 모든 라우트 등록
app.use('/', router);

// 정적 파일 제공
app.use(express.static('public'));

// 에러 핸들링
app.use(errorHandler);

// 서버 시작
app.listen(config.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${config.PORT}`);
});
