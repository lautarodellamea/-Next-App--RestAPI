-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "roles" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "isAdmin" SET DEFAULT true;
