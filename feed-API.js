// ---------------- API 1
const aplicacion = document.querySelector ('.container-API')

const url = 'https://jsonplaceholder.typicode.com/users'

fetch (url)
.then(res => res.json())
.then(data => {
  data.forEach(usuario => {
      console.log(usuario.name)
      const p = document.createElement ('p') 
      p.setAttribute('id', usuario.id)
      p.innerHTML = usuario.name
      p.addEventListener('click', function(){
        window.location.href = `./index-responsive.html?id=${usuario.id}`
      })
      aplicacion.appendChild (p)
  });
      // console.log (data)
})
.catch(err => console.log(err))

// -------------API 2
const aplicacion2 = document.querySelector ('.container-API-2')
const getUrl = URLSearchParams(window.location.search)
id = getUrl.get('id') 
console.log(id)


  