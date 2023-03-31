const aplicacion = document.querySelector('.container-API');

fetch('https://jsonplaceholder.typicode.com/comments')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((comment) => {
      const card = document.createElement('div');
      card.classList.add("bg-light", "p-4", "rounded-3", "border", "border-1", "mb-4");

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');

      const cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title');
      cardTitle.textContent = comment.name;

      const cardText = document.createElement('p');
      cardText.classList.add('card-text');
      cardText.textContent = comment.body;

      const cardImg = document.createElement('img');
      cardImg.classList.add('card-img-top');
      cardImg.src = 'https://random.imagecdn.app/500/250';
      cardImg.classList.add ("rounded-3", "d-flex")

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      cardBody.appendChild(cardImg);
      card.appendChild(cardBody);

      card.addEventListener('click', () => {
        window.location.href = `./index-responsive.html?id=${comment.id}`;
      });

      aplicacion.appendChild(card);
    });
  })
  .catch((err) => console.log(err));



  function getCharacter(done){
    const results = fetch("https://rickandmortyapi.com/api/character/?page=1");
    results
        .then(response => response.json())
        .then(data=>{
            done(data)
        .catch((err) => console.log(err));
        });
    }
    
/*
    let personajes = ['rick', 'morty', 'Summer', 'Noob-Noob'];
    console.log(personajes.slice(0, 2));  // Esto pintaria ['rick', 'morty', 'Summer']
    */


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
