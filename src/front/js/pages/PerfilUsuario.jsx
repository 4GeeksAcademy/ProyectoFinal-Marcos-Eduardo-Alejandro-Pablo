import React from 'react';

const PerfilUsuario = () => {


    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8">
                <h2>Eduardo</h2>
                    <p><strong>Email: </strong>edu@educom.com</p>
                </div>
                <div className="col-md-4 text-left">
                <img src="https://via.placeholder.com/150" alt="Profile" className="img-fluid rounded-circle mb-3" />
                </div>
            </div>
            <div className="row">
            <h3>Favoritos:</h3>
            </div>
            
        </div>
    );
};

export default PerfilUsuario;
