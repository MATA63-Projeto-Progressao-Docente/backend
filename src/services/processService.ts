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

  async getProcessesFromUser(userId: number) {
    const { id: professorId } = await this.prisma.professor.findFirstOrThrow({
      where: {
        userId,
      },
    });
    const processes = await this.prisma.process.findMany({
      where: {
        professorId,
      },
    });
    return processes;
  }
}

export default new ProcessService();
