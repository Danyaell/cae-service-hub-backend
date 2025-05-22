/*
  Warnings:

  - You are about to drop the column `attendant` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `attendant` on the `software_requests` table. All the data in the column will be lost.
  - You are about to drop the `reports_notes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `requests_notes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `reports_notes` DROP FOREIGN KEY `reports_notes_reportId_fkey`;

-- DropForeignKey
ALTER TABLE `requests_notes` DROP FOREIGN KEY `requests_notes_software_requestId_fkey`;

-- AlterTable
ALTER TABLE `reports` DROP COLUMN `attendant`,
    ADD COLUMN `attendant_id` INTEGER NULL,
    MODIFY `report_date` DATETIME NULL;

-- AlterTable
ALTER TABLE `software_requests` DROP COLUMN `attendant`,
    ADD COLUMN `attendant_id` INTEGER NULL,
    MODIFY `request_date` DATETIME NULL,
    MODIFY `commitment_date` DATETIME NULL;

-- DropTable
DROP TABLE `reports_notes`;

-- DropTable
DROP TABLE `requests_notes`;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(15) NULL,
    `created_at` DATETIME NULL,
    `updated_at` DATETIME NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    UNIQUE INDEX `users_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_date` DATETIME NULL,
    `created_by_id` INTEGER NULL,
    `content` VARCHAR(255) NOT NULL,
    `software_request_id` INTEGER NOT NULL,
    `report_id` INTEGER NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `reports` ADD CONSTRAINT `reports_attendant_id_fkey` FOREIGN KEY (`attendant_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `software_requests` ADD CONSTRAINT `software_requests_attendant_id_fkey` FOREIGN KEY (`attendant_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notes` ADD CONSTRAINT `notes_created_by_id_fkey` FOREIGN KEY (`created_by_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notes` ADD CONSTRAINT `notes_software_request_id_fkey` FOREIGN KEY (`software_request_id`) REFERENCES `software_requests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notes` ADD CONSTRAINT `notes_report_id_fkey` FOREIGN KEY (`report_id`) REFERENCES `reports`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
