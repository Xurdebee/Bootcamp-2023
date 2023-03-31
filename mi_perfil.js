//BOTÓN PARA ELIMINAR CUENTA
//Simulación de la eliminación del usuario al no poder usar fetch de momento
    //Usaremos un array de usuarios para comprobar la eliminación de uno

    
// Creación de un array de usuarios y un usuario nuevo
let usuariosArray = [1, 2, 3, 4, 5, 6];
const usuario = {
    id: 7,
    nombre: "Roman",
    apellido: "Becket",
};
//Vamos a llamar/obtener el boton de borrar cuenta del DOM(árbol de nodos)  por su ID
    // document.getElementById("id del elemento")
        //id="boton-borrar-cuenta" 
const botonBorrarCuenta = document.getElementById("boton-borrar-cuenta");

// Añadimos el escuchador de eventos (click en este caso) que ejecutará la función de confimar la eliminación
botonBorrarCuenta.addEventListener("click", confirmarEliminarCuenta);

function confirmarEliminarCuenta() {
    const confirmacion = confirm(
        "¿Está seguro de eliminar su cuenta?"
    );
    if (confirmacion) {
        eliminarCuenta();
    }
}

async function eliminarCuenta() {
    try {
        //Se agrega cuenta del usuario nuevo al array
        usuariosArray.push(usuario);
        console.log(usuariosArray);
        console.table(usuario);

        //Se borra el usuario agregado anteriormente
        usuariosArray.pop();
        console.table(usuario);
        console.log(usuariosArray);

        // Se espera 5 seg para simular la solicitud asincrónica al servidor
        // En ese tiempo se verá los console.log del array
        await new Promise((resolve) => setTimeout(resolve, 5000));
        // Redireccionamos al usuario a la página de inicio de sesión
        window.location.href = 'https://www.uniovi.es/'
    } catch (error) {
        console.error(error);
    }
}