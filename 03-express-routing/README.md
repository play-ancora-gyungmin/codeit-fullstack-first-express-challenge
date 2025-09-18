# 03-express-routing: Express 라우팅 마스터하기

Express의 다양한 라우팅 방법을 학습하고 실습해보겠습니다! HTTP 메서드, URL 매개변수, 쿼리 문자열을 활용한 API 개발을 배워보세요.

## 🎯 학습 목표
- HTTP 메서드별 라우팅 구현 (GET, POST, PUT, DELETE)
- URL 매개변수(params) 활용 방법
- 쿼리 문자열(query) 처리 방법
- RESTful API 설계 기초
- Postman을 활용한 다양한 API 테스트

## 📋 TODO 체크리스트

### 1단계: 이전 단계 완료 확인
- [ ] 02-start-express-server가 완료되어 기본 서버가 동작하는지 확인
- [ ] nodemon이 설치되어 있고 `npm run dev` 명령이 동작하는지 확인

### 2단계: 기본 라우팅 구현

기존 `src/server.js` 파일에 다양한 HTTP 메서드 라우트를 추가해보세요:

- [ ] **GET 라우트** - 사용자 목록 조회:
```javascript
// 기본 HTTP 메서드
app.get('/users', (req, res) => {
  res.json({ users: [] });
});
```

- [ ] **POST 라우트** - 사용자 생성:
```javascript
// postman에서 테스트 시 Header -> Content-Type을 application/json으로 설정
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  res.json({ message: '사용자 생성됨', name, email });
});
```

- [ ] **PUT 라우트** - 사용자 정보 업데이트:
```javascript
app.put('/users/:id', (req, res) => {
  res.json({ message: `사용자 ${req.params.id} 업데이트` });
});
```

- [ ] **DELETE 라우트** - 사용자 삭제:
```javascript
app.delete('/users/:id', (req, res) => {
  res.json({ message: `사용자 ${req.params.id} 삭제` });
});
```

### 3단계: 매개변수와 쿼리 처리

- [ ] **URL 매개변수** - 특정 사용자 조회:
```javascript
// URL 매개변수
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ userId: id });
});
```

- [ ] **쿼리 문자열** - 검색 기능:
```javascript
// 쿼리 문자열 - /search?q=express&limit=10
app.get('/search', (req, res) => {
  const { q, limit = 10 } = req.query;
  res.json({ query: q, limit: Number(limit) });
});
```

- [ ] **여러 매개변수** - 중첩 리소스:
```javascript
// 여러 매개변수
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});
```

### 4단계: 서버 실행 및 기본 테스트
- [ ] 서버 실행:
```bash
npm run dev
```

- [ ] 브라우저에서 기본 GET 라우트 테스트:
  - `http://localhost:3000/users` - 사용자 목록
  - `http://localhost:3000/users/123` - 특정 사용자
  - `http://localhost:3000/search?q=express&limit=5` - 검색

### 5단계: Postman으로 API 테스트

#### GET 요청 테스트
- [ ] **사용자 목록 조회**:
  - Method: `GET`
  - URL: `http://localhost:3000/users`

- [ ] **특정 사용자 조회**:
  - Method: `GET` 
  - URL: `http://localhost:3000/users/123`

- [ ] **검색 API 테스트**:
  - Method: `GET`
  - URL: `http://localhost:3000/search?q=express&limit=5`

- [ ] **중첩 리소스 테스트**:
  - Method: `GET`
  - URL: `http://localhost:3000/users/123/posts/456`

#### POST 요청 테스트
- [ ] **사용자 생성 테스트**:
  - Method: `POST`
  - URL: `http://localhost:3000/users`
  - Headers: `Content-Type: application/json`
  - Body (JSON):
    ```json
    {
      "name": "홍길동",
      "email": "hong@example.com"
    }
    ```

#### PUT 요청 테스트
- [ ] **사용자 정보 업데이트**:
  - Method: `PUT`
  - URL: `http://localhost:3000/users/123`

#### DELETE 요청 테스트
- [ ] **사용자 삭제**:
  - Method: `DELETE`
  - URL: `http://localhost:3000/users/123`

## 📚 개념 정리

### 1. HTTP 메서드별 용도

| 메서드 | 용도 | 예시 |
|--------|------|------|
| **GET** | 데이터 조회 | 사용자 목록, 특정 사용자 정보 |
| **POST** | 새 데이터 생성 | 새 사용자 등록 |
| **PUT** | 데이터 전체 업데이트 | 사용자 정보 수정 |
| **DELETE** | 데이터 삭제 | 사용자 계정 삭제 |

### 2. URL 매개변수 (Parameters)
- **형식**: `/users/:id` → `/users/123`
- **접근**: `req.params.id`
- **용도**: 특정 리소스를 식별할 때 사용
- **예시**: 사용자 ID, 게시글 ID 등

### 3. 쿼리 문자열 (Query String)
- **형식**: `/search?q=keyword&limit=10`
- **접근**: `req.query.q`, `req.query.limit`
- **용도**: 필터링, 정렬, 페이지네이션 등
- **예시**: 검색어, 페이지 번호, 정렬 옵션

### 4. 요청 본문 (Request Body)
- **형식**: JSON 객체
- **접근**: `req.body`
- **용도**: POST/PUT 요청 시 데이터 전송
- **중요**: `express.json()` 미들웨어 필요

## ✅ 완료 확인사항
- [ ] 모든 HTTP 메서드 라우트가 정상 동작하는가?
- [ ] URL 매개변수가 올바르게 추출되는가?
- [ ] 쿼리 문자열이 정상 처리되는가?
- [ ] POST 요청의 JSON 데이터가 올바르게 파싱되는가?
- [ ] Postman에서 모든 API 테스트가 성공하는가?

## 🚀 다음 단계
다양한 라우팅 방법을 익혔다면, 이제 미들웨어를 활용한 고급 기능과 에러 처리를 학습해보세요!

---

### 💡 팁
- **라우트 순서**: 더 구체적인 라우트를 먼저 정의하세요
- **매개변수 검증**: 실제 프로젝트에서는 매개변수 유효성 검사가 필요합니다
- **RESTful 설계**: 리소스 중심의 URL 설계를 권장합니다
- **상태 코드**: 각 상황에 맞는 HTTP 상태 코드 사용을 고려하세요

### ❗ 자주 발생하는 문제
- **라우트 충돌**: `/users/:id`와 `/users/new` 순서 주의
- **JSON 파싱 실패**: Content-Type 헤더 확인
- **매개변수 타입**: `req.params`는 항상 문자열입니다
- **쿼리 기본값**: `req.query` 값이 없을 수 있으므로 기본값 설정 권장

### 🔍 참고 자료
- Express 공식 문서: [라우팅 가이드](https://expressjs.com/en/guide/routing.html)
- HTTP 상태 코드: [MDN HTTP Status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- RESTful API 설계: [REST API 모범 사례](https://restfulapi.net/)