import { HttpException } from './httpException.js';

export class ConfilctException extends HttpException {
  constructor(description = 'CONFILCT') {
    super(description, 409);
  }
}
