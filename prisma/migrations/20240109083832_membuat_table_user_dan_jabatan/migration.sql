-- CreateTable
CREATE TABLE "t_position" (
    "id" SERIAL NOT NULL,
    "positionName" VARCHAR(150) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "t_position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "t_users" (
    "id" TEXT NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" TEXT,
    "positionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "t_users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "t_users" ADD CONSTRAINT "t_users_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "t_position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
