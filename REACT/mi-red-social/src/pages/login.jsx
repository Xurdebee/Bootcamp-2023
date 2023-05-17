import React from 'react';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
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