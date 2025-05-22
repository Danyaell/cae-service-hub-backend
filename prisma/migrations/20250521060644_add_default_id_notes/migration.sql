/*
  Warnings:

  - You are about to alter the column `created_date` on the `notes` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `report_date` on the `reports` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `request_date` on the `software_requests` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `commitment_date` on the `software_requests` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `notes` DROP FOREIGN KEY `notes_report_id_fkey`;

-- DropForeignKey
ALTER TABLE `notes` DROP FOREIGN KEY `notes_software_request_id_fkey`;

-- DropIndex
DROP INDEX `notes_report_id_fkey` ON `notes`;

-- DropIndex
DROP INDEX `notes_software_request_id_fkey` ON `notes`;

-- AlterTable
ALTER TABLE `notes` MODIFY `created_date` DATETIME NULL,
    MODIFY `software_request_id` INTEGER NULL,
    MODIFY `report_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `reports` MODIFY `report_date` DATETIME NULL;

-- AlterTable
ALTER TABLE `software_requests` MODIFY `request_date` DATETIME NULL,
    MODIFY `commitment_date` DATETIME NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `created_at` DATETIME NULL,
    MODIFY `updated_at` DATETIME NULL;

-- AddForeignKey
ALTER TABLE `notes` ADD CONSTRAINT `notes_software_request_id_fkey` FOREIGN KEY (`software_request_id`) REFERENCES `software_requests`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notes` ADD CONSTRAINT `notes_report_id_fkey` FOREIGN KEY (`report_id`) REFERENCES `reports`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
