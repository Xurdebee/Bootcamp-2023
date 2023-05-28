const user_id = JSON.parse(localStorage.getItem("user_id_login"));

function getfriends(done){
    fetch(`http://localhost:3000/friends/${user_id}`)
  
      .then(response => response.json())
      .then(data => {
      console.log(data)
      data.forEach(user => {
        const friend = document.createRange().createContextualFragment(`
        <div class="m-3 col">
          
            <div class="me-2">
              <a href="#"><img class="rounded-circle" src="${user.image}" width="100" alt=""></img></a>
            </div>
      
            <div class="overflow-hidden ">
              <a class="h6 mb-0" href="/user/${user.friend_user_id}">${user.name} ${user.surname}</a>
              <p class="mb-0 small text-truncate">${user.alias}</p>
              <button class="btn btn-outline-danger btn-sm"  onclick="unfriendUser(${user.user_id}, ${user.friend_user_id})">Eliminar amigo</button>
            </div>
        </div>
        `);
        const main = document.querySelector("article");
        main.append(friend);
      });
      done();
      })
      .catch((err) => console.log(err));
    }
    
getfriends(() => {
});


//Función dejar de seguir activada por botón
function unfriendUser(user_id, friend_user_id) {
  fetch(`http://localhost:3000/unfriend/${user_id}/${friend_user_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    // Si la eliminación es exitosa, recargar la lista de amigos para reflejar los cambios
    const main = document.querySelector("article");
    main.innerHTML = '';
    getfriends(() => {
      console.log('Datos de usuario recargados');
    });
  })
  .catch((err) => console.log(err));
}