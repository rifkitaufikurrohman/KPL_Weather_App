/*
  Warnings:

  - You are about to alter the column `tanggal` on the `visit` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `visit` MODIFY `tanggal` DATETIME(3) NOT NULL;
