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

// app.get('/allPost', async function(req, res) {
// 	try {
// 	  const all_post = await sequelize.query("SELECT * FROM post", {type: sequelize.QueryTypes.SELECT});
// 	//   console.log(personas);
// 	  res.send(all_post);
	  
// 	} catch (error) {
// 	  console.error(error);
// 	  res.status(500).send('Error interno del servidor');
// 	}
//   });