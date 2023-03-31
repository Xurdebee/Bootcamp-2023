

/*
  const likeBoton = document.getElementById("boton_likes");
  const likeCountElement = document.getElementById("total-likes");
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

// export default {
//   likeBoton, likeCountElement, likeCount
// }

*/






var botonLikes = document.getElementById ("boton_likes");
var totalLikes = document.getElementById ("total_likes");

let cuentaLikes = 158; //likes ya acumulados en la publicación

function actualizaLikes(){
    totalLikes.innerHTML = cuentaLikes + " Me gusta";
    console.log (totalLikes.innerHTML)
}

let interaccion= 0
actualizaLikes();


botonLikes.addEventListener("click", () => {
    if (interaccion == 0) { 
    interaccion++;
    cuentaLikes++;
    botonLikes.style.color = "white";
    botonLikes.style.background = "red";
    }
    else{
        interaccion--;
        cuentaLikes--;
        botonLikes.style.color = "";
        botonLikes.style.background = ""
    }
    actualizaLikes();
//////////////////////////////////
    getTotalLikes(cuentaLikes)
        .then((response) => 
            console.log(`La publicación tiene ${response} me gusta`))
        .catch((error) => 
            console.log("error"));

});


function getTotalLikes() {
    return new Promise((resolve, reject) => {
        if (cuentaLikes == null) {
            reject ("Error")
        }
        resolve(cuentaLikes)
    })
}
