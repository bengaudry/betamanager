-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "authorizedUris" TEXT[];

-- CreateTable
CREATE TABLE "tokens" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL DEFAULT NOW() + interval '15 minutes',

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
