/* Defino una f(x) validateLogin() 
    que se ejecuta cuando se hace clic en el botón de inicio de sesión. 
        La f(x) verifica si los campos de entrada de texto están vacíos .
          y, si no lo están, redirige al usuario a la página de destino 
            utilizando  propiedad window.location.href.*/

function validateLogin() {
  // Obtener valores de entrada de texto
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // Validar si los campos están vacíos
  if (email == "" || password == "") {
    alert("Por favor, ingrese nombre de usuario y contraseña.");
  } else {

    // Realizar petición fetch a la base de datos
    fetch("http://localhost:3000/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: email,
    password: password,
  }),
})
.then(function (response) {
  if (response.ok) {
    // La respuesta es válida, redirigir al usuario
    response.json().then(function (json) {
      localStorage.setItem("user_id_login", json.user_id);
    window.location.href = "feed-responsive.html";
 });
  } else {
      // La respuesta es inválida, manejar el error
      alert("Nombre de usuario o contraseña incorrectos.");
  }
  })
  .catch(function (error) {
    // Manejar cualquier error durante la petición fetch
    alert("Ha ocurrido un error al validar el inicio de sesión.");
    console.error(error);
  });
  }
}