const aplicacion = document.querySelector('.container-API');

fetch('https://jsonplaceholder.typicode.com/comments')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((comment) => {
      const card = document.createElement('div');
      card.classList.add('card', 'h-100');

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');

      const cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title');
      cardTitle.textContent = comment.name;

      const cardText = document.createElement('p');
      cardText.classList.add('card-text');
      cardText.textContent = comment.body;

      const cardImg = document.createElement('img');
      cardImg.classList.add('card-img-top');
      cardImg.src = 'https://random.imagecdn.app/500/150';

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      card.appendChild(cardImg);
      card.appendChild(cardBody);

      card.addEventListener('click', () => {
        window.location.href = `./index-responsive.html?id=${comment.id}`;
      });

      aplicacion.appendChild(card);
    });
  })
  .catch((err) => console.log(err));
