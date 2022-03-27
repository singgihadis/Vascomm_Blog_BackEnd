/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50616
Source Host           : localhost:3306
Source Database       : vascomm_blog

Target Server Type    : MYSQL
Target Server Version : 50616
File Encoding         : 65001

Date: 2022-03-27 18:01:31
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `blog`
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `judul` varchar(255) DEFAULT NULL,
  `isi` text,
  `tgl_insert` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of blog
-- ----------------------------
INSERT INTO blog VALUES ('1', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2022-03-27 17:05:53', '2022-03-27 17:06:00');
INSERT INTO blog VALUES ('4', 'In previou', 'In previous versions of React Router you had to order your routes a certain way to get the right one to render when multiple routes matched an ambiguous URL. V6 is a lot smarter and will pick the most specific match so you don\'t have to worry about that anymore. For example, the URL /teams/new matches both of these route:', '2022-03-27 17:47:17', '2022-03-27 18:00:23');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role` int(2) DEFAULT '1' COMMENT '1 = Admin, 2 = Guest',
  `tgl_insert` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO user VALUES ('1', 'admin@gmail.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', '1', '2022-03-27 13:52:38', '2022-03-27 14:56:03');
INSERT INTO user VALUES ('2', 'guest@gmail.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', '2', '2022-03-27 13:52:44', '2022-03-27 14:56:02');

-- ----------------------------
-- Table structure for `user_token`
-- ----------------------------
DROP TABLE IF EXISTS `user_token`;
CREATE TABLE `user_token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `tgl_insert` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user_token
-- ----------------------------
INSERT INTO user_token VALUES ('1', '1', '7667fbfa-b4eb-49b3-811c-fb829c8682f2', '2022-03-27 14:56:14', '2022-03-27 14:56:14');
INSERT INTO user_token VALUES ('2', '1', '79baee99-54d9-4207-84c5-0e637c7690b7', '2022-03-27 15:00:14', '2022-03-27 15:00:14');
INSERT INTO user_token VALUES ('3', '1', 'ad3df961-6185-4f3e-8322-1079b19b230a', '2022-03-27 17:28:24', '2022-03-27 17:28:24');
