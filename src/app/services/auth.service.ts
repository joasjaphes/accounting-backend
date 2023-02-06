import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { atob } from 'buffer';
import { SignInDto } from '../dtos/signin.dto';
import { SignupDto } from '../dtos/signup.dto';
import { UserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async signUp(signupDto: SignupDto): Promise<User> {
    return await this.userRepository.signUp(signupDto);
  }

  async updateUser(userDto: UserDto) {
    return await this.userRepository.updateUser(userDto);
  }

  async signIn(signInDto: SignInDto) {
    const { username, password } = signInDto;
    const refUser = await this.userRepository.findOne({ username });
    if (refUser === null || refUser === undefined) {
      throw new UnauthorizedException('Wrong username');
    } else if (!(await refUser.validatePassword(password))) {
      throw new UnauthorizedException('Wrong password');
    } else {
      // const payload = {username};
      // const accesstoken = await this.jwtService.sign(payload);
      const buff = Buffer.from(`${username}:${password}`, 'binary');
      const token = buff.toString('base64');
      delete refUser.password;
      delete refUser.salt;
      return { ...this.sanitizeUser(refUser), token };
    }
  }

  async authenticateUser(username: string, password: string) {
    const user = await this.userRepository.findOne({ username });
    if (user) {
      return await user.validatePassword(password);
    } else {
      return false;
    }
  }

  sanitizeUser(userPayload: User): UserDto {
    return {
      id: userPayload.uid,
      firstName: userPayload.firstName,
      surname: userPayload.surname,
      lastName: userPayload.lastname,
      email: userPayload.email,
      phoneNumber: userPayload.phoneNumber,
      profilePhoto: userPayload.profilePhoto,
    };
  }
}
