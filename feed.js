// ---------------- API 1
const aplicacion = document.querySelector ('.container-API')

const url = 'https://jsonplaceholder.typicode.com/users'

fetch (url)
.then(res => res.json())
.then(data => {
  data.forEach(usuario => {
      console.log(usuario.name)
      const p = document.createElement ('p') 
      p.setAttribute('id', usuario.id)
      p.innerHTML = usuario.name
      p.addEventListener('click', function(){
        window.location.href = `./index-responsive.html?id=${usuario.id}`
      })
      aplicacion.appendChild (p)
  });
      // console.log (data)
})
.catch(err => console.log(err))

// -------------API 2
const aplicacion2 = document.querySelector ('.container-API-2')
const getUrl = URLSearchParams(window.location.search)
id = getUrl.get('id') 
console.log(id)


  

// const likeBtn = document.getElementById("boton_likes");
// const likeCountElement = document.getElementById("like-count");
// let likeCount = parseInt(likeCountElement.textContent);
// likeBtn.addEventListener("click", function() {
//   likeCount++;
//   likeCountElement.textContent = likeCount.toString();
// });

// - Refactorizamos: 
// accedemos al botón del HTML y al contador con el método getElementById y añadimos un escuchador de eventos 

const likeBoton = document.getElementById("boton_likes");
const likeCountElement = document.getElementById("contador-likes");
// variable para almacenar la cantidad de likes:
let likeCount = parseInt(likeCountElement.textContent); //Parseamos el contador de likes 

likeBoton.addEventListener("click", () => { //escuchador para q se ejecute la función cuando se hace clic en el botón de likes
  new Promise((resolve, reject) => {  //creamos promesa resolve-> éxito/ reject-> error 
    likeCount++; //se incrementa el nº likes de uno en uno 
    likeCountElement.textContent = likeCount.toString();
    if (likeCount) {
      resolve("Like correctamente añadido"); // mensaje si se resuelve bien
    } else {
      reject("Error al añadir like"); // mensaje si se resuelve mal 
    }
  })
//invocamos la función .addEventListener mediante los métodos Then y Catch
  .then((message) => { // se ejecuta cuando la promesa sale bien 
    console.log(message);
  })
  .catch((error) => { // se ejecuta cuando la promesa sale mal
    console.error(error);
  });
});
