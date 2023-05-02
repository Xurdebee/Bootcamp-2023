import { agregarLike } from "./feed.js";
const aplicacion = document.querySelector('.container-API');

fetch('https://jsonplaceholder.typicode.com/comments')
  .then((response) => response.json())
  .then((data) => {
    // console.log ("data", data)
    data.slice(0, 3)/*muestra 3 primeros resultados del array data*/.forEach((comment) => {
      // console.log("comment",comment)
      const card = document.createElement('div');
      card.classList.add("bg-light", "p-4", "rounded-3", "border", "border-1", "mb-4");
      card.setAttribute("id",comment.id)

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body', 'd-flex', 'flex-column');

      const cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title', 'justify-content-center');
      cardTitle.textContent = comment.name;

      const cardText = document.createElement('p');
      cardText.classList.add('card-text');
      // console.log (post.body)
      cardText.textContent = comment.body;

      const cardImg = document.createElement('img');
      cardImg.classList.add('card-img-top');
      cardImg.src = 'https://random.imagecdn.app/500/250';
      cardImg.classList.add ("rounded-3", "d-flex");
      const buttons = document.createRange().createContextualFragment(` 
      
      
                <div class="hstack gap-4 mt-3">
                <!-- Boton Like -->
                 <button class="btn btn-outline-danger border-0 rounded-circle corazon " id="boton_likes${comment.id}" type="submit" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                   <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                 </svg>
            
                </button>
            
                <button class="nav-link border-0 bg-transparent" id="boton_responder" type="submit" >
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
                    <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                   </svg>
                   </button>
                  
                  </div>
                <p id="total_likes${comment.id}" class="ms-1 mt-2"> 158</p>
                  </div>
                
               </div>
            

       `
        ); 
      
      
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      cardBody.appendChild(cardImg);
      cardBody.appendChild(buttons);
      card.appendChild(cardBody);

      aplicacion.appendChild(card);
      
    });

    const listaCorazones = document.querySelectorAll (".corazon")
    for (let i=0; i<listaCorazones.length; i++) {
    listaCorazones[i].addEventListener ("click",agregarLike)
    }
  }) 
  .catch((err) => console.error(err.message));

/*

// api rick y morty
function getCharacter(done){
  const results = fetch("https://rickandmortyapi.com/api/character/?page=1");
    results
        .then(response => response.json())
        .then(data=>{
            done(data)
        .catch((err) => console.log(err));
        });
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
        const main =document.querySelector("article");
        main.append(amistades);
  });
});

  
*/

// Usuarios

async function getUsers(done){
  //let userId = window.location.querystring["userId"];
	fetch(`http://localhost:3000/suggested`)

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




// post generados

async function getPost(done){
	fetch('http://localhost:3000/allpost')

.then(response => response.json())
.then(data => {
console.log(data)
data.forEach(post => {
      const card = document.createElement('div');
      card.classList.add("bg-light", "p-4", "rounded-3", "border", "border-1", "mb-4");

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body', 'd-flex', 'flex-column');

      const cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title', 'justify-content-center');
      cardTitle.textContent = post.user_id;

      const cardText = document.createElement('p');
      cardText.classList.add('card-text');
      cardText.textContent = post.body;

      const cardImg = document.createElement('img');
      cardImg.classList.add('card-img-top');
      cardImg.src = 'https://random.imagecdn.app/500/250';
      cardImg.classList.add ("rounded-3", "d-flex");
      const buttons = document.createRange().createContextualFragment(` 
      
      
                  <div class="hstack gap-4 mt-3">
                  <!-- Boton Like -->
                  <button class="btn btn-outline-danger border-0 rounded-circle corazon " id="boton_likes${comment.id}" type="submit" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                    
                  </button>
            
                  <button class="nav-link border-0 bg-transparent" id="boton_responder" type="submit" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
                      <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                    </svg>
                  </button>
                  
                  </div>
                  <p id="total_likes${comment.id}" class="ms-1 mt-2"> 158</p>
                  </div>
                
                </div>
            

        `
        ); 
      
      
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      cardBody.appendChild(cardImg);
      cardBody.appendChild(buttons);
      card.appendChild(cardBody);

      aplicacion.appendChild(card);
      
    });
    
    const listaCorazones = document.querySelectorAll (".corazon")
    for (let i=0; i<listaCorazones.length; i++) {
    listaCorazones[i].addEventListener ("click",agregarLike)
    }
  }) 
  .catch((err) => console.error(err.message));
  getPost(() => {
    console.log('Datos de usuario cargados');
    });
  }