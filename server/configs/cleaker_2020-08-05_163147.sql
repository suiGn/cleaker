/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: chats
# ------------------------------------------------------------

DROP TABLE IF EXISTS `chats`;
CREATE TABLE `chats` (
  `chat_id` int(11) NOT NULL AUTO_INCREMENT,
  `chat_uid` varchar(255) DEFAULT NULL,
  `chat_name` varchar(255) DEFAULT NULL,
  `chat_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`chat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: chats_users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `chats_users`;
CREATE TABLE `chats_users` (
  `chat_uid` varchar(255) NOT NULL DEFAULT '',
  `u_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: messages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `chat_uid` varchar(255) NOT NULL DEFAULT '',
  `u_id` varchar(255) NOT NULL,
  `message` text,
  `status` int(11) DEFAULT NULL,
  `time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`message_id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sessions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: usrs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `usrs`;
CREATE TABLE `usrs` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `usrname` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `verified` int(255) DEFAULT NULL,
  `last_update` timestamp NULL DEFAULT NULL,
  `created` date DEFAULT NULL,
  `u_id` varchar(255) DEFAULT NULL,
  `random` varchar(255) DEFAULT NULL,
  `u_type` int(255) NOT NULL,
  `Country` text,
  `website` text,
  `Avatar` varchar(255) DEFAULT NULL,
  `city` text,
  `phone` varchar(255) DEFAULT NULL,
  `public` varchar(255) DEFAULT NULL,
  `about` text,
  `pphoto` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: chats
# ------------------------------------------------------------

INSERT INTO `chats` (`chat_id`,`chat_uid`,`chat_name`,`chat_type`) VALUES (1,'CHAT1',NULL,0),(2,'GRUPO1','MI GRUPO',1),(4,'CHAT2',NULL,0),(5,'CHAT3','',0);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: chats_users
# ------------------------------------------------------------

INSERT INTO `chats_users` (`chat_uid`,`u_id`) VALUES ('CHAT2','eaed28a9-d509-4a9d-bc37-6259df3a3a4a'),('CHAT2','34689332-0731-4547-a36a-21f104556399'),('CHAT3','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3'),('CHAT3','159fca56-5228-4718-879e-f7802fae041e'),('CHAT2','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3'),('GRUPO1','eaed28a9-d509-4a9d-bc37-6259df3a3a4a'),('GRUPO1','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3'),('GRUPO1','159fca56-5228-4718-879e-f7802fae041e');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: messages
# ------------------------------------------------------------

INSERT INTO `messages` (`message_id`,`chat_uid`,`u_id`,`message`,`status`,`time`) VALUES (34,'undefined','159fca56-5228-4718-879e-f7802fae041e','asdasd',NULL,'2020-07-15 20:10:48'),(41,'undefined','159fca56-5228-4718-879e-f7802fae041e','hola',NULL,'2020-07-16 04:31:20'),(53,'CHAT3','159fca56-5228-4718-879e-f7802fae041e','aaaaa',NULL,'2020-07-21 18:37:12'),(54,'CHAT3','159fca56-5228-4718-879e-f7802fae041e','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',NULL,'2020-07-21 18:37:27'),(55,'CHAT3','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','a',NULL,'2020-07-21 18:37:51'),(56,'CHAT2','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','aaaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaa',NULL,'2020-07-21 18:37:59'),(57,'CHAT2','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','aaaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaa',NULL,'2020-07-21 18:38:04'),(58,'CHAT2','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','aaaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaa',NULL,'2020-07-21 18:38:05'),(59,'CHAT2','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','aaaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaa',NULL,'2020-07-21 18:38:05'),(60,'CHAT3','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',NULL,'2020-07-21 18:38:34'),(61,'CHAT3','159fca56-5228-4718-879e-f7802fae041e','aaa',NULL,'2020-07-21 18:46:21'),(62,'CHAT3','159fca56-5228-4718-879e-f7802fae041e','asd',NULL,'2020-07-21 18:46:28'),(63,'CHAT2','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','aaaaa',NULL,'2020-07-21 18:58:51'),(64,'CHAT2','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','aaaaa',NULL,'2020-07-21 18:58:55'),(65,'CHAT2','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','aaaaaaa',NULL,'2020-07-21 18:58:58'),(66,'CHAT2','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','aaaa',NULL,'2020-07-21 18:59:27'),(67,'CHAT3','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','aaaa',NULL,'2020-07-21 19:00:12'),(68,'CHAT3','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','asd',NULL,'2020-07-21 19:01:03'),(69,'CHAT3','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','asd',NULL,'2020-07-21 19:01:05'),(70,'undefined','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','asd',NULL,'2020-07-21 19:01:38'),(71,'CHAT2','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','asd',NULL,'2020-07-21 19:02:09'),(72,'CHAT3','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','asd',NULL,'2020-07-21 19:03:07'),(73,'undefined','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','asd',NULL,'2020-07-21 19:19:29'),(74,'CHAT2','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','asd',NULL,'2020-07-21 19:19:32'),(75,'undefined','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','asd',NULL,'2020-07-21 19:19:42'),(76,'undefined','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','asd',NULL,'2020-07-21 19:19:43'),(77,'CHAT3','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','asd',NULL,'2020-07-21 19:19:46'),(78,'CHAT3','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','asd',NULL,'2020-07-21 19:19:49'),(79,'CHAT3','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','asd',NULL,'2020-07-21 19:20:38'),(80,'CHAT3','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','kk',NULL,'2020-07-21 19:33:47'),(81,'CHAT3','159fca56-5228-4718-879e-f7802fae041e','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',NULL,'2020-07-21 20:15:14'),(82,'CHAT2','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','asdads',NULL,'2020-08-05 09:31:22'),(83,'CHAT3','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','asd',NULL,'2020-08-05 09:31:25'),(84,'CHAT3','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','jsfdjsff',NULL,'2020-08-05 09:54:43');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sessions
# ------------------------------------------------------------

INSERT INTO `sessions` (`session_id`,`expires`,`data`) VALUES ('-Z1qyqVVRaVC35NLNb_jNxZsXI3MmNnt',1596716578,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2020-08-06T12:22:58.042Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('-ZDAAxEf-PiNLOhG7kK3HjjbBxhh6Ecy',1596727380,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2020-08-06T15:23:00.017Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('8BWDIkcJ6EmlqiELMaTgfmM3NGlPteIb',1596728168,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2020-08-06T15:19:34.912Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{\"error\":[\"Missing credentials\"]}}'),('XTCS7rNAwqS04msHNRm9RvBXM7i8PWd8',1596727384,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2020-08-06T15:23:03.712Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('bg7W8x-j2WZxyBfDCj7rZRGNgXysh1vu',1596727961,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2020-08-06T15:18:57.577Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":{\"id\":5,\"name\":\"Sui Gn\",\"usrname\":\"jabellae\",\"email\":\"jabellae@gmail.com\",\"password\":\"$2b$10$Y5OqpGc1TEtZa5lWpzA2l.KBw246LIAGDM9ZMVvyamXt/5myiIthi\",\"verified\":1,\"last_update\":\"2020-07-02T11:58:37.000Z\",\"created\":\"2020-07-02T05:00:00.000Z\",\"u_id\":\"a01b9a1f-41be-446c-aa67-ea68b6f8b7d3\",\"random\":\"d43d7951-e918-4187-8e03-ec92d8c6619a\",\"u_type\":0,\"Country\":null,\"website\":\"cleaker.me\",\"Avatar\":null,\"city\":\"Cordoba\",\"phone\":\"2103199303\",\"public\":null,\"about\":\"Let no one ignorant of Geometry enter here.\",\"pphoto\":\"https://lh5.googleusercontent.com/-kfUIeN4zbUw/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucl4zqd0416Xj_unymj8sMYKzOldXQ/photo.jpg\"}}}'),('qEl1omREdjcARFJAnVgFXbBF94302keK',1596716574,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2020-08-06T12:22:54.339Z\",\"httpOnly\":true,\"path\":\"/\"}}');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: usrs
# ------------------------------------------------------------

INSERT INTO `usrs` (`id`,`name`,`usrname`,`email`,`password`,`verified`,`last_update`,`created`,`u_id`,`random`,`u_type`,`Country`,`website`,`Avatar`,`city`,`phone`,`public`,`about`,`pphoto`) VALUES (3,'Valdo Hernández Romero','info@ilovemyfeet.mx','info@ilovemyfeet.mx',NULL,1,'2020-06-29 19:55:39','2020-06-30','f1c179c9-db5c-4693-afde-356944ab9d06',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'https://lh5.googleusercontent.com/-kfUIeN4zbUw/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucl4zqd0416Xj_unymj8sMYKzOldXQ/photo.jpg'),(4,'Aldo González','aldoglez','aldoalejandrog@gmail.com','$2b$10$KWvPMeIpkkp8Eer9HrQyF.GMDZDH9ZAqDzd2NNrRpWc6FrCEDqys.',1,'2020-06-30 01:00:46','2020-06-30','eaed28a9-d509-4a9d-bc37-6259df3a3a4a','0bf60d42-ef52-4965-9897-d96f5e079297',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'Sui Gn','jabellae','jabellae@gmail.com','$2b$10$Y5OqpGc1TEtZa5lWpzA2l.KBw246LIAGDM9ZMVvyamXt/5myiIthi',1,'2020-07-02 06:58:37','2020-07-02','a01b9a1f-41be-446c-aa67-ea68b6f8b7d3','d43d7951-e918-4187-8e03-ec92d8c6619a',0,NULL,'cleaker.me',NULL,'Cordoba','2103199303',NULL,'Let no one ignorant of Geometry enter here.','https://lh5.googleusercontent.com/-kfUIeN4zbUw/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucl4zqd0416Xj_unymj8sMYKzOldXQ/photo.jpg'),(7,'Sui Gn','mariomario','mario@gmail.com','$2b$10$AgjLRucNi3M0cbMCXszCZuvD6kdMP8y5CRFoFIp3rBfZM.nhnFxqq',0,'2020-07-02 14:56:34','2020-07-02','e45b5624-9028-4c87-8da5-c2982abaa7b6',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,'Sandra Zárate ','Sandra_Z','sandyluzd@gmail.com','$2b$10$.gDMvF2brmK0d/hoh.Xio.clIrZ2Th30nhj3fGqWXw8AbDOLAyPVm',1,'2020-07-06 00:29:02','2020-07-06','8a16e512-b203-43fc-99b8-3f39f365776e',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,'Jose','josejose','josejose@gmail.com','$2b$10$dz7mX1P3wNwD28mW/Rh1f.uVCJg7ehKcvt.ZlqlNfUERdRwSpMsUq',0,'2020-07-06 12:29:56','2020-07-06','4250c644-2782-4698-94ba-efc85eaa540d',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,'abella','abellae','abellae@gmail.com','$2b$10$kVshFcQ2lBZSc7ST.W4Wj.13rPIO6FEzXDt385a.ugSeyuavHpYyG',0,'2020-07-06 12:39:43','2020-07-06','e1a8fdb3-0597-4cf9-acc3-1db198f4066f',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,'Fernando','fernando','fernando@gmail.com','$2b$10$GqxtWqJDLiop0yY7cGEOb.7x5Vct1L6ixyHM48Q7pkTIKjOnh0mb6',0,'2020-07-06 12:43:02','2020-07-06','010cdd42-53b6-4bbf-b508-36a12183ac8c',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,'Pablo','pablo123','pablo@gmail.com','$2b$10$tIhIH0EKc0upQ7lC/mlrmOsBBQ38XxIO3ftBZV85TDyMLNplo042m',0,'2020-07-06 13:00:12','2020-07-06','28af6c9b-50b4-49f6-b2f5-782e4833756b',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,'FANO','fano123','fano@gmail.com','$2b$10$k6kIss8HffKxKrsf/GcdoeuMRO03UlnV3iSN/D0Lfp2Lko0YgfI.i',0,'2020-07-06 13:26:53','2020-07-06','b7f348a8-41a7-4117-9cae-8dfcb51fe6cd',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,'Natsynapses','natsynapses','natsynapses@gmail.com','$2b$10$CiY9b3SvbvkKQmit4nTG.eAVsKMzhY2vYuxcO/mwP9smbHe3FYJVW',1,'2020-07-06 13:39:37','2020-07-06','159fca56-5228-4718-879e-f7802fae041e',NULL,0,NULL,'',NULL,'','',NULL,'',NULL),(18,'Fatima','fatima123','fatima@gmail.com','$2b$10$dpW1HYv3XlTTZGqn1Z3DR.eFM0SONSN5hOnJA9SzSX6VTJ0p4HuBW',0,'2020-07-06 13:46:06','2020-07-06','1af13510-7d2c-4106-8307-8bb1419cca88',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,'Fatima','fatima1233','fatima123@gmail.com','$2b$10$iTWTQ7yVRjFewmh7T/AkGeebg7iOmMOsepFXSrzwdQ7sc3MOZGXu2',0,'2020-07-06 13:47:37','2020-07-06','504af815-8d04-4406-b56b-1479d645137b',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(20,'monsturo','monstruo','monstruo@gmail.com','$2b$10$XLMSa/7ZYmnoCvP7rv5B9.91MreN36qILHknHjhepxxPmS43SV8yK',0,'2020-07-06 13:50:12','2020-07-06','0f35ef57-e9f6-4935-89a0-c995efaefa2b',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(21,'Sergio MACIELL','smacielluna@gmail.com','smacielluna@gmail.com',NULL,1,'2020-07-06 21:51:05','2020-07-07','56a39b12-7d46-4855-8863-07c0a75ae423',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'https://lh3.googleusercontent.com/a-/AOh14Gj2m_KWjOku9oPMWRDGbFuOpz-WMWrk6eWs_DoTIA'),(22,'Felipe Reyes','jfelipe0685@gmail.com','jfelipe0685@gmail.com',NULL,1,'2020-07-06 23:29:56','2020-07-07','0b873bbc-7f24-4b4e-b899-f9a8fbf52516',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'https://lh5.googleusercontent.com/-BcCAbuNMj64/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckzDo2PiOJINWGSzx7I6C_0YCQI7g/photo.jpg'),(23,'Orwell','george123','orwell@gmail.com','$2b$10$thPwz12RchbvxoqwV3Ha1.z6zpDujvphDFSf02OmEsjmmknE02I3C',0,'2020-07-13 08:50:59','2020-07-13','da4b45f2-a2b5-4d2f-b152-583810105ed8',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(24,'Eduardo','Edward','eduardo.manda@hotmail.com','$2b$10$gkakMkNanXjGtCHC8LuEXuJ5XFYUk0DWldB9ZPkY9GmzDoKJnGCWS',1,'2020-07-13 15:05:06','2020-07-13','235ad9ab-fa36-4e78-8601-986da4764395',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(25,'Jorge','jabbella','jabellae12@gmail.com','$2b$10$45FcucwWnbvOFIxnagYmVu1fc3fIPvnmrM.x8PbFiNDvLxzX9sFoO',0,'2020-07-13 19:02:04','2020-07-14','7e67a599-a405-49e8-bde5-4bb2608b1e6a',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(26,'ANTONIO PIÑA','jantpm1@gmail.com','jantpm1@gmail.com',NULL,1,'2020-07-14 02:42:38','2020-07-14','b927c3f8-5a0d-4c1c-84e8-054f8b71d05a',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'https://lh4.googleusercontent.com/-fk-r7pbAQ8c/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucl_mkGmm8lkqgEb7_N817Hx0Qg_8A/photo.jpg'),(27,'ilovemyfeet Podólogo a domicilio','podologosbien@gmail.com','podologosbien@gmail.com',NULL,1,'2020-07-14 18:42:45','2020-07-14','ebc0fd84-f1d3-44d1-9e8a-98061626c85e',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'https://lh3.googleusercontent.com/a-/AOh14GgXuv9QMIf6-eKUqcDjVEsBwjWZFQk-Udr4PcMhVg'),(29,'Katya Romo','ktromo95@gmail.com','ktromo95@gmail.com',NULL,1,'2020-07-17 11:59:07','2020-07-17','69092218-9e1b-4fb5-9af9-2b0bb66d26f7',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'https://lh5.googleusercontent.com/-4W4fGEeqZZU/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucld9XMHZrfiCmX9jIHHJA3Nk7-UEw/photo.jpg'),(30,'Erika Cardenas','ErikaCE','cerikae98@gmail.com','$2b$10$b2NYl6xBXqfufyMVcgW4qux7xyspikgLBnjT3gusbwNl7AAmM7iqG',1,'2020-07-17 17:42:40','2020-07-17','bf2a40a4-4cc7-4180-84b1-3b84fa4c53d0','70cc1c89-3ba6-4927-9aae-f022dc8c89fa',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(31,'Aldo Gonzalez','kuantumtech','kuantumtechgcp@gmail.com','$2b$10$GFqvvGObO0hGyihiS2ISt.aWReZpxawWZftSn0gyVBl0Nre1dz6Fy',1,'2020-07-17 19:32:58','2020-07-18','d8c86bc5-bd0c-4198-a807-993fd2a46df4','39d3e007-a5cc-44c7-8cc1-f5e5319a6a99',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(32,'Nancy González','Nancyibarra','nancyibarra567.gonzalez@gmail.com','$2b$10$ljfw2lTNEfhxeyANxy65hu7koRzOhYdZpLUQdsh80b2FzJhoMI.4K',1,'2020-07-19 16:25:44','2020-07-19','afdff182-59bd-40ea-b0ac-49dd6bad1ba1',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
