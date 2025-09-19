import { HttpException } from '../errors/httpException.js'

export const errorHandler = (err, req, res, _next) => {
  console.error('ERR: ', err);

  if(err instanceof HttpException){
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    })
  }

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
  
}