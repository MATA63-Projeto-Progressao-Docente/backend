import BaseService from './abstract/BaseService';

type ActivityCreateData = {
  name: string;
  number: number;
  points: number;
  fieldId: number;
};

class ActivityService extends BaseService {
  async createActivity(data: ActivityCreateData) {
    const created = await this.prisma.activity.create({
      data: {
        name: data.name,
        number: data.number,
        points: data.points,
        fieldId: data.fieldId,
      },
      select: { id: true },
    });

    return created;
  }

  getAll() {
    return this.prisma.activity.findMany({
      include: {
        field: true,
      },
    });
  }

  getActivityByFildNumber(fieldId: number, number: number) {
    return this.prisma.activity.findFirst({
      where: {
        fieldId,
        number,
      },
    });
  }
}

export default new ActivityService();
