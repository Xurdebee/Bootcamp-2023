import React from 'react';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import ColumnaSugeridos from './components/ColumnaSugeridos';
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
  return (
    <div>
      <NavBar />
      {/* <LoginForm/> */}
      <ColumnaSugeridos/>
      <Footer />
    </div>

  );
}

export default App;
