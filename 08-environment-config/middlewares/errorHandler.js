import { HttpException } from '../errors/httpException.js';

// next를 지우면 안됨!
export const errorHandler = (error, req, res, _next) => {
  console.error('error message', error);
  if (error instanceof HttpException) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
};
