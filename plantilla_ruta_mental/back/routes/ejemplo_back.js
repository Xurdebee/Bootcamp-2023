let users = [
	{id:1, nombre: "Danilo", email: "danilo@tecla.academy" },
	{id:2, nombre: "Hugo", email: "hugo@tecla.academy"},
	{id:3, nombre: "Juan", email: "juan@tecla.academy"},
	]

app.get("/user/:id",(req,res)=>{
	const user = user.find(data=>data.id === req.params.id);
	if(!user){
		return res.status(404).send("Id no encontrada");
	}
	res.send(user)
})

app.get("/user/name/:nombre",(req,res)=>{
	const user = user.find(data=>data.nombre === req.params.nombre);
	if(!user){
		return res.status(404).send("Id no encontrada");
	}
	res.send(user)
})

app.use(function(err,req,res,next){
	if(!err) return next();
	console.log ("Algo no ha funcionado", err);
	res.status(500).send("Error");
});