
var botonLikes = document.getElementById ("boton_likes");
var totalLikes = document.getElementById ("total_likes");

let cuentaLikes = 158; //likes ya acumulados en la publicación


let interaccion= 0


export function agregarLike(){
    if (interaccion == 0) { 
    interaccion++;
    this.style.color = "white";
    this.style.background = "red";
    this.parentElement.nextElementSibling.innerHTML=cuentaLikes+1
}
    else{
        interaccion--;
        this.style.color = "";
        this.style.background = ""
        this.parentElement.nextElementSibling.innerHTML=cuentaLikes 
    }

};

