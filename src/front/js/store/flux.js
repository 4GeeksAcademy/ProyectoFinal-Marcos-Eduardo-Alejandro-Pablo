const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			currentUser: null,
			favourites: [],
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
					const response = await fetch(process.env.BACKEND_URL + '/api/users', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'accept': 'application/json',
							mode: 'no-cors',
						},
						body: JSON.stringify({ 'email': email, 'password': password })
					});
					if (!response.ok) {
						console.error('Error al enviar datos');
						throw new Error('Error al enviar datos');
					}
					const data = await response.json();
					setStore({ datos: data.result });
					return data;
				} catch (error) {
					console.error('Error:', error);
					throw error;
				}
			},
			login: async ({ email, password }) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/login', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'accept': 'application/json',
						},
						body: JSON.stringify({ 'email': email, 'password': password })
					});
					if (!response.ok) {
						console.error('Error al enviar datos');
						throw new Error('Error al enviar datos');
					}
					const data = await response.json();
					localStorage.setItem("jwt-token", data.token);
					setStore({ currentUser: data });
					await getActions().getCurrentUserFavourites(data.user_id);
					return true;
				} catch (error) {
					console.error('Error:', error);
					return false;
				}
			},
			forgotPassword: async (email) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/forgot-password', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ email })
					});
					if (!response.ok) {
						console.error('Error al enviar datos');
						throw new Error('Error al enviar datos');
					}
					const data = await response.json();
					console.log('Correo de recuperación enviado:', data);
				} catch (error) {
					console.error('Error:', error);
				}
			},
			resetPassword: async (password, user_uuid) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/reset-password/', {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							//'Authorization': `Bearer ${token}`
						},
						body: JSON.stringify({ password, user_uuid })
					});
					if (!response.ok) {
						console.error('Error al enviar datos');
						throw new Error('Error al enviar datos');
					}
					const data = await response.json();
					console.log('Contraseña restablecida:', data);
				} catch (error) {
					console.error('Error:', error);
				}
			},
			getToken: () => {
				const token = localStorage.getItem('jwt-token');
				return !!token;
			},
			logout: () => {
				localStorage.removeItem('jwt-token');
				setStore({ currentUser: null });
			},
			getCurrentUser: async () => {
				const userId = getStore().currentUser.user_id;
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/users/' + userId, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'accept': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
						}
					});
					if (!response.ok) {
						console.error("Error consiguiendo al usuario");
					}
					const data = await response.json();
					setStore({ currentUser: data });
					return data;
				} catch (error) {
					console.error('Error:', error);
					throw error;
				}
			},
			updateUserName: async (newUserName) => {
				const store = getStore();
				const userId = store.currentUser.id;
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/users/${userId}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
						},
						body: JSON.stringify({ user_name: newUserName })
					});
					if (!response.ok) {
						throw new Error('Error al actualizar el nombre de usuario');
					}
					const data = await response.json();
					setStore({ currentUser: data });
					return data;
				} catch (error) {
					console.error('Error:', error);
					throw error;
				}
			},
			addFavourite: async (userId, showId) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/favoritos', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ 'user_id': userId, 'show_id': showId }),
					});
					if (!response.ok) {
						throw new Error('Error adding favourite');
					}
					const data = await response.json();
					const newFavourite = { id: data.id, user_id: userId, show_id: showId };
					const store = getStore();
					setStore({
						...store,
						favourites: [...store.favourites, newFavourite]
					});
				} catch (error) {
					console.error('Error:', error);
				}
			},
			deleteFavourite: async (favouriteId) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/favoritos/' + favouriteId, {
						method: 'DELETE',
					});
					if (!response.ok) {
						throw new Error('Error deleting favourite');
					}
					const store = getStore();
					setStore({
						...store,
						favourites: store.favourites.filter(fav => fav.id !== favouriteId)
					});
				} catch (error) {
					console.error('Error:', error);
				}
			},
			getCurrentUserFavourites: async userId => {
				const response = await fetch(process.env.BACKEND_URL + '/api/users/' + userId + '/favoritos');
				if (!response.ok) {
					throw Error(response.statusText);
				}
				let data;
				try {
					data = await response.json();
				} catch (error) {
					console.error(error);
				}
				const store = getStore();
				setStore({ ...store, favourites: data });
			},
		}
	};
};
export default getState;