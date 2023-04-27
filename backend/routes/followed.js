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

app.get('/followed', async function(req, res) {
	try {
	  const personas = await sequelize.query("Select * from `users` INNER JOIN `follow` ON follow.follow_user_id = users.user_id WHERE follow.user_id = 1;", {type: sequelize.QueryTypes.SELECT});
	//   console.log(personas);
	  res.send(personas);
	  
	} catch (error) {
	  console.error(error);
	  res.status(500).send('Error interno del servidor');
	}
  });


// app.get('/suggestion', async function(req, res) {
// 	try {
// 	  const personas = await sequelize.query("Select * from `users` INNER JOIN `follow` NOT IN follow.follow_user_id WHERE follow.user_id = 1;", {type: sequelize.QueryTypes.SELECT});
// 	  // seleccionar todos los usuarios (tabla users) que en la tabla follow no estén en follow_user_id cuando user_id sea = 1
// 	//   console.log(personas);
// 	  res.send(personas);
	  
// 	} catch (error) {
// 	  console.error(error);
// 	  res.status(500).send('Error interno del servidor');
// 	}
//   });


app.listen(3000,function(){
	console.log ("Sistema funcionando en el puerto 3000");
});