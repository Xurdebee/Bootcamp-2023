//Creación del servidor en el puerto 3000
const express = require('express');
const app = express();

//Importanción del módulo de conexión a nuestra base de datos
const sequelize = require('./conexion_bd.js');

//Necesario libería cors para que funcione
var cors = require('cors')
app.use(cors());

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

//Inicio del servidor
app.listen(3000,function(){
	console.log ("Sistema funcionando en el puerto 3000");
});