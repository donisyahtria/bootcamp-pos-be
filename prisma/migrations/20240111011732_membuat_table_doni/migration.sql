/*
  Warnings:

  - You are about to drop the `t_position` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `t_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "t_users" DROP CONSTRAINT "t_users_positionId_fkey";

-- DropTable
DROP TABLE "t_position";

-- DropTable
DROP TABLE "t_users";

-- CreateTable
CREATE TABLE "users_Doni" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" TEXT NOT NULL,
    "fullname" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "users_Doni_pkey" PRIMARY KEY ("id")
);
