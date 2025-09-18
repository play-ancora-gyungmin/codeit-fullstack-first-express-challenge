export const requestTimer = (req, res, next) => {
  req.startTime = Date.now();

  // 응답이 끝날 때 실행
  res.on('finish', () => {
    const duration = Date.now() - req.startTime;
    console.log(`요청 처리 시간: ${duration}ms`);
  });

  next();
};
