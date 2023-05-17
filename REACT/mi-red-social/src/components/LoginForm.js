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

  const handleLogin = () => {
    // Aquí se implementa la lógica de inicio de sesión 
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
                    <a href="registro.html" className="text-primary fw-bold">¡Registrate!</a>
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
