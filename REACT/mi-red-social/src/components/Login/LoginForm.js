import React, { useState } from 'react';

//CAMBIOS EN LA ADAPTACIÓN
    //se ha utilizado el estado del componente para almacenar los valores de email, password y rememberMe.
        //Cuando se modifican estos valores, se actualiza el estado utilizando useState y los handlers handleEmailChange, handlePasswordChange y handleRememberMeChange. 
    //Se ha eliminado el atributo onclick del botón de inicio de sesión y se ha agregado un handler handleLogin que se encargará de implementar la lógica de inicio de sesión.
    
    function LoginForm() {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [rememberMe, setRememberMe] = useState(false);
    
      const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };
    
      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };
    
      const handleRememberMeChange = (event) => {
        setRememberMe(event.target.checked);
      };
    
      /*const handleLogin = () => {
        const url = 'http://localhost:3000/login'; // Ruta a la que deseas redirigir después del inicio de sesión
        const body = JSON.stringify({ email, password }); // Convertir los datos a JSON
      
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: body
        })
        .then(response => {
          console.log(response); //  console.log para verificar el objeto response
          if (response.ok) {
            // Si la respuesta es exitosa, redirigir a la página /feed
            console.log("respuesta exitosa"); 
            window.location.href = '/feed';
          } else {
            // Manejar el caso de respuesta no exitosa (por ejemplo, mostrar un mensaje de error)
            console.error('Error en la petición');
          }
        })
        .catch(error => {
          // Manejar el error de la petición
          console.error('Error en la petición', error);
        });
      };*/

      const handleLogin = () => {
        const data = {
          email: email,
          password: password
        };
    
        fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
            const { user_id, token } = data;
            
            // Almacenar el token en el almacenamiento local
            localStorage.setItem('token', token);

            // Redireccionar al usuario a otra página
            window.location.href = '/feed'; // Reemplaza '/feed' con la URL deseada

            // O mostrar un mensaje de éxito
            alert('Inicio de sesión exitoso');
    
          })
          .catch(error => {
            // Manejo de errores del inicio de sesión
            console.error(error);
          });
      };

      
      
    
      return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card bg-light shadow-lg">
              <div className="card-body p-5">
                <form className="mb-3 mt-md-0">
                  <div className="logo_login mb-4 "><img className="row d-flex justify-content-center img-fluid" src="logo_horizontal.png" alt="" /></div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label ">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="nombre@example.com" value={email} onChange={handleEmailChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="password" placeholder="*******" value={password} onChange={handlePasswordChange} required />
                  </div>
                  <p className="small"><a className="text-primary" href="forget-password.html">¿Olvidaste la contraseña?</a></p>
                  <div className="d-grid">
                    <button id="boton-login" className="btn btn-outline-primary" type="button" onClick={handleLogin}>Login</button>
                    <label className="checkbox mt-2">
                      <input type="checkbox" value="remember-me" className="me-2" checked={rememberMe} onChange={handleRememberMeChange} />
                      Mantenerme conectado en este PC
                    </label>
                  </div>
                </form>
                <div>
                  <p className="mb-0 text-center">¿No tienes cuenta?
                    <a href="/registro" className="text-primary fw-bold">¡Registrate!</a>
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
