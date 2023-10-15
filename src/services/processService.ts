import { ProcessStatus } from '@prisma/client';
import BaseService from './abstract/BaseService';

class ProcessService extends BaseService {
  async createProcess(data: {
    targetClassId: number,
    professorId: number,
    status?: ProcessStatus,
    documents: Array<{
      url: string,
      totalPoints: number,
      activityId: number,
    }>
  }) {
    const created = await this.prisma.process.create({
      data: {
        targetClassId: data.targetClassId,
        professorId: data.professorId,
        status: data.status || ProcessStatus.DRAFT,
        submittedAt: data.status === ProcessStatus.ANALYSING ? new Date() : null,
        submittedDocuments: {
          create: data.documents,
        },
      },
      select: { id: true },
    });

    return created;
  }
}

export default new ProcessService();
