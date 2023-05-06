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



 app.get('/users', async function(req, res) {
    try {
      const all_users = await sequelize.query("SELECT * FROM users", {type: sequelize.QueryTypes.SELECT});
    //   console.log(personas);
      res.send(all_users);

    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  });
  

  //Lee el mail y la contraseña del body (datos del front) y trae como respuesta user_id
  app.post('/login', async function(req, res) {
	let email = req.body.email;  
	let password = req.body.password;

	await sequelize.query("SELECT * FROM users WHERE email=? AND password=?", {type: sequelize.QueryTypes.SELECT, replacements: [email, password]})
	.then(function(response) {
        if(response.length > 0) {
			res.json({'user_id': response[0].user_id}).end();
		} else {
			res.status(401);
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
	  const followers = await sequelize.query(`SELECT * from users INNER JOIN follow ON follow.follow_user_id = users.user_id WHERE follow.user_id = "${user_id}"`, {type: sequelize.QueryTypes.SELECT});
	//   console.log(personas);
	  res.send(followers);
	  
	} catch (error) {
	  console.error(error);
	  res.status(500).send('Error interno del servidor');
	}
  });


  
//   Las personas que no sigue el usuario x

app.get('/suggested/:user_id', async function(req, res) {
	const user_id = req.params.user_id
	try {
		if (user_id){
			const user_suggest = await sequelize.query(`SELECT * FROM users WHERE user_id NOT IN (SELECT follow_user_id FROM follow WHERE user_id = "${user_id}") AND user_id != "${user_id}"`, {type: sequelize.QueryTypes.SELECT});
			// seleccionar todos los usuarios (tabla users) que en la tabla follow no estén en follow_user_id cuando user_id sea = 1
	  
			res.send(user_suggest);
		
		}else{
			res.status(404).send('No existe usuario');
		}
	  
	} catch (error) {
	  console.error(error);
	  res.status(500).send('Error interno del servidor');
	}
  });




// deberia traer los usuarios una vez pinchas en su enlace

app.get('/user/:user_id', async function(req, res) {
	try {
	const user = await sequelize.query(`SELECT * FROM users WHERE user_id = ${req.params.user_id}`, {type: sequelize.QueryTypes.SELECT});
	res.send(user);
	} catch (error) {
	  console.error(error);
	  res.status(500).send('Internal server error');
	}
  });





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

/*
  app.get('/logins', async function (req, res){ 
    console.log ("instance");

    try {
      const login = await sequelize.query("SELECT email, password FROM users WHERE user_id = 1", {type: sequelize.QueryTypes.SELECT });
      console.log(login);
      res.send(login);
    } catch(error) {
      console.error(error);
      res.status(500).send("Error interno del servidor:"); 
    }
  });

*/


//Inicio del servidor
app.listen(3000,function(){
	console.log ("Sistema funcionando en el puerto 3000");
});