import React, { useState } from "react";

//CAMBIOS EN LA ADAPTACIÓN
//se ha utilizado el estado del componente para almacenar los valores de email, password y rememberMe.
//Cuando se modifican estos valores, se actualiza el estado utilizando useState y los handlers handleEmailChange, handlePasswordChange y handleRememberMeChange.
//Se ha eliminado el atributo onclick del botón de inicio de sesión y se ha agregado un handler handleLogin que se encargará de implementar la lógica de inicio de sesión.

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    const data = {
      email: email,
      password: password,
    };

    // Validar si los campos están vacíos
    if (email === "" || password === "") {
      alert("Por favor, ingrese email y contraseña.");
    } else {
      fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(response.statusText);
          }
        })
        .then((data) => {
          const { user_id, token, is_admin } = data;

          // Almacenar el token en el almacenamiento local
          localStorage.setItem("token", token);
          // Almacenar si el usuario es admin en el almacenamiento local
          localStorage.setItem("is_admin", is_admin);
          // Almacenar el user_id en el almacenamiento local
          localStorage.setItem("user_id", user_id);
          alert("Inicio de sesión exitoso");

          // Redireccionar al usuario a otra página
          window.location.href = "/feed"; // Reemplaza '/feed' con la URL deseada

          // Agregar un return para salir de la función
          return;
        })

        .catch((error) => {
          // Manejo de errores del inicio de sesión
          if (error instanceof TypeError) {
            alert("Error de red"); // Mostrar un mensaje de error en caso de problemas de conexión
          } else {
            alert("Correo electrónico o contraseña incorrectos"); // Mostrar un mensaje de error genérico para otros errores
          }
          setEmail("");
          setPassword("");
        });
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card bg-light shadow-lg">
              <div className="card-body p-5">
                <form className="mb-3 mt-md-0">
                  <div className="logo_login mb-4 ">
                    <img
                      className="row d-flex justify-content-center img-fluid"
                      src="logo_horizontal.png"
                      alt=""
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label ">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="nombre@example.com"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="*******"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                 
                  <div className="d-grid">
                    <button
                      id="boton-login"
                      className="btn btn-outline-primary"
                      type="button"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                    </div>
                </form>
                <div>
                  <p className="mb-0 text-center">
                    ¿No tienes cuenta?
                    <a href="/registro" className="text-primary fw-bold">
                      ¡Registrate!
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
