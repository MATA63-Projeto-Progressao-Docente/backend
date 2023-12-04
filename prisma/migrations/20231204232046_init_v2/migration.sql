-- CreateTable
CREATE TABLE "ProcessEvaluatorProfessor" (
    "professorId" INTEGER NOT NULL,
    "processId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProcessEvaluatorProfessor_professorId_processId_key" ON "ProcessEvaluatorProfessor"("professorId", "processId");

-- AddForeignKey
ALTER TABLE "ProcessEvaluatorProfessor" ADD CONSTRAINT "ProcessEvaluatorProfessor_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcessEvaluatorProfessor" ADD CONSTRAINT "ProcessEvaluatorProfessor_processId_fkey" FOREIGN KEY ("processId") REFERENCES "Process"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
