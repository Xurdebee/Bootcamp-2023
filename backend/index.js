//Creación del servidor en el puerto 3000
const express = require("express");
const app = express();

//Importanción del módulo de conexión a nuestra base de datos
const sequelize = require("./conexion_bd.js");

//Necesario para mostrar "fecha" del post
const moment = require("moment");

//Necesario libería cors para que funcione
var cors = require("cors");
app.use(cors());
app.options("*", cors());
app.use(express.json());

//Importación de librería para acceder al cuerpo de la petición
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

app.use(express.static("publica"));
app.use(bodyParser.json());

//Configura  autenticación de JWT para proteger las rutas de una APP Express,
//con la excepción de la ruta /login.
//app.use(expressJwt({ secret: 'secret_key' }).unless({ path: ['/login'] }));

// Login
app.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body;

    const response = await sequelize.query(
      "SELECT user_id, is_admin FROM users WHERE email=? AND password=?",
      {
        type: sequelize.QueryTypes.SELECT,
        replacements: [email, password],
      }
    );

    if (response.length > 0) {
      const token = jwt.sign(
        { email: email, password: password },
        "secret_key"
      );
      console.log("Token:", token);
      res
        .json({
          user_id: response[0].user_id,
          token: token,
          is_admin: response[0].is_admin,
        })
        .end();
    } else {
      res
        .status(401)
        .json({ error: "Correo electrónico o contraseña incorrectos" })
        .end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

// Registro
app.post("/newregister", async (req, res) => {
  const {
    alias,
    name,
    surname,
    email,
    password,
    birthday,
    country,
    city,
    linkedIn,
    education,
    extra_knowledge,
  } = req.body;

  try {
    // Verificar si el alias ya existe en la base de datos
    const aliasExists = await sequelize.query(
      "SELECT * FROM users WHERE alias = ?",
      {
        replacements: [alias],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (aliasExists.length > 0) {
      // Si ya existe un usuario con el mismo alias, enviar un mensaje de error
      res
        .status(400)
        .json({ message: "Ya existe un usuario con el mismo alias." });
      return;
    }

    // Verificar si el correo electrónico ya existe en la base de datos
    const emailExists = await sequelize.query(
      "SELECT * FROM users WHERE email = ?",
      {
        replacements: [email],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (emailExists.length > 0) {
      // Si ya existe un usuario con el mismo correo electrónico, enviar un mensaje de error
      res.status(400).json({
        message: "Ya existe un usuario con el mismo correo electrónico.",
      });
      return;
    }

    // Si el alias y correo electrónico no están en uso, crear un nuevo usuario en la base de datos
    await sequelize.query(
      `INSERT INTO users (alias, name, surname, email, password, birthday, country, city, linkedIn, education, extra_knowledge) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      {
        replacements: [
          alias,
          name,
          surname,
          email,
          password,
          birthday,
          country,
          city,
          linkedIn,
          education,
          extra_knowledge,
        ],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    res.json({ message: "Usuario creado satisfactoriamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el usuario." });
  }
});

// Actualizar registro
app.put("/updateregister/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const {
    alias,
    name,
    surname,
    email,
    password,
    birthday,
    country,
    city,
    linkedIn,
    education,
    extra_knowledge,
  } = req.body;

  try {
    // Verificar si el alias ya existe en la base de datos, excluyendo el usuario actual
    const aliasExists = await sequelize.query(
      "SELECT * FROM users WHERE alias = ? AND user_id != ?",
      {
        replacements: [alias, user_id],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    // Verificar si el correo electrónico ya existe en la base de datos, excluyendo el usuario actual
    const emailExists = await sequelize.query(
      "SELECT * FROM users WHERE email = ? AND user_id != ?",
      {
        replacements: [email, user_id],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (aliasExists.length > 0 && emailExists.length > 0) {
      // Si ya existe un usuario con el mismo alias y correo electrónico, enviar un mensaje de error
      res.status(400).json({
        message:
          "Ya existe un usuario con el mismo alias y correo electrónico.",
      });
    } else if (aliasExists.length > 0) {
      // Si ya existe un usuario con el mismo alias, enviar un mensaje de error
      res
        .status(400)
        .json({ message: "Ya existe un usuario con el mismo alias." });
    } else if (emailExists.length > 0) {
      // Si ya existe un usuario con el mismo correo electrónico, enviar un mensaje de error
      res.status(400).json({
        message: "Ya existe un usuario con el mismo correo electrónico.",
      });
    } else {
      // Si el alias y correo electrónico no están en uso, actualizar el usuario en la base de datos
      const updateUser = await sequelize.query(
        `UPDATE users SET alias = ?, name = ?, surname = ?, email = ?, password = ?, 
		  birthday = ?, country = ?, city = ?, linkedIn = ?, education = ?, extra_knowledge = ? WHERE user_id = ?`,
        {
          replacements: [
            alias,
            name,
            surname,
            email,
            password,
            birthday,
            country,
            city,
            linkedIn,
            education,
            extra_knowledge,
            user_id,
          ],
          type: sequelize.QueryTypes.UPDATE,
        }
      );

      res.json({ message: "Usuario actualizado satisfactoriamente." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el usuario." });
  }
});

// Datos del usuario user_id, se envian desde el front, carga datos usuario enviado
app.get("/user/:user_id", async function (req, res) {
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
    res.status(500).json({ error: "Internal server error" });
  }
});

// Todos los datos de usuarios registrados
app.get("/allusers", async function (req, res) {
  try {
    const users = await sequelize.query("SELECT * FROM users", {
      type: sequelize.QueryTypes.SELECT,
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

// Las personas que son amigas del usuario registrado
app.get("/friends/:user_id", async function (req, res) {
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
    res.status(500).send("Error interno del servidor");
  }
});

// Las personas que no son amigas del usuario registrado
app.get("/suggested/:user_id", async function (req, res) {
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
    res.status(500).send("Error interno del servidor");
  }
});

// Peticiones pendientes
app.get("/pending/:user_id", async function (req, res) {
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
    res.status(500).send("Error interno del servidor");
  }
});

// Agregar nueva Amistad
app.post("/newfriend", async function (req, res) {
  const userId = req.body.user_id;
  const friendUserId = req.body.new_id;
  const friendStatus = "pending";

  try {
    await sequelize.query(
      "INSERT INTO friends (user_id, friend_user_id, friend_status) VALUES (?, ?, ?)",
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
    res.status(500).json({ error: "Error al guardar el amigo" });
  }
});

// Aceptar ser Amigos
app.put("/acceptfriend", async (req, res) => {
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
        .json({ message: "No se ha encontrado un registro para actualizar." });
    }

    res.json({
      message: "Ahora eres amigo del usuario.",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al intentar ser amigos." });
  }
});

// Dejar de ser Amigos
app.put("/unfriend", async (req, res) => {
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
        .json({ message: "No se ha encontrado un registro para actualizar." });
    }

    res.json({
      message: "Se ha dejado de ser amigo del usuario.",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al dejar de ser amigos." });
  }
});

// Trae los post de los amigos del usuario registrado
app.get("/friendpost/:user_id", async function (req, res) {
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
app.post("/newlike", async function (req, res) {
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
app.put("/unlike", async (req, res) => {
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

//Crear un post
app.post("/newpost", async function (req, res) {
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

// Traer feedbacks
app.get("/feedbacks/:feedback_user_id", async function (req, res) {
  try {
    const feedback = await sequelize.query(
      `SELECT feedback.*, users.name, users.surname, users.alias
      FROM feedback
      JOIN users ON feedback.user_id = users.user_id
      WHERE feedback.feedback_user_id = :feedback_user_id`,
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

//Crear un feedback
app.post("/newfeedback", async function (req, res) {
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

// Comprobar si tiene feedback
app.get("/checkfeedback/:user_id/:feedback_user_id", async function (req, res) {
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



//Realizar una búsqueda por una coincidiencia parcial del alias
app.get("/users/:alias", async (req, res) => {
  try {
    const alias = req.params.alias;
    console.log("Valor del alias:", alias);

    const query = `SELECT * FROM users WHERE alias LIKE '${alias}%'`;
    console.log(query);
    const result = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al ejecutar la consulta" });
  }
});

//Inicio del servidor
app.listen(3000, function () {
  console.log("Sistema funcionando en el puerto 3000");
});
