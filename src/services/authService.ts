import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';
import BaseService from './abstract/BaseService';
import AuthError from '../errors/AuthError';
import { JWTPayload } from '../types';

type RegisterData = {
  name?: string;
  email: string;
  password: string;
  role?: Role;
};

class AuthService extends BaseService {
  async register(data: RegisterData) {
    const hashedPassword = bcryptjs.hashSync(data.password);

    const user = await this.prisma.user.create({
      data: {
        name: data.name || '',
        email: data.email,
        password: hashedPassword,
      },
      select: { id: true, name: true, email: true },
    });

    return user;
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
          role: user.role,
        };

        const ttlInSeconds = 60 * 60 * 24 * 2; // Two days

        return jwt.sign(payload, process.env.TOKEN_SECRET as string, {
          expiresIn: ttlInSeconds,
        });
      }
    }

    throw AuthError.invalidCredentials();
  }
}

export default new AuthService();
