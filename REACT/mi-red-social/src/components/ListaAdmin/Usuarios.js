import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

function Usuarios() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/allusers`)
      .then((response) => response.json())
      .then((users) => {
        setUsers(users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


function exportarUsuarios() {
  // Crear una nueva hoja de cálculo
  const workbook = XLSX.utils.book_new();
  // Convertir los datos de los usuarios a formato de hoja de cálculo
  const worksheet = XLSX.utils.json_to_sheet(users);
  // Agregar la hoja de cálculo al libro de trabajo
  XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");
  // Generar el archivo XLSX
  const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  // Crear un Blob desde el array de bytes
  const blob = new Blob([wbout], { type: "application/octet-stream" });
  // Guardar el archivo usando FileSaver.js
  saveAs(blob, "usuarios.xlsx");  
}

  return (
    <>
      <div className="table-responsive">
      <button className="btn btn-outline-primary mb-3" onClick={exportarUsuarios}>Exportar usuarios</button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Alias</th>
              <th>Estudios</th>
              <th>Conocimientos extra</th>
              <th>Email</th>
              <th>LinkedIn</th>
              <th>Cumpleaños</th>
              <th>Pais</th>
              <th>Ciudad</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.alias}</td>
                <td>{user.education}</td>
                <td>{user.extra_knowledge}</td>
                <td>{user.email}</td>
                <td>{user.linkedIn}</td>
                <td>{user.birthday}</td>
                <td>{user.country}</td>
                <td>{user.city}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Usuarios;