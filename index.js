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
    fetch(`http://localhost:3000/login?email=${email}&password=${password}`)
      .then(function(response) {
        if (response.ok) {
          // Redirigir a la página de destino
          response.json()
          .then(function(json){
            window.location.href = `feed-responsive.html?userId=${json.user_id}`;
          });
        } else {
          alert("Nombre de usuario o contraseña incorrectos.");
        }
      })
      .catch(error => {
        // alert("Ha ocurrido un error al validar el inicio de sesión.");
        console.error(error);
      }); 
    }
  }
