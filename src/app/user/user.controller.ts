import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { isPasswordValid } from 'src/shared/constants';
import { CredentialDTO } from './credentials.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getUsers() {
    return await this.userService.getAllUsers();
  }
  @UseGuards(AuthGuard)
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
