-- DropIndex
DROP INDEX "Class_name_key";

-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Class_id_seq";
