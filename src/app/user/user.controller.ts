import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { isPasswordValid } from 'src/shared/constants';
import { CredentialDTO } from './credentials.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.getAllUsers();
  }

  @Post()
  async createUser(@Body() user: UserDTO) {
    if (!isPasswordValid(user.password)) {
      throw new BadRequestException({
        message:
          'Invalid password format, Password should have a length of 8 characters with atleast one uppercase letter and one numeric character',
      });
    } else {
      return this.userService.createUser(user);
    }
  }

  @Post('/signin')
  async login(@Body() credentials: CredentialDTO) {
    return await this.userService.login(credentials);
  }
}
