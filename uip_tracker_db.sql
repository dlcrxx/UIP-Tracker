-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 15, 2025 at 01:34 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `uip_tracker_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `status` varchar(50) DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `event_date` date DEFAULT NULL,
  `posted_by` varchar(255) DEFAULT 'UIP Staff'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `title`, `content`, `status`, `author_id`, `created_at`, `event_date`, `posted_by`) VALUES
(1, 'TownHall Meeting', 'Greeting Interns! \n\nWe are having our monthly townhall meeting. this is for everyone to relax, enjoy and have fun. the table is open for everyone. here is the google meet link', 'Ongoing', NULL, '2025-08-14 06:40:41', '2025-09-01', 'VisVis Travel & Tours'),
(2, 'TownHall Meeting', 'Greeting Interns!\n\nWe are having our monthly townhall meeting. this is for everyone to relax, enjoy and have fun. the table is open for everyone. here is the google meet link', 'Ongoing', NULL, '2025-08-14 17:36:02', '2025-08-01', 'UIP Staff'),
(3, 'GARBAGE CLEANUP', 'Hello Interns! \n\nOn August 13, 2025 we will have a garbage cleanup so please take your personal things home', 'Ongoing', NULL, '2025-08-14 17:38:04', '2025-08-13', 'UIP Staff');

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `time_in` datetime DEFAULT NULL,
  `time_out` datetime DEFAULT NULL,
  `remark` varchar(50) DEFAULT NULL,
  `rendered_today` decimal(5,2) DEFAULT NULL,
  `attendance_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `offboarding_requests`
--

CREATE TABLE `offboarding_requests` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` enum('pending','approved','denied') NOT NULL DEFAULT 'pending',
  `request_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `ticket_id` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `details` text DEFAULT NULL,
  `files` varchar(255) DEFAULT NULL,
  `status` varchar(50) NOT NULL,
  `date_fixed` varchar(50) DEFAULT NULL,
  `submitted_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `admin_reply` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `ticket_id`, `subject`, `details`, `files`, `status`, `date_fixed`, `submitted_at`, `user_id`, `user_name`, `admin_reply`) VALUES
(21, '2025-FC2ATM7N7E', 'sample report', '<p>report i want to change my schedule to monday, wednesday, friday to monday to friday</p>', 'https:/hjsfhkdlhfk.org', 'Fixed', '2025-08-13 08:19:46', '2025-08-13 08:19:09', 2, 'intern sample', 'duly noted. I already changed the schedule'),
(22, '2025-L0HEGU6JJ2', 'another sample', '<p>miks sample</p>', 'https:/hatdog.org', 'Pending', NULL, '2025-08-13 08:24:03', 3, 'Dani Mondragon', NULL),
(23, '2025-26R2SULE4E', 'dfafagaf', '<p>dhlsakjfhak</p>', 'sdfas', 'Pending', NULL, '2025-08-14 10:06:32', 3, 'Dani Mondragon', NULL),
(24, '2025-XP393KVQGD', 'dfafagaf', '<p>sdfasfEnter Details</p>', 'sdfas', 'Pending', NULL, '2025-08-14 10:13:02', 3, 'Dani Mondragon', NULL),
(25, '2025-HS60YAF147', 'dfafagaf', '<p>sdfasdEnter Details</p>', 'sdfas', 'Pending', NULL, '2025-08-14 10:14:02', 3, 'Dani Mondragon', NULL),
(26, '2025-HS60YAF147', 'dfafagaf', '<p>sdfasdEnter Details</p>', 'sdfas', 'Pending', NULL, '2025-08-14 10:17:25', 3, 'Dani Mondragon', NULL),
(27, '2025-A96Y36G33P', 'dfafagaf', '<p>Enter Details</p>', 'sdfas', 'Pending', NULL, '2025-08-14 10:17:45', 3, 'Dani Mondragon', NULL),
(28, '2025-ZOFU7REH0I', 'SAMPLE SAMPLE', '<h1>HEREMEOUT</h1><p><br></p><p>Cause tonight will be the night that I will fall for you~</p>', 'http://localhost/uip-tracker/admin-help.html', 'Pending', NULL, '2025-08-14 10:26:13', 2, 'intern sample', 'over again don\' make me change my mindd~~'),
(29, '2025-W9BJ8TCT9L', 'SAaknfkldsfna;lsk', '<p>Enter Details</p>', 'http://localhost/uip-tracker/admin-help.html', 'Pending', NULL, '2025-08-14 11:15:13', 2, 'intern sample', 'aksldhfdjsfhla'),
(30, '2025-OXGJJ0U8JL', 'Change Schedule', '<p>jsblafjklabfliaewioaf</p>', 'http://localhost/uip-tracker/admin-help.html', 'Pending', NULL, '2025-08-14 11:21:35', 2, 'intern sample', 'jkdbjbajb');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('intern','staff','admin') NOT NULL,
  `status` enum('pending','approved','denied') NOT NULL DEFAULT 'pending',
  `rendered_hours` int(11) DEFAULT 0,
  `required_hours` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `role`, `status`, `rendered_hours`, `required_hours`, `created_at`) VALUES
(1, 'Admin User', 'admin@uip.com', '$2b$10$mqDcopxJlC577d6FMiVCRenMfY1n3Runk7ug1hlJsGws5rXHzd126', 'admin', 'approved', 0, 300, '2025-08-11 15:30:45'),
(2, 'intern sample', 'intern@gmail.com', '$2b$10$4WSKA0uwYnLiFO0tKgVub.Ii2T5WFK0WtqVJKr5rpdsLl9BRH66Ua', 'intern', 'approved', 0, 300, '2025-08-12 09:37:30'),
(3, 'Dani Mondragon', 'dani@gmail.com', '$2b$10$AaMPLop1yZBmSFoKp2mBSe1739ZTPRKx5R1oL3NoyhWssEXbHTniG', 'intern', 'approved', 0, 300, '2025-08-12 11:59:17'),
(4, 'sayrows sangual', 'sayrows@gmail.com', 'sayrows123', 'intern', 'pending', 0, 300, '2025-08-13 08:25:20'),
(5, 'ic duque', 'ic@gmail.com', 'ic123', 'admin', 'pending', 0, 0, '2025-08-13 08:26:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `offboarding_requests`
--
ALTER TABLE `offboarding_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `offboarding_requests`
--
ALTER TABLE `offboarding_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `announcements`
--
ALTER TABLE `announcements`
  ADD CONSTRAINT `announcements_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `offboarding_requests`
--
ALTER TABLE `offboarding_requests`
  ADD CONSTRAINT `offboarding_requests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
