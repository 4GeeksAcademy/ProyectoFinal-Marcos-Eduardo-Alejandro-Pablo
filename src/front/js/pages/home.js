import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { SearchBar } from "../component/SearchBar";
import { Card } from "../component/Card";
import { CardDetallePelicula } from "../component/CardDetallePelicula";



export const Home = () => {
	const { store, actions } = useContext(Context);
	return (
		<>
			<SearchBar />

		</>
	);
};
