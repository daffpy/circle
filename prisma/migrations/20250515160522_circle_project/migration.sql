-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagGroup" (
    "tagId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "TagGroup_pkey" PRIMARY KEY ("tagId","groupId")
);

-- AddForeignKey
ALTER TABLE "TagGroup" ADD CONSTRAINT "TagGroup_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagGroup" ADD CONSTRAINT "TagGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
