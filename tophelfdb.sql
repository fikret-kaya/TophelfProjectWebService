
-- PHP Sürümü: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `tophelfdb`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `comments`
--

CREATE TABLE `comments` (
  `c_id` int(11) NOT NULL,
  `content` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `friend`
--

CREATE TABLE `friend` (
  `u_id1` int(11) NOT NULL,
  `u_id2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `place`
--

CREATE TABLE `place` (
  `p_id` int(11) NOT NULL,
  `placename` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `rating` double DEFAULT NULL,
  `info` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `ranking`
--

CREATE TABLE `ranking` (
  `relation_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rank` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `relations`
--

CREATE TABLE `relations` (
  `r_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `p_id` int(11) NOT NULL,
  `t_id` int(11) NOT NULL,
  `c_id` int(11) NOT NULL,
  `rating` double NOT NULL,
  `relationtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tag`
--

CREATE TABLE `tag` (
  `t_id` int(11) NOT NULL,
  `tagname` varchar(255) DEFAULT NULL,
  `rating` double DEFAULT NULL,
  `stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `u_id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(16) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `image` mediumblob,
  `rating` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo için indeksler `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`c_id`);

--
-- Tablo için indeksler `friend`
--
ALTER TABLE `friend`
  ADD PRIMARY KEY (`u_id1`,`u_id2`),
  ADD KEY `fk_FrıendUser2` (`u_id2`);

--
-- Tablo için indeksler `place`
--
ALTER TABLE `place`
  ADD PRIMARY KEY (`p_id`);

--
-- Tablo için indeksler `ranking`
--
ALTER TABLE `ranking`
  ADD PRIMARY KEY (`relation_id`,`user_id`),
  ADD KEY `f_userR` (`user_id`);

--
-- Tablo için indeksler `relations`
--
ALTER TABLE `relations`
  ADD PRIMARY KEY (`r_id`,`u_id`,`p_id`,`t_id`,`c_id`),
  ADD KEY `fk_U` (`u_id`),
  ADD KEY `fk_P` (`p_id`),
  ADD KEY `fk_T` (`t_id`),
  ADD KEY `fk_C` (`c_id`);

--
-- Tablo için indeksler `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`t_id`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`u_id`);

--
-- Tablo kısıtlamaları `friend`
--
ALTER TABLE `friend`
  ADD CONSTRAINT `fk_FrıendUser1` FOREIGN KEY (`u_id1`) REFERENCES `users` (`u_id`),
  ADD CONSTRAINT `fk_FrıendUser2` FOREIGN KEY (`u_id2`) REFERENCES `users` (`u_id`);

--
-- Tablo kısıtlamaları `ranking`
--
ALTER TABLE `ranking`
  ADD CONSTRAINT `f_relationR` FOREIGN KEY (`relation_id`) REFERENCES `relations` (`r_id`),
  ADD CONSTRAINT `f_userR` FOREIGN KEY (`user_id`) REFERENCES `users` (`u_id`);

--
-- Tablo kısıtlamaları `relations`
--
ALTER TABLE `relations`
  ADD CONSTRAINT `fk_C` FOREIGN KEY (`c_id`) REFERENCES `comments` (`c_id`),
  ADD CONSTRAINT `fk_P` FOREIGN KEY (`p_id`) REFERENCES `place` (`p_id`),
  ADD CONSTRAINT `fk_T` FOREIGN KEY (`t_id`) REFERENCES `tag` (`t_id`),
  ADD CONSTRAINT `fk_U` FOREIGN KEY (`u_id`) REFERENCES `users` (`u_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
