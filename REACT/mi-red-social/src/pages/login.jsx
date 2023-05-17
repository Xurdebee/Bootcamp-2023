import React from 'react';
import NavBar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoginForm from './components/Login/LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';





function App() {
  return (
    <>
      <NavBar />
      <LoginForm/>
      <Footer />
    </>

  );
}

export default App;