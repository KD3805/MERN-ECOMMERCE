import { Button, Card, CardContent, Typography, styled } from '@mui/material'
import React from 'react'

const TriangleDiv = styled("div")({
    position: "absolute",
    top: "60%",
    right: "-25%",
    transform: "rotate(45deg)",
    width: 200,
    height: 200,
    // zIndex: -1,
})

const TrophyImg = styled("img")({
    right: 36,
    bottom: 20,
    height: 110,
    width: 110,
    position: "absolute"
})


const Achivement = () => {
    return (
        <div className='shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300'>
            <Card className='' sx={{ position: "relative" }}>
                <CardContent>
                    <Typography variant='h6' sx={{ letterSpacing: ".25px" }}>
                        Gayatri Fashion Jewelry
                    </Typography>

                    <Typography variant='body2'>
                        Congratulations 🥳
                    </Typography>

                    <Typography variant='h5' sx={{ my: 3.1 }} className='text-pink-900'>
                        420.8k
                    </Typography>

                    <Button
                        size='small'
                        variant='contained'
                        sx={{ fontSize: '0.75rem', color: '#fff', bgcolor: '#832729', "&:hover": { bgcolor: "#500724" }, }}
                        className="flex w-4/12 items-center justify-center rounded-md border-none px-3 py-1"
                    >
                        View Sales
                    </Button>

                    <TriangleDiv className='bg-gray-200'></TriangleDiv>

                    <TrophyImg src='https://res.cloudinary.com/deq0hxr3t/image/upload/v1710508174/trophy_wbosfa.png' />
                </CardContent>
            </Card>
        </div>
    )
}

export default Achivement
