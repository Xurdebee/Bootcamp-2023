// function getCharacter(done){
//     const results = fetch("https://rickandmortyapi.com/api/character/?page=2");
//       results
//           .then(response => response.json())
//           .then(data=>{
//               done(data)
//           .catch((err) => console.log(err));
//           });
//   }
      
//   getCharacter(data=>{
//     data.results.forEach(personaje=>{
//       const amigos = document.createRange().createContextualFragment(` 
      
//         <div class="m-3 col">
          

//             <div class="me-2">
//               <a href="#"><img class="rounded-circle" src="${personaje.image}" width="100" alt=""></img></a>
//             </div>
              
//             <div class="overflow-hidden ">
//               <a class="h6 mb-0" href="#!">${personaje.name}</a>
//               <p class="mb-0 small text-truncate">${personaje.species}</p>
//             </div>
          
//         </div>
        
  
//       `); 
//           const main =document.querySelector("article");
//           main.append(amigos);
  
//     });
//   });


  async function getFollowed(done){
    fetch('http://localhost:3000/followed')
  
      .then(response => response.json())
      .then(data => {
      console.log(data)
      data.forEach(user => {
        const follow = document.createRange().createContextualFragment(`
        <div class="m-3 col">
          
            <div class="me-2">
              <a href="#"><img class="rounded-circle" src="${user.image}" width="100" alt=""></img></a>
            </div>
      
            <div class="overflow-hidden ">
              <a class="h6 mb-0" href="/user/${user.follow_user_id}">${user.name} ${user.surname}</a>
              <p class="mb-0 small text-truncate">${user.alias}</p>
            </div>
          
        </div>
        `);
        const main = document.querySelector("article");
        main.append(follow);
      });
      done();
      })
      .catch((err) => console.log(err));
    }
    
    getFollowed(() => {
    console.log('Datos de usuario cargados');
    });