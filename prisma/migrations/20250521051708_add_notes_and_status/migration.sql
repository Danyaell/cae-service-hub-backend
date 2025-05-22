/*
  Warnings:

  - Added the required column `status` to the `reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `software_requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reports` ADD COLUMN `status` ENUM('pending', 'in_progress', 'needs_attention', 'completed', 'cancelled') NOT NULL;

-- AlterTable
ALTER TABLE `software_requests` ADD COLUMN `status` ENUM('pending', 'in_progress', 'needs_attention', 'completed', 'cancelled') NOT NULL;

-- CreateTable
CREATE TABLE `requests_notes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_date` DATE NULL,
    `created_by` VARCHAR(100) NULL,
    `content` VARCHAR(255) NOT NULL,
    `software_requestId` INTEGER NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reports_notes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_date` DATE NULL,
    `created_by` VARCHAR(100) NULL,
    `content` VARCHAR(255) NOT NULL,
    `reportId` INTEGER NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `requests_notes` ADD CONSTRAINT `requests_notes_software_requestId_fkey` FOREIGN KEY (`software_requestId`) REFERENCES `software_requests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reports_notes` ADD CONSTRAINT `reports_notes_reportId_fkey` FOREIGN KEY (`reportId`) REFERENCES `reports`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
