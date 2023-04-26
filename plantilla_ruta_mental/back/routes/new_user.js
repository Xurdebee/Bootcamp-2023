const express = require('express');
const app = express();
const sequelize = require('..conexion_bd.js');

async function newUser(){
	let array_insert = ["Alias","2","3","@gmail.com","5*","año_mes_dia","7","8","link","estudios"];
	console.log(array_insert);
	sequelize.query('INSERT INTO `users`(`alias`,`name`,`surname`,`email`,`password`,`birthday`,`country`,`city`,`linkedIn`,`education`) VALUES (?,?,?,?,?,?,?,?,?)',
		{replacements: array_insert, type: sequelize.QueryTypes.INSERT }
	).then(function(proyecto){
		console.log(proyecto);
	})
}

newUser();