//Creación del servidor en el puerto 3000
const express = require('express');
const app = express();

//Importanción del módulo de conexión a nuestra base de datos
const sequelize = require('./conexion_bd.js');

//Necesario libería cors para que funcione
var cors = require('cors')
app.use(cors());
app.options("*", cors()); 	
app.use(express.json());

//Importación de librería para acceder al cuerpo de la petición
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

app.use(express.static( "publica"));
app.use(bodyParser.json());

//Configura  autenticación de JWT para proteger las rutas de una APP Express, 
    //con la excepción de la ruta /login.
//app.use(expressJwt({ secret: 'secret_key' }).unless({ path: ['/login'] }));

//Lee el mail y la contraseña del body (datos del front) y trae como respuesta user_id
app.post('/login', async function(req, res) {
	let email = req.body.email;  
	let password = req.body.password;

	await sequelize.query("SELECT * FROM users WHERE email=? AND password=?", {type: sequelize.QueryTypes.SELECT, replacements: [email, password]})
	.then(function(response) {
		if(response.length > 0) {
			const token = jwt.sign({ email: email, password: password }, 'secret_key');
			console.log("Token:", token);
			res.json({'user_id': response[0].user_id, 'token': token}).end();
		} else {
			res.status(401).json({error: "Correo electrónico o contraseña incorrectos"}).end();
		}
	});
});



// Registro
app.post('/newregister', async (req, res) => {
	const { alias, name, surname, email, password, birthday, country, city, linkedIn, education } = req.body;
  
	// Verificar si el alias ya existe en la base de datos
	const aliasExists = await sequelize.query(`SELECT * FROM users WHERE alias = ?`, {
	  replacements: [alias],
	  type: sequelize.QueryTypes.SELECT
	});
  
	// Verificar si el correo electrónico ya existe en la base de datos
	const emailExists = await sequelize.query(`SELECT * FROM users WHERE email = ?`, {
	  replacements: [email],
	  type: sequelize.QueryTypes.SELECT
	});
  
	if (aliasExists.length > 0 && emailExists.length > 0) {
	  // Si ya existe un usuario con el mismo alias y correo electrónico, enviar un mensaje de error
	  res.status(400).json({ message: 'Ya existe un usuario con el mismo alias y correo electrónico.' });
	} else if (aliasExists.length > 0) {
	  // Si ya existe un usuario con el mismo alias, enviar un mensaje de error
	  res.status(400).json({ message: 'Ya existe un usuario con el mismo alias.' });
	} else if (emailExists.length > 0) {
	  // Si ya existe un usuario con el mismo correo electrónico, enviar un mensaje de error
	  res.status(400).json({ message: 'Ya existe un usuario con el mismo correo electrónico.' });
	} else {
	  // Si el alias y correo electrónico no están en uso, crear un nuevo usuario en la base de datos
	  const newUser = await sequelize.query(`INSERT INTO users (alias, name, surname, email, password, birthday, country, city, linkedIn, education) 
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, {
		replacements: [alias, name, surname, email, password, birthday, country, city, linkedIn, education],
		type: sequelize.QueryTypes.INSERT
	  });
	
	  res.json({ message: 'Usuario creado satisfactoriamente.' });
	}
  });






  // Las personas que sigue el usuario x
  
app.get('/followed/:user_id', async function(req, res) {
	const user_id = req.params.user_id
	try {
		const followers = await sequelize.query(`SELECT * from users INNER JOIN follow ON follow.follow_user_id = users.user_id WHERE follow.user_id = "${user_id}" AND follow.follow_status = 1`, {type: sequelize.QueryTypes.SELECT});

	//   console.log(personas);
	  res.send(followers);
	  
	} catch (error) {
	  console.error(error);
	  res.status(500).send('Error interno del servidor');
	}
  });


app.get('/suggested/:user_id', async function(req, res) {
	const user_id = req.params.user_id;
	try {
	  if (user_id) {
		const user_suggest = await sequelize.query(`SELECT * FROM users WHERE user_id NOT IN (SELECT follow_user_id FROM follow WHERE user_id = "${user_id}") AND user_id != "${user_id}"`, {type: sequelize.QueryTypes.SELECT});
		// seleccionar todos los usuarios (tabla users) que en la tabla follow no estén en follow_user_id cuando user_id sea igual al valor proporcionado
		res.send(user_suggest);
	  } else {
		res.status(404).send('No existe usuario');
	  }
	} catch (error) {
	  console.error(error);
	  res.status(500).send('Error interno del servidor');
	}
  });


// Agregar nuevo seguimiento
app.post('/newfollow', async function(req, res) {
	const userId = req.body.user_id;
	const followUserId = req.body.follow_user_id;
	const followStatus = 1;
  
	try {
	  await sequelize.query("INSERT INTO follow (user_id, follow_user_id, follow_status) VALUES (?, ?, ?)", {
		replacements: [userId, followUserId, followStatus],
		type: sequelize.QueryTypes.INSERT
	  });
  
	  console.log(`Nuevo seguimiento agregado: user_id=${userId}, follow_user_id=${followUserId}`);
	  res.sendStatus(200);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'Error al guardar el follow' });
	}
  });
  

  /// Dejar de seguir amigo
app.put('/unfollow/', async (req, res) => {
	const userId = req.body.user_id;
	const followUserId = req.body.follow_user_id;
  
	try {
	  // Actualizar el campo follow_status a 0
	  const result = await sequelize.query(`UPDATE follow SET follow_status = 0 WHERE user_id = ? AND follow_user_id = ?`, {
		replacements: [userId, followUserId],
		type: sequelize.QueryTypes.UPDATE
	  });
  
	  // Comprobar si se ha actualizado correctamente
	  if (result[1] === 0) {
		// Si no se ha actualizado ningún registro, devolver un error
		return res.status(404).json({ message: 'No se ha encontrado un registro para actualizar.' });
	  }
  
	  res.json({ message: 'Se ha dejado de seguir al usuario satisfactoriamente.' });
  
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Ha ocurrido un error al dejar de seguir al usuario.' });
	}
  });
  
  





// Deberia traer los usuarios una vez pinchas en su enlace (sin implementar)

app.get('/user/:user_id', async function(req, res) {
	try {
		const user = await sequelize.query(`
		SELECT
			users.*,
			COUNT(DISTINCT post.post_id) AS number_posts,
			COUNT(DISTINCT post_likes.like_id) AS number_likes,
			COUNT(DISTINCT follow.follow_user_id) AS number_users
		FROM
			users
			LEFT JOIN post ON users.user_id = post.user_id
			LEFT JOIN post_likes ON post.post_id = post_likes.post_id
			LEFT JOIN follow ON users.user_id = follow.user_id
		WHERE
			users.user_id = :user_id
		GROUP BY
			users.user_id;
		`, {
			replacements: { user_id: req.params.user_id },
			type: sequelize.QueryTypes.SELECT
		});
	console.log (user)
		res.send(user);
		} catch (error) {
		console.error(error);
		res.status(500).send('Internal server error');
		}
  });
  



// Deberia traer los post (sin implementar)

  app.get('/allPost', async function(req, res) {
	try {
	  const all_post = await sequelize.query("SELECT * FROM post", {type: sequelize.QueryTypes.SELECT});
	//   console.log(personas);
	  res.send(all_post);
	  
	} catch (error) {
	  console.error(error);
	  res.status(500).send('Error interno del servidor');
	}
  });

//Crear un post  
app.post('/createPost', async function(req, res) {
  const { user_id, body } = req.body; // Obtener los datos del nuevo post del cuerpo de la solicitud
  const date = new Date(); // Obtener la fecha actual

  try {
    // Crear el nuevo post en la base de datos utilizando Sequelize
    const new_post = await sequelize.query(
      "INSERT INTO post (user_id, date, body) VALUES (?, ?, ?)",
      { replacements: [user_id, date, body] }
    );
    res.send(new_post); // Devolver el nuevo post como respuesta
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});



//Inicio del servidor
app.listen(3000,function(){
	console.log ("Sistema funcionando en el puerto 3000");
});