import BaseService from './abstract/BaseService';

class UserService extends BaseService {
  async getAll() {
    const users = this.prisma.user.findMany();

    return users;
  }

  async getOne(userId: number) {
    const user = this.prisma.user.findFirstOrThrow({
      where: {
        id: userId,
      },
      include: {
        professor: true,
      },
    });
    return user;
  }
}

export default new UserService();
