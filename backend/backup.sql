-- MySQL dump 10.13  Distrib 9.6.0, for macos14.8 (x86_64)
--
-- Host: localhost    Database: draftmypc
-- ------------------------------------------------------
-- Server version	9.6.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '67943bb2-0c1c-11f1-95a3-d2f96a267f0d:1-74';

--
-- Table structure for table `builds`
--

DROP TABLE IF EXISTS `builds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `builds` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `components` json NOT NULL,
  `total_price` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `builds_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `builds`
--

LOCK TABLES `builds` WRITE;
/*!40000 ALTER TABLE `builds` DISABLE KEYS */;
INSERT INTO `builds` VALUES (1,2,'Test 1','{\"cpu\": {\"id\": \"cpu-1\", \"name\": \"Intel Core i3-12100F\", \"price\": 15000}, \"motherboard\": {\"id\": \"mb-1\", \"name\": \"Gigabyte B660M DS3H\", \"price\": 15000}}',30000,'2026-02-22 16:24:30'),(2,2,'Test 2','{\"cpu\": {\"id\": \"cpu-1\", \"name\": \"Intel Core i3-12100F\", \"price\": 15000}}',15000,'2026-02-22 16:42:26'),(3,2,'Test3','{\"cpu\": {\"id\": \"cpu-1\", \"name\": \"Intel Core i3-12100F\", \"price\": 15000}, \"gpu\": {\"id\": \"gpu-1\", \"name\": \"NVIDIA GTX 1650\", \"price\": 25000}}',40000,'2026-02-23 02:45:13'),(4,5,'plus1','{\"cpu\": {\"id\": \"cpu-2\", \"name\": \"AMD Ryzen 5 5500\", \"price\": 18000}, \"gpu\": {\"id\": \"gpu-1\", \"name\": \"NVIDIA GTX 1650\", \"price\": 25000}}',43000,'2026-02-23 05:21:33'),(5,5,'jj','{\"cpu\": {\"id\": \"cpu-1\", \"name\": \"Intel Core i3-12100F\", \"price\": 15000}}',15000,'2026-03-09 05:20:44'),(6,8,'Test','{\"cpu\": {\"id\": \"1775810630420\", \"name\": \"CPU\", \"price\": 29000}}',29000,'2026-04-19 13:47:27');
/*!40000 ALTER TABLE `builds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `components`
--

DROP TABLE IF EXISTS `components`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `components` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `model` varchar(100) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `performance_tier` varchar(50) DEFAULT NULL,
  `image_url` text,
  `specs` json DEFAULT NULL,
  `best_for` json DEFAULT NULL,
  `retailer_links` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `components`
--

LOCK TABLES `components` WRITE;
/*!40000 ALTER TABLE `components` DISABLE KEYS */;
INSERT INTO `components` VALUES ('09fa3a83-6265-44c1-b53b-6ed32f1d9d15','G.Skill Trident Z 16GB','ram','G.Skill','DDR4 3600MHz',15000,'mid-range','https://example.com/gskill.jpg','{\"size\": \"16GB\", \"speed\": \"3600MHz\"}','[\"gaming\"]',NULL),('1772719840765','Cooler Master Hyper 212 Black Edition','cooler','Cooler Master','Hyper 212 Black',6570,'mid-range','/placeholder.svg','{\"rpm\": \"650-2000 RPM\", \"type\": \"air cooler\", \"fanSize\": \"120mm\", \"noiseLevel\": \"26 dBA\", \"tdpSupport\": \"150W\"}','[\"gaming\"]',NULL),('1773487785327','ASUS B650','motherboard','ASUS','B650',19000,'mid-range','/placeholder.svg','{\"ram\": \"DDR5\", \"socket\": \"AM5\"}','[\"gaming\"]',NULL),('1773487989068','Corsair Vengeance 32GB','ram','Corsair','DDR5',50000,'high-end','/placeholder.svg','{\"size\": \"32GB\", \"speed\": \"6000MHz\"}','[\"gaming\"]',NULL),('1773488443062','Samsung 980 Pro','storage','Samsung','980 Pro',70000,'high-end','/placeholder.svg','{\"size\": \"1TB\", \"speed\": \"7000MB/s\"}','[\"nvme\", \"gaming\"]',NULL),('1773488547820','Corsair RM750x','psu','Corsair','RM750x',19000,'high-end','/placeholder.svg','{\"wattage\": \"750W\", \"efficiency\": \"80+ Gold\"}','[\"modular\", \"gold\"]',NULL),('1773488684402','NZXT H510','case','NZXT','H510',12030,'mid-range','/placeholder.svg','{\"fans\": \"2 included\", \"type\": \"ATX\"}','[\"gaming\"]',NULL),('1775810630420','CPU','cpu','AMD','Ryzen 7 5700x',29000,'mid-range','https://image-url','{\"clock\": \"4.5GHz\", \"cores\": 16}','[\"Gaming\"]',NULL),('322fe05e-dddc-4953-8857-19d29354d13f','WD Black SN850','storage','Western Digital','SN850',18000,'high-end','https://example.com/sn850.jpg','{\"size\": \"1TB\", \"speed\": \"7000MB/s\"}','[\"gaming\", \"nvme\"]',NULL),('5f1e4f52-8812-45a5-9057-191acc23e6c8','MSI B550 Tomahawk','motherboard','MSI','B550',20000,'mid-range','https://example.com/msi-b550.jpg','{\"ram\": \"DDR4\", \"socket\": \"AM4\"}','[\"gaming\"]',NULL),('8c7f6c3c-379f-47a3-9da2-a713d90744ee','Seasonic Focus GX-650','psu','Seasonic','GX-650',15000,'mid-range','https://example.com/seasonic.jpg','{\"wattage\": \"650W\", \"efficiency\": \"80+ Gold\"}','[\"gaming\"]',NULL),('8cb57536-ec3b-4480-b6a6-116bff1bd151','G.Skill Trident Z 16GB','ram','G.Skill','DDR4 3600MHz',9000,'mid-range','https://example.com/gskill.jpg','{\"size\": \"16GB\", \"speed\": \"3600MHz\"}','[\"gaming\"]',NULL),('901abb2e-7ac4-453a-b575-0f9e8f12d22d','MSI B550 Tomahawk','motherboard','MSI','B550',20000,'mid-range','https://example.com/msi-b550.jpg','{\"ram\": \"DDR4\", \"socket\": \"AM4\"}','[\"gaming\"]',NULL),('908af7c1-e2c1-4ab7-bf67-ee04e809f3a6','Intel Core i5-12400F','cpu','Intel','i5-12400F',20000,'budget','https://example.com/12400f.jpg','{\"cores\": 6, \"threads\": 12}','[\"gaming\", \"office\"]',NULL),('9ec531e1-8aec-4c89-a070-6b03c405e5d2','AMD Ryzen 9 7900X','cpu','AMD','7900X',55000,'high-end','https://example.com/7900x.jpg','{\"cores\": 12, \"threads\": 24}','[\"gaming\", \"workstation\"]',NULL),('a8f380a1-34e4-42d7-ae16-6a813de68138','Noctua NH-D15','cooler','Noctua','NH-D15',12000,'high-end','https://example.com/noctua.jpg','{\"type\": \"air cooler\", \"fanSize\": \"140mm\"}','[\"cooling\"]',NULL),('a9a01ea4-a510-4287-b4f1-5da365d94ce6','AMD Ryzen 9 7900X','cpu','AMD','7900X',55000,'high-end','https://example.com/7900x.jpg','{\"cores\": 12, \"threads\": 24}','[\"gaming\", \"workstation\"]',NULL),('af1f4d18-6e54-498b-9314-7cfa6c141057','AMD RX 6700 XT','gpu','AMD','RX 6700 XT',60000,'mid-range','https://example.com/6700xt.jpg','{\"vram\": \"12GB\"}','[\"1440p gaming\"]',NULL),('b1efefbf-67cb-4e26-918f-92d5e04c5835','Seasonic Focus GX-650','psu','Seasonic','GX-650',15000,'mid-range','https://example.com/seasonic.jpg','{\"wattage\": \"650W\", \"efficiency\": \"80+ Gold\"}','[\"gaming\"]',NULL),('bc532209-5ef7-4903-a0bd-cfce9a85e551','NVIDIA RTX 3050','gpu','NVIDIA','RTX 3050',30000,'budget','https://example.com/3050.jpg','{\"vram\": \"8GB\"}','[\"1080p gaming\"]',NULL),('c23d62bb-9d9f-4651-a7d1-f2faf2d109ce','Intel Core i5-12400F','cpu','Intel','i5-12400F',20000,'budget','https://example.com/12400f.jpg','{\"cores\": 6, \"threads\": 12}','[\"gaming\", \"office\"]',NULL),('c8672f14-0b82-480d-843d-fb12d6d3bfb6','WD Black SN850','storage','Western Digital','SN850',18000,'high-end','https://example.com/sn850.jpg','{\"size\": \"1TB\", \"speed\": \"7000MB/s\"}','[\"gaming\", \"nvme\"]',NULL),('cpu-1','Intel Core i3-12100F','cpu','Intel','i3-12100F',15000,'budget','/placeholder.svg','{\"tdp\": \"58W\", \"cache\": \"12MB\", \"cores\": 4, \"socket\": \"LGA 1700\", \"threads\": 8, \"baseSpeed\": \"3.3 GHz\", \"boostSpeed\": \"4.3 GHz\"}','[\"Basic Gaming\", \"Office Work\", \"Web Browsing\"]','[{\"url\": \"https://itti.com.np\", \"name\": \"ITTI\", \"price\": 15000}]'),('cpu-2','AMD Ryzen 5 5500','cpu','AMD','Ryzen 5 5500',18000,'budget','/placeholder.svg','{\"tdp\": \"65W\", \"cache\": \"19MB\", \"cores\": 6, \"socket\": \"AM4\", \"threads\": 12, \"baseSpeed\": \"3.6 GHz\", \"boostSpeed\": \"4.2 GHz\"}','[\"Budget Gaming\", \"Streaming\", \"Productivity\"]','[{\"url\": \"https://itti.com.np\", \"name\": \"ITTI\", \"price\": 18000}]'),('cpu-3','Intel Core i5-13400F','cpu','Intel','i5-13400F',32000,'mid-range','/placeholder.svg','{\"cores\": 10, \"threads\": 16, \"boostSpeed\": \"4.6 GHz\"}','[\"1080p Gaming\", \"Content Creation\", \"Multitasking\"]','[{\"url\": \"https://itti.com.np\", \"name\": \"ITTI\", \"price\": 32000}]'),('cpu-4','AMD Ryzen 5 7600','cpu','AMD','Ryzen 5 7600',38000,'mid-range','/placeholder.svg','{\"cores\": 6, \"threads\": 12, \"boostSpeed\": \"5.1 GHz\"}','[\"1440p Gaming\", \"Streaming\", \"Video Editing\"]','[{\"url\": \"https://itti.com.np\", \"name\": \"ITTI\", \"price\": 38000}]'),('cpu-5','Intel Core i5-14600K','cpu','Intel','i5-14600K',45000,'high-end','/placeholder.svg','{\"cores\": 14, \"threads\": 20, \"boostSpeed\": \"5.3 GHz\"}','[\"High FPS Gaming\", \"3D Rendering\"]','[{\"url\": \"https://itti.com.np\", \"name\": \"ITTI\", \"price\": 45000}]'),('cpu-6','AMD Ryzen 7 7800X3D','cpu','AMD','Ryzen 7 7800X3D',62000,'high-end','/placeholder.svg','{\"cores\": 8, \"threads\": 16, \"boostSpeed\": \"5.0 GHz\"}','[\"Best Gaming CPU\", \"4K Gaming\"]','[{\"url\": \"https://itti.com.np\", \"name\": \"ITTI\", \"price\": 62000}]'),('cpu-7','Intel Core i7-14700K','cpu','Intel','i7-14700K',68500,'enthusiast','/placeholder.svg','{\"cores\": 20, \"threads\": 28, \"boostSpeed\": \"5.6 GHz\"}','[\"Professional Work\", \"4K Gaming\"]','[{\"url\": \"https://itti.com.np\", \"name\": \"ITTI\", \"price\": 68500}]'),('cpu-8','Intel Core i9-14900K','cpu','Intel','i9-14900K',95000,'enthusiast','/placeholder.svg','{\"cores\": 24, \"threads\": 32, \"boostSpeed\": \"6.0 GHz\"}','[\"Ultimate Performance\", \"Workstation\"]','[{\"url\": \"https://itti.com.np\", \"name\": \"ITTI\", \"price\": 95000}]'),('dee2b989-a751-4dda-a345-2a6912465e65','Lian Li Lancool II','case','Lian Li','Lancool II',15000,'mid-range','https://example.com/lancool.jpg','{\"fans\": \"3 included\", \"type\": \"ATX\"}','[\"gaming\"]',NULL),('ec9106d3-917d-48c2-8d05-70b2f55150ae','Noctua NH-D15','cooler','Noctua','NH-D15',12000,'high-end','https://example.com/noctua.jpg','{\"type\": \"air cooler\", \"fanSize\": \"140mm\"}','[\"cooling\"]',NULL),('eff2e341-1c5a-4dae-b7e6-8230cd91ce22','NVIDIA RTX 3050','gpu','NVIDIA','RTX 3050',30000,'budget','https://example.com/3050.jpg','{\"vram\": \"8GB\"}','[\"1080p gaming\"]',NULL),('fb05085b-7ee5-4f36-89da-c14e11013b78','AMD RX 6700 XT','gpu','AMD','RX 6700 XT',60000,'mid-range','https://example.com/6700xt.jpg','{\"vram\": \"12GB\"}','[\"1440p gaming\"]',NULL),('gpu-1','NVIDIA GTX 1650','gpu','NVIDIA','GTX 1650',25000,'budget','/placeholder.svg','{\"vram\": \"4GB GDDR6\", \"boostClock\": \"1665 MHz\"}','[\"1080p Low-Medium\", \"Esports\"]','[{\"url\": \"https://itti.com.np\", \"name\": \"ITTI\", \"price\": 25000}]'),('gpu-10','NVIDIA RTX 4080','gpu','NVIDIA','RTX 4080',185000,'enthusiast','/placeholder.svg','{\"vram\": \"16GB\"}','[\"4K Ultra\", \"Professional Work\"]','[{\"url\": \"https://itti.com.np\", \"name\": \"ITTI\", \"price\": 185000}]'),('gpu-2','AMD RX 6500 XT','gpu','AMD','RX 6500 XT',22000,'budget','/placeholder.svg','{\"vram\": \"4GB GDDR6\", \"boostClock\": \"2815 MHz\"}','[\"1080p Gaming\", \"Entry Level\"]','[{\"url\": \"https://itti.com.np\", \"name\": \"ITTI\", \"price\": 22000}]'),('gpu-3','NVIDIA RTX 3060','gpu','NVIDIA','RTX 3060',48000,'mid-range','/placeholder.svg','{\"vram\": \"12GB GDDR6\", \"rayTracing\": \"Yes\"}','[\"1080p High\", \"1440p Medium\"]','[{\"url\": \"https://itti.com.np\", \"name\": \"ITTI\", \"price\": 48000}]'),('gpu-4','NVIDIA RTX 4060','gpu','NVIDIA','RTX 4060',55000,'mid-range','/placeholder.svg','{\"dlss\": \"DLSS 3\", \"vram\": \"8GB GDDR6\"}','[\"1080p Ultra\", \"1440p High\"]','[{\"url\": \"https://itti.com.np\", \"name\": \"ITTI\", \"price\": 55000}]'),('gpu-5','AMD RX 7600','gpu','AMD','RX 7600',45000,'mid-range','/placeholder.svg','{\"vram\": \"8GB GDDR6\"}','[\"1080p Ultra\", \"Value Gaming\"]','[{\"url\": \"https://itti.com.np\", \"name\": \"ITTI\", \"price\": 45000}]'),('gpu-6','NVIDIA RTX 4060 Ti','gpu','NVIDIA','RTX 4060 Ti',78000,'mid-range','/placeholder.svg','{\"vram\": \"8GB GDDR6\"}','[\"1440p High\", \"Ray Tracing\"]','[{\"url\": \"https://itti.com.np\", \"name\": \"ITTI\", \"price\": 78000}]'),('gpu-7','AMD RX 7800 XT','gpu','AMD','RX 7800 XT',98000,'high-end','/placeholder.svg','{\"vram\": \"16GB\"}','[\"1440p Ultra\", \"4K Medium\"]','[{\"url\": \"https://itti.com.np\", \"name\": \"ITTI\", \"price\": 98000}]'),('gpu-8','NVIDIA RTX 4070','gpu','NVIDIA','RTX 4070',105000,'high-end','/placeholder.svg','{\"vram\": \"12GB\"}','[\"1440p Ultra\", \"4K Medium\"]','[{\"url\": \"https://itti.com.np\", \"name\": \"ITTI\", \"price\": 105000}]'),('gpu-9','NVIDIA RTX 4070 Ti','gpu','NVIDIA','RTX 4070 Ti',125000,'high-end','/placeholder.svg','{\"vram\": \"12GB\"}','[\"4K Gaming\", \"Content Creation\"]','[{\"url\": \"https://itti.com.np\", \"name\": \"ITTI\", \"price\": 125000}]');
/*!40000 ALTER TABLE `components` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `price_history`
--

DROP TABLE IF EXISTS `price_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `price_history` (
  `id` varchar(36) NOT NULL,
  `component_id` varchar(36) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `date_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `component_id` (`component_id`),
  CONSTRAINT `price_history_ibfk_1` FOREIGN KEY (`component_id`) REFERENCES `components` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `price_history`
--

LOCK TABLES `price_history` WRITE;
/*!40000 ALTER TABLE `price_history` DISABLE KEYS */;
INSERT INTO `price_history` VALUES ('1f624f65-e3bb-49f9-ac98-19495bc35269','09fa3a83-6265-44c1-b53b-6ed32f1d9d15',9000.00,'2026-04-10 08:35:30'),('206e3b61-ce08-4557-b1be-2af7783fa2c5','09fa3a83-6265-44c1-b53b-6ed32f1d9d15',1500.00,'2026-04-19 13:39:22'),('235bd2ce-2de8-42f5-9244-2d9db9e8e466','1773488684402',12030.00,'2026-04-19 14:07:18'),('631cf15c-8dbf-41c7-a0a5-1c47aefcf76b','09fa3a83-6265-44c1-b53b-6ed32f1d9d15',15000.00,'2026-04-19 14:06:36'),('98143c2c-355c-4b09-81c3-489071ab1acc','09fa3a83-6265-44c1-b53b-6ed32f1d9d15',10000.00,'2026-04-10 08:23:03'),('d12b97ff-ec1c-40ba-a4a9-272766546cff','1775810630420',29000.00,'2026-04-10 08:44:06'),('d17d3ed7-543e-43de-9240-61d1ee1bb040','09fa3a83-6265-44c1-b53b-6ed32f1d9d15',9500.00,'2026-04-19 11:42:35'),('fe1a2bf9-c99f-4b81-9817-0ba7f76a713c','1772719840765',6570.00,'2026-04-19 14:08:19');
/*!40000 ALTER TABLE `price_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Testuser','testuser@gmail.com','$2b$12$MbTl1REte4naNRYh.sKRuODXrcpfyOXTsbl4XR2jqxngZLXvjSB8.','user'),(2,'Nitik','naveen@gmail.com','$2b$12$XvFuDDpcTYbfxTtZXGfw1upMBXNGkaV4u26atW6FYOEv8.SYL4C.2','user'),(3,'Test2','naveentest@gmail.com','$2b$12$6vyUD7Q9nzcEkUWjHUOOqOm5jaTICSAb6WSX5knOpn0sDLqBktf62','user'),(5,'plus1','naveen+1@gmail.com','$2b$12$swGXwfDtseNzWkm5G9PUWOTE.7Oqnj7dHS0KttEYU8uDtxi79CzJa','user'),(6,'admin','admin@gmail.com','$2b$12$AG40sJYxG21qUxwz4QKQaumGD3SUtq9LeueWj1v35dDzJcMonSGMu','admin'),(7,'Tester','test123@gmail.com','$2b$12$bsw2E1XCxHK6mmMzqMoOku4sAZ9MKCU/Bsw2YPKuAcxx4qG1Ww1By','user'),(8,'nitik','nitik@gmail.com','$2b$12$U39dgU9oUK.IPnyH7cUDL.MYcoQZXfyR3KwgHSbRcDTeM731xbpeC','user'),(9,'john','','$2b$12$JeoWmPEFEYex0Xk72JNgaujoEfURu52fuRLkdixg94WpnUe0NR7By','user'),(10,'Test3','test3@gmail.com','$2b$12$9z.prjbyLfZuR3TSIJR2uuoJJD4J7JykHs4VA2logtyMkUmbA/4QO','user'),(12,'nitik','nitik12@gmail.com','$2b$12$DvKrxDTaoxwp7PqU2uLFoOM2.k4Ydd53eiXm6FTrZ5JjCxgcAukde','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-20 20:21:28
