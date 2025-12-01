import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

type UserWithoutPassword = Omit<User, 'hashedPassword'>;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<null | UserWithoutPassword> {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      const isPasswordCorrect = await compare(password, user.hashedPassword);
      if (isPasswordCorrect) {
        const { hashedPassword, ...result } = user;
        return result;
      }
    }

    return null;
  }

  login(user: UserWithoutPassword) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
