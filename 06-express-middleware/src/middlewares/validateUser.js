// 사용자 데이터 검증 미들웨어
export const validateUser = (req, res, next) => {
  const { name, email } = req.body;
  
  if (!name || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: '이름은 2글자 이상이어야 합니다'
    });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: '올바른 이메일 형식이 아닙니다'
    });
  }
  
  next();
};