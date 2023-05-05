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


/*//Creación de la f(x) con la consulta SQL que hacer a la petición
async function findEmailPassword(){
		sequelize.query("SELECT email, password FROM users WHERE user_id = 1", {type: sequelize.QueryTypes.SELECT})
		.then(function(personas){
			console.log(personas);
		});
}

findEmailPassword();*/

//Creación del endpoint que usaremos en la petición fetch en el js de frontend
/*app.get('/login', async function (req, res){ 
    console.log ("instance");
    
    try {
      const login = await sequelize.query("SELECT email, password FROM users WHERE user_id = 1", {type: sequelize.QueryTypes.SELECT });
      console.log(login);
      res.send(login);
    } catch(error) {
      console.error(error);
      res.status(500).send("Error interno del servidor:"); 
    }
  });*/

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
  
  app.post('/login', async function(req, res) {
	let email = req.body.email;  //Sacar datos de la queryString (lo que va despues de la interrogacion en la url)
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




  // Las personas que sigue el usuario 1
  
app.get('/followed', async function(req, res) {
	try {
	  const followers = await sequelize.query("Select * from `users` INNER JOIN `follow` ON follow.follow_user_id = users.user_id WHERE follow.user_id = 1;", {type: sequelize.QueryTypes.SELECT});
	//   console.log(personas);
	  res.send(followers);
	  
	} catch (error) {
	  console.error(error);
	  res.status(500).send('Error interno del servidor');
	}
  });


  
//   Las personas que no sigue el usuario 1

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