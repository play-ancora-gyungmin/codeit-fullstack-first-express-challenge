import { HttpException } from './httpException.js';

export class UnauthorizedException extends HttpException {
  constructor(description = 'Unauthorized') {
    super(description, 401);
  }
}