import BaseService from './abstract/BaseService';

class ProfessorService extends BaseService {
  async getOne(id: number) {
    return this.prisma.professor.findFirstOrThrow({
      where: {
        id,
      },
    });
  }

  async getByUserId(userId: number) {
    return this.prisma.professor.findFirstOrThrow({
      where: {
        userId,
      },
    });
  }
}

export default new ProfessorService();
