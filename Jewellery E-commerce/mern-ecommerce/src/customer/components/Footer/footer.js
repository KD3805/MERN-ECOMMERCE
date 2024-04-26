import { Grid } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='w-screen'>
            <Grid
                container
                className='text-center mt-12 sticky bottom-0 left-0 right-0 overflow-hidden w-full'
                sx={{ bgcolor: "#EFE3E3", color: '#852B2D', pt: 8, pb: 4, pr: 5 }}
            >
                <Grid item xs={6} sm={6} md={3}>

                    <div className='mb-14'>
                        <h3 className='text-2xl pb-3 font-semibold'>Information</h3>
                        <div>
                            <ul
                                role="list"
                                aria-labelledby={`Information-heading`}
                                className="mt-6 text-black text-lg space-y-6 sm:mt-4 sm:space-y-4 flex flex-col justify-center items-center "
                            >
                                <li className='flex'>
                                    <Link
                                        to={"/user-details/?layout=0"}
                                        target="_blank" rel="noopener noreferrer"
                                        className='hover:text-pink-950 hover:underline hover:shadow-sm transition duration-300 cursor-pointer'
                                    >
                                        My Account
                                    </Link>
                                </li>
                                <li className='flex'>
                                    <Link
                                        to={"/"}
                                        target="_blank" rel="noopener noreferrer"
                                        className='hover:text-pink-950 hover:underline hover:shadow-sm transition duration-300 cursor-pointer'
                                    >
                                        About us
                                    </Link>
                                </li>
                                <li className='flex'>
                                    <Link
                                        to={"/"}
                                        target="_blank" rel="noopener noreferrer"
                                        className='hover:text-pink-950 hover:underline hover:shadow-sm transition duration-300 cursor-pointer'
                                    >
                                        Blog
                                    </Link>
                                </li>
                                <li className='flex'>
                                    <Link
                                        to={"/user-details/?layout=3"}
                                        target="_blank" rel="noopener noreferrer"
                                        className='hover:text-pink-950 hover:underline hover:shadow-sm transition duration-300 cursor-pointer'
                                    >
                                        Contact
                                    </Link>
                                </li>
                                <li className='flex'>
                                    <Link
                                        to={"/"}
                                        target="_blank" rel="noopener noreferrer"
                                        className='hover:text-pink-950 hover:underline hover:shadow-sm transition duration-300 cursor-pointer'
                                    >
                                        Portfolio
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                </Grid>

                <Grid item xs={6} sm={6} md={3}>

                    <div className='mb-14'>
                        <h3 className='text-2xl pb-3 font-semibold'>Services</h3>
                        <div>
                            <ul
                                role="list"
                                aria-labelledby={`Services-heading`}
                                className="mt-6 text-black text-lg space-y-6 sm:mt-4 sm:space-y-4 flex flex-col justify-center items-center "
                            >
                                <li className='flex'>
                                    <a
                                        href={"/#best-of-gayatri"}
                                        className='hover:text-pink-950 hover:underline hover:shadow-sm transition duration-300 cursor-pointer'
                                    >
                                        Best of Gayatri
                                    </a>
                                </li>
                                <li className='flex'>
                                    <a
                                        href={"#categories"}
                                        className='hover:text-pink-950 hover:underline hover:shadow-sm transition duration-300 cursor-pointer'
                                    >
                                        Categories
                                    </a>
                                </li>
                                <li className='flex'>
                                    <a
                                        href={"#offers-contest"}
                                        className='hover:text-pink-950 hover:underline hover:shadow-sm transition duration-300 cursor-pointer'
                                    >
                                        Offers & Contest
                                    </a>
                                </li>
                                <li className='flex'>
                                    <a
                                        href={"#new-arrivals"}
                                        className='hover:text-pink-950 hover:underline hover:shadow-sm transition duration-300 cursor-pointer'
                                    >
                                        New Arrivals
                                    </a>
                                </li>
                                <li className='flex'>
                                    <a
                                        href={"#reccomanded"}
                                        className='hover:text-pink-950 hover:underline hover:shadow-sm transition duration-300 cursor-pointer'
                                    >
                                        Reccomanded
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </Grid>

                <Grid item xs={12} sm={6} md={3}>

                    <div className='mb-14'>
                        <h3 className='text-2xl pb-3 font-semibold'>Quick Links</h3>
                        <div>
                            <ul
                                role="list"
                                aria-labelledby={`QuickLinks-heading`}
                                className="mt-6 text-black text-lg space-y-6 sm:mt-4 sm:space-y-4 flex flex-col justify-center items-center "
                            >
                                <li className='flex'>
                                    <Link
                                        to={"/user-details/?layout=1"}
                                        target="_blank" rel="noopener noreferrer"
                                        className='hover:text-pink-950 hover:underline hover:shadow-sm transition duration-300 cursor-pointer'
                                    >
                                        Favourites
                                    </Link>
                                </li>
                                <li className='flex'>
                                    <Link
                                        to={"/all-jewellery/category/jewellery"}
                                        target="_blank" rel="noopener noreferrer"
                                        className='hover:text-pink-950 hover:underline hover:shadow-sm transition duration-300 cursor-pointer'
                                    >
                                        Collection
                                    </Link>
                                </li>
                                <li className='flex'>
                                    <Link
                                        to={"/cart"}
                                        target="_blank" rel="noopener noreferrer"
                                        className='hover:text-pink-950 hover:underline hover:shadow-sm transition duration-300 cursor-pointer'
                                    >
                                        Cart
                                    </Link>
                                </li>
                                <li className='flex'>
                                    <Link
                                        to={"/user-details/?layout=2"}
                                        target="_blank" rel="noopener noreferrer"
                                        className='hover:text-pink-950 hover:underline hover:shadow-sm transition duration-300 cursor-pointer'
                                    >
                                        Orders
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                </Grid>

                <Grid item xs={12} sm={6} md={3}>

                    <div className='mb-14'>
                        {/* <h3 className='text-2xl pb-3 font-semibold'>About Gayatri</h3> */}
                        <div>
                            <ul
                                role="list"
                                aria-labelledby={`QuickLinks-heading`}
                                className="mt-6 px-3 text-black text-lg space-y-8 sm:mt-4 sm:space-y-4 flex flex-col justify-center items-start "
                            >
                                <li className='flex justify-between gap-4 items-start'>
                                    <img
                                        src="https://res.cloudinary.com/deq0hxr3t/image/upload/v1711911170/map_gzuopc.png"
                                        alt="address"
                                        style={{ width: 25, height: 25 }}
                                    />
                                    <Link
                                        to={"https://maps.app.goo.gl/5gPT97dw1itGHXyDA"}
                                        target="_blank" rel="noopener noreferrer"
                                        className='hover:text-pink-950 hover:underline hover:shadow-sm text-left transition duration-300 cursor-pointer'
                                    >
                                        VNC Complex, Housing board, <br /> Morbi-2, Gujrat
                                    </Link>
                                </li>
                                <li className='flex justify-between gap-4 items-start'>
                                    <img
                                        src="https://res.cloudinary.com/deq0hxr3t/image/upload/v1711911170/call_ndbyg5.png"
                                        alt="phone"
                                        style={{ width: 25, height: 25 }}
                                    />
                                    <p
                                        className='text-pink-950 hover:underline hover:shadow-sm transition duration-300 cursor-pointer'
                                    >
                                        <a href="tel:(+91)888888885555" target='_blank'>(+91) 98700 81835</a>
                                    </p>
                                </li>
                                <li className='flex justify-between gap-4 items-center'>
                                    <img
                                        src="https://res.cloudinary.com/deq0hxr3t/image/upload/v1711911169/gmail_dryfgp.png"
                                        alt="gmail"
                                        style={{ width: 25, height: 25 }}
                                    />
                                    <p
                                        className='hover:text-pink-950 hover:underline hover:shadow-sm text-left transition duration-300 cursor-pointer'
                                    >
                                        gayatrijewels30@gmail.com
                                    </p>
                                </li>
                            </ul>

                            <div className='w-3/4 mt-5'>
                                <ul className='flex justify-around items-center'>
                                    <li className='text-2xl'>
                                        <Link
                                            to={"https://www.linkedin.com/in/kishan-dabhi-837a64257/"} 
                                            target="_blank" rel="noopener noreferrer"
                                        >
                                            <i class="fa-brands fa-linkedin"></i>
                                        </Link>
                                    </li>
                                    <li className='text-2xl'>
                                        <Link 
                                            to={"https://twitter.com/Kishan3805"} 
                                            target="_blank" rel="noopener noreferrer"
                                        >
                                            <i class="fa-brands fa-x-twitter"></i>
                                        </Link>
                                    </li>
                                    <li className='text-2xl'>
                                        <Link 
                                            to={"https://github.com/KD3805/MERN-ECOMMERCE"} 
                                            target="_blank" rel="noopener noreferrer"
                                        >
                                            <i class="fa-brands fa-github"></i>
                                        </Link>
                                    </li>
                                    <li className='text-2xl'>
                                        <Link 
                                            to={"https://www.instagram.com/gayatri_fashion_jewellery/"}
                                            target="_blank" rel="noopener noreferrer"
                                        >
                                            <i class="fa-brands fa-instagram"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </Grid>

                <div className='flex justify-center items-center w-full'>
                    <p className='text-center text-lg font-semibold'>Copyright &copy; 2024 &nbsp; <a href="#" className='text-pink-950 hover:underline'>Gayatri</a> &nbsp; All rights Reserved.</p>
                </div>
            </Grid>

        </div>
    )
}

export default Footer
