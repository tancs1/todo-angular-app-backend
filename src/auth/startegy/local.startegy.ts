import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Users } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }
  async validate(email: string, password: string): Promise<Users> {
    const users: Users = await this.userService.findUserByEmail(email);
    if (users && users.password == password) return users;
    if (users == undefined)
      throw new UnauthorizedException('User not found' + email);
    if (users.password != password)
      throw new UnauthorizedException('Invalid Password');
  }
}
