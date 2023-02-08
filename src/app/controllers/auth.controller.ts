import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '../dtos/signin.dto';
import { SignupDto } from '../dtos/signup.dto';
import { UserDto } from '../dtos/user.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async signUp(@Body() signupDto: SignupDto) {
    return this.authService.signUp(signupDto);
  }

  @Post('signin')
  signIn(@Body() signinDto: SignInDto) {
    return this.authService.signIn(signinDto);
  }

  @Put('users')
  @UseGuards(AuthGuard)
  updateUser(@Body() userDto: UserDto) {
    return this.authService.updateUser(userDto);
  }
}
