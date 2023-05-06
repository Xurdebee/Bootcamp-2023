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

app.post('/register', async function (req, res) {
   
    const {alias,name,surname,email,password, birthday,country,city,linkedIn,education} = req.body//equivalente a let array_insert 
    console.log (req.body)
    if(alias){
    
        sequelize.query('SELECT * FROM users WHERE alias = :alias_alias', {
             replacements: {alias_alias: alias},
             type: sequelize.QueryTypes.SELECT})
            .then(users => {
                console.log(users);
                // f(x) Object.keys(users) para obtener un array con las claves del objeto users. 
                    //Si la longitud de ese array es igual a cero, significa 
                        //que no hay ningún usuario en la base de datos, por lo que se procede a crear uno nuevo.
                if(Object.keys(users).lenght === 0){
                    sequelize.query('INSERT INTO users (name,email,age,password,telephone_number,city,country,hobbies,experience) VALUES (?,?,?,?,?,?,?,?,?,?)', 
                    { replacements:[req.body.alias,req.body.name,req.body.surname,req.body.email,req.body.password,req.body.birthday,req.body.country,req.body.city,req.body.linkedIn,req.body.education],type: sequelize.QueryTypes.INSERT})
                    console.log("No existe el usuario")
                    res.status(200).send({result:true, message: "Usuario creado con registro"})
                } else {
                    console.log("Si existe el usuario")
                    res.status(200).send({result:false, message: "Este usuario ya está registrado, inicie sesión"})
                }
            })
            console.log("prueba")
    }
})

//Inicio del servidor
app.listen(3000,function(){
	console.log ("Sistema funcionando en el puerto 3000");
});