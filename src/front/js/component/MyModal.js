import React from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const MyModal = ({ show, onHide }) => {
    const navigate = useNavigate();



    const handleUserPage = () => {
        navigate('/login');
    }

    return (
        <>
            <BootstrapModal show={show} onHide={onHide}>
                <BootstrapModal.Header closeButton>
                    <BootstrapModal.Title>Regístrate o loguéate</BootstrapModal.Title>
                </BootstrapModal.Header>
                <BootstrapModal.Body>Necesita estar registrado para poder añadir shows a tu lista de favoritos.</BootstrapModal.Body>
                <BootstrapModal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Salir
                    </Button>
                    <Button variant="primary" onClick={handleUserPage}>
                        Página de usuario
                    </Button>
                </BootstrapModal.Footer>
            </BootstrapModal>
        </>
    );
}

export default MyModal;