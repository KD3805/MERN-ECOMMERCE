import React, { useContext, useEffect, useState } from 'react'
import { Button, Grid, TextField, styled } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, register } from '../../state/auth/Action';
import { store } from '../../state/store';
import { ModalContext } from '../../context/modal/modalContext';
import Swal from "sweetalert2";


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
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [submitBtnDisable, setSubmitBtnDisable] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector(store => store)
    const modal = useContext(ModalContext)


    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt));
        }
    }, [jwt, auth.jwt]);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            nameForV(data.firstName) &&
            nameForV(data.lastName) &&
            emailForV(data.email) &&
            passForV(data.password)
        ) {
            setErrMsg("");
            setSubmitBtnDisable(true);

            const userData = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
            }

            dispatch(register(userData))
                .then(() => {
                    setSubmitBtnDisable(false);
                    navigate("/")
                    modal.closeModal();

                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Account created successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
                .catch((err) => {
                    setSubmitBtnDisable(false);
                    navigate("/")
                    modal.closeModal();

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'An account with this user already exists. Please log in instead.',
                        showConfirmButton: false,
                        timer: 3000
                    });
                    console.log("Error in register user ::: ", err.message);
                });
        }

    }

    const nameForV = (stringName) => {
        if (stringName.length >= 30) {
            setErrMsg("Please enter your name properly");
            return false;
        } else {
            return true;
        }
    };

    const emailForV = (stringEmail) => {
        const validate = new RegExp("^[\\w-_.]*[\\w-_.]@[\\w].+[\\w]+[\\w]$");
        if (!validate.test(stringEmail)) {
            setErrMsg("Please enter your email properly");
            return false;
        } else {
            return true;
        }
    };

    const passForV = (stringPass) => {
        const validate = new RegExp(
            "^(?=.*[0-9])(?=.*[!@#$%^&*_=+-])(?=.*[A-Z])(?=.*[a-z]).{8,12}$"
        );
        if (!validate.test(stringPass)) {
            setErrMsg(
                "Password should contain special character, digits and alphabets, length must be 8 to 12 only."
            );
            return false;
        } else {
            return true;
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1 className='mb-5 font-semibold text-3xl text-center' style={{ color: '#832729' }}>Sign Up</h1>
                <Grid container spacing={3}>


                    <Grid item xs={12} sm={6}>
                        <CssTextField
                            id='firstName'
                            name='firstName'
                            label='First Name'
                            fullWidth
                            onChange={(e) => {
                                setData({ ...data, firstName: e.target.value });
                            }}
                            autoComplete='given-name'
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <CssTextField
                            id='lastName'
                            name='lastName'
                            label='Last Name'
                            fullWidth
                            onChange={(e) => {
                                setData({ ...data, lastName: e.target.value });
                            }}
                            autoComplete='given-name'
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <CssTextField
                            id='email'
                            name='email'
                            label='Email'
                            fullWidth
                            onChange={(e) => {
                                setData({ ...data, email: e.target.value });
                            }}
                            autoComplete='email'
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <CssTextField
                            id='password'
                            name='password'
                            label='Password'
                            fullWidth
                            onChange={(e) => {
                                setData({ ...data, password: e.target.value });
                            }}
                            autoComplete='password'
                            required
                        />
                    </Grid>

                    <Grid item xs={12} className='err-msg w-full my-2 text-left font-semibold text-sm text-red-500 transition-all duration-500 ease-in-out'>
                        {errMsg}
                    </Grid>

                    <Button
                        variant="contained"
                        type="submit"
                        disabled={submitBtnDisable}
                        sx={{ mt: "0.5rem", ml: '1.5rem', bgcolor: '#832729', "&:hover": { bgcolor: "#500724" }, }}
                        className="flex w-full uppercase items-center justify-center rounded-md border-none px-8 py-3 text-base font-medium text-white focus:outline-none disabled:bg-gray-500"
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
