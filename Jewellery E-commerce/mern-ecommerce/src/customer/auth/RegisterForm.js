import React, { useEffect } from 'react'
import { Box, Button, Divider, Grid, TextField, styled } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, register } from '../../state/auth/Action';
import { store } from '../../state/store';


const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#500724',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#500724',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#9ca3af',
        },
        '&:hover fieldset': {
            borderColor: '#500724',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#500724',
        },
    },
});


const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector(store => store)

    useEffect(() => {
        if(jwt) {
            dispatch(getUser(jwt));
        }
    }, [jwt, auth.jwt]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const userData = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
        }

        dispatch(register(userData));
        navigate('/')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1 className='mb-5 font-semibold text-3xl text-center' style={{color: '#832729'}}>Sign Up</h1>
                <Grid container spacing={3}>


                    <Grid item xs={12} sm={6}>
                        <CssTextField
                            id='firstName'
                            name='firstName'
                            label='First Name'
                            fullWidth
                            required
                            autoComplete='given-name'
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <CssTextField
                            id='lastName'
                            name='lastName'
                            label='Last Name'
                            fullWidth
                            required
                            autoComplete='given-name'
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <CssTextField
                            id='email'
                            name='email'
                            label='Email'
                            fullWidth
                            required
                            autoComplete='email'
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <CssTextField
                            id='password'
                            name='password'
                            label='Password'
                            fullWidth
                            required
                            autoComplete='password'
                        />
                    </Grid>

                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ mt: '2rem', ml: '1.5rem', bgcolor: '#832729', "&:hover": { bgcolor: "#500724" }, }}
                        className="flex w-full uppercase items-center justify-center rounded-md border-none px-8 py-3 text-base font-medium text-white focus:outline-none "
                    >
                        sign up
                    </Button>

                </Grid>
            </form>

            <div>
                <div className='flex items-center justify-center flex-col'>
                    <div className='pt-3 flex items-center'>
                    <p>Already have an account? </p>
                    <p
                        onClick={() => navigate('/login')} 
                        style={{ ml: '1.25rem', color: '#832729', fontSize: "0.9rem", fontWeight: 'bold', "&:hover": { color: "#500724" }, }}
                        className='ml-3 underline uppercase cursor-pointer'
                    >
                        login
                    </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm
