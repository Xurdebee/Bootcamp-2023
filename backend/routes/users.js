const express = require('express');
const app = express();
const sequelize = require('../conexion_bd.js');
var cors = require('cors')
app.use(cors());




// async function findfriends(){
// 		return await sequelize.query("Select * from `users` INNER JOIN `follow` on follow.follow_user_id = users.user_id WHERE follow.user_id = 1;", {type: sequelize.QueryTypes.SELECT})
// 		.then(function(personas){
// 			// console.log(personas);
			
// 		});
// }

// findAllRows();



// Trae todos los usuarios de la base de datos

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




//   app.get('/user', async function(req, res) {
// 	try {
// 	  const followers = await sequelize.query("Select * from `users` WHERE user_id = 1;", {type: sequelize.QueryTypes.SELECT});
// 	//   console.log(personas);
// 	  res.send(followers);
	  
// 	} catch (error) {
// 	  console.error(error);
// 	  res.status(500).send('Error interno del servidor');
// 	}
//   });



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

app.get('/suggested', async function(req, res) {
	try {
	  const user_suggest = await sequelize.query("SELECT * FROM users WHERE user_id NOT IN (SELECT follow_user_id FROM follow WHERE user_id = 1) AND user_id != 1", {type: sequelize.QueryTypes.SELECT});
	  // seleccionar todos los usuarios (tabla users) que en la tabla follow no estén en follow_user_id cuando user_id sea = 1
	//   console.log(personas);
	  res.send(user_suggest);
	  
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


  app.get('/login', async function (req, res){ 
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



  app.listen(3000,function(){
	console.log ("Sistema funcionando en el puerto 3000");
});