-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "issuesCategories" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "suggestionsCategories" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "tokens" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '15 minutes';
