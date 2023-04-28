const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

// configurar el middleware body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// configurar la conexión con la base de datos MySQL
const db = mysql.createConnection({
host: 'localhost',
user: 'grupo6',
password: 'grupo6canva',
database: 'bd_short'
});

db.connect((err) => {
if (err) { 
    console.error('Error al conectarse a la Base de Datos: ' + err.message);
    throw err;
}
console.log('Conectado a la base de datos MySQL');
});

// definir una ruta para el formulario
app.get('/', (req, res) => {
res.send(`
<form method="POST" action="/guardar">
    <input type="text" name="alias" placeholder="alias">
    <input type="text" name="name" placeholder="name">
    <input type="text" name="surname" placeholder="surname">
    <input type="email" name="email" placeholder="email">
    <input type="password" name="password" placeholder="password">
    <input type="text" name="birthday" placeholder="birthday">
    <input type="text" name="country" placeholder="country">
    <input type="text" name="city" placeholder="city">
    <input type="text" name="linkedIn" placeholder="linkedIn">
    <input type="text" name="education" placeholder="education">
    <button type="submit">Enviar</button>
    </form>
`);
});

// definir una ruta para procesar los datos del formulario y guardarlos en la base de datos
app.post('/guardar', (req, res) => {
const { alias, name, surname, email, password, birthday, country, city, linkedIn, education } = req.body;
const sql = 'INSERT INTO users (alias, name, surname, email, password, birthday, country, city, linkedIn, education ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
db.query(sql, [alias, name, surname, email, password, birthday, country, city, linkedIn, education ], (err, result) => {
    if (err) {
        console.error(err);
        res.send('Error al guardar los datos en la base de datos');
    } else {
    res.send('Datos guardados en la base de datos');
    }  
});
});

// iniciar el servidor
app.listen(3000, () => {
console.log('Servidor iniciado en el puerto 3000');
});
