function getCharacter(done){
    const results = fetch("https://rickandmortyapi.com/api/character/?page=2");
      results
          .then(response => response.json())
          .then(data=>{
              done(data)
          .catch((err) => console.log(err));
          });
  }
      
  getCharacter(data=>{
    data.results.forEach(personaje=>{
      const amigos = document.createRange().createContextualFragment(` 
      
        <div class="m-3 col">
          

            <div class="me-2">
              <a href="#"><img class="rounded-circle" src="${personaje.image}" width="100" alt=""></img></a>
            </div>
              
            <div class="overflow-hidden ">
              <a class="h6 mb-0" href="#!">${personaje.name}</a>
              <p class="mb-0 small text-truncate">${personaje.species}</p>
            </div>
          
        </div>
        
  
      `); 
          const main =document.querySelector("article");
          main.append(amigos);
  
    });
  });