import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { useLocation } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    outline: "none",
    boxShadow: 24,
    p: 4,
};

export default function AuthModel({ open, handleClose }) {
    const location = useLocation();

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {location.pathname === "/login" ? <LoginForm /> : <RegisterForm />}
                </Box>
            </Modal>
        </div>
    );
}