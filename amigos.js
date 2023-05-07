
const amigosList = [
  { id: 1, name: " " },
  { id: 2, name: " " }
];

function getCharacter(done) {
  const results = fetch("https://rickandmortyapi.com/api/character/?page=2");
  results
    .then(response => response.json())
    .then(data => {
      done(data);
    })
    .catch(err => console.log(err));
}

getCharacter(data => {
  data.results.forEach(personaje => {
    const esAmigo = amigosList.some(amigo => amigo.id === personaje.id);
    const actionButton = esAmigo
      ? `<button class="btn btn-danger">Eliminar amigo</button>`
      : `<button class="btn btn-primary">Agregar amigo</button>`;

    const personajeHTML = document
      .createRange()
      .createContextualFragment(` 
        <div class="m-3 col">
          <div class="me-2">
            <a href="#"><img class="rounded-circle" src="${personaje.image}" width="100" alt=""></img></a>
          </div>
          <div class="overflow-hidden ">
            <a class="h6 mb-0" href="#!">${personaje.name}</a>
            <p class="mb-0 small text-truncate">${personaje.species}</p>
            ${actionButton }
            </div>
          </div>
        `);
  
      const main = document.querySelector("article");
      main.append(personajeHTML);
    });
  });
