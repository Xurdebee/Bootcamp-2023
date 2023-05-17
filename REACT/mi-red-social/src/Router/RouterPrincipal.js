import React from 'react'
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import NavBar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import LoginForm from '../components/Login/LoginForm';
import ColumnaSugeridos from '../components/Feed/ColumnaSugeridos';
import ColumnaUsuario from '../components/Feed/ColumnaUsuario';
import AmigoSugerido from '../components/Feed/AmigoSugerido';
import FormPerfil from '../components/Perfil/FormPerfil';

export const RouterPrincipal = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<> <LoginForm />  </> } /> 
                <Route path='/feed' element={<> <NavBar /> , <ColumnaSugeridos /> , <AmigoSugerido /> , <ColumnaUsuario /> ,  <Footer /> </> } />
                <Route path='/miperfil' element={<> <NavBar /> , < FormPerfil/> , <Footer /> </> } />
                <Route path='/registro' element={<> <NavBar /> , <Footer /> </> } />

            </Routes>
        </BrowserRouter>
    </div>
  );
};
