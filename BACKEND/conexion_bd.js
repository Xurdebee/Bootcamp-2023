const Sequelize = require ("sequelize");
//ruta de nuestra base de datos
const path = "mysql://root@localhost:3306/curso_tecla";
const sequelize = new Sequelize(path, {operatorAliases: false});

sequelize.authenticate()
.then(() => {
    console.log("Conectado: conexion_bd");
})
.catch(err =>{
    console.error("Error de conexión:", err)
})
/*.finally(() =>{
    sequelize.close();
});*/

//Queremos usar el módulo en otros archivos
module.exports = sequelize;