const express = require('express');
const app = express();
const sequelize = require('./conexion_bd.js');

async function findAllRows(){
		sequelize.query("Select * from users", {type: sequelize.QueryTypes.SELECT})
		.then(function(personas){
			console.log(personas);
		});
}

findAllRows();

app.listen(3000,function(){
	console.log ("Sistema funcionando en el puerto 3000");
});
