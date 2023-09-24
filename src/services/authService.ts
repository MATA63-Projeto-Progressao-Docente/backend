import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import BaseService from './abstract/BaseService';
import AuthError from '../errors/AuthError';
import { JWTPayload } from '../types';

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

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      const isValidPassword = bcryptjs.compareSync(password, user.password);

      if (isValidPassword) {
        const payload: JWTPayload = {
          userId: user.id,
        };

        const ttlInSeconds = 60 * 60 * 24 * 2; // Two days

        const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
          expiresIn: ttlInSeconds,
        });

        return { token, ttl: ttlInSeconds * 1000 };
      }
    }

    throw AuthError.invalidCredentials();
  }
}

export default new AuthService();
