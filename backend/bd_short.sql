-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-05-2023 a las 17:59:34
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_short`
--
CREATE DATABASE IF NOT EXISTS `bd_short` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bd_short`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `follow`
--

CREATE TABLE `follow` (
  `follow_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `follow_user_id` bigint(20) NOT NULL,
  `follow_status` tinyint(1) NOT NULL,
  `follow_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `follow`
--

INSERT INTO `follow` (`follow_id`, `user_id`, `follow_user_id`, `follow_status`, `follow_time`) VALUES
(1, 1, 2, 0, '2023-05-07 12:01:27'),
(2, 1, 3, 1, '2023-05-07 12:01:27'),
(3, 1, 4, 1, '2023-05-07 12:47:23'),
(4, 1, 5, 1, '2023-05-07 12:48:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `post`
--

CREATE TABLE `post` (
  `post_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `body` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `post`
--

INSERT INTO `post` (`post_id`, `user_id`, `date`, `body`) VALUES
(1, 2, '2023-04-26 13:45:57', '¡¡Cómo echo de menos los tiempos de flash!!'),
(2, 3, '2023-04-26 13:45:01', 'Muy pronto todo backend de todo proyecto se hará con javascript... y lo sabéis'),
(3, 4, '2023-04-26 13:47:02', 'Dentro de nada me voy a comprar una 4090 para jugar al Fornite con Ray Tracing'),
(4, 5, '2023-04-26 13:48:43', 'No sé como aguantaría sin que me despidieran si no me dejaran usar Canva'),
(5, 1, '2023-05-23 07:49:09', '\"¡Enfrentando a la amenaza alienígena una vez más! 💪💥 #Alien #Ripley #Survivor\"');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `post_likes`
--

CREATE TABLE `post_likes` (
  `like_id` bigint(20) NOT NULL,
  `post_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `like_status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `post_likes`
--

INSERT INTO `post_likes` (`like_id`, `post_id`, `user_id`, `like_status`) VALUES
(1, 3, 1, 1),
(2, 4, 2, 1),
(3, 4, 3, 1),
(4, 5, 2, 1),
(5, 5, 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL,
  `alias` varchar(25) NOT NULL,
  `name` varchar(25) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` int(150) NOT NULL,
  `birthday` date NOT NULL,
  `country` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `linkedIn` varchar(150) NOT NULL,
  `education` varchar(50) NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `alias`, `name`, `surname`, `email`, `password`, `birthday`, `country`, `city`, `linkedIn`, `education`, `image`) VALUES
(1, 'Exterminadora de aliens', 'Ellen', 'Ripley', 'alien@gmail.com', 1234, '2092-01-07', 'Estados Unidos', 'New York', 'linkedin.com/in/ripley', 'Fuerzas armadas', 'users/user_1.jpg'),
(2, 'TechGeek92', 'Juan', 'Pérez', 'agonzalez@gmail.com', 12341, '1985-08-10', 'México', 'Ciudad de México', 'linkedin.com/in/alejandrogonzalez', ' Licenciatura en Administración de Empresas', 'users/user_2.jpg'),
(3, 'TechGeek', 'Sofía', 'García', 'sofia.garcia@hotmail.com', 12342, '1992-03-22', 'España', 'Barcelona', 'linkedin.com/in/sofiagarcia', 'Grado en Ingeniería Informática', 'users/user_3.jpg'),
(4, 'TheArtist', 'Camilo', 'Rodríguez', 'camilorodriguez@gmail.com', 12343, '1998-11-02', 'Argentina', 'Buenos Aires', 'linkedin.com/in/camilarodriguez', 'Licenciatura en Bellas Artes', 'users/user_4.jpg'),
(5, 'TheAthlete', 'Juan', 'López', 'juan.lopez@hotmail.com', 12344, '1996-06-14', 'Colombia', 'Bogotá', 'linkedin.com/in/juanlopez', 'Licenciatura en Educación Física', 'users/user_5.jpg'),
(6, 'TheWriter', 'Diego', 'Sánchez', 'diegosanchez@yahoo.com', 12345, '1987-12-05', 'México', 'Guadalajara', 'linkedin.com/in/diegosanchez', 'Licenciatura en Letras Hispánicas', 'users/user_6.jpg'),
(7, 'TheDoctor', 'Ana', 'Pérez', 'anaperez@gmail.com', 12346, '1983-04-11', 'España', 'Madrid', 'linkedin.com/in/anaperez', 'Licenciatura en Medicina', 'users/user_7.jpg'),
(8, 'TheDesigner', 'Francisco', 'Reyes', 'franciscoreyes@yahoo.com', 12347, '1994-07-27', 'Argentina', 'Córdoba', 'linkedin.com/in/franciscoreyes', 'Licenciatura en Diseño Gráfico', 'users/user_8.jpg'),
(9, 'TheTeacher', 'Gabriela', 'Morales', 'gabrielamorales@hotmail.com', 12348, '1991-02-14', 'México', 'Monterrey', 'linkedin.com/in/gabrielamorales', 'Licenciatura en Pedagogía', 'users/user_9.jpg'),
(10, 'TheConsultant', 'Alejandro', 'García', 'alejandrogarcia@gmail.com', 12349, '1989-09-03', 'Colombia', 'Medellín', 'linkedin.com/in/alejandrogarcia', 'Maestría en Administración', 'users/user_10.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`follow_id`),
  ADD KEY `user_id` (`user_id`,`follow_user_id`),
  ADD KEY `follow_user_id` (`follow_user_id`);

--
-- Indices de la tabla `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`post_id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indices de la tabla `post_likes`
--
ALTER TABLE `post_likes`
  ADD PRIMARY KEY (`like_id`),
  ADD KEY `post_id` (`post_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `alias` (`alias`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `follow`
--
ALTER TABLE `follow`
  MODIFY `follow_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `post`
--
ALTER TABLE `post`
  MODIFY `post_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `post_likes`
--
ALTER TABLE `post_likes`
  MODIFY `like_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `follow`
--
ALTER TABLE `follow`
  ADD CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`follow_user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `post_likes`
--
ALTER TABLE `post_likes`
  ADD CONSTRAINT `post_likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `post_likes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
