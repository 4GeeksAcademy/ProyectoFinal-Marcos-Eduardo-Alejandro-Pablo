import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import SingleShow from "./pages/SingleShow.jsx";

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
            <Header />


            <div class="container" id="webbody">
                <div class="row">
                    <div class="col">
                        <BrowserRouter basename={basename}>
                            <Routes>
                                <Route element={<Home />} path="/" />
                                <Route element={<Demo />} path="/demo" />
                                <Route element={<Single />} path="/single/:theid" />
                                <Route element={<SingleShow />} path="/show/:id" />
                                <Route element={<h1>Not found!</h1>} />
                            </Routes>
                        </BrowserRouter>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
};

export default injectContext(Layout);
