import { BadRequestException } from '../errors/badRequestException.js';

export const validateUser = (req, res, next) => {
  const { name, email } = req.body;
  try {
    if (!name || name.trim().length < 2) {
      throw new BadRequestException('이름은 2글자 이상이어야 합니다');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      throw new BadRequestException('유효한 이메일 형식이어야 합니다');
    }
  } catch (error) {
    next(error);
  }

  next();
};
