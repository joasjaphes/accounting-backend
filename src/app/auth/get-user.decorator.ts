import { createParamDecorator } from '@nestjs/common';
import { User } from '../entities/user.entity';

export const GetUser = createParamDecorator(
  async (data, req): Promise<User> => {
    const request = req.args[0];

    const authorization: string = request.headers.authorization;
    const token = authorization.replace('Bearer ', '');
    console.log('token', token);
    const credentials = Buffer.from(token, 'base64').toString().split(':');
    return await User.getUser(credentials[0]);
  },
);
