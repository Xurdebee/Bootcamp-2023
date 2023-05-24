const Sequelize = require("sequelize");
const path = "mysql://root@localhost:3306/bd_short";
const sequelize = new Sequelize(path, { operatorAliases: false });

sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado: conexion_bd");
  })
  .catch((err) => {
    console.error("Error de conexión:", err);
  });

module.exports = sequelize;
