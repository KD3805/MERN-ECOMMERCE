import React, { useContext, useState } from 'react'
import { Box, Button, Divider, Grid, TextField, styled as tfStyle, Modal, Typography, Rating } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { styled as ratingStyle } from '@mui/material/styles';
import { addReviewToProduct } from '../../../state/review/Action';
import { addRatingToProduct } from '../../../state/rating/Action';
import { RRContext } from '../../../context/rrBox/rrContext';


const CssTextField = tfStyle(TextField)({
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

const StyledRating = ratingStyle(Rating)({
    "& .MuiRating-iconFilled": {
        color: "#831843",
    },
    "& .MuiRating-iconHover": {
        color: "#500724",
    },
});


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

export default function RatingReviewForm({ open, handleClose }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const param = useParams();
    const [ratingValue, setRatingValue] = useState(null);
    const modal = useContext(RRContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const rrData = {
            review: data.get('review'),
            rating: ratingValue,
            productId: param.productId,
            navigate,
            modal,
        }

        // Redirect to dashboard if the login is successful
        dispatch(addReviewToProduct(rrData))
            .catch((err) => alert("Error in posting review, err:", err));

        dispatch(addRatingToProduct(rrData))
            .catch((err) => alert("Error in posting rating, err:", err));
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <h1 className='mb-5 font-semibold text-3xl text-center' style={{ color: '#832729' }}>Ratings & Review</h1>
                            <Grid container spacing={3}>

                                <Grid item xs={12}>
                                    <div className='flex flex-col justify-center items-center space-y-1'>
                                        <Typography component="legend" align='center' className='text-pink-950'>Rating score</Typography>
                                        <StyledRating
                                            name="rating"
                                            value={ratingValue}
                                            onChange={(event, newValue) => {
                                                setRatingValue(newValue);
                                            }}
                                            precision={0.5}
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <div className='flex flex-col justify-center items-center space-y-4'>
                                        <Typography component="legend" align='center' className='text-pink-950'>Rating score</Typography>
                                        <CssTextField
                                            id='review'
                                            name='review'
                                            label='Review'
                                            fullWidth
                                            required
                                            multiline
                                            rows={3}
                                            autoComplete='review'
                                        />
                                    </div>
                                </Grid>

                                <div className='flex justify-center items-center w-full mt-10'>
                                    <Button
                                        onClick={() => { handleClose() }}
                                        variant="outlined"
                                        type='button'
                                        sx={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#832729', borderColor: '#832729', "&:hover": { boxShadow: "#832729 0px 5px 30px", borderColor: '#832729' }, }}
                                        className="flex items-center justify-center rounded-md border-none p-3 focus:outline-none"
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        variant="contained"
                                        type="submit"
                                        sx={{ fontSize: '0.75rem', fontWeight: 'bold', ml: '1.5rem', bgcolor: '#832729', "&:hover": { bgcolor: "#500724" }, }}
                                        className="flex items-center justify-center rounded-md border-none p-3 text-white focus:outline-none "
                                    >
                                        Post
                                    </Button>
                                </div>

                            </Grid>
                        </form>

                    </div>
                </Box>
            </Modal>
        </div>
    );
}

