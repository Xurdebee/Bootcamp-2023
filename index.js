//Vamos a llamar/obtener el boton de login del DOM(árbol de nodos)  por su ID
    // document.getElementById("id del elemento")
        //id="boton-login" 
// const botonLogin = document.getElementById("boton-login");

// Agregar un evento de clic al botón "Login" que me llevará a la pantalla de Feed
    //Sintaxis element.addEventListener(event, function, useCapture);
        // event es es tipo de evento como "click" 
        // function es la funcion que llamaremos cuando el evento ocurra
        // useCapture es OPCIONAL, valor booleano que especifica si usar event bubbling o event capturing 

// botonLogin.addEventListener("click", function() {
//   window.location.href = "feed-responsive.html"
// });



function validateLogin() {
  // Obtener valores de entrada de texto
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // Validar si los campos están vacíos
  if (email == "" || password == "") {
    alert("Por favor, ingrese nombre de usuario y contraseña.");
  } else {

   // Realizar petición fetch a la base de datos
  fetch(`https://localhost:3000/login?user_id=1&email=${email}&password=${password}`)
    .then(response => {
      if (response.ok) {
        // Redirigir a la página de destino
        window.location.href = "feed-responsive.html";
      } else {
        alert("Nombre de usuario o contraseña incorrectos.");
      }
    })
    .catch(error => {
      alert("Ha ocurrido un error al validar el inicio de sesión.");
      console.error(error);
    }); 
  }
}