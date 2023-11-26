import BaseService from "./abstract/BaseService";

class ActivityService extends BaseService {
    getAll() {
        return this.prisma.activity.findMany();
    }
    
    getAtivityByFildNumber(fieldId: number, number: number) {
        return this.prisma.activity.findFirst({
            where: { 
                fieldId,
                number
            }
        });
    }
}

export default new ActivityService();