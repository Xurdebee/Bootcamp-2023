import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

const ColumnaUsuario = () => {
  const [user, setUser] = useState({
    number_posts: 0,
    number_following: 0,
    number_likes: 0
  });
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    fetch(`http://localhost:3000/user/${user_id}`)
      .then(response => response.json())
      .then(data => {
        setUser(data[0 ]);
		console.log (data)
      })
      .catch(error => {
        console.log(error);
      });
  }, [user_id]);


  return (
	
	<Container>
		<div className="bg-light p-2 rounded-3 border-1 border">
			<div className="text-center mb-3">
				<div className="m-3">
					<img className="rounded-4" src={user.image} height="90" alt=""/>
				</div>
				<h5 className="mb-0">{user.name} {user.surname}</h5>
				<small>{user.alias}</small>
				<p className="mt-3">{user.education}</p>
				<div className="hstack gap-2 gap-xl-3 justify-content-center">
				<div>
					<h6 className="mb-0"><strong>{user.number_posts}</strong></h6>
					<small>Post</small>
				</div>

				<div className="vr"></div>
				<div>
					<h6 className="mb-0"><strong>{user.number_users}</strong></h6>
					<small>Amigos</small>
				</div>
				<div className="vr"></div>
				<div>
					<h6 className="mb-0"><strong>{user.number_likes}</strong></h6>
					<small>Likes</small>
				</div>
				</div>
			</div>

			<hr/>
			<ul className="navbar-nav fw-bold m-2 ">
				<li className="nav-item">
				<a className="nav-link" href="./feed">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-layout-text-window-reverse me-2" viewBox="0 0 16 16">
					<path d="M13 6.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5zm0 3a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5zm-.5 2.5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h5z"/>
					<path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM2 1a1 1 0 0 0-1 1v1h14V2a1 1 0 0 0-1-1H2zM1 4v10a1 1 0 0 0 1 1h2V4H1zm4 0v11h9a1 1 0 0 0 1-1V4H5z"/>
					</svg>
					Feed
				</a>
				</li>
				<li className="nav-item">
				<a className="nav-link" href="./amigos">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar3 me-2" viewBox="0 0 16 16">
					<path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
					<path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
					</svg>
					Mis amigos
				</a>
				</li>
				<li className="nav-item">
				<a className="nav-link" href="./peticiones">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left-text me-2" viewBox="0 0 16 16">
					<path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
					<path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
					</svg>
					Peticiones de amistad
				</a>
				</li>
				<li className="nav-item">
				<a className="nav-link" href="./sugeridos">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left-text me-2" viewBox="0 0 16 16">
					<path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
					<path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
					</svg>
					Sugerencias amistad
				</a>
				</li>
				<li className="nav-item">
				<a className="nav-link" href="">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sliders me-2" viewBox="0 0 16 16">
					<path fillRule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"/>
					</svg>
					Opciones
				</a>
				</li>
			</ul>
		</div>
</Container>
)}


export default ColumnaUsuario;