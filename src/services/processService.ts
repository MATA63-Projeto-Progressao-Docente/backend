import { ProcessStatus } from '@prisma/client';
import BaseService from './abstract/BaseService';
import ProcessError from '../errors/ProcessError';
import { RequestAuthData } from '../types';

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

  async assignEvaluationCommittee(processId: number, professorIds: number[]) {
    const commiteeProfessors = await this.prisma.professor.findMany({
      where: {
        id: { in: professorIds },
      },
      select: { class: true, departmentId: true },
    });

    const process = await this.prisma.process.findUnique({
      where: { id: processId },
      select: {
        targetClass: true,
        professor: { select: { class: true, departmentId: true } },
      },
    });

    if (!process) throw ProcessError.processNotFound();

    const hasInvalidProfessor = commiteeProfessors.some((professor) => {
      if (professor.departmentId !== process.professor.departmentId) return true;

      if (
        professor.class.letter < process.professor.class.letter
        || (
          professor.class.letter === process.professor.class.letter
          && professor.class.level < process.professor.class.level
        )
      ) {
        return true;
      }

      return false;
    });

    if (hasInvalidProfessor) {
      throw ProcessError.invalidProfessorForCommittee();
    }

    const result = await this.prisma.processEvaluatorProfessor.createMany({
      data: professorIds.map((professorId) => ({
        processId,
        professorId,
      })),
    });

    return result;
  }

  async getUserProcesses(userId: number) {
    const processes = await this.prisma.process.findMany({
      where: {
        professor: {
          userId,
        },
      },
      include: {
        targetClass: true,
      },
    });

    return processes;
  }

  async checkOpenUserProcessExistance(userId: number) {
    const process = await this.prisma.process.count({
      where: {
        professor: {
          userId,
        },
        status: {
          in: [ProcessStatus.ANALYSING, ProcessStatus.DRAFT],
        },
      },
    });

    return process > 0;
  }

  async getProcessById(id: number, authData: RequestAuthData) {
    const process = await this.prisma.process.findUnique({
      where: { id },
      include: {
        targetClass: true,
        submittedDocuments: true,
        professor: true,
        processEvaluatorProfessors: {
          include: {
            professor: true,
          },
        },
      },
    });

    if (
      !process
      || (process.professor.userId !== authData.userId && authData.userRole !== 'ADMIN')
    ) {
      throw ProcessError.processNotFound();
    }

    return process;
  }
}

export default new ProcessService();
