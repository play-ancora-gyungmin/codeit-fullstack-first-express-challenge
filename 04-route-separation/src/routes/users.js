import express from 'express';

export const userRouter = express.Router();

// 기본 HTTP 메서드
userRouter.get('/', (req, res) => {
  res.json({ users: [] });
});

// postman에서 변경 테스트 하려면 Header -> Content-Type을 userRouterlication/json으로
userRouter.post('/', (req, res) => {
  const { name, email } = req.body;
  res.json({ message: '사용자 생성됨', name, email });
});

userRouter.put('/:id', (req, res) => {
  res.json({ message: `사용자 ${req.params.id} 업데이트` });
});

userRouter.delete('/:id', (req, res) => {
  res.json({ message: `사용자 ${req.params.id} 삭제` });
});

// URL 매개변수
userRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ userId: id });
});