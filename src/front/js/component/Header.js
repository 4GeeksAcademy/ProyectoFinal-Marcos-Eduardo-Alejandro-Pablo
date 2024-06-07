import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/logonegro.png"

export const Header = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container">
				<img src={Logo} className="navbar-brand img-fluid" width="200px"></img>

				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar"
					aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbar">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<a className="nav-link active" aria-current="page" href="#">Inicio</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">Mis Favoritos</a>
							<Link to="/favoritos" className="nav-link">Mis Favoritos</Link>

						</li>
						<li className="nav-item">
							<Link to="/perfil" className="nav-link">Mi Perfil</Link>
						</li>
					</ul>
					<li className="nav-item" style={{ listStyle: "none" }}>
						<Link to="/login/" className="nav-link" href="#">Login</Link>
					</li>
				</div>
			</div>
		</nav>
	);
};
