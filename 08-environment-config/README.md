# 08-environment-config

환경변수를 사용해 개발/운영 환경을 분리합니다.

## 📋 실습 체크리스트

### 1. Zod 패키지 설치
env 검증을 위해 Zod를 설치합니다.

```bash
npm install zod
```

### 2. env 폴더 및 환경 파일 생성
- [ ] `env` 폴더 생성
- [ ] `env/.env.example` 파일 생성:
```
NODE_ENV=development
PORT=5001
```

- [ ] `env/.env.development` 파일 생성:
```
NODE_ENV=development
PORT=5001
```

- [ ] `env/.env.production` 파일 생성:
```
NODE_ENV=production
PORT=3000
```

### 3. .gitignore 설정 (중요!)
환경 파일이 git에 올라가지 않도록 설정합니다.

```gitignore
env/*
!env/.env.example
```

### 4. src/config/config.js 생성
환경변수를 검증하고 설정하는 파일을 만듭니다.

```javascript
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().min(1000).max(65535).default(5001),
});

const parseEnvironment = () => {
  try {
    return envSchema.parse({
      NODE_ENV: process.env.NODE_ENV,
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
export const isDevelopment = () => config.NODE_ENV === 'development';
export const isProduction = () => config.NODE_ENV === 'production';
export const isTest = () => config.NODE_ENV === 'test';
```

### 5. package.json 스크립트 변경
Node.js의 `--env-file` 옵션을 사용해 환경 파일을 로드합니다.

```json
{
  "scripts": {
    "dev": "nodemon --env-file=./env/.env.development src/server.js",
    "start": "node --env-file=./env/.env.production src/server.js"
  }
}
```

### 6. server.js 수정
환경설정을 import하고 사용합니다.

```javascript
import express from 'express';
import { config, isDevelopment } from './config/config.js';
// ... 기타 imports

const app = express();

// 개발환경에서만 로깅 미들웨어 사용
if (isDevelopment()) {
  app.use(logger);
  app.use(requestTimer);
}

// ... 미들웨어 설정

app.listen(config.PORT, () => {
  console.log(`🚀 Server running on port ${config.PORT}`);
  console.log(`📦 Environment: ${config.NODE_ENV}`);
});
```

## 💡 핵심 포인트
- **Node.js 20.6+의 `--env-file` 옵션 활용** (20버전 이하에서는 dotenv 패키지, 윈도우 사용자는 cross-env 추가 설치)
- **Zod로 환경변수 타입 안전성 확보**
- **환경별 다른 설정 적용**
- **민감한 환경 파일은 절대 git에 커밋하지 말 것**