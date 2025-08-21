/*
  Warnings:

  - You are about to alter the column `date` on the `lost_items` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `report_date` on the `reports` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `request_date` on the `software_requests` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `commitment_date` on the `software_requests` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `lost_items` MODIFY `date` DATETIME NULL;

-- AlterTable
ALTER TABLE `reports` MODIFY `report_date` DATETIME NULL;

-- AlterTable
ALTER TABLE `software_requests` MODIFY `request_date` DATETIME NULL,
    MODIFY `commitment_date` DATETIME NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `created_at` DATETIME NULL,
    MODIFY `updated_at` DATETIME NULL;
