import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/logonegro.png"
import { Context } from '../store/appContext';

export const Header = () => {
	const { store, actions } = useContext(Context);

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
							<Link to="/" className="nav-link active" aria-current="page" href="#">Inicio</Link>
						</li>
						{store.currentUser !== null ? (
							<li className="nav-item">
								<Link to="/misfavoritos/" className="nav-link">Mis Favoritos</Link>
							</li>
						) : ""}
						{store.currentUser !== null ? (
							<li className="nav-item">
								<Link to="/perfil/" className="nav-link">Mi Perfil</Link>
							</li>
						) : ""}
					</ul>
					<li className="nav-item" style={{ listStyle: "none" }}>
						{store.currentUser !== null ? (
							<Link to="/perfil" className="nav-link">
								{store.currentUser && store.currentUser.email}
							</Link>
						) : (
							<Link to="/login/" className="nav-link">
								Login
							</Link>
						)}
					</li>
				</div>
			</div>
		</nav>
	);
};
