import { ProcessStatus } from '@prisma/client';
import BaseService from './abstract/BaseService';

class ProcessService extends BaseService {
  async createProcess(data: {
    process: {
      targetClassId: number,
      professorId: number,
      status?: ProcessStatus,
    },
    documents: Array<{
      url: string,
      totalPoints: number,
      activityId: number,
    }>
  }) {
    const documentsList = data.documents.map((document) => ({
      url: document.url,
      totalPoints: document.totalPoints,
      activityId: document.activityId,
    }));

    const created = await this.prisma.process.create({
      data: {
        targetClassId: data.process.targetClassId,
        professorId: data.process.professorId,
        status: data.process.status || ProcessStatus.DRAFT,
        submittedAt: data.process.status === ProcessStatus.ANALYSING ? new Date() : null,
        submittedDocuments: {
          create: documentsList,
        },
      },
      select: { id: true },
    });

    return created;
  }
}

export default new ProcessService();
