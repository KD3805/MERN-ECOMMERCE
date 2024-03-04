import React from 'react'
import { Box, Button, Divider, Grid, TextField, styled } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../state/auth/Action';


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


const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e)
        const data = new FormData(e.currentTarget);

        const userData = {
            email: data.get('email'),
            password: data.get('password'),
        }

        // Redirect to dashboard if the login is successful
        dispatch(login(userData))
        .catch((err) => alert("Wrong username or password, err:", err));

        navigate('/');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1 className='mb-5 font-semibold text-3xl text-center' style={{color: '#832729'}}>Login</h1>
                <Grid container spacing={3}>

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
                        login
                    </Button>

                </Grid>
            </form>

            <div>
                <div className='flex items-center justify-center flex-col'>
                    <div className='pt-3 flex items-center'>
                    <p>Don't have an account? </p>
                    <p
                        onClick={() => navigate('/register')} 
                        style={{ ml: '1.25rem', color: '#832729', fontSize: "0.9rem", fontWeight: 'bold', "&:hover": { color: "#500724" }, }}
                        className='ml-3 underline uppercase cursor-pointer'
                    >
                        signup
                    </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
