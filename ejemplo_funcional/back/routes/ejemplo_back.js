const express = require('express');
const app = express();
const sequelize = require('../conexion_bd.js');
var cors = require('cors')
app.use(cors());


// async function findAllRows(){
// 		return await sequelize.query("Select * from users", {type: sequelize.QueryTypes.SELECT})
// 		.then(function(personas){
// 			// console.log(personas);
			
// 		});
// }

// findAllRows();

app.get('/users', async function(req, res) {
	console.log("instance")
	try {
	  const personas = await sequelize.query("Select * from `users` INNER JOIN `follow` ON follow.follow_user_id = users.user_id WHERE follow.user_id = 1;", {type: sequelize.QueryTypes.SELECT});
	  console.log(personas);
	  res.send(personas);
	  
	} catch (error) {
	  console.error(error);
	  res.status(500).send('Error interno del servidor');
	}
  });

app.listen(3000,function(){
	console.log ("Sistema funcionando en el puerto 3000");
});