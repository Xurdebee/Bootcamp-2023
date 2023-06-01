const express = require('express');
const router = express.Router();
const sequelize = require('../conexion_bd.js');

// Datos del usuario user_id, se envían desde el front, carga datos usuario enviado
router.get('/user/:user_id', async function (req, res) {
  try {
    const user = await sequelize.query(
      `
      SELECT
          users.*,
          COALESCE(posts.number_posts, 0) AS number_posts,
          COALESCE(posts.number_likes, 0) AS number_likes,
          friends.number_friends
      FROM users
      LEFT JOIN (
          SELECT
              users.user_id,
              COALESCE(COUNT(DISTINCT post.post_id), 0) AS number_posts,
              COALESCE(COUNT(DISTINCT CASE WHEN post_likes.like_status = 1 THEN post_likes.like_id END), 0) AS number_likes
          FROM
              users
              LEFT JOIN post ON users.user_id = post.user_id
              LEFT JOIN post_likes ON post.post_id = post_likes.post_id
          WHERE
              users.user_id = :user_id
          GROUP BY
              users.user_id
      ) AS posts ON users.user_id = posts.user_id
      LEFT JOIN (
          SELECT COUNT(*) AS number_friends
          FROM users
          INNER JOIN friends ON (friends.friend_user_id = users.user_id OR friends.user_id = users.user_id)
          WHERE (friends.user_id = :user_id OR friends.friend_user_id = :user_id)
              AND friends.friend_status = 'accepted'
              AND users.user_id <> :user_id
      ) AS friends ON 1=1
      WHERE
          users.user_id = :user_id;
      `,
      {
        replacements: { user_id: req.params.user_id },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    console.log(user);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Todos los datos de usuarios registrados
router.get('/allusers', async function (req, res) {
  try {
    const users = await sequelize.query('SELECT * FROM users', {
      type: sequelize.QueryTypes.SELECT,
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

// Las personas que son amigas del usuario registrado
router.get('/friends/:user_id', async function (req, res) {
  try {
    const friend = await sequelize.query(
      `SELECT users.user_id AS new_id, users.name, users.surname, users.alias, users.image
      FROM users
      INNER JOIN friends ON (friends.friend_user_id = users.user_id OR friends.user_id = users.user_id)
      WHERE (friends.user_id = :user_id OR friends.friend_user_id = :user_id) AND friends.friend_status = 'accepted'
      AND users.user_id <> :user_id`,
      {
        replacements: { user_id: req.params.user_id },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    res.json(friend);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

// Las personas que no son amigas del usuario registrado
router.get('/suggested/:user_id', async function (req, res) {
  try {
    const suggested = await sequelize.query(
      `SELECT users.*, users.user_id AS new_id
      FROM users
      WHERE users.user_id NOT IN (
        SELECT friend_user_id
        FROM friends
        WHERE user_id = :user_id
        UNION
        SELECT user_id
        FROM friends
        WHERE friend_user_id = :user_id
      ) AND users.user_id <> :user_id;
      `,
      {
        replacements: { user_id: req.params.user_id },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    res.json(suggested);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

// Peticiones pendientes
router.get('/pending/:user_id', async function (req, res) {
  try {
    const user = await sequelize.query(
      `SELECT users.*, users.user_id AS new_id
      FROM users 
        INNER JOIN friends ON (friends.friend_user_id = users.user_id OR friends.user_id = users.user_id)
        WHERE (friends.friend_user_id = :user_id) AND friends.friend_status = 'pending' AND users.user_id <> :user_id`,
      {
        replacements: { user_id: req.params.user_id },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

// Agregar nueva Amistad
router.post('/newfriend', async function (req, res) {
  const userId = req.body.user_id;
  const friendUserId = req.body.new_id;
  const friendStatus = 'pending';

  try {
    await sequelize.query(
      'INSERT INTO friends (user_id, friend_user_id, friend_status) VALUES (?, ?, ?)',
      {
        replacements: [userId, friendUserId, friendStatus],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    console.log(
      `Nuevo seguimiento agregado: user_id=${userId}, friend_user_id=${friendUserId}`
    );
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar el amigo' });
  }
});

// Aceptar ser Amigos
router.put('/acceptfriend', async (req, res) => {
  const userId = req.body.user_id;
  const friendUserId = req.body.new_id;

  try {
    // Actualizar el campo friend_status a 'accepted'
    const result = await sequelize.query(
      `UPDATE friends SET friend_status = 'accepted' WHERE
        (user_id = ? AND friend_user_id = ?)`,
      {
        replacements: [friendUserId, userId],
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    // Comprobar si se ha actualizado correctamente
    if (result[1] === 0) {
      // Si no se ha actualizado ningún registro, devolver un error
      return res
        .status(404)
        .json({ message: 'No se ha encontrado un registro para actualizar.' });
    }

    res.json({
      message: 'Ahora eres amigo del usuario.',
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Ha ocurrido un error al intentar ser amigos.' });
  }
});

// Dejar de ser Amigos
router.put('/unfriend', async (req, res) => {
  const userId = req.body.user_id;
  const friendUserId = req.body.new_id;

  try {
    // Actualizar el campo friend_status a 'rejected'
    const result = await sequelize.query(
      `UPDATE friends SET friend_status = 'rejected' WHERE
        (user_id = ? AND friend_user_id = ?) OR
        (user_id = ? AND friend_user_id = ?)`,
      {
        replacements: [userId, friendUserId, friendUserId, userId],
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    // Comprobar si se ha actualizado correctamente
    if (result[1] === 0) {
      // Si no se ha actualizado ningún registro, devolver un error
      return res
        .status(404)
        .json({ message: 'No se ha encontrado un registro para actualizar.' });
    }

    res.json({
      message: 'Se ha dejado de ser amigo del usuario.',
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Ha ocurrido un error al dejar de ser amigos.' });
  }
});

//Realizar una búsqueda por una coincidiencia parcial del texto
router.get("/search/:searchValue", async function (req, res) {
  const { searchValue } = req.params;
  console.log(searchValue);

  try {
    const user = await sequelize.query(
      `
      SELECT DISTINCT *
      FROM users
      WHERE alias LIKE '%${searchValue}%' OR name LIKE '%${searchValue}%' OR surname LIKE '%${searchValue}%'
      `,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al ejecutar la consulta" });
  }
});

module.exports = router;
