import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import SingleShow from "./pages/SingleShow.jsx";

import PerfilUsuario from "./pages/PerfilUsuario.jsx";
import PaginaLogin from "./pages/PaginaLogin.jsx";
import PaginaRegistro from "./pages/PaginaRegistro.jsx";
import MisFavoritos from "./pages/MisFavoritos.jsx";

import injectContext from "./store/appContext";

import { Header } from "./component/Header";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <>
            <BrowserRouter basename={basename}>
                <Header />


                <div className="container" id="webbody">
                    <div className="row">
                        <div className="col">
                            <Routes>
                                <Route element={<Home />} path="/" />
                                <Route element={<Demo />} path="/demo" />
                                <Route element={<Single />} path="/single/:theid" />
                                <Route element={<SingleShow />} path="/show/:id" />
                                <Route element={<PerfilUsuario />} path="/perfil/" />
                                <Route element={<MisFavoritos />} path="/misfavoritos/" />
                                <Route element={<PaginaLogin />} path="/login/" />
                                <Route element={<PaginaRegistro />} path="/registro/" />
                                <Route element={<h1>Not found!</h1>} />
                            </Routes>
                        </div>
                    </div>
                </div>
                <Footer />
            </BrowserRouter>
        </>

    );
};

export default injectContext(Layout);
