const form = document.getElementById('form-registro');
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
});
