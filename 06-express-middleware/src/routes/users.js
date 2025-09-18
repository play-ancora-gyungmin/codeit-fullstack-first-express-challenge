import express from 'express';

export const userRouter = express.Router();

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
  { id: 15, name: '박성훈', email: 'sunghoon@example.com' },
];

let nextId = 16;

// GET /api/v1/users - 모든 사용자 조회
userRouter.get('/users', (req, res) => {
  res.json({
    success: true,
    data: users,
    count: users.length,
  });
});

// GET /api/v1/users/:id - 특정 사용자 조회
userRouter.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다',
    });
  }

  res.json({
    success: true,
    data: user,
  });
});

// POST /api/v1/users - 새 사용자 생성
userRouter.post('/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: '이름과 이메일은 필수입니다',
    });
  }

  const newUser = {
    id: nextId++,
    name,
    email,
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    data: newUser,
    message: '사용자가 생성되었습니다',
  });
});

// PUT /api/v1/users/:id - 사용자 정보 업데이트
userRouter.patch('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다',
    });
  }

  users[userIndex] = { ...users[userIndex], name, email };

  res.json({
    success: true,
    data: users[userIndex],
    message: '사용자가 수정되었습니다',
  });
});

// DELETE /api/v1/users/:id - 사용자 삭제
userRouter.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다',
    });
  }

  users.splice(userIndex, 1);

  res.json({
    success: true,
    message: '사용자가 삭제되었습니다',
  });
});

// GET /api/v1/users/:userId/posts/:postId - 중첩 리소스
userRouter.get('/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});
