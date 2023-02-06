import { EntityRepository, Repository } from 'typeorm';
import { SignupDto } from './dto/signup.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  constructor() {
    super();
  }

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
    delete user.password;
    delete user.salt;
    return user;
  }

  async updateUser(userDto: UserDto) {
    try {
      const user = await this.findOne({ uid: userDto.id });
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

  async signIn(username: string) {
    const refUser = await this.findOne({ username });
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
