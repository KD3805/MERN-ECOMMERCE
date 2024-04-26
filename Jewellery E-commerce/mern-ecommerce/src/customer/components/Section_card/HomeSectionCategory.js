import React from 'react'
import { Link } from 'react-router-dom'


const HomeSectionCategory = () => {

  const categories = [
    {
      name: "Earrings",
      nav: "/all-jewellery/category/earring",
      img: "https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439069/1_hvyglx.jpg",
    },
    {
      name: "Finger Rings",
      nav: "/all-jewellery/category/ring",
      img: "https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439067/3_xwvjdr.jpg",
    },
    {
      name: "Pendants",
      nav: "/all-jewellery/category/pendant",
      img: "https://res.cloudinary.com/deq0hxr3t/image/upload/v1710439065/2_ao746r.jpg",
    },
    {
      name: "Mangalsutras",
      nav: "/all-jewellery/category/mangal-sutra",
      img: "https://res.cloudinary.com/deq0hxr3t/image/upload/v1711731944/fod-mangalsutra_zb7tpy.webp",
    },
    {
      name: "Chains",
      nav: "/all-jewellery/category/chain",
      img: "https://res.cloudinary.com/deq0hxr3t/image/upload/v1711731944/fod-necklace_wrjwfl.webp",
    },
    {
      name: "Bracelets",
      nav: "/all-jewellery/category/bracelet",
      img: "https://res.cloudinary.com/deq0hxr3t/image/upload/v1711731943/fod-bracelet_um6zoo.webp",
    },
    {
      name: "Bangles",
      nav: "/all-jewellery/category/bangle",
      img: "https://res.cloudinary.com/deq0hxr3t/image/upload/v1711731879/fod-bangle_bsxfzl.webp",
    },
    {
      name: "Neckwears",
      nav: "/all-jewellery/category/necklace",
      img: "https://res.cloudinary.com/deq0hxr3t/image/upload/v1707742460/45_eqespc.jpg",
    },
  ]


  return (
    <div className='my-5' id='categories'>
      <div>
        <h2
          style={{ letterSpacing: "1px" }}
          className="text-4xl font-semibold text-pink-950 text-center px-10"
        >
          Shop By Category
        </h2>
        <p className="text-lg font-normal text-center pt-2">Browse through your favorite categories. We've got them all!</p>
        <img
          src="https://res.cloudinary.com/deq0hxr3t/image/upload/v1711727694/Line-Design_fhgakp.svg"
          className="w-full h-20 object-cover"
          alt=""
        />
      </div>

      <div className='flex gap-5 items-center justify-center flex-wrap mt-3'>
        {
          categories.map((item) => (
            <Link to={`${item.nav}`} target="_blank" rel="noopener noreferrer">
              <div key={`${item.nav}`} className='flex flex-col flex-wrap h-fit w-[12vw] border rounded-sm hover:shadow-lg transition-all duration-300 cursor-pointer'>
                <div className=' border rounded-sm'>
                  <div className='w-full h-[20vh]'>
                    <img src={item.img} alt="jewelery" className='h-full w-full object-cover ' />
                  </div>
                </div>

                <div className='flex justify-center items-center flex-col p-3 w-full gap-2 transition-all duration-300'>
                  <h1 className='text-lg font-semibold' style={{ color: '#852B2D' }}>{item.name}</h1>
                  <h3 className='flex justify-center gap-2 items-center w-full hover:text-red-500'>
                    <span>Explore</span>
                    <span className='text-lg mt-1'>&gt;</span>
                  </h3>
                </div>

              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default HomeSectionCategory
