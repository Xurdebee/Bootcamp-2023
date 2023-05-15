import React from 'react';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <div>
      <NavBar />
      {/* El resto de la app*/}
      <Footer />
    </div>

  );
}

export default App;
