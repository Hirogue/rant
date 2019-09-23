import { HttpException, HttpStatus } from '@nestjs/common';

export class ApolloException extends HttpException {
  constructor(message: string, code: HttpStatus = HttpStatus.BAD_REQUEST) {
    super(message, code);
  }

  public getMessage() {
    return this.message;
  }
}
