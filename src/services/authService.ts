import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import BaseService from './abstract/BaseService';
import AuthError from '../errors/AuthError';
import { JWTPayload } from '../types';

class AuthService extends BaseService {
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

        return jwt.sign(payload, process.env.TOKEN_SECRET as string, {
          expiresIn: ttlInSeconds,
        });
      }
    }

    throw AuthError.invalidCredentials();
  }
}

export default new AuthService();
