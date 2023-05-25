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
  let email = req.body.email;
  let password = req.body.password;

  try {
    const response = await sequelize.query(
      "SELECT * FROM users WHERE email=? AND password=?",
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
      res.json({ user_id: response[0].user_id, token: token }).end();
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

    // Verificar si el correo electrónico ya existe en la base de datos
    const emailExists = await sequelize.query(
      "SELECT * FROM users WHERE email = ?",
      {
        replacements: [email],
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
      // Si el alias y correo electrónico no están en uso, crear un nuevo usuario en la base de datos
      const newUser = await sequelize.query(
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
    }
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

// Traer campos del usuario logueado a su perfil
app.get("/usersmyprofile/:user_id", async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const user = await sequelize.query(
      "SELECT * FROM users WHERE user_id = ?",
      {
        replacements: [user_id],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (user.length === 0) {
      res.status(404).json({ message: "Usuario no encontrado." });
    } else {
      res.json(user[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el usuario." });
  }
});

// Traer campos de un tercero a su perfil
app.get("/usersothersprofiles/:user_id", async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const user = await sequelize.query(
      "SELECT alias, name, surname, birthday, country, city, linkedIn, education, extra_knowledge FROM users WHERE user_id = ?",
      {
        replacements: [user_id],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (user.length === 0) {
      res.status(404).json({ message: "Usuario no encontrado." });
    } else {
      res.json(user[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el usuario." });
  }
});

// Las personas que sigue el usuario x
app.get("/followed/:user_id", async function (req, res) {
  const user_id = req.params.user_id;
  try {
    const followers = await sequelize.query(
      `SELECT * from users INNER JOIN follow ON follow.follow_user_id = users.user_id WHERE follow.user_id = "${user_id}" AND follow.follow_status = 1`,
      { type: sequelize.QueryTypes.SELECT }
    );
    res.send(followers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

// Las personas que no sigue el usuario x
app.get("/suggested/:user_id", async function (req, res) {
  const user_id = req.params.user_id;
  try {
    if (user_id) {
      const user_suggest = await sequelize.query(
        `SELECT * FROM users WHERE user_id NOT IN (SELECT follow_user_id FROM follow WHERE user_id = "${user_id}") AND user_id != "${user_id}"`,
        { type: sequelize.QueryTypes.SELECT }
      );
      // seleccionar todos los usuarios (tabla users) que en la tabla follow no estén en follow_user_id cuando user_id sea igual al valor proporcionado
      res.send(user_suggest);
    } else {
      res.status(404).send("No existe usuario");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

// Agregar nuevo seguimiento
app.post("/newfollow", async function (req, res) {
  const userId = req.body.user_id;
  const followUserId = req.body.follow_user_id;
  const followStatus = 1;

  try {
    await sequelize.query(
      "INSERT INTO follow (user_id, follow_user_id, follow_status) VALUES (?, ?, ?)",
      {
        replacements: [userId, followUserId, followStatus],
        type: sequelize.QueryTypes.INSERT,
      }
    );

    console.log(
      `Nuevo seguimiento agregado: user_id=${userId}, follow_user_id=${followUserId}`
    );
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al guardar el follow" });
  }
});

/// Dejar de seguir usuario
app.put("/unfollow/", async (req, res) => {
  const userId = req.body.user_id;
  const followUserId = req.body.follow_user_id;

  try {
    // Actualizar el campo follow_status a 0
    const result = await sequelize.query(
      `UPDATE follow SET follow_status = 0 WHERE user_id = ? AND follow_user_id = ?`,
      {
        replacements: [userId, followUserId],
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
      message: "Se ha dejado de seguir al usuario satisfactoriamente.",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha ocurrido un error al dejar de seguir al usuario." });
  }
});

// Datos del usuario user_id, se envian desde el front, carga desde el user_id logeado
app.get("/user/:user_id", async function (req, res) {
  try {
    const user = await sequelize.query(
      `
      SELECT
        users.*,
        COALESCE(COUNT(DISTINCT post.post_id), 0) AS number_posts,
        COALESCE(COUNT(DISTINCT post_likes.like_id), 0) AS number_likes,
        COALESCE(COUNT(DISTINCT CASE WHEN follow.follow_status = 1 THEN follow.follow_user_id END), 0) AS number_users
      FROM
        users
        LEFT JOIN post ON users.user_id = post.user_id
        LEFT JOIN post_likes ON post.post_id = post_likes.post_id
        LEFT JOIN follow ON users.user_id = follow.user_id
      WHERE
        users.user_id = :user_id
      GROUP BY
        users.user_id;
      `,
      {
        replacements: { user_id: req.params.user_id },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    console.log(user);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Trae los post de los amigos
app.get("/friendpost/:user_id", async function (req, res) {
  try {
    const friend_post = await sequelize.query(
      `
      SELECT post.*, users.name, users.surname, users.alias, users.image,
          COALESCE(user_likes.like_status, 0) AS user_like_status,
          COALESCE(SUM(post_likes.like_status), 0) AS like_count
      FROM post
      JOIN users ON post.user_id = users.user_id
      LEFT JOIN post_likes ON post.post_id = post_likes.post_id
      LEFT JOIN post_likes AS user_likes ON post.post_id = user_likes.post_id AND user_likes.user_id = :user_id
      WHERE (post.user_id = :user_id OR post.user_id IN (
          SELECT follow_user_id
          FROM follow
          WHERE user_id = :user_id
            AND follow_status = 1
          ))
      GROUP BY post.post_id, users.user_id
      ORDER BY post.date DESC;
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

    res.send(friend_post);
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
    // Actualizar el campo follow_status a 0
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

//Crear un post (sin implementar)
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

//Inicio del servidor
app.listen(3000, function () {
  console.log("Sistema funcionando en el puerto 3000");
});
