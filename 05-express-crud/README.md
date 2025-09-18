# 05-express-crud: Express CRUD & REST API 만들기

Express를 사용하여 완전한 CRUD(Create, Read, Update, Delete) 연산과 REST API를 구현해보겠습니다. 이전 단계에서 만든 route 분리 구조를 활용하여 실제 API를 개발해보세요!

## 🎯 학습 목표
- CRUD(Create, Read, Update, Delete) 연산 이해 및 구현
- REST API 설계 원칙 학습
- HTTP 상태 코드 올바른 사용법
- 에러 처리 및 유효성 검증
- JSON 응답 구조 설계

## 🏗️ CRUD와 HTTP 메서드 매핑

| CRUD | HTTP 메서드 | 엔드포인트 | 설명 |
|------|-------------|-----------|------|
| **Create** | POST | `POST /users` | 새 사용자 생성 |
| **Read** | GET | `GET /users` | 모든 사용자 조회 |
| **Read** | GET | `GET /users/:id` | 특정 사용자 조회 |
| **Update** | PATCH | `PATCH /users/:id` | 사용자 정보 수정 (부분 수정) |
| **Delete** | DELETE | `DELETE /users/:id` | 사용자 삭제 |

## 📋 실습 체크리스트

### 실습 1: 사전 준비 확인
- [ ] 04-route-separation이 완료되어 Express 서버가 정상 동작하는지 확인
- [ ] `http://localhost:5001/users` 접속하여 기본 라우트가 작동하는지 확인

### 실습 2: REST API 만들기

#### 단계 1: 메모리 데이터베이스 준비
- [ ] `src/routes/users.js` 파일 상단에 다음 코드를 추가하세요:

```javascript
import express from 'express';

export const userRouter = express.Router();

// 메모리 데이터베이스 (실제로는 데이터베이스 사용)
const users = [
  { id: 1, name: '박창기', email: 'kim@example.com' },
  { id: 2, name: '임경민', email: 'lee@example.com' },
  { id: 3, name: '김진영', email: 'jin@example.com' },
  { id: 4, name: '이보희', email: 'boh@example.com' },
  { id: 5, name: '백수현', email: 'baek@example.com' },
  { id: 6, name: '류제희', email: 'ryu@example.com' },
  { id: 7, name: '최진영', email: 'choi@example.com' },
  { id: 8, name: '김유신', email: 'yushin@example.com' },
  { id: 9, name: '오마린', email: 'omarin@example.com' },
  { id: 10, name: '고영우', email: 'goyoung@example.com' },
  { id: 11, name: '이정윤', email: 'jungyun@example.com' },
  { id: 12, name: '박지은', email: 'jieun@example.com' },
  { id: 13, name: '김윤기', email: 'yoonki@example.com' },
  { id: 14, name: '이유리', email: 'yuri@example.com' },
  { id: 15, name: '박성훈', email: 'sunghoon@example.com' }
];

const nextId = 16;
```

#### 단계 2: CRUD 라우트 구현

##### 📖 READ - 모든 사용자 조회
- [ ] 기존의 `userRouter.get('/', ...)` 라우트를 다음과 같이 수정하세요:

```javascript
// 모든 사용자 조회
userRouter.get('/', (req, res) => {
  res.json({
    success: true,
    data: users,
    count: users.length
  });
});
```

##### 📖 READ - 특정 사용자 조회  
- [ ] 기존의 `userRouter.get('/:id', ...)` 라우트를 다음과 같이 수정하세요:

```javascript
// 특정 사용자 조회
userRouter.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다'
    });
  }
  
  res.json({
    success: true,
    data: user
  });
});
```

##### ➕ CREATE - 새 사용자 생성
- [ ] 기존의 `userRouter.post('/', ...)` 라우트를 다음과 같이 수정하세요:

```javascript
// 사용자 생성
userRouter.post('/', (req, res) => {
  const { name, email } = req.body;
  
  // 필수 필드 검증
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: '이름과 이메일은 필수입니다'
    });
  }
  
  // 이메일 중복 검사
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: '이미 존재하는 이메일입니다'
    });
  }
  
  const newUser = {
    id: nextId++,
    name,
    email,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  
  res.status(201).json({
    success: true,
    data: newUser,
    message: '사용자가 생성되었습니다'
  });
});
```

##### ✏️ UPDATE - 사용자 정보 수정 (부분 수정)
- [ ] 기존의 `userRouter.put('/:id', ...)` 라우트를 **PATCH**로 변경하고 다음과 같이 수정하세요:

```javascript
// 사용자 정보 수정 (부분 수정 - 이름 또는 이메일)
userRouter.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  
  // 수정할 필드가 하나도 없으면 에러
  if (!name && !email) {
    return res.status(400).json({
      success: false,
      message: '수정할 정보를 입력해주세요 (name 또는 email)'
    });
  }
  
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다'
    });
  }
  
  // 이메일 중복 검사 (수정할 이메일이 있고, 본인 제외)
  if (email) {
    const existingUser = users.find(u => u.email === email && u.id !== id);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: '이미 존재하는 이메일입니다'
      });
    }
  }
  
  // 제공된 필드만 업데이트 (부분 수정)
  if (name) users[userIndex].name = name;
  if (email) users[userIndex].email = email;
  users[userIndex].updatedAt = new Date().toISOString();
  
  res.json({
    success: true,
    data: users[userIndex],
    message: '사용자 정보가 수정되었습니다'
  });
});
```

##### 🗑️ DELETE - 사용자 삭제
- [ ] 기존의 `userRouter.delete('/:id', ...)` 라우트를 다음과 같이 수정하세요:

```javascript
// 사용자 삭제
userRouter.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다'
    });
  }
  
  const deletedUser = users[userIndex];
  users.splice(userIndex, 1);
  
  res.json({
    success: true,
    data: deletedUser,
    message: '사용자가 삭제되었습니다'
  });
});
```

### 실습 3: 서버 실행 및 테스트

#### 기본 테스트
- [ ] 서버 실행:
```bash
npm run dev
```

- [ ] 브라우저에서 기본 테스트:
  - `http://localhost:5001/` - 기본 라우트 확인
  - `http://localhost:5001/users` - 모든 사용자 조회

### 실습 4: Postman으로 CRUD 테스트

#### 📖 READ 테스트
- [ ] **모든 사용자 조회**:
  - Method: `GET`
  - URL: `http://localhost:5001/users`
  - 예상 응답: 상태 코드 200, 사용자 목록

- [ ] **특정 사용자 조회**:
  - Method: `GET`  
  - URL: `http://localhost:5001/users/1`
  - 예상 응답: 상태 코드 200, 김철수 정보

- [ ] **존재하지 않는 사용자 조회**:
  - Method: `GET`
  - URL: `http://localhost:5001/users/999`
  - 예상 응답: 상태 코드 404, 에러 메시지

#### ➕ CREATE 테스트
- [ ] **새 사용자 생성 (성공)**:
  - Method: `POST`
  - URL: `http://localhost:5001/users`
  - Headers: `Content-Type: application/json`
  - Body:
    ```json
    {
      "name": "박민수",
      "email": "park@example.com"
    }
    ```
  - 예상 응답: 상태 코드 201, 생성된 사용자 정보

- [ ] **필수 필드 누락 테스트**:
  - Method: `POST`
  - URL: `http://localhost:5001/users`
  - Body:
    ```json
    {
      "name": "홍길동"
    }
    ```
  - 예상 응답: 상태 코드 400, 에러 메시지

- [ ] **이메일 중복 테스트**:
  - Method: `POST`
  - URL: `http://localhost:5001/users`
  - Body:
    ```json
    {
      "name": "김철수2",
      "email": "kim@example.com"
    }
    ```
  - 예상 응답: 상태 코드 409, 중복 에러 메시지

#### ✏️ UPDATE 테스트
- [ ] **사용자 이름만 수정 (성공)**:
  - Method: `PATCH`
  - URL: `http://localhost:5001/users/1`  
  - Body:
    ```json
    {
      "name": "박창기_수정"
    }
    ```
  - 예상 응답: 상태 코드 200, 수정된 사용자 정보

- [ ] **사용자 이메일만 수정 (성공)**:
  - Method: `PATCH`
  - URL: `http://localhost:5001/users/1`
  - Body:
    ```json
    {
      "email": "changgi_new@example.com"
    }
    ```
  - 예상 응답: 상태 코드 200, 수정된 사용자 정보

- [ ] **이름과 이메일 둘 다 수정 (성공)**:
  - Method: `PATCH`
  - URL: `http://localhost:5001/users/1`
  - Body:
    ```json
    {
      "name": "박창기_새이름",
      "email": "changgi_both@example.com"
    }
    ```
  - 예상 응답: 상태 코드 200, 수정된 사용자 정보

- [ ] **수정할 정보 없이 요청**:
  - Method: `PATCH`
  - URL: `http://localhost:5001/users/1`
  - Body: `{}`
  - 예상 응답: 상태 코드 400, 에러 메시지

- [ ] **이메일 중복 테스트**:
  - Method: `PATCH`
  - URL: `http://localhost:5001/users/1`
  - Body:
    ```json
    {
      "email": "lee@example.com"
    }
    ```
  - 예상 응답: 상태 코드 409, 중복 에러 메시지

- [ ] **존재하지 않는 사용자 수정**:
  - Method: `PATCH`
  - URL: `http://localhost:5001/users/999`
  - Body: `{"name": "test"}`
  - 예상 응답: 상태 코드 404, 에러 메시지

#### 🗑️ DELETE 테스트
- [ ] **사용자 삭제 (성공)**:
  - Method: `DELETE`
  - URL: `http://localhost:5001/users/2`
  - 예상 응답: 상태 코드 200, 삭제 성공 메시지

- [ ] **존재하지 않는 사용자 삭제**:
  - Method: `DELETE`
  - URL: `http://localhost:5001/users/999`
  - 예상 응답: 상태 코드 404, 에러 메시지

- [ ] **삭제 후 조회 테스트**:
  - Method: `GET`
  - URL: `http://localhost:5001/users`
  - 확인: 삭제된 사용자가 목록에 없는지 확인

## 📚 개념 정리

### 1. CRUD 연산
- **Create (생성)**: 새로운 데이터 추가 - POST
- **Read (읽기)**: 데이터 조회 - GET  
- **Update (수정)**: 기존 데이터 변경 - PATCH (부분 수정)
- **Delete (삭제)**: 데이터 제거 - DELETE

### 2. HTTP 상태 코드
| 코드 | 의미 | 사용 예 |
|------|------|---------|
| **200** | OK | 성공적인 조회, 수정, 삭제 |
| **201** | Created | 새 리소스 생성 성공 |
| **400** | Bad Request | 잘못된 요청 (유효성 검증 실패) |
| **404** | Not Found | 리소스를 찾을 수 없음 |
| **409** | Conflict | 중복 데이터 (이메일 중복 등) |

### 3. API 설계 원칙
- **일관된 응답 구조**: `success`, `data`, `message` 통일
- **적절한 HTTP 메서드**: GET (조회), POST (생성), PATCH (부분수정), DELETE (삭제)
- **의미있는 상태 코드**: 상황에 맞는 HTTP 상태 코드 반환
- **명확한 에러 메시지**: 사용자가 이해하기 쉬운 에러 메시지

### 4. PUT vs PATCH 차이점
- **PUT**: 전체 리소스 교체 (모든 필드 포함)
- **PATCH**: 부분 수정 (일부 필드만 수정)
- 이 실습에서는 이름만 수정 가능하므로 **PATCH** 사용

## ✅ 완료 확인사항
- [ ] 모든 CRUD 연산이 정상 동작하는가?
- [ ] 적절한 HTTP 상태 코드가 반환되는가?
- [ ] 에러 상황이 올바르게 처리되는가?
- [ ] 유효성 검증이 작동하는가?
- [ ] 이메일 중복 검사가 작동하는가?
- [ ] Postman 테스트가 모두 통과하는가?

## 🚀 다음 단계
CRUD API 구현을 완료했다면, 이제 데이터베이스 연동, 인증/권한, 미들웨어 등 고급 기능을 학습해보세요!

---

### 💡 팁
- **메모리 데이터**: 서버 재시작 시 데이터가 초기화됩니다
- **ID 타입 변환**: `parseInt()`로 문자열을 숫자로 변환
- **배열 메서드 활용**: `find()`, `findIndex()`, `push()`, `splice()` 등
- **응답 구조 일관성**: 모든 API에서 동일한 응답 형식 사용

### ❗ 자주 발생하는 문제
- **타입 불일치**: URL 파라미터는 문자열이므로 숫자 변환 필요
- **참조 실수**: 배열 인덱스와 객체 ID 혼동 주의  
- **상태 코드**: 적절한 HTTP 상태 코드 사용
- **JSON 파싱**: `express.json()` 미들웨어 필수 (server.js에 이미 포함)

### 🔍 PATCH의 장점
- **부분 수정**: 전체 리소스가 아닌 일부 필드만 수정 가능
- **유연성**: 필요한 필드만 전송하면 되므로 네트워크 효율성 증대
- **안정성**: 의도하지 않은 필드 초기화 방지
- **실용성**: 실제 서비스에서 가장 많이 사용되는 수정 방식