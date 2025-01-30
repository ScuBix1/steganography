import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { UUID } from 'crypto';
import { User } from './users/users.entity';

@Injectable()
export class AppService {
  constructor(private usersService: UsersService) {}
  async getHello(userId: UUID): Promise<string> {
    const user: User | null = (await this.usersService.findOneById(userId))!;
    return `Hello ${user.firstName}!`;
  }
}
