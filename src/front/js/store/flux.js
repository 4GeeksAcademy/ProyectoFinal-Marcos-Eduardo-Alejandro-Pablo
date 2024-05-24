const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			peliculasFavoritas: [],
			peliculasPendientes: [],
			peliculasVistas: [],
			listaNegra: [],


			//añadir arrays de demás listas
		},
		actions: {

			setFavoritas: (item) => {
				const store = getStore()
				if (!store.peliculasFavoritas.includes(item)) {
					setStore({ peliculasFavoritas: [...store.peliculasFavoritas, item] })
				}
			},
			removeFromFavoritas: (index) => {
				const store = getStore();
				const updatedFavoritos = [...store.peliculasFavoritas];
				updatedFavoritos.splice(index, 1);
				setStore({ ...store, peliculasFavoritas: updatedFavoritos });
			},

			setPendientes: (item) => {
				const store = getStore()
				if (!store.peliculasPendientes.includes(item)) {
					setStore({ peliculasPendientes: [...store.peliculasPendientes, item] })
				}
			},
			removeFromPendientes: (index) => {
				const store = getStore();
				const updatedPendientes = [...store.peliculasPendientes];
				updatedPendientes.splice(index, 1);
				setStore({ ...store, peliculasPendientes: updatedPendientes });
			},

			setVistas: (item) => {
				const store = getStore()
				if (!store.peliculasVistas.includes(item)) {
					setStore({ peliculasVistas: [...store.peliculasVistas, item] })
				}
			},
			removeFromVistas: (index) => {
				const store = getStore();
				const updatedVistas = [...store.peliculasVistas];
				updatedVistas.splice(index, 1);
				setStore({ ...store, peliculasVistas: updatedVistas });
			},

			setNegra: (item) => {
				const store = getStore()
				if (!store.listaNegra.includes(item)) {
					setStore({ listaNegra: [...store.listaNegra, item] })
				}
			},
			removeFromNegra: (index) => {
				const store = getStore();
				const updatedNegra = [...store.listaNegra];
				updatedNegra.splice(index, 1);
				setStore({ ...store, listaNegra: updatedNegra });
			},
		}

	};
};

export default getState;
