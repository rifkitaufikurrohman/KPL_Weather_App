-- CreateTable
CREATE TABLE `Visit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `lokasi_asal` VARCHAR(191) NOT NULL,
    `lokasi_tujuan` VARCHAR(191) NOT NULL,
    `tanggal` VARCHAR(191) NOT NULL,
    `catatan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
