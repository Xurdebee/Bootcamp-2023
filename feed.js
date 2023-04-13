
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
