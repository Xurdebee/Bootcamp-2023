import React from 'react'
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import NavBar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import LoginForm from '../components/Login/LoginForm';
import ColumnaSugeridos from '../components/UserFeed/ColumnaSugeridos';
import ColumnaUsuario from '../components/UserFeed/ColumnaUsuario';
import AmigoSugerido from '../components/UserFeed/AmigoSugerido';
import FormPerfil from '../components/Perfil/FormPerfil';
import RegistroForm from '../components/Registro/RegistroForm';


export const RouterPrincipal = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<> <LoginForm />  </> } /> 
                <Route path='/feed' element={<> <NavBar /> , <ColumnaSugeridos /> , <AmigoSugerido /> , <ColumnaUsuario /> ,  <Footer /> </> } />
                <Route path='/registro' element={<> <NavBar /> , <RegistroForm/> , <Footer /> </> } />
                <Route path='/miperfil' element={<> <NavBar /> , <FormPerfil/> , <Footer /> </> } />
              

            </Routes>
        </BrowserRouter>
    </div>
  );
};
