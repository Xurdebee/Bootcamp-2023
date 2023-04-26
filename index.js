//Vamos a llamar/obtener el boton de login del DOM(árbol de nodos)  por su ID
    // document.getElementById("id del elemento")
        //id="boton-login" 
// const botonLogin = document.getElementById("boton-login");

// Agregar un evento de clic al botón "Login" que me llevará a la pantalla de Feed
    //Sintaxis element.addEventListener(event, function, useCapture);
        // event es es tipo de evento como "click" 
        // function es la funcion que llamaremos cuando el evento ocurra
        // useCapture es OPCIONAL, valor booleano que especifica si usar event bubbling o event capturing 

botonLogin.addEventListener("click", function() {
  window.location.href = "feed-responsive.html"
});