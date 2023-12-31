-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 11 dec 2023 om 12:04
-- Serverversie: 10.4.28-MariaDB
-- PHP-versie: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pizzapalace`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `customers`
--

CREATE TABLE `customers` (
  `customerId` varchar(4) NOT NULL,
  `customerFirstName` varchar(255) NOT NULL,
  `customerLastName` varchar(255) NOT NULL,
  `customerStreetName` varchar(255) NOT NULL,
  `customerZipCode` varchar(10) NOT NULL,
  `customerCity` varchar(50) NOT NULL,
  `customerEmail` varchar(255) NOT NULL,
  `customerPassword` varchar(255) NOT NULL,
  `customerPhone` varchar(255) NOT NULL,
  `customerType` enum('member','guest','admin') NOT NULL,
  `customerIsActive` tinyint(1) NOT NULL DEFAULT 1,
  `customerCreateDate` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `customers`
--

INSERT INTO `customers` (`customerId`, `customerFirstName`, `customerLastName`, `customerStreetName`, `customerZipCode`, `customerCity`, `customerEmail`, `customerPassword`, `customerPhone`, `customerType`, `customerIsActive`, `customerCreateDate`) VALUES
('2HkM', 'Testsss', 'Hage', 'kakoestraat 2', 'ddfs23', 'test', 'test@gmail.com', '', '23523523', 'member', 0, 1699539937),
('3JcL', 'sol', 'jds', 'fdswjif', 'fdisf', 'dfisf', 'gdji@gmail.com', '', '3925823', 'member', 0, 1700474326),
('3VxJ', 'fdsdf', 'dfsds', 'dfsdfs', '523', 'dfsdfs', 'dsdsfdss@gmail.com', '', '2535532', 'member', 0, 1699540213),
('4K66', 'Test', 'test', 'kakoestraat 2', 'test', 'test', 'dfsdfs@gmail.com', '', '2545322', 'member', 0, 1699362536),
('5423', 'dudek', '.', 'joehoestraat 2', '3991KH', 'Woerden', 'peter@vandervaart.nlj', '', '06817274', 'member', 1, 1698832105),
('542s', 'Adminsss', 'Admin', 'Admin', 'Admin', 'Admin', 'Admin@gmail.com', '', '068178423', 'admin', 1, 1698917731),
('5623', 'Je vader', 'Je moeder', 'Kalebakkerstraat 5', '9912UH', 'Maastricht', 'flip@gmail.com', '', '068172323', 'member', 0, 1698832105),
('5kEw', 'lui', 'lui', 'lui', 'liului67', 'luil', 'philip@hage.cc', '', '867', 'member', 0, 1699626197),
('bTHc', '', 'cteaf', 'dhfu', '4234', 'dgsdgs', 'ja@gmail.com', '', '965688', 'member', 1, 1701091835),
('BZOv', 'Philip', 'Hage', 'kakoestraat 2', '3992BD', 'utrecht', 'philip@jf.nl', '', '068323235', 'member', 0, 1698923795),
('NM29', 'kol', 'kol', 'kol', 'kol', 'kol', 'kol@GMAIL.COM', '', '935925321', 'member', 1, 1700474117),
('OT0u', 'sol', 'sol', 'osl', 'sol', 'sol', 'sol@gmail.com', '', '52353', 'member', 1, 1700474227),
('q6Jg', 'flip', 'flip', 'flip', 'flip', 'flip', 'flip@flip.com', 'Flip12!', '0681874892', 'member', 1, 1702049247),
('Rdhm', 'jjsdfj', 'jfsddjs', 'jsfdjs', '399dj', 'djdsf', 'ja@gmail.com', '', '06828918', 'member', 1, 1701090284),
('YSz3', 'jahoo', 'hjfs', 'dsgji', 'dgshjug', 'gfdswf', 's@gmail.com', '', '52823', 'member', 1, 1700581684);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `employees`
--

CREATE TABLE `employees` (
  `employeeId` varchar(4) NOT NULL,
  `employeeFirstName` varchar(255) NOT NULL,
  `employeeRole` enum('deliverer','chef','manager') NOT NULL,
  `employeeIsActive` tinyint(1) NOT NULL DEFAULT 1,
  `employeeCreateDate` int(10) NOT NULL,
  `employeeDescritption` text DEFAULT NULL,
  `employeeLastName` varchar(255) NOT NULL,
  `employeeStreetName` varchar(255) NOT NULL,
  `employeeZipCode` varchar(10) NOT NULL,
  `employeeCity` varchar(255) NOT NULL,
  `employeePhone` varchar(10) NOT NULL,
  `employeeEmail` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `employees`
--

INSERT INTO `employees` (`employeeId`, `employeeFirstName`, `employeeRole`, `employeeIsActive`, `employeeCreateDate`, `employeeDescritption`, `employeeLastName`, `employeeStreetName`, `employeeZipCode`, `employeeCity`, `employeePhone`, `employeeEmail`) VALUES
('3541', 'Hendriks', 'deliverer', 0, 1698841196, NULL, 'de Boer', 'koekoekstraat 5', '2910JO', 'Inslatum', '0681734', 'hendrikdeboer@gmail.com'),
('c4Lv', 'jatoch', '', 0, 1698928132, NULL, 'papa', 'papastraat 2', '3929fd', 'Houten', '9289523', 'jatoch@gmail.com'),
('dfs2', 'Flippp', 'manager', 1, 1698841196, NULL, 'hahah', 'koeokeka', '532ds', 'flipflop', '235232r', 'flip@dat.nl'),
('fKnJ', 'henks', 'manager', 1, 1698940054, NULL, 'test', 'jatoch', '934JG', 'Houten', '5235325', 'philiop@gmail.com'),
('lwdw', 'henks', 'manager', 1, 1698928223, NULL, 'van der kooi', 'straatarm 2', '0123KJ', 'Utrecht', '068184742', 'henk@gmail.com'),
('sSUo', 'test123', '', 0, 1698928065, NULL, 'test13', 'jatoch', '4921JK', 'Houten', '92593253', 'philiop@gmail.com');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `ingredients`
--

CREATE TABLE `ingredients` (
  `ingredientId` varchar(4) NOT NULL,
  `ingredientName` varchar(255) NOT NULL,
  `ingredientPrice` decimal(6,2) NOT NULL,
  `ingredientIsActive` tinyint(1) NOT NULL DEFAULT 1,
  `ingredientCreateDate` int(10) NOT NULL,
  `ingredientDescription` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `ingredients`
--

INSERT INTO `ingredients` (`ingredientId`, `ingredientName`, `ingredientPrice`, `ingredientIsActive`, `ingredientCreateDate`, `ingredientDescription`) VALUES
('AVQP', 'kaas', 3.60, 1, 1698939308, NULL),
('Gd0G', 'knoflook', 6.50, 1, 1698931635, NULL),
('KJk3', 'joehoe', 6.50, 1, 1698933065, NULL),
('tgd2', 'Tomatensaus', 0.50, 1, 1698841031, NULL);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `orderhasproducts`
--

CREATE TABLE `orderhasproducts` (
  `orderId` varchar(4) NOT NULL,
  `productId` varchar(4) NOT NULL,
  `productPrice` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `orderhasproducts`
--

INSERT INTO `orderhasproducts` (`orderId`, `productId`, `productPrice`) VALUES
('kd24', '3812', 8.20),
('kd24', '5253', 9.20);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `orders`
--

CREATE TABLE `orders` (
  `orderId` varchar(4) NOT NULL,
  `orderStoreId` varchar(4) NOT NULL,
  `orderCustomerId` varchar(4) NOT NULL,
  `orderState` enum('progress','delivered','on the way','canceled','picked up') NOT NULL,
  `orderStatus` enum('success','pending','failed','') NOT NULL,
  `orderPrice` decimal(6,2) NOT NULL,
  `orderCreateDate` int(10) NOT NULL,
  `orderDescription` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `orders`
--

INSERT INTO `orders` (`orderId`, `orderStoreId`, `orderCustomerId`, `orderState`, `orderStatus`, `orderPrice`, `orderCreateDate`, `orderDescription`) VALUES
('0kmq', '253s', '4K66', 'canceled', 'success', 14.50, 1699264675, NULL),
('489s', '253s', '542s', 'progress', 'success', 3.50, 1699262327, NULL),
('8CG9', 'I2cC', 'BZOv', 'delivered', 'pending', 3.50, 1699264656, NULL),
('bD7S', '253s', '4K66', 'progress', 'success', 5.50, 1699527696, NULL),
('DBQt', '253s', '4K66', 'progress', 'success', 3.50, 1699527677, NULL),
('FXTs', '253s', '4K66', 'progress', 'success', 2.50, 1699527912, NULL),
('h42T', '253s', '4K66', 'progress', 'success', 9999.99, 1699527883, NULL),
('hIfo', '253s', '3VxJ', 'progress', 'success', 3.50, 1699887794, NULL),
('HYj8', '253s', 'BZOv', 'delivered', 'failed', 3.50, 1699264186, NULL),
('IjiM', '253s', '4K66', 'progress', 'success', 5.50, 1699527933, NULL),
('kd24', '253s', '5423', 'delivered', 'success', 15.20, 1698834107, NULL),
('VlgD', '253s', '542s', 'progress', 'success', 3.50, 1699267708, NULL);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `producthasingredients`
--

CREATE TABLE `producthasingredients` (
  `ingredientId` varchar(4) NOT NULL,
  `productId` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `producthasingredients`
--

INSERT INTO `producthasingredients` (`ingredientId`, `productId`) VALUES
('AVQP', '3812'),
('Gd0G', '3812');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `products`
--

CREATE TABLE `products` (
  `productId` varchar(4) NOT NULL,
  `productOwner` varchar(4) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `productPrice` decimal(6,2) NOT NULL,
  `productType` enum('pizza','drink','coupon','snack','custompizza') NOT NULL,
  `productIsActive` tinyint(1) NOT NULL DEFAULT 1,
  `productCreateDate` int(10) NOT NULL,
  `productDescription` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `products`
--

INSERT INTO `products` (`productId`, `productOwner`, `productName`, `productPrice`, `productType`, `productIsActive`, `productCreateDate`, `productDescription`) VALUES
('3812', '542s', 'Pizza Zwarte Truffel', 6.20, 'pizza', 1, 523352335, NULL),
('4242', '542s', 'Pizza 4 Cheese', 8.20, 'pizza', 1, 523253, NULL),
('5253', '542s', 'Pizza BBQ', 8.20, 'pizza', 1, 5232352, NULL),
('532s', '542s', 'Loaded Nachos Chicken', 8.99, 'snack', 1, 423523, NULL),
('5435', '542s', 'Cola Zero', 5.20, 'drink', 1, 52552, NULL),
('9H7H', '542s', 'joehoe', 3.50, 'pizza', 0, 1699006288, NULL),
('BzxT', '4K66', 'cola', 2.50, 'drink', 1, 1700229129, NULL),
('fds2', '542s', 'Pizza Margheritta', 10.20, 'pizza', 1, 3523521, NULL),
('ff23', '542s', 'Crispy Chicken Tenders', 12.20, 'snack', 1, 5325323, NULL),
('FgST', '542s', '', 0.00, 'custompizza', 0, 1699010380, NULL),
('FIRJ', '542s', 'Custom pizza', 3.50, 'custompizza', 0, 1699021506, NULL),
('pIQ8', '4K66', 'fanta', 5.50, 'drink', 1, 1700229237, NULL),
('UhhC', '542s', 'fanta', 3.50, 'drink', 0, 1700229096, NULL),
('V1co', 'BZOv', 'kaas pizza', 10.50, 'snack', 0, 1699006303, NULL);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `promotions`
--

CREATE TABLE `promotions` (
  `promotionId` varchar(4) NOT NULL,
  `promotionName` varchar(255) NOT NULL,
  `promotionStartDate` varchar(255) NOT NULL,
  `promotionEndDate` varchar(255) NOT NULL,
  `promotionIsActive` tinyint(1) NOT NULL DEFAULT 1,
  `promotionCreateDate` int(10) NOT NULL,
  `promotionDescription` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `promotions`
--

INSERT INTO `promotions` (`promotionId`, `promotionName`, `promotionStartDate`, `promotionEndDate`, `promotionIsActive`, `promotionCreateDate`, `promotionDescription`) VALUES
('1UJG', 'kutje bef', '1699111324', '1678548124', 0, 1699273133, NULL),
('5231', 'Promotion 3', '1699885337', '1701354137', 0, 5232523, NULL),
('5322', 'Promotion 1', '2532322', '235235', 0, 423342, NULL),
('6Lmt', 'jahooo', '1702551354', '1703069754', 1, 1701687354, NULL),
('aJE5', 'Promotion', '1701686863', '1702205263', 1, 1701686863, NULL),
('CXpb', 'dik', '1700321004', '1700839404', 0, 1699889004, NULL),
('WPZX', '', '1700002800', '0', 0, 1699884364, NULL),
('z2wR', 'joehooeeeee', '1700144723', '1700576723', 0, 1699885523, NULL);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `reviews`
--

CREATE TABLE `reviews` (
  `reviewId` varchar(4) NOT NULL,
  `reviewCustomerId` varchar(4) NOT NULL,
  `reviewEntityId` varchar(4) NOT NULL,
  `reviewEntity` varchar(15) NOT NULL,
  `reviewRating` int(3) NOT NULL,
  `reviewIsActive` tinyint(1) NOT NULL DEFAULT 1,
  `reviewCreateDate` int(10) NOT NULL,
  `reviewDescription` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `reviews`
--

INSERT INTO `reviews` (`reviewId`, `reviewCustomerId`, `reviewEntityId`, `reviewEntity`, `reviewRating`, `reviewIsActive`, `reviewCreateDate`, `reviewDescription`) VALUES
('156R', '5423', '5435', 'product', 2, 1, 1701700067, 'cola zero'),
('C1EJ', '5423', '253s', 'product', 3, 1, 1701687255, 'sasf'),
('D9nG', '5423', 'bD7S', 'order', 5, 1, 1701700099, 'bD7S'),
('nARp', '5423', '4242', 'product', 5, 1, 1701706867, 'kapot lekker'),
('Y6Dm', '5423', '253s', 'product', 2, 1, 1701699631, 'cola'),
('Yf75', '5423', '3812', 'product', 3, 1, 1701699631, 'cola'),
('Yfr5', '5423', '3812', 'product', 2, 1, 1701699631, 'cola'),
('Yfr9', '5423', '3812', 'product', 2, 1, 1701699631, 'cola'),
('YfrD', '5423', '3812', 'product', 2, 1, 1701699631, 'cola');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `screens`
--

CREATE TABLE `screens` (
  `screenId` varchar(4) NOT NULL,
  `screenEntityId` varchar(4) NOT NULL,
  `screenEntity` varchar(15) NOT NULL,
  `screenScope` varchar(15) NOT NULL DEFAULT 'main',
  `screenCreateDate` int(10) NOT NULL,
  `screenIsActive` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `screens`
--

INSERT INTO `screens` (`screenId`, `screenEntityId`, `screenEntity`, `screenScope`, `screenCreateDate`, `screenIsActive`) VALUES
('3Cka', 'aJE5', 'promotion', 'promo 2', 1701687138, 0),
('7BF5', '5253', 'product', 'main', 1701098936, 1),
('9p2o', 'BzxT', 'product', 'main', 1701098979, 1),
('AI1c', 'aJE5', 'promotion', 'promo 1', 1701687127, 1),
('Av5R', 'fds2', 'product', 'main', 1701098988, 1),
('IdMV', '5435', 'product', 'main', 1701098958, 1),
('ITD8', '4242', 'product', 'main', 1701095783, 1),
('LF6l', 'ff23', 'product', 'main', 1701098998, 1),
('obhk', 'pIQ8', 'product', 'main', 1701340384, 1),
('sbwY', 'pIQ8', 'product', 'main', 1701099006, 0),
('TQDS', '6Lmt', 'promotion', 'as', 1701687361, 1),
('z3DH', '3812', 'product', 'main', 1701098923, 1),
('ZqLb', '532s', 'product', 'main', 1701098949, 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `storehasemployees`
--

CREATE TABLE `storehasemployees` (
  `storeId` varchar(4) NOT NULL,
  `employeeId` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `storehasemployees`
--

INSERT INTO `storehasemployees` (`storeId`, `employeeId`) VALUES
('253s', '3541');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `stores`
--

CREATE TABLE `stores` (
  `storeId` varchar(4) NOT NULL,
  `storeName` varchar(255) NOT NULL,
  `storeZipcode` varchar(255) NOT NULL,
  `storeStreetName` varchar(255) NOT NULL,
  `storeCity` varchar(255) NOT NULL,
  `storePhone` varchar(10) NOT NULL,
  `storeEmail` varchar(255) NOT NULL,
  `storeIsActive` tinyint(1) NOT NULL DEFAULT 1,
  `storeCreateDate` int(10) NOT NULL,
  `storeDescription` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `stores`
--

INSERT INTO `stores` (`storeId`, `storeName`, `storeZipcode`, `storeStreetName`, `storeCity`, `storePhone`, `storeEmail`, `storeIsActive`, `storeCreateDate`, `storeDescription`) VALUES
('253s', 'New York Pizzass', '2991JH', 'Kaatsheuvelweide 2', 'Kaatsheuvel', '068271723', 'kaatsheuvel@gmail.com', 1, 52323, NULL),
('I2cC', 'Dominos', '2910HJ', 'Dominosstraat 2', 'Nieuwegein', '0681739210', 'dominos@dominos.nl', 1, 1698939736, NULL),
('ygh3', 'Je zus', '9493NJ', 'houtensewetering 2', 'Kaboem', '068182341', 'zus@zus.nl', 0, 1698934429, NULL);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `vehicles`
--

CREATE TABLE `vehicles` (
  `vehicleId` varchar(4) NOT NULL,
  `vehicleStoreId` varchar(4) NOT NULL,
  `vehicleName` varchar(255) NOT NULL,
  `vehicleType` enum('bike','car','scooter') NOT NULL,
  `vehicleIsActive` tinyint(1) NOT NULL DEFAULT 1,
  `vehicleCreateDate` int(10) NOT NULL,
  `VehicleMaintenanceDate` int(10) NOT NULL,
  `vehicleDescription` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `vehicles`
--

INSERT INTO `vehicles` (`vehicleId`, `vehicleStoreId`, `vehicleName`, `vehicleType`, `vehicleIsActive`, `vehicleCreateDate`, `VehicleMaintenanceDate`, `vehicleDescription`) VALUES
('2342', 'I2cC', 'bmw M56', 'bike', 1, 1698841376, 1698841381, NULL),
('6MoE', '253s', 'kutje', 'bike', 1, 1699616365, 1707392365, NULL),
('JZnI', 'I2cC', 'Fiets', 'bike', 1, 1699025131, 1706801131, NULL),
('pwxa', '253s', 'jehoe', 'bike', 1, 1699617781, 1707566581, NULL);

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customerId`);

--
-- Indexen voor tabel `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employeeId`);

--
-- Indexen voor tabel `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`ingredientId`);

--
-- Indexen voor tabel `orderhasproducts`
--
ALTER TABLE `orderhasproducts`
  ADD PRIMARY KEY (`orderId`,`productId`),
  ADD KEY `productId` (`productId`);

--
-- Indexen voor tabel `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `orderCustomerId` (`orderCustomerId`),
  ADD KEY `orderStoreId` (`orderStoreId`);

--
-- Indexen voor tabel `producthasingredients`
--
ALTER TABLE `producthasingredients`
  ADD PRIMARY KEY (`ingredientId`,`productId`),
  ADD KEY `productId` (`productId`);

--
-- Indexen voor tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `productOwner` (`productOwner`);

--
-- Indexen voor tabel `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`promotionId`);

--
-- Indexen voor tabel `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`reviewId`),
  ADD KEY `reviewOrderId` (`reviewEntityId`),
  ADD KEY `reviewCustomerId` (`reviewCustomerId`);

--
-- Indexen voor tabel `screens`
--
ALTER TABLE `screens`
  ADD PRIMARY KEY (`screenId`);

--
-- Indexen voor tabel `storehasemployees`
--
ALTER TABLE `storehasemployees`
  ADD PRIMARY KEY (`storeId`,`employeeId`),
  ADD KEY `employeeId` (`employeeId`);

--
-- Indexen voor tabel `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`storeId`);

--
-- Indexen voor tabel `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`vehicleId`),
  ADD KEY `vehicles_ibfk_1` (`vehicleStoreId`);

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `orderhasproducts`
--
ALTER TABLE `orderhasproducts`
  ADD CONSTRAINT `orderhasproducts_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`),
  ADD CONSTRAINT `orderhasproducts_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

--
-- Beperkingen voor tabel `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`orderCustomerId`) REFERENCES `customers` (`customerId`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`orderStoreId`) REFERENCES `stores` (`storeId`);

--
-- Beperkingen voor tabel `producthasingredients`
--
ALTER TABLE `producthasingredients`
  ADD CONSTRAINT `producthasingredients_ibfk_1` FOREIGN KEY (`ingredientId`) REFERENCES `ingredients` (`ingredientId`),
  ADD CONSTRAINT `producthasingredients_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`);

--
-- Beperkingen voor tabel `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`productOwner`) REFERENCES `customers` (`customerId`) ON UPDATE CASCADE;

--
-- Beperkingen voor tabel `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`reviewCustomerId`) REFERENCES `customers` (`customerId`);

--
-- Beperkingen voor tabel `storehasemployees`
--
ALTER TABLE `storehasemployees`
  ADD CONSTRAINT `storehasemployees_ibfk_1` FOREIGN KEY (`storeId`) REFERENCES `stores` (`storeId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `storehasemployees_ibfk_2` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`employeeId`) ON UPDATE CASCADE;

--
-- Beperkingen voor tabel `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`vehicleStoreId`) REFERENCES `stores` (`storeId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
