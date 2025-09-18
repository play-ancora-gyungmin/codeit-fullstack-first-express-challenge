import express from 'express';

export const userRouter = express.Router();

// GET /api/v1/users - 모든 사용자 조회
userRouter.get('/', (req, res) => {
  res.json({ users: [] });
});

// GET /api/v1/users/:id - 특정 사용자 조회
userRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ userId: id });
});

// POST /api/v1/users - 새 사용자 생성
userRouter.post('/', (req, res) => {
  const { name, email } = req.body;
  res.json({ message: '사용자 생성됨', name, email });
});

// PUT /api/v1/users/:id - 사용자 정보 업데이트
userRouter.put('/:id', (req, res) => {
  res.json({ message: `사용자 ${req.params.id} 업데이트` });
});

// DELETE /api/v1/users/:id - 사용자 삭제
userRouter.delete('/:id', (req, res) => {
  res.json({ message: `사용자 ${req.params.id} 삭제` });
});

// GET /api/v1/users/:userId/posts/:postId - 중첩 리소스
userRouter.get('/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});
