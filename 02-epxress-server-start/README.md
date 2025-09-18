# 02-start-express-server: Express 서버 시작하기

Express를 사용해서 첫 번째 웹 서버를 만들어보겠습니다! 미들웨어의 개념과 기본 라우팅을 학습해보세요.

## 🎯 학습 목표

- Express 서버 기본 구조 이해
- 미들웨어(Middleware) 개념 학습
- 기본 라우트 설정 방법
- JSON 파싱 미들웨어 사용법
- Postman을 이용한 API 테스트

## 📋 TODO 체크리스트

### 1단계: 이전 단계 완료 확인

- [ ] 01-basic-setup이 완료되어 Express가 설치되어 있는지 확인
- [ ] `package.json`에 `"type": "module"`이 설정되어 있는지 확인

### 2단계: Express 서버 파일 작성

- [ ] `src/server.js` 파일을 다음 내용으로 수정:

```javascript
import express from "express";

const app = express();
const PORT = 3000;

// JSON 파싱 미들웨어
app.use(express.json());

// 기본 라우트
app.get("/", (req, res) => {
  res.json({
    message: "Hello Express!",
    timestamp: new Date().toISOString(),
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

### 3단계: nodemon 설치 및 설정 (개발 편의성 향상)

- [ ] **nodemon 설치하기**:
  ```bash
  npm install -D nodemon
  ```

- [ ] **package.json 업데이트하기** - `scripts` 섹션의 `dev` 명령어를 다음과 같이 수정:
  ```json
  "dev": "nodemon src/server.js"
  ```

### 4단계: 서버 실행 및 테스트

- [ ] 터미널에서 서버 실행:

  ```bash
  npm run dev
  ```

- [ ] 브라우저에서 `http://localhost:3000` 접속해서 JSON 응답 확인

- [ ] 콘솔에 "🚀 Server running on http://localhost:3000" 메시지가 출력되는지 확인

### 5단계: Postman으로 API 테스트

- [ ] Postman 설치 및 실행

- [ ] GET 요청 테스트:

  - URL: `http://localhost:3000`
  - Method: `GET`
  - 응답으로 JSON 데이터가 오는지 확인

- [ ] 응답 데이터 구조 확인:
  ```json
  {
    "message": "Hello Express!",
    "timestamp": "2025-01-01T00:00:00.000Z" // 예시
  }
  ```

## 📚 개념 정리

### 1. 미들웨어(Middleware)란?

**요청(request)이 들어와 응답(response)이 나가기 전 중간 과정에 끼어들어 특정 작업을 처리하는 함수**입니다.

- Express에서는 **`app.use()`**를 사용해 미들웨어를 등록합니다
- 미들웨어는 순서대로 실행됩니다
- 각 미들웨어는 `req`, `res`, `next` 매개변수를 받습니다

### 2. `express.json()`의 역할

- 클라이언트가 서버로 전송하는 **JSON 데이터를 파싱**하는 미들웨어
- **요청의 Content-Type 헤더가 application/json**인 경우 동작
- 요청 본문의 **JSON 문자열을 자바스크립트 객체로 변환**
- 변환된 데이터를 **`req.body`** 프로퍼티에 저장
- 라우트 핸들러에서 **`req.body.key`** 형태로 데이터 접근 가능

### 3. 라우팅(Routing)

- **특정 URL 경로와 HTTP 메서드 조합**에 대한 응답을 정의
- `app.get('/', callback)`: GET 메서드로 `/` 경로 접근 시 실행
- `req`: 요청 객체 (Request)
- `res`: 응답 객체 (Response)

### 4. nodemon이란?

- **개발 환경에서 파일 변경을 감지해서 자동으로 서버를 재시작**해주는 도구
- 코드를 수정할 때마다 **수동으로 서버를 끄고 다시 켤 필요가 없음**
- **개발 생산성을 크게 향상**시켜주는 필수 개발 도구
- `-D` 옵션으로 설치하여 **개발 의존성(devDependencies)**으로 관리

## ✅ 완료 확인사항

- [ ] 서버가 포트 3000에서 정상 실행되는가?
- [ ] 브라우저에서 localhost:3000 접속 시 JSON 응답이 나타나는가?
- [ ] 응답에 `message`와 `timestamp` 필드가 포함되어 있는가?
- [ ] Postman에서 GET 요청이 성공하는가?
- [ ] 서버 로그에 시작 메시지가 출력되는가?

## 🚀 다음 단계

Express 서버의 기본 구조를 이해했다면, 이제 더 다양한 라우트와 미들웨어를 추가해보는 단계로 넘어갈 수 있습니다!

---

### 💡 팁

- **서버 종료**: 터미널에서 `Ctrl + C`로 서버를 중지할 수 있습니다
- **자동 재시작**: nodemon 사용 시 코드 수정하면 자동으로 서버가 재시작됩니다
- **포트 변경**: `PORT` 변수 값을 변경하면 다른 포트에서 실행됩니다
- **JSON 형식**: 응답 데이터가 올바른 JSON 형식인지 확인하세요
- **nodemon 로그**: 파일 변경을 감지하면 콘솔에 재시작 메시지가 표시됩니다

### ❗ 자주 발생하는 문제

- **포트 이미 사용 중**: 다른 프로그램이 3000번 포트를 사용 중일 때 → PORT 값을 다른 숫자로 변경
- **import 문법 에러**: `package.json`에 `"type": "module"`이 없을 때
- **express 모듈 없음**: Express가 설치되지 않았을 때 → `npm install express` 실행
