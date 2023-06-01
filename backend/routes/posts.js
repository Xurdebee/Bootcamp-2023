const express = require('express');
const router = express.Router();
const sequelize = require('../conexion_bd.js');
const jwt = require('jsonwebtoken');
const moment = require("moment");

// Trae los post de los amigos del usuario registrado
router.get("/friendpost/:user_id", async function (req, res) {
	try {
	  const friend_post = await sequelize.query(
		`
		SELECT post.*, users.name, users.surname, users.alias, users.image,
			COALESCE(SUM(post_likes.like_status), 0) AS like_count,
			COALESCE((SELECT COALESCE(like_status, 0)
					FROM post_likes
					WHERE post_likes.post_id = post.post_id AND post_likes.user_id = :user_id), 0) AS user_like_status
		FROM post
		JOIN users ON post.user_id = users.user_id
		LEFT JOIN post_likes ON post.post_id = post_likes.post_id
		WHERE (post.user_id = :user_id OR post.user_id IN (
		  SELECT CASE
			WHEN friends.user_id = :user_id THEN friends.friend_user_id
			WHEN friends.friend_user_id = :user_id THEN friends.user_id
		  END AS friend_user_id
		  FROM friends
		  WHERE (friends.user_id = :user_id OR friends.friend_user_id = :user_id) AND friends.friend_status = 'accepted'
		))
		GROUP BY post.post_id, users.user_id
		ORDER BY post.date DESC
		`,
		{
		  replacements: { user_id: req.params.user_id },
		  type: sequelize.QueryTypes.SELECT,
		}
	  );
  
	  // Calcular la diferencia de tiempo para cada publicación
	  friend_post.forEach((post) => {
		const postDate = moment(post.date);
		const currentDate = moment();
		const duration = moment.duration(currentDate.diff(postDate));
  
		if (duration.asDays() >= 1) {
		  post.timeAgo = `${Math.floor(duration.asDays())} ${
			Math.floor(duration.asDays()) === 1 ? "día" : "días"
		  }`;
		} else if (duration.asHours() >= 1) {
		  post.timeAgo = `${Math.floor(duration.asHours())} ${
			Math.floor(duration.asHours()) === 1 ? "hora" : "horas"
		  }`;
		} else {
		  post.timeAgo = `${Math.floor(duration.asMinutes())} ${
			Math.floor(duration.asMinutes()) === 1 ? "minuto" : "minutos"
		  }`;
		}
	  });
  
	  res.json(friend_post);
	} catch (error) {
	  console.error(error);
	  res.status(500).send("Error interno del servidor");
	}
});

// Nuevo like en un post
router.post("/newlike", async function (req, res) {
	const userId = req.body.user_id;
	const postId = req.body.post_id;
	try {
	  // Verificar si ya existe un like con status = 0
	  const existingLike = await sequelize.query(
		"SELECT * FROM post_likes WHERE user_id = ? AND post_id = ? AND like_status = 0",
		{
		  replacements: [userId, postId],
		  type: sequelize.QueryTypes.SELECT,
		}
	  );
  
	  if (existingLike.length > 0) {
		// Si ya existe un like con status = 0, actualizarlo a status = 1
		await sequelize.query(
		  "UPDATE post_likes SET like_status = 1 WHERE user_id = ? AND post_id = ?",
		  {
			replacements: [userId, postId],
			type: sequelize.QueryTypes.UPDATE,
		  }
		);
		console.log(`Te vuelve a gustar: user_id=${userId}, post_id=${postId}`);
	  } else {
		// Si no existe un like con status = 0, insertar uno nuevo
		await sequelize.query(
		  "INSERT INTO post_likes (user_id, post_id, like_status) VALUES (?, ?, 1)",
		  {
			replacements: [userId, postId],
			type: sequelize.QueryTypes.INSERT,
		  }
		);
		console.log(`Nuevo like agregado: user_id=${userId}, post_id=${postId}`);
	  }
  
	  // Obtener el nuevo like_count
	  const likeCount = await sequelize.query(
		"SELECT COALESCE(SUM(like_status), 0) AS like_count FROM post_likes WHERE post_id = ?",
		{
		  replacements: [postId],
		  type: sequelize.QueryTypes.SELECT,
		}
	  );
  
	  res.json({ success: true, like_count: likeCount[0].like_count });
	} catch (error) {
	  console.error(error);
	  res
		.status(500)
		.json({ success: false, message: "Error al guardar el like." });
	}
});

// Quitar un like de un post
router.put("/unlike", async (req, res) => {
	const userId = req.body.user_id;
	const postId = req.body.post_id;
  
	try {
	  // Actualizar el campo friend_status a 0
	  const result = await sequelize.query(
		`UPDATE post_likes SET like_status = 0 WHERE user_id = ? AND post_id = ?`,
		{
		  replacements: [userId, postId],
		  type: sequelize.QueryTypes.UPDATE,
		}
	  );
  
	  // Verificar si se ha actualizado correctamente
	  if (result[1] === 0) {
		// Si no se ha actualizado ningún registro, devolver un error
		return res
		  .status(404)
		  .json({ message: "No se ha encontrado un like para esa publicación." });
	  }
  
	  // Obtener el nuevo like_count
	  const likeCount = await sequelize.query(
		"SELECT COALESCE(SUM(like_status), 0) AS like_count FROM post_likes WHERE post_id = ?",
		{
		  replacements: [postId],
		  type: sequelize.QueryTypes.SELECT,
		}
	  );
  
	  res.json({ success: true, like_count: likeCount[0].like_count });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({
		success: false,
		message: "Ha ocurrido un error al quitar tu like.",
	  });
	}
});

// Crear un post
router.post("/newpost", async function (req, res) {
	const { user_id, body } = req.body; // Obtener los datos del nuevo post del cuerpo de la solicitud
  
	try {
	  await sequelize.query("INSERT INTO post (user_id, body) VALUES (?, ?)", {
		replacements: [user_id, body],
		type: sequelize.QueryTypes.INSERT,
	  });
  
	  res.json({ message: "Post creado exitosamente" });
	  // Enviar una confirmación de éxito como respuesta
	} catch (error) {
	  console.error(error);
	  res.status(500).send("Error interno del servidor");
	}
});

module.exports = router;
