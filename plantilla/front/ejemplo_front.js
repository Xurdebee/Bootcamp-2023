// api rick y morty
function getCharacter(done){
	const results = fetch("https://rickandmortyapi.com/api/character/?page=1");
	  results
		  .then(response => response.json())
		  .then(data=>{
			  done(data)})
		  .catch((err) => console.log(err));
	
  }

  getCharacter(data=>{
	data.results.forEach(personaje=>{
	  const amistades = document.createRange().createContextualFragment(`
		<div class="hstack gap-2 mt-2 mb-3">
		  <div class="me-2">
			<a href="#"><img class="rounded-circle" src="${personaje.image}" height="50" alt=""></img></a>
		  </div>
		  <div class="overflow-hidden">
			<a class="h6 mb-0" href="#!">${personaje.name}</a>
			<p class="mb-0 small text-truncate">${personaje.species}</p>
		  </div>
		  <a class="btn btn-outline-primary ms-auto btn-sm" href="#">
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
				  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
			</svg>
		  </a>
		</div>
	  `);
		  const main =document.querySelector("article1");
		  main.append(amistades);
	});
  });




// prueba base de datos propia


async function getUsers(done){
	fetch('http://localhost:3000/users')

	  .then(response => response.json())
	  .then(data => {
		console.log(data)
		data.forEach(user => {
		  const follow = document.createRange().createContextualFragment(`
			<div class="hstack gap-2 mt-2 mb-3">
			  <div class="me-2">
				<a href="#"><img class="rounded-circle" src="${user.image}" height="50" alt=""></img></a>
			  </div>
			  <div class="overflow-hidden">
				<a class="h6 mb-0" href="#!">${user.name} ${user.surname}</a>
				<p class="mb-0 small text-truncate">${user.alias}</p>
			  </div>
			  <a class="btn btn-outline-primary ms-auto btn-sm" href="#">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
					  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
				</svg>
			  </a>
			</div>
		  `);
		  const main = document.querySelector("article");
		  main.append(follow);
		});
		done();
	  })
	  .catch((err) => console.log(err));
  }
  
  getUsers(() => {
	console.log('Datos de usuario cargados');
  });
