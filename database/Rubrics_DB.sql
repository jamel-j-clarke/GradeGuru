/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP DATABASE IF EXISTS rubrics_db;
CREATE DATABASE rubrics_db;
USE rubrics_db;

-- CREATE TABLE IF NOT EXISTS `period` (
--   `prd_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
--   `prd_name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
--   `prd_status` int(11) NOT NULL DEFAULT 1,
--   PRIMARY KEY (`prd_id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- CREATE TABLE IF NOT EXISTS `repository` (
--   `rep_id` int(10) unsigned NOT NULL,
--   `rep_name` varchar(150) CHARACTER SET utf8mb4 NOT NULL,
--   PRIMARY KEY (`rep_id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `semester` (
  `sem_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sem_season` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  -- `sem_prd_id` int(10) unsigned NOT NULL,
  -- `sem_ifs_id` int(10) unsigned NOT NULL DEFAULT 4,
  `sem_year` smallint(5) unsigned NOT NULL,
  -- `sem_short_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  -- `sem_start_date` date NOT NULL,
  -- `sem_end_date` date NOT NULL,
  `sem_active` tinyint(1) NOT NULL DEFAULT 0,
  -- `sem_allow_registration` tinyint(1) NOT NULL DEFAULT 0,
  -- `sem_cfp_open` tinyint(1) NOT NULL DEFAULT 0,
  -- `sem_syllabus` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  -- `sem_status` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`sem_id`)
  -- UNIQUE KEY `idx_semester_period` (`sem_prd_id`,`sem_year`),
  -- KEY `fk_sem_ifs` (`sem_ifs_id`),
  -- CONSTRAINT `fk_sem_ifs` FOREIGN KEY (`sem_ifs_id`) REFERENCES `infosheet_schema` (`ifs_id`),
  -- CONSTRAINT `fk_sem_prd` FOREIGN KEY (`sem_prd_id`) REFERENCES `period` (`prd_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- CREATE TABLE IF NOT EXISTS `team_advisor` (
--   `tad_usr_id` int(10) unsigned NOT NULL,
--   `tad_tea_id` int(10) unsigned NOT NULL,
--   `tad_is_ta` tinyint(1) NOT NULL DEFAULT 0,
--   PRIMARY KEY (`tad_usr_id`,`tad_tea_id`),
--   KEY `FK_TAD_TEA` (`tad_tea_id`),
--   CONSTRAINT `FK_TAD_TEA` FOREIGN KEY (`tad_tea_id`) REFERENCES `team` (`tea_id`),
--   CONSTRAINT `FK_TAD_USR` FOREIGN KEY (`tad_usr_id`) REFERENCES `user` (`usr_id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
INSERT INTO `semester` (sem_id, sem_season, sem_year, sem_active)
VALUES (0, 'Dummy Semester', 1, 0);

CREATE TABLE IF NOT EXISTS `course` (
	crs_id int(10) unsigned NOT NULL AUTO_INCREMENT,
    crs_sbj varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    crs_num int unsigned DEFAULT NULL,
    crs_title varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    num_credits int unsigned DEFAULT NULL,
    crs_sem_id int(10) unsigned NOT NULL,
    PRIMARY KEY(crs_id),
    KEY `fk_crs_sem` (`crs_sem_id`),
    CONSTRAINT `fk_crs_sem` FOREIGN KEY (`crs_sem_id`) REFERENCES `semester` (`sem_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `course` (crs_id, crs_sbj, crs_num, crs_title, num_credits, crs_sem_id)
VALUES (0, 'Dummy', 0, 'Dummy Course', 0, 0);

CREATE TABLE IF NOT EXISTS `section` (
  `sec_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sec_crs_id` int(10) unsigned NOT NULL,
  `sec_number` smallint(5) unsigned NOT NULL,
  `sec_status` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`sec_id`),
  KEY `fk_sec_crs` (`sec_crs_id`),
  CONSTRAINT `fk_sec_crs` FOREIGN KEY (`sec_crs_id`) REFERENCES `course` (`crs_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `section` (sec_id, sec_crs_id, sec_number, sec_status)
VALUES (0, 0, 0, 0);

CREATE TABLE IF NOT EXISTS `rubric` (
	rub_id int(10) unsigned NOT NULL AUTO_INCREMENT,
    rub_name varchar(255) NOT NULL,
    crs_id int(10) unsigned  DEFAULT NULL,
    rub_type varchar(255) NOT NULL,
    sec_id int(10) unsigned DEFAULT NULL,
    PRIMARY KEY (rub_id),
    KEY FK_CRS_R_ID (crs_id),
    KEY FK_SEC_ID (sec_id),
    CONSTRAINT FK_CRS_R_ID FOREIGN KEY (crs_id) REFERENCES `course` (crs_id),
    CONSTRAINT FK_SEC_ID FOREIGN KEY (sec_id) REFERENCES `section` (sec_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `item` (
	item_id int(10) unsigned NOT NULL AUTO_INCREMENT,
    item_name varchar(255) NOT NULL,
    item_desc varchar(255) NOT NULL,
    item_wgt double(5,2) unsigned NOT NULL,
    available_pts int(11) unsigned DEFAULT NULL,
    rub_id int(10) unsigned NOT NULL,
    parent_id int(10) unsigned DEFAULT NULL,
    PRIMARY KEY (item_id),
	KEY FK_RUB_IT_ID (rub_id),
    KEY FK_PAR_ID (parent_id),
    CONSTRAINT FK_RUB_IT_ID FOREIGN KEY (rub_id) REFERENCES `rubric` (rub_id),
    CONSTRAINT FK_PAR_ID FOREIGN KEY (parent_id) REFERENCES `item` (item_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `item` (item_id, item_name, item_desc, item_wgt, available_pts, rub_id, parent_id)
VALUES (0, 'Dummy Item', 'Dummy Description', 0.0, 0, 0, NULL);

CREATE TABLE IF NOT EXISTS `assignment` (
	assign_id int(10) unsigned NOT NULL AUTO_INCREMENT,
    assign_name varchar(255) NOT NULL,
    assign_desc varchar(255) NOT NULL,
    sec_id int(10) unsigned NOT NULL,
    rub_id int(10) unsigned NOT NULL,
    -- assign_type varchar(255) NOT NULL,
    PRIMARY KEY (assign_id),
    KEY FK_RUB_AS_ID (rub_id),
    CONSTRAINT FK_SEC_AS_ID FOREIGN KEY (sec_id) REFERENCES `section` (sec_id),
    CONSTRAINT FK_RUB_AS_ID FOREIGN KEY (rub_id) REFERENCES `rubric` (rub_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `user` (
  `usr_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `usr_unity_id` varchar(22) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usr_campus_id` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `usr_card_id` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `usr_firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usr_preferred_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `usr_lastname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usr_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usr_settings` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `usr_is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `usr_salt` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usr_status` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`usr_id`),
  UNIQUE KEY `IDX_UNITY_ID` (`usr_unity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- CREATE TABLE IF NOT EXISTS `team` (
--   `tea_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
--   `tea_sec_sem_id` int(10) unsigned NOT NULL,
--   `tea_sec_number` smallint(5) unsigned NOT NULL,
--   `tea_sponsor_usr_id` int(10) unsigned DEFAULT NULL,
--   `tea_number` int(11) NOT NULL,
--   `tea_is_private` tinyint(1) NOT NULL DEFAULT 0,
--   `tea_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
--   `tea_short_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
--   `tea_project_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
--   `tea_project_description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
--   `tea_repository_team_id` int(10) unsigned DEFAULT NULL,
--   `tea_repository_sponsor_team_id` int(10) unsigned DEFAULT NULL,
--   `tea_repository_advisor_team_id` int(10) unsigned DEFAULT NULL,
--   `tea_sponsor_package` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
--   `tea_status` int(11) NOT NULL DEFAULT 1,
--   PRIMARY KEY (`tea_id`),
--   UNIQUE KEY `IDX_SEM_TEA_NUMBER` (`tea_sec_sem_id`,`tea_number`),
--   KEY `FK_TEA_SEM` (`tea_sec_sem_id`),
--   KEY `FK_TEA_USR` (`tea_sponsor_usr_id`),
--   KEY `fk_tea_sec` (`tea_sec_sem_id`,`tea_sec_number`),
--   CONSTRAINT `FK_TEA_USR` FOREIGN KEY (`tea_sponsor_usr_id`) REFERENCES `user` (`usr_id`),
--   CONSTRAINT `fk_tea_sec` FOREIGN KEY (`tea_sec_sem_id`, `tea_sec_number`) REFERENCES `section` (`sec_sem_id`, `sec_number`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- CREATE TABLE IF NOT EXISTS `team_repository` (
--   `trp_rep_id` int(10) unsigned NOT NULL,
--   `trp_tea_id` int(10) unsigned NOT NULL,
--   `trp_read_only` tinyint(3) unsigned NOT NULL DEFAULT 1,
--   PRIMARY KEY (`trp_tea_id`,`trp_rep_id`),
--   KEY `fk_trp_rep_id` (`trp_rep_id`) USING BTREE,
--   KEY `fk_trp_tea_id` (`trp_tea_id`) USING BTREE,
--   CONSTRAINT `fk_tpr_rep_id` FOREIGN KEY (`trp_rep_id`) REFERENCES `repository` (`rep_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
--   CONSTRAINT `fk_tpr_tea_id` FOREIGN KEY (`trp_tea_id`) REFERENCES `team` (`tea_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
