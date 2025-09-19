import express from 'express';
import { validateUser } from '../middlewares/validateUser.js';
import { BadRequestException } from '../errors/badRequestException.js';
import { NotFoundException } from '../errors/notFoundException.js';
import { ConflictException } from '../errors/conflictException.js';

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

// GET /users - 모든 사용자 조회
userRouter.get('/', (req, res) => {
  res.json({
    success: true,
    data: users,
    count: users.length,
  });
});

// GET /users/:id - 특정 사용자 조회
userRouter.get('/:id', (req, res, next) => {
  try{
    const id = parseInt(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다');
    }

    res.json({
      success: true,
      data: user,
    });
  }catch(err){
    next(err);
  }
});

// 사용자 생성
userRouter.post('/', validateUser, (req, res, next) => {
  try {
    const { name, email } = req.body;

    // 이메일 중복 검사
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다');
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
      message: '사용자가 생성되었습니다',
    });
  } catch (error) {
    next(error);
  }
});

// 사용자 정보 수정
userRouter.patch('/:id', validateUser, (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      throw new NotFoundException('사용자를 찾을 수 없습니다');
    }

    // 이메일 중복 검사 (본인 제외)
    if (email) {
      const existingUser = users.find(u => u.email === email && u.id !== id);
      if (existingUser) {
        throw new ConflictException('이미 존재하는 이메일입니다');
      }
    }

    // 제공된 필드만 업데이트
    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;
    users[userIndex].updatedAt = new Date().toISOString();

    res.json({
      success: true,
      data: users[userIndex],
      message: '사용자 정보가 수정되었습니다',
    });
  } catch (error) {
    next(error);
  }
});

// 사용자 삭제
userRouter.delete('/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      throw new NotFoundException('사용자를 찾을 수 없습니다');
    }

    const deletedUser = users[userIndex];
    users.splice(userIndex, 1);

    res.json({
      success: true,
      data: deletedUser,
      message: '사용자가 삭제되었습니다',
    });
  } catch (error) {
    next(error);
  }
});

// GET /users/:userId/posts/:postId - 중첩 리소스
userRouter.get('/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});
