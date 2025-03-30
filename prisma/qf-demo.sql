/*
 Navicat Premium Dump SQL

 Source Server         : local_mysql
 Source Server Type    : MySQL
 Source Server Version : 80300 (8.3.0)
 Source Host           : localhost:3306
 Source Schema         : qf-demo

 Target Server Type    : MySQL
 Target Server Version : 80300 (8.3.0)
 File Encoding         : 65001

 Date: 30/03/2025 19:12:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for _prisma_migrations
-- ----------------------------
DROP TABLE IF EXISTS `_prisma_migrations`;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of _prisma_migrations
-- ----------------------------
BEGIN;
INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES ('1f8bab01-7ebd-4e17-a41c-b79d15f8ff25', '32d3cbd8333234023a12c3ec4719e9977a0efa72f4fb6a94a859c1391d4c35b1', '2025-03-30 09:17:54.585', '20250330091754_init', NULL, NULL, '2025-03-30 09:17:54.571', 1);
INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES ('61652c98-a958-4ac9-aca7-7bf4b3a647b9', '772fe8cd88763fd7c438ffe00608b40f423f8e65676a3edb61c4c2fbe886e3f1', '2025-03-30 09:17:48.188', '20250329004308_init', NULL, NULL, '2025-03-30 09:17:48.156', 1);
COMMIT;

-- ----------------------------
-- Table structure for log
-- ----------------------------
DROP TABLE IF EXISTS `log`;
CREATE TABLE `log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tenantID` int unsigned DEFAULT NULL,
  `userID` int unsigned DEFAULT NULL,
  `type` int DEFAULT '0',
  `method` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `operName` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `operParam` text COLLATE utf8mb4_unicode_ci,
  `operResult` text COLLATE utf8mb4_unicode_ci,
  `status` tinyint DEFAULT NULL,
  `errorMsg` text COLLATE utf8mb4_unicode_ci,
  `operTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `costTime` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `log_tenantID_userID_type_operName_idx` (`tenantID`,`userID`,`type`,`operName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of log
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for perm
-- ----------------------------
DROP TABLE IF EXISTS `perm`;
CREATE TABLE `perm` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `ownerId` int unsigned DEFAULT NULL,
  `ownerType` tinyint DEFAULT NULL,
  `perms` json DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `perm_ownerId_ownerType_key` (`ownerId`,`ownerType`),
  KEY `perm_ownerId_ownerType_idx` (`ownerId`,`ownerType`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of perm
-- ----------------------------
BEGIN;
INSERT INTO `perm` (`id`, `ownerId`, `ownerType`, `perms`, `createdAt`, `updatedAt`) VALUES (1, 1, 1, '[\"system\", \"system:tenant\", \"system:user\", \"system:log\"]', '2025-03-30 17:18:46', '2025-03-30 17:18:46');
INSERT INTO `perm` (`id`, `ownerId`, `ownerType`, `perms`, `createdAt`, `updatedAt`) VALUES (7, 1, 2, '[\"system\", \"system:tenant\", \"system:user\", \"system:log\"]', '2025-03-30 17:25:59', '2025-03-30 18:00:56');
INSERT INTO `perm` (`id`, `ownerId`, `ownerType`, `perms`, `createdAt`, `updatedAt`) VALUES (8, 2, 1, '[\"system\", \"system:user\", \"system:log\"]', '2025-03-30 18:02:56', '2025-03-30 18:02:56');
INSERT INTO `perm` (`id`, `ownerId`, `ownerType`, `perms`, `createdAt`, `updatedAt`) VALUES (9, 2, 2, '[\"system\", \"system:user\", \"system:log\"]', '2025-03-30 18:03:03', '2025-03-30 18:03:03');
COMMIT;

-- ----------------------------
-- Table structure for tenant
-- ----------------------------
DROP TABLE IF EXISTS `tenant`;
CREATE TABLE `tenant` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `contactName` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contactPhone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `companyName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `licenseNumber` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `domain` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userCount` tinyint DEFAULT NULL,
  `trialStartDate` datetime DEFAULT NULL,
  `trialEndDate` datetime DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `status` tinyint DEFAULT '0',
  `isPremium` tinyint DEFAULT '0',
  `delFlag` tinyint NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `tenant_contactName_companyName_delFlag_idx` (`contactName`,`companyName`,`delFlag`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of tenant
-- ----------------------------
BEGIN;
INSERT INTO `tenant` (`id`, `contactName`, `contactPhone`, `companyName`, `licenseNumber`, `address`, `domain`, `remark`, `userCount`, `trialStartDate`, `trialEndDate`, `startDate`, `endDate`, `status`, `isPremium`, `delFlag`, `createdAt`, `updatedAt`) VALUES (1, 'super', '18888888888', '平台管理', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, 3, 0, 0, '2025-03-30 17:18:37', '2025-03-30 17:18:37');
INSERT INTO `tenant` (`id`, `contactName`, `contactPhone`, `companyName`, `licenseNumber`, `address`, `domain`, `remark`, `userCount`, `trialStartDate`, `trialEndDate`, `startDate`, `endDate`, `status`, `isPremium`, `delFlag`, `createdAt`, `updatedAt`) VALUES (2, '弗洛伦蒂诺', '13212341234', '皇家马德里', NULL, NULL, NULL, NULL, 10, '2025-02-28 16:00:00', '2025-03-07 16:00:00', '2025-03-31 16:00:00', '2025-04-29 16:00:00', 1, 1, 0, '2025-03-30 18:02:16', '2025-03-30 18:02:16');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nickname` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isPlatformAdmin` tinyint DEFAULT '0',
  `isMaster` tinyint DEFAULT '0',
  `dataScope` tinyint DEFAULT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint DEFAULT '1',
  `loginIP` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `loginDate` timestamp NULL DEFAULT NULL,
  `remark` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `delFlag` tinyint NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `tenantID` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_phone_nickname_isPlatformAdmin_isMaster_status_idx` (`phone`,`nickname`,`isPlatformAdmin`,`isMaster`,`status`),
  KEY `user_tenantID_fkey` (`tenantID`),
  CONSTRAINT `user_tenantID_fkey` FOREIGN KEY (`tenantID`) REFERENCES `tenant` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` (`id`, `phone`, `password`, `nickname`, `isPlatformAdmin`, `isMaster`, `dataScope`, `email`, `avatar`, `status`, `loginIP`, `loginDate`, `remark`, `delFlag`, `createdAt`, `updatedAt`, `tenantID`) VALUES (1, '18888888888', '$2a$10$H1yDdIhsr7DrTb.np4MWw.xV.eISlD9RZPrdA54wrr3o8BPqv7ivS', 'super', 1, 1, 1, NULL, NULL, 1, NULL, NULL, NULL, 0, '2025-03-30 17:19:10', '2025-03-30 17:19:41', 1);
INSERT INTO `user` (`id`, `phone`, `password`, `nickname`, `isPlatformAdmin`, `isMaster`, `dataScope`, `email`, `avatar`, `status`, `loginIP`, `loginDate`, `remark`, `delFlag`, `createdAt`, `updatedAt`, `tenantID`) VALUES (2, '13212341234', '$2a$10$2rlmA6kMDKcmeGCHv/0LsOZmAAessvZC1bXEDm4PUPU.sjo34aR0G', '罗纳尔多', 0, 1, 1, NULL, NULL, 1, NULL, NULL, NULL, 0, '2025-03-30 18:02:39', '2025-03-30 18:02:39', 2);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
