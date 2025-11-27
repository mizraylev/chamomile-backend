import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<null | Omit<User, 'hashedPassword'>> {
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
}
