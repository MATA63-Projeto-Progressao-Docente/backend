import BaseService from './abstract/BaseService';

class ClassService extends BaseService {
  async getAll() {
    return this.prisma.class.findMany();
  }
}

export default new ClassService();
