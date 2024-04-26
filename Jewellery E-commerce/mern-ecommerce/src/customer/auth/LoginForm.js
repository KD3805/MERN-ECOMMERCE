import React, { useContext, useState } from 'react'
import { Button, Grid, TextField, styled } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../state/auth/Action';
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


const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [submitBtnDisable, setSubmitBtnDisable] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const modal = useContext(ModalContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("data in login ---", data)

        if (emailForV(data.email) && passForV(data.password)) {
            setErrMsg("");
            setSubmitBtnDisable(true);
            const userData = {
                email: data.email,
                password: data.password,
            };

            dispatch(login(userData))
                .then(() => {
                    setSubmitBtnDisable(false);
                    navigate("/")
                    modal.closeModal();
                    window.location.reload() // --------- warning ---------
                })
                .catch((err) => {
                    setSubmitBtnDisable(false);
                    navigate("/")
                    modal.closeModal();
                    
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Please ensure your email and password are entered correctly.",
                        showConfirmButton: false,
                        timer: 3000,
                    });
                    console.log('Error in login ::: ', err.message);
                })
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
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
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
                <h1 className='mb-5 font-semibold text-3xl text-center' style={{ color: '#832729' }}>Login</h1>
                <Grid container spacing={3}>

                    <Grid item xs={12}>
                        <CssTextField
                            id='email'
                            name='email'
                            label='Email'
                            fullWidth
                            onChange={(e) => {
                                setData({ ...data, email: e.target.value });
                              }}
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
                            onChange={(e) => {
                                setData({ ...data, password: e.target.value });
                              }}
                            required
                            autoComplete='password'
                        />
                    </Grid>

                    <Grid item xs={12} className='err-msg w-full my-2 text-left font-semibold text-sm text-red-500 transition-all duration-500 ease-in-out'>
                        {errMsg}
                    </Grid>

                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ mt: "0.5rem", ml: '1.5rem', bgcolor: '#832729', "&:hover": { bgcolor: "#500724" }, }}
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
