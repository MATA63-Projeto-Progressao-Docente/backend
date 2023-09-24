import { User } from '@prisma/client';
import BaseService from './abstract/BaseService';

class AuthService extends BaseService {
  async registerUser(name: string, email: string): Promise<User> {
    const result = await this.prisma.user.create({
      data: {
        name,
        email,
        password: '',
      },
    });

    return result;
  }
}

export default new AuthService();
