-- CreateTable
CREATE TABLE `reports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `report_date` DATE NULL,
    `reporter_name` VARCHAR(100) NULL,
    `role` VARCHAR(15) NULL,
    `room` ENUM('203', '204') NOT NULL,
    `pc` VARCHAR(10) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `attendant` VARCHAR(100) NULL,
    `action_taken` VARCHAR(255) NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `software_requests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `request_date` DATE NULL,
    `requestor_name` VARCHAR(100) NOT NULL,
    `room` ENUM('203', '204') NOT NULL,
    `software` VARCHAR(100) NOT NULL,
    `attendant` VARCHAR(100) NULL,
    `commitment_date` DATE NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
