import BaseService from './abstract/BaseService';

class FieldService extends BaseService {
  async getAll() {
    const fields = this.prisma.field.findMany();
    return fields;
  }

  async getOne(fieldId: number) {
    const field = this.prisma.field.findFirstOrThrow({
      where: {
        id: fieldId,
      },
    });
    return field;
  }
}

export default new FieldService();
