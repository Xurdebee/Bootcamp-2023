const express = require('express');
const router = express.Router();
const sequelize = require('../conexion_bd.js');

// Traer feedbacks
router.get("/feedbacks/:feedback_user_id", async function (req, res) {
	try {
	  const feedback = await sequelize.query(
		`SELECT feedback.*, users.name, users.surname, users.alias
		FROM feedback
		JOIN users ON feedback.user_id = users.user_id
		WHERE feedback.feedback_user_id = :feedback_user_id
		`,
		{
		  replacements: { feedback_user_id: req.params.feedback_user_id },
		  type: sequelize.QueryTypes.SELECT,
		}
	  );
	  res.json(feedback);
	} catch (error) {
	  console.error(error);
	  res.status(500).send("Error interno del servidor");
	}
});

// Crear un feedback
router.post("/newfeedback", async function (req, res) {
	const { user_id, feedback_user_id, feedback_text } = req.body; // Obtener los datos del nuevo post del cuerpo de la solicitud
	try {
	  await sequelize.query(
		"INSERT INTO feedback (user_id, feedback_user_id, feedback_text) VALUES (?, ?, ?)",
		{
		  replacements: [user_id, feedback_user_id, feedback_text],
		  type: sequelize.QueryTypes.INSERT,
		}
	  );

	  res.json({ message: "Feedback aportado correctamente" });
	  // Enviar una confirmación de éxito como respuesta
	} catch (error) {
	  console.error(error);
	  res.status(500).send("Error interno del servidor");
	}
});

// Comprobar si ya has dejado una opinión al usuario que visitas
router.get("/checkfeedback/:user_id/:feedback_user_id", async function (req, res) {
	const { user_id, feedback_user_id } = req.params;

	try {
	  const feedback = await sequelize.query(
		`SELECT * FROM feedback
		WHERE user_id = :user_id
		AND feedback_user_id = :feedback_user_id`,
		{
		  replacements: { user_id, feedback_user_id },
		  type: sequelize.QueryTypes.SELECT,
		}
	  );

	  if (feedback.length > 0) {
		// El usuario ya ha dejado un comentario en el perfil del otro usuario
		res.json({ hasFeedback: true });
	  } else {
		// El usuario no ha dejado ningún comentario en el perfil del otro usuario
		res.json({ hasFeedback: false });
	  }
	} catch (error) {
	  console.error(error);
	  res.status(500).send("Error interno del servidor");
	}
});

// Mostrar/ocultar feedbacks
router.put("/updatefeedback/:user_id/:feedback_user_id/:feedback_status_updated", async (req, res) => {
	const { user_id, feedback_user_id, feedback_status_updated } = req.params;

	try {
		const updatedFeedback = await sequelize.query(
			`UPDATE feedback
			SET feedback_status = ?
			WHERE user_id = ?
			AND feedback_user_id = ?`,
			{
				replacements: [feedback_status_updated, user_id, feedback_user_id],
				type: sequelize.QueryTypes.UPDATE,
			}
		);

		if (updatedFeedback < 0) {
			return res.status(404).json({ error: "Feedback no existente" });
		} else {
			return res.status(200).json({ message: "Feedback Actualizado" });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal server error" });
	}
});

module.exports = router;
