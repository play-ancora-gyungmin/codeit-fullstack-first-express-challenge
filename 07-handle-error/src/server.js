import express from 'express';
import { router } from './routes/index.js';
import { logger } from './middlewares/logger.js';
import { requestTimer } from './middlewares/requestTImer.js';
import { cors } from './middlewares/cors.js';
import { errHandler } from './middlewares/errHandler.js';

const app = express();
const PORT = 5001;

// JSON 파싱 미들웨어
app.use(express.json());
// URL 인코딩 파싱
app.use(express.urlencoded({ extended: true }));
// cors
app.use(cors);

// 범용 미들웨어
app.use(logger);
app.use(requestTimer);

// 모든 라우트 등록
app.use('/', router);

// 정적 파일 제공
app.use(express.static('public'));

app.use(errHandler);

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
