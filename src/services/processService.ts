import { ProcessStatus } from '@prisma/client';
import BaseService from './abstract/BaseService';

type ProcessCreateData = {
  targetClassId: number,
  professorId: number,
  status?: ProcessStatus,
  documents: Array<{
    url: string,
    totalPoints: number,
    activityId: number,
  }>
};

class ProcessService extends BaseService {
  async createProcess(data: ProcessCreateData) {
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
