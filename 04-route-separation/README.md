# 04-route-separation: 라우트 분리하기

하나의 파일에 모든 라우트가 모여있던 코드를 `routes` 폴더로 분리해보겠습니다. API 버전 관리와 기능별 라우트 분리를 학습해보세요!

## 🎯 학습 목표

- 모노리식 서버 파일을 여러 라우트 파일로 분리
- API 버전 관리 방법 학습
- Express Router 활용법 이해
- 기능별 라우트 분리를 통한 코드 정리
- 유지보수가 쉬운 라우트 구조 설계

## 🏗️ 목표 폴더 구조

```
src/
├── routes/
│   ├── index.js    # 메인 라우터 (기본 라우트 + 하위 라우트들)
│   ├── users.js    # 사용자 관련 라우트
│   └── search.js   # 검색 관련 라우트
└── server.js       # 메인 서버 파일
```

## 📋 TODO 체크리스트

### 1단계: 이전 단계 완료 확인

- [ ] 03-express-routing이 완료되어 다음 코드가 `src/server.js`에 있는지 확인:

```javascript
// 현재 server.js에 모든 라우트가 한 파일에 있는 상태
import express from "express";
// ... (모든 라우트가 하나의 파일에 정의됨)
```

### 2단계: 폴더 구조 생성

- [ ] `src` 폴더 내에 라우트 폴더를 생성:

```bash
mkdir -p src/routes
```

### 3단계: 사용자 라우트 분리

- [ ] `src/routes/users.js` 파일 생성:

```javascript
import express from "express";

export const userRouter = express.Router();

// GET /users - 모든 사용자 조회
userRouter.get("/", (req, res) => {
  res.json({ users: [] });
});

// GET /users/:id - 특정 사용자 조회
userRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ userId: id });
});

// POST /users - 새 사용자 생성
userRouter.post("/", (req, res) => {
  const { name, email } = req.body;
  res.json({ message: "사용자 생성됨", name, email });
});

// PUT /users/:id - 사용자 정보 업데이트
userRouter.put("/:id", (req, res) => {
  res.json({ message: `사용자 ${req.params.id} 업데이트` });
});

// DELETE /users/:id - 사용자 삭제
userRouter.delete("/:id", (req, res) => {
  res.json({ message: `사용자 ${req.params.id} 삭제` });
});

// GET /users/:userId/posts/:postId - 중첩 리소스
userRouter.get("/:userId/posts/:postId", (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});
```

### 4단계: 검색 라우트 분리

- [ ] `src/routes/search.js` 파일 생성:

```javascript
import express from "express";

export const searchRouter = express.Router();

// GET /search - 검색 기능
searchRouter.get("/", (req, res) => {
  const { q, limit = 10 } = req.query;
  res.json({ query: q, limit: Number(limit) });
});
```

### 5단계: 메인 라우터 생성

- [ ] `src/routes/index.js` 파일 생성:

```javascript
import express from 'express';
import { userRouter } from './users.js';
import { searchRouter } from './search.js';

export const router = express.Router();

// 기본 라우트
router.get('/', (req, res) => {
  res.json({
    message: 'Hello Express!',
    timestamp: new Date().toISOString(),
  });
});

// 하위 라우트 등록
router.use('/users', userRouter);
router.use('/search', searchRouter);
```

### 6단계: 메인 서버 파일 수정

- [ ] `src/server.js` 파일을 다음과 같이 수정:

```javascript
import express from "express";
import { router } from "./routes/index.js";

const app = express();
const PORT = 3000;

// JSON 파싱 미들웨어
app.use(express.json());

// 모든 라우트 등록
app.use('/', router);

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

### 7단계: 테스트 및 검증

- [ ] 서버 실행:

```bash
npm run dev
```

- [ ] 모든 API 엔드포인트가 새로운 경로에서 동작하는지 확인:
  - `GET /` - 기본 라우트
  - `GET /users` - 사용자 목록 조회
  - `GET /users/:id` - 특정 사용자 조회
  - `POST /users` - 새 사용자 생성
  - `PUT /users/:id` - 사용자 정보 업데이트
  - `DELETE /users/:id` - 사용자 삭제
  - `GET /users/:userId/posts/:postId` - 중첩 리소스
  - `GET /search?q=검색어&limit=5` - 검색

### 8단계: Postman으로 API 테스트

- [ ] **기본 라우트**:

  - Method: `GET`
  - URL: `http://localhost:3000/`

- [ ] **사용자 목록 조회**:

  - Method: `GET`
  - URL: `http://localhost:3000/users`

- [ ] **특정 사용자 조회**:

  - Method: `GET`
  - URL: `http://localhost:3000/users/123`

- [ ] **사용자 생성**:

  - Method: `POST`
  - URL: `http://localhost:3000/users`
  - Headers: `Content-Type: application/json`
  - Body:
    ```json
    {
      "name": "홍길동",
      "email": "hong@example.com"
    }
    ```

- [ ] **사용자 정보 업데이트**:

  - Method: `PUT`
  - URL: `http://localhost:3000/users/123`

- [ ] **사용자 삭제**:

  - Method: `DELETE`
  - URL: `http://localhost:3000/users/123`

- [ ] **검색**:

  - Method: `GET`
  - URL: `http://localhost:3000/search?q=express&limit=5`

- [ ] **중첩 리소스**:
  - Method: `GET`
  - URL: `http://localhost:3000/users/123/posts/456`

## 📚 개념 정리

### 1. Express Router의 장점

- **라우트 분리**: 기능별로 라우트를 분리하여 코드 정리
- **모듈화**: 재사용 가능한 라우트 모듈 생성
- **유지보수성**: 기능별로 파일이 분리되어 수정이 용이
- **API 버전 관리**: v1, v2 등 버전별 API 관리 가능

### 2. Named Export의 장점

- **명확한 의존성**: 어떤 모듈을 임포트하는지 명확함
- **트리 쉐이킹**: 번들러가 사용하지 않는 코드를 제거하기 쉬움
- **IDE 지원**: 자동 완성과 리팩토링이 더 잘 작동함
- **여러 export**: 한 파일에서 여러 개의 함수/객체를 내보낼 수 있음
- **가독성**: import 문에서 무엇을 가져오는지 명확히 보임

### 3. 라우트 분리의 이점

- **관심사 분리**: 사용자, 검색 등 기능별로 분리
- **팀 협업**: 각 팀원이 다른 라우트 파일 작업 가능
- **코드 가독성**: 한 파일에 모든 라우트가 있을 때보다 읽기 쉬움
- **확장성**: 새로운 기능 추가 시 새 라우트 파일만 생성
- **중앙 집중식 관리**: routes/index.js에서 모든 라우트를 통합 관리
- **명확한 임포트**: named export로 정확히 무엇을 가져오는지 알 수 있음
- **단순한 서버**: server.js가 매우 깔끔해짐

## ✅ 완료 확인사항

- [ ] `routes/` 폴더 구조가 올바르게 생성되었는가?
- [ ] 사용자 라우트와 검색 라우트가 분리되었는가?
- [ ] 모든 API가 올바른 경로에서 동작하는가?
- [ ] named export를 사용하여 라우트가 명확하게 임포트되는가?
- [ ] 기존 기능이 동일하게 작동하는가?

## 🚀 다음 단계

라우트 분리를 완료했다면, 이제 미들웨어, 에러 처리, 데이터베이스 연동 등을 학습해보세요!

---

### 💡 팁

- **라우트 파일명**: 기능별로 명확한 이름 사용 (users.js, search.js 등)
- **Named Export**: `export const routerName` 형태로 명확하게 내보내기
- **Express Router**: `express.Router()` 사용하여 모듈화
- **import 경로**: 상대 경로를 사용하여 라우트 파일 임포트
- **IDE 지원**: named export 사용 시 자동 완성이 더 잘 작동함

### ❗ 주의사항

- **라우트 경로**: 메인 서버에서 라우트 등록 시 기본 경로 확인
- **파일 구조**: 기능별로 라우트 파일 분리하여 관리
- **Named Export**: `export const routerName` 형태로 명확하게 내보내기
- **Import 구문**: `{ routerName }` 형태로 중괄호 사용하여 임포트
- **미들웨어 적용**: 라우트별로 필요한 미들웨어 적용 가능

### 🔍 추가 학습 자료

- Express Router 공식 문서
- ES6 Modules (import/export) 문법
- Named Export vs Default Export 차이점
- JavaScript 모듈 시스템
