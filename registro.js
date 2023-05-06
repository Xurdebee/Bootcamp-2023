const form = document.getElementById('form-registro');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const alias = document.getElementById('alias').value;
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const birthday = document.getElementById('birthday').value;
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const linkedIn = document.getElementById('linkedIn').value;
    const education = document.getElementById('education').value;
    const terms = document.getElementById('terms').checked;

    if (!terms) {
        alert('Debe aceptar los términos y condiciones.');
        return;
      }
    
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Debe ingresar un email válido.');
        return;
      }

    if (password.length < 6 || password.length > 16) { 
        alert('La contraseña debe tener entre 6 y 16 caracteres');
        return;
    }
    
    try {
    const response = await fetch("http://localhost:3000/newregister", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            alias: alias,
            name: name,
            surname: surname,
            email: email,
            password: password,
            birthday: birthday,
            country: country,
            city: city,
            linkedIn: linkedIn,
            education: education
        })
    });

    const data = await response.json();

    if (data.message) {
        alert('El usuario ha sido registrado exitosamente!');
        // redirigir a otra página después de un tiempo de espera
        setTimeout(() => {
            window.location.href = 'index-responsive.html';
        }, 2000);
    } else {
        alert('Error al crear el usuario');
    }
} catch (error) {
    console.error(error);
    alert('Ha ocurrido un error al crear el usuario');
}
});
