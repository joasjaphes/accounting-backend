import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignInDto } from '../dtos/signin.dto';
import { SignupDto } from '../dtos/signup.dto';
import { UserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async signUp(signupDto: SignupDto): Promise<User> {
    const { id, firstName, surname, lastName, password, username } = signupDto;
    const user = new User();
    user.uid = id;
    user.firstName = firstName;
    user.surname = surname;
    user.lastname = lastName;
    user.username = username;
    user.phoneNumber = signupDto.phoneNumber;
    user.email = signupDto.email;
    const salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, salt);
    user.salt = salt;
    await user.save();
    console.log('user', user);
    delete user.password;
    delete user.salt;
    return user;
  }

  async updateUser(userDto: UserDto) {
    try {
      const user = await this.userRepository.findOneBy({ uid: userDto.id });
      user.firstName = userDto.firstName;
      user.surname = userDto.surname;
      user.lastname = userDto.lastName;
      user.email = userDto.email;
      user.phoneNumber = userDto.phoneNumber;
      user.profilePhoto = userDto.profilePhoto;
      await user.save();
      return userDto;
    } catch (e) {
      throw new Error();
    }
  }

  async signIn(signInDto: SignInDto) {
    const { username, password } = signInDto;
    try {
      const refUser = await this.userRepository.findOneBy({ username });

      if (refUser === null || refUser === undefined) {
        throw new UnauthorizedException('Wrong username');
      } else if (!(await refUser.validatePassword(password))) {
        throw new UnauthorizedException('Wrong password');
      } else {
        const buff = Buffer.from(`${username}:${password}`, 'binary');
        const token = buff.toString('base64');
        delete refUser.password;
        delete refUser.salt;
        return { ...this.sanitizeUser(refUser), token };
      }
    } catch (e) {
      console.log('Failed to signin', e);
      throw new BadRequestException(e);
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

  async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
