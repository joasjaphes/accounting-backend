import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ):Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization: string = request.headers.authorization;
    const token = authorization.replace('Bearer ', '');
    const credentials = Buffer.from(token, 'base64').toString().split(':');
    return await User.authenticateUser(credentials[0], credentials[1]);
  }
}
