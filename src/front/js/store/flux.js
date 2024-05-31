

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			datos: [],
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
			]
		},
		actions: {
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			// getMessage: async () => {
			// 	try {
			// 		const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
			// 		const data = await resp.json();
			// 		setStore({ message: data.message });
			// 		return data;
			// 	} catch (error) {
			// 		console.log("Error loading message from backend", error);
			// 	}
			// },

			getMessage: async () => {
				try {
					// const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					// const data = await resp.json();
					// setStore({ message: data.message });
					// return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},
			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo: demo });
			},

			registro: async ({ email, password }) => {
				try {
					const response = await fetch('https://potential-space-palm-tree-4j6p74jxpxjh547-3001.app.github.dev/api/users', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'accept': 'application/json'
						},
						body: JSON.stringify({ 'email': email, 'password': password }) // Enviar contraseña en texto plano
					});

					if (!response.ok) {
						console.error('Error al enviar datos');
						throw new Error('Error al enviar datos');
					}

					const data = await response.json();
					console.log('Datos guardados correctamente:', data);
					setStore({ datos: data.result });
				} catch (error) {
					console.error('Error:', error);
				}
			},

			login: async ({ email, password }) => {
				try {
					const response = await fetch('https://potential-spae-palm-tree-4j6p74jxpxjh547-3001.app.github.dev/api/login', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'accept': 'application/json'
						},
						body: JSON.stringify({ 'email': email, 'password': password }) // Enviar contraseña en texto plano
					});

					if (!response.ok) {
						console.error('Error al enviar datos');
						throw new Error('Error al enviar datos');
					}

					const data = await response.json();
					console.log('Datos guardados correctamente:', data);
					localStorage.setItem("jwt-token", data.token);
					console.log(localStorage.getItem("jwt-token"));

					return true;
				} catch (error) {
					console.error('Error:', error);
					return false;
				}
			},

			getToken: () => {
				const token = localStorage.getItem('jwt-token');
				return !!token;
			},

			logout: () => {
				localStorage.clear();
			}
		}
	};
};

export default getState;
// const getState = ({ getStore, getActions, setStore }) => {
// 	return {
// 		store: {
// 			message: null,
// 			demo: [
// 				{
// 					title: "FIRST",
// 					background: "white",
// 					initial: "white"
// 				},
// 				{
// 					title: "SECOND",
// 					background: "white",
// 					initial: "white"
// 				}
// 			]
// 		},
// 		actions: {
// 			// Use getActions to call a function within a fuction
// 			exampleFunction: () => {
// 				getActions().changeColor(0, "green");
// 			},

// 			getMessage: async () => {
// 				try {
// 					// fetching data from the backend
// 					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
// 					const data = await resp.json()
// 					setStore({ message: data.message })
// 					// don't forget to return something, that is how the async resolves
// 					return data;
// 				} catch (error) {
// 					console.log("Error loading message from backend", error)
// 				}
// 			},
// 			changeColor: (index, color) => {
// 				//get the store
// 				const store = getStore();

// 				//we have to loop the entire demo array to look for the respective index
// 				//and change its color
// 				const demo = store.demo.map((elm, i) => {
// 					if (i === index) elm.background = color;
// 					return elm;
// 				});

// 				//reset the global store
// 				setStore({ demo: demo });
// 			},
// 			registro: async ({ email, password }) => {
// 				try {
// 					const response = await fetch('http://127.0.0.1:3001/api/users', {
// 						method: 'POST',
// 						headers: {
// 							'Content-Type': 'application/json',
// 							'accept': 'application/json'
// 						},
// 						body: JSON.stringify({ 'email': email, 'password': password }) // Enviar contraseña en texto plano
// 					});

// 					if (!response.ok) {
// 						console.error('Error al enviar datos');
// 						throw new Error('Error al enviar datos');
// 					}

// 					const data = await response.json();
// 					console.log('Datos guardados correctamente:', data);
// 					setStore({ datos: data.result });
// 				} catch (error) {
// 					console.error('Error:', error);
// 				}
// 			},

// 			login: async ({ email, password }) => {
// 				try {
// 					const response = await fetch('https://potential-space-palm-tree-4j6p74jxpxjh547-3001.app.github.dev/', {
// 						method: 'POST',
// 						headers: {
// 							'Content-Type': 'application/json',
// 							'accept': 'application/json'
// 						},
// 						body: JSON.stringify({ 'email': email, 'password': password }) // Enviar contraseña en texto plano
// 					});

// 					if (!response.ok) {
// 						console.error('Error al enviar datos');
// 						throw new Error('Error al enviar datos');
// 					}

// 					const data = await response.json();
// 					console.log('Datos guardados correctamente:', data);
// 					localStorage.setItem("jwt-token", data.token);
// 					console.log(localStorage.getItem("jwt-token"));

// 					return true;
// 				} catch (error) {
// 					console.error('Error:', error);
// 					return false;
// 				}
// 			},

// 			getToken: () => {
// 				const token = localStorage.getItem('jwt-token');
// 				return !!token;
// 			},

// 			logout: () => {
// 				localStorage.removeItem('jwt-token');
// 			}

// 		}
// 	};
// };

// export default getState;

// // const getState = ({ getStore, getActions, setStore }) => {
// // 	return {
// // 		store: {
// // 			message: null,
// // 			demo: [
// // 				{
// // 					title: "FIRST",
// // 					background: "white",
// // 					initial: "white"
// // 				},
// // 				{
// // 					title: "SECOND",
// // 					background: "white",
// // 					initial: "white"
// // 				}
// // 			],
// // 			peliculasFavoritas: [],
// // 			peliculasPendientes: [],
// // 			peliculasVistas: [],
// // 			listaNegra: [],


// // 			//añadir arrays de demás listas
// // 		},
// // 		actions: {

// // 			setFavoritas: (item) => {
// // 				const store = getStore()
// // 				if (!store.peliculasFavoritas.includes(item)) {
// // 					setStore({ peliculasFavoritas: [...store.peliculasFavoritas, item] })
// // 				}
// // 			},
// // 			removeFromFavoritas: (index) => {
// // 				const store = getStore();
// // 				const updatedFavoritos = [...store.peliculasFavoritas];
// // 				updatedFavoritos.splice(index, 1);
// // 				setStore({ ...store, peliculasFavoritas: updatedFavoritos });
// // 			},

// // 			setPendientes: (item) => {
// // 				const store = getStore()
// // 				if (!store.peliculasPendientes.includes(item)) {
// // 					setStore({ peliculasPendientes: [...store.peliculasPendientes, item] })
// // 				}
// // 			},
// // 			removeFromPendientes: (index) => {
// // 				const store = getStore();
// // 				const updatedPendientes = [...store.peliculasPendientes];
// // 				updatedPendientes.splice(index, 1);
// // 				setStore({ ...store, peliculasPendientes: updatedPendientes });
// // 			},

// // 			setVistas: (item) => {
// // 				const store = getStore()
// // 				if (!store.peliculasVistas.includes(item)) {
// // 					setStore({ peliculasVistas: [...store.peliculasVistas, item] })
// // 				}
// // 			},
// // 			removeFromVistas: (index) => {
// // 				const store = getStore();
// // 				const updatedVistas = [...store.peliculasVistas];
// // 				updatedVistas.splice(index, 1);
// // 				setStore({ ...store, peliculasVistas: updatedVistas });
// // 			},

// // 			setNegra: (item) => {
// // 				const store = getStore()
// // 				if (!store.listaNegra.includes(item)) {
// // 					setStore({ listaNegra: [...store.listaNegra, item] })
// // 				}
// // 			},
// // 			removeFromNegra: (index) => {
// // 				const store = getStore();
// // 				const updatedNegra = [...store.listaNegra];
// // 				updatedNegra.splice(index, 1);
// // 				setStore({ ...store, listaNegra: updatedNegra });
// // 			},
// // 		}

// // 	};
// // };

// // export default getState;
