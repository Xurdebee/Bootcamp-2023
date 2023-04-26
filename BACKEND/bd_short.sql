-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-04-2023 a las 16:55:06
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
  `user_id` bigint(20) NOT NULL,
  `follow_user_id` bigint(20) NOT NULL,
  `follow_status` tinyint(1) NOT NULL,
  `follow_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `follow`
--

INSERT INTO `follow` (`user_id`, `follow_user_id`, `follow_status`, `follow_time`) VALUES
(1, 2, 1, '2023-04-26 14:50:24'),
(1, 3, 1, '2023-04-26 14:50:34'),
(1, 4, 1, '2023-04-26 14:50:43'),
(1, 5, 1, '2023-04-26 14:50:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `post`
--

CREATE TABLE `post` (
  `post_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `body` varchar(255) NOT NULL,
  `likes_post` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `post`
--

INSERT INTO `post` (`post_id`, `user_id`, `date`, `body`, `likes_post`) VALUES
(1, 2, '2023-04-26 13:45:57', '¡¡Cómo echo de menos los tiempos de flash!!', 0),
(2, 3, '2023-04-26 13:45:01', 'Muy pronto todo backend de todo proyecto se hará con javascript... y lo sabéis', 0),
(3, 4, '2023-04-26 13:47:02', 'Dentro de nada me voy a comprar una 4090 para jugar al Fornite con Ray Tracing', 1),
(4, 5, '2023-04-26 13:48:43', 'No sé como aguantaría sin que me despidieran si no me dejaran usar Canva', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `post_likes`
--

CREATE TABLE `post_likes` (
  `post_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `like_status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `post_likes`
--

INSERT INTO `post_likes` (`post_id`, `user_id`, `like_status`) VALUES
(3, 1, 1),
(4, 2, 1),
(4, 3, 1);

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
  `education` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `alias`, `name`, `surname`, `email`, `password`, `birthday`, `country`, `city`, `linkedIn`, `education`) VALUES
(1, 'Xurderoc', 'Xurde', 'Brándulas Pellitero', 'xurderocbrandulas@gmail.com', 1234, '1991-03-04', 'España', 'Gijón', 'linkedin.com/in/xurderoc', 'Ingeniería en agricultura espacial'),
(2, 'TechGeek92', 'Juan', 'Pérez', 'agonzalez@gmail.com', 12341, '1985-08-10', 'México', 'Ciudad de México', 'linkedin.com/in/alejandrogonzalez', ' Licenciatura en Administración de Empresas'),
(3, 'TechGeek', 'Sofía', 'García', 'sofia.garcia@hotmail.com', 12342, '1992-03-22', 'España', 'Barcelona', 'linkedin.com/in/sofiagarcia', 'Grado en Ingeniería Informática'),
(4, 'TheArtist', 'TheArtist', 'Rodríguez', 'camilarodriguez@gmail.com', 12343, '1998-11-02', 'Argentina', 'Buenos Aires', 'linkedin.com/in/camilarodriguez', 'Licenciatura en Bellas Artes'),
(5, 'TheAthlete', 'Juan', 'López', 'juan.lopez@hotmail.com', 12344, '1996-06-14', 'Colombia', 'Bogotá', 'linkedin.com/in/juanlopez', 'Licenciatura en Educación Física'),
(6, 'TheWriter', 'TheWriter', 'Fernández', 'diegofernandez@yahoo.com', 12345, '1987-12-05', 'México', 'Guadalajara', 'linkedin.com/in/diegofernandez', 'Licenciatura en Letras Hispánicas'),
(7, 'TheDoctor', 'Ana', 'Pérez', 'anaperez@gmail.com', 12346, '1983-04-11', 'España', 'Madrid', 'linkedin.com/in/anaperez', 'Licenciatura en Medicina'),
(8, 'TheDesigner', 'Francisco', 'Francisco', 'franciscoreyes@yahoo.com', 12347, '1994-07-27', 'Argentina', 'Córdoba', 'linkedin.com/in/franciscoreyes', 'Licenciatura en Diseño Gráfico'),
(9, 'TheTeacher', 'Gabriela', 'Morales', 'gabrielamorales@hotmail.com', 12348, '1991-02-14', 'México', 'Monterrey', 'linkedin.com/in/gabrielamorales', 'Licenciatura en Pedagogía'),
(10, 'TheConsultant', 'Alejandro', 'García', 'alejandrogarcia@gmail.com', 12349, '1989-09-03', 'Colombia', 'Medellín', 'linkedin.com/in/alejandrogarcia', 'Maestría en Administración');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `follow`
--
ALTER TABLE `follow`
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
-- AUTO_INCREMENT de la tabla `post`
--
ALTER TABLE `post`
  MODIFY `post_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
