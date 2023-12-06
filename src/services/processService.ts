import { ProcessStatus } from '@prisma/client';
import { File } from 'buffer';
import BaseService from './abstract/BaseService';
import { uploadDocument } from '../lib/firebase';

type ProcessCreateData = {
  targetClassId: number,
  professorId: number,
  status?: ProcessStatus,
  documents: Array<{
    file: File,
    totalPoints: number,
    activityId: number,
  }>
};

class ProcessService extends BaseService {
  async createProcess(data: ProcessCreateData) {
    const promises = data.documents.map(async (document) => {
      const downloadURL = await uploadDocument(document.file);
      return {
        totalPoints: document.totalPoints,
        activityId: document.activityId,
        url: downloadURL,
      };
    });

    const documentsData = await Promise.all(promises);

    const created = await this.prisma.process.create({
      data: {
        targetClassId: data.targetClassId,
        professorId: data.professorId,
        status: data.status || ProcessStatus.DRAFT,
        submittedAt: data.status === ProcessStatus.ANALYSING ? new Date() : null,
        submittedDocuments: {
          create: documentsData,
        },
      },
      select: { id: true },
    });

    return created;
  }
}

export default new ProcessService();
