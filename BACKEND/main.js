const express = require('express');
const server = express ();

server.get('/miservidor',(req, res)=>{
    res.send('Hola mundo');
});

server.listen (3000, ()=>{
    console.log('servidor iniciado en el puerto 3000...')
});