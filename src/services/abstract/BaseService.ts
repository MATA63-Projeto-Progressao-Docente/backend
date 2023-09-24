import { PrismaClient } from '@prisma/client';
import prisma from '../../../prisma/client';

export default abstract class BaseService {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }
}
