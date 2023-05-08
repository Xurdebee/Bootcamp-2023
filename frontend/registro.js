const form = document.getElementById('form-registro');
<<<<<<< HEAD
form.addEventListener('submit', (event) => {
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

console.log(alias, name, surname, email, password, birthday, country, city, linkedIn, education);
});

const regexEmail = /^\S+@\S+\.\S+$/; // Expresión regular para validar el formato de email
registroForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // Validations

if (password.length < 6 || password.length > 16) {
    errorDiv.innerHTML = 'La contraseña debe tener entre 6 y 16 caracteres';
    successDiv.style.display = 'none';
    errorDiv.style.display = 'block';
    return;
}
if (!regexEmail.test(email)) {
    errorDiv.innerHTML = 'Ingrese un correo electrónico válido';
    successDiv.style.display = 'none';
    errorDiv.style.display = 'block';
    return;
}

if (!terms) {
    errorDiv.innerHTML = 'Debe aceptar los términos y condiciones';
    successDiv.style.display = 'none';
    errorDiv.style.display = 'block';
    return;
}

const data = {
    alias,
    name, 
    surname, 
    email, 
    password, 
    birthday, 
    country, 
    city, 
    linkedIn, 
    education
};

console.log(data.alias)
try {
    const response = await fetch('/registro', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
            },
        body: JSON.stringify(data),
});
    const responseData = await response.json();
        if (response.ok) {
            successDiv.innerHTML = responseData.message;
            errorDiv.style.display = 'none';
            successDiv.style.display = 'block';
        } else {
            errorDiv.innerHTML = responseData.message;
            successDiv.style.display = 'none';
            errorDiv.style.display = 'block';
        }
    } catch (error) {
        errorDiv.innerHTML = 'Ha ocurrido un error en el servidor. Por favor, intenta más tarde.';
        successDiv.style.display = 'none';
        errorDiv.style.display = 'block';
    }
=======

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

    if (!alias || !name || !surname || !email || !password || !birthday || !country || !city || !education) {
        alert('Debe completar todos los campos.');
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
>>>>>>> main
});
