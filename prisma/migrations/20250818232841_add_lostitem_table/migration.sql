/*
  Warnings:

  - You are about to alter the column `report_date` on the `reports` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `request_date` on the `software_requests` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `commitment_date` on the `software_requests` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `notes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `notes` DROP FOREIGN KEY `notes_created_by_id_fkey`;

-- DropForeignKey
ALTER TABLE `notes` DROP FOREIGN KEY `notes_report_id_fkey`;

-- DropForeignKey
ALTER TABLE `notes` DROP FOREIGN KEY `notes_software_request_id_fkey`;

-- AlterTable
ALTER TABLE `reports` MODIFY `report_date` DATETIME NULL;

-- AlterTable
ALTER TABLE `software_requests` MODIFY `request_date` DATETIME NULL,
    MODIFY `commitment_date` DATETIME NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `created_at` DATETIME NULL,
    MODIFY `updated_at` DATETIME NULL;

-- DropTable
DROP TABLE `notes`;

-- CreateTable
CREATE TABLE `lost_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME NULL,
    `room` ENUM('203', '204') NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `returned` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
