-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_collectionId_fkey";

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
