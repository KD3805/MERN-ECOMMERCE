import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Avatar from '@mui/material/Avatar';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { Badge, Button, Grid } from '@mui/material';
import AuthModel from '../../auth/AuthModel';


const navigation = {
  categories: [
    {
      id: 'all-jewellery',
      name: 'All Jewellery',
      sections: [
        {
          id: 'category',
          name: 'Category',
          items: [
            { name: 'Bangles', id: 'bangle' },
            { name: 'Bracelets', id: 'bracelet' },
            { name: 'Earrings', id: 'earring' },
            { name: 'Pendants', id: 'pendant' },
            { name: 'Mangal sutra', id: 'mangal-sutra' },
            { name: 'Chains', id: 'chain' },
            { name: 'Necklaces', id: 'necklace' },
            { name: 'Rings', id: 'ring' },
          ],
        },
        {
          id: 'types',
          name: 'Jewellery Types',
          items: [
            { name: 'Gold', id: 'gold' },
            { name: 'Diamond', id: 'diamond' },
            { name: 'Silver', id: 'silver' },
            { name: 'Platinum', id: 'platinum' },
            { name: 'Gemstones', id: 'gemstone' },
          ],
        },
        {
          id: 'gender',
          name: 'Gender',
          items: [
            { name: 'Women', id: 'women' },
            { name: 'Men', id: 'men' },
          ],
        },
        {
          id: 'occasion',
          name: 'Occasion',
          items: [
            { name: 'Bridal wear', id: 'bridal-wear' },
            { name: 'Casual wear', id: 'casual-wear' },
            { name: 'Engagement', id: 'engagement' },
            { name: 'Modern wear', id: 'modern-wear' },
            { name: 'Office wear', id: 'office-wear' },
            { name: 'Traditional & ethenic wear', id: 'traditional-ethenic' },
          ],
        },
      ],
    },
    {
      id: 'gold',
      name: 'Gold',
      sections: [
        {
          id: 'category',
          name: 'Category',
          items: [
            { name: 'Bangles', id: 'bangle' },
            { name: 'Bracelets', id: 'bracelet' },
            { name: 'Earrings', id: 'earring' },
            { name: 'Necklaces', id: 'necklace' },
            { name: 'Rings', id: 'ring' },
          ],
        },
        {
          id: 'earrings',
          name: 'Earrings',
          items: [
            { name: 'Drop Earrings', id: 'drop' },
            { name: 'Hoop Earrings', id: 'hoop' },
            { name: 'Jhumkas', id: 'jhumka' },
            { name: 'Stud Earrings', id: 'stud' },
          ],
        },
        {
          id: 'rings',
          name: 'Rings',
          items: [
            { name: 'Eangagement Rings', id: 'eangagement-ring' },
            { name: 'Pearl Rings', id: 'pearl-ring' },
            { name: 'Bridal Rings', id: 'bridal-ring' },
            { name: 'Couple Rings', id: 'couple-ring' },
          ],
        },
        {
          id: 'necklaces',
          name: 'Necklaces',
          items: [
            { name: 'Pendants', id: 'pendant' },
            { name: 'Mangal Sutra', id: 'mangal-sutra' },
            { name: 'Chains', id: 'chain' },
            { name: 'Locket', id: 'locket' },
          ],
        },
      ],
    },
    {
      id: 'diamond',
      name: 'Diamond',
      sections: [
        {
          id: 'category',
          name: 'Category',
          items: [
            { name: 'Bangles', id: 'bangle' },
            { name: 'Bracelets', id: 'bracelet' },
            { name: 'Earrings', id: 'earring' },
            { name: 'Necklaces', id: 'necklace' },
            { name: 'Rings', id: 'ring' },
          ],
        },
        {
          id: 'earrings',
          name: 'Earrings',
          items: [
            { name: 'Drop Earrings', id: 'drop' },
            { name: 'Hoop Earrings', id: 'hoop' },
            { name: 'Jhumkas', id: 'jhumka' },
            { name: 'Stud Earrings', id: 'stud' },
          ],
        },
        {
          id: 'rings',
          name: 'Rings',
          items: [
            { name: 'Eangagement Rings', id: 'eangagement-ring' },
            { name: 'Pearl Rings', id: 'pearl-ring' },
            { name: 'Bridal Rings', id: 'bridal-ring' },
            { name: 'Couple Rings', id: 'couple-ring' },
          ],
        },
        {
          id: 'necklaces',
          name: 'Necklaces',
          items: [
            { name: 'Pendants', id: 'pendant' },
            { name: 'Mangal Sutra', id: 'mangal-sutra' },
            { name: 'Chains', id: 'chain' },
            { name: 'Locket', id: 'locket' },
          ],
        },
      ],
    },
    {
      id: 'best-sellers',
      name: 'Best Sellers',
      sections: [
        {
          id: 'category',
          name: 'Category',
          items: [
            { name: 'Bangles', id: 'bangle' },
            { name: 'Bracelets', id: 'bracelet' },
            { name: 'Earrings', id: 'earring' },
            { name: 'Necklaces', id: 'necklace' },
            { name: 'Rings', id: 'ring' },
          ],
        },
        {
          id: 'earrings',
          name: 'Earrings',
          items: [
            { name: 'Drop Earrings', id: 'drop' },
            { name: 'Hoop Earrings', id: 'hoop' },
            { name: 'Jhumkas', id: 'jhumka' },
            { name: 'Stud Earrings', id: 'stud' },
          ],
        },
        {
          id: 'rings',
          name: 'Rings',
          items: [
            { name: 'Eangagement Rings', id: 'eangagement-ring' },
            { name: 'Pearl Rings', id: 'pearl-ring' },
            { name: 'Bridal Rings', id: 'bridal-ring' },
            { name: 'Couple Rings', id: 'couple-ring' },
          ],
        },
        {
          id: 'necklaces',
          name: 'Necklaces',
          items: [
            { name: 'Pendants', id: 'pendant' },
            { name: 'Mangal Sutra', id: 'mangal-sutra' },
            { name: 'Chains', id: 'chain' },
            { name: 'Locket', id: 'locket' },
          ],
        },
      ],
    },
    {
      id: 'wedding',
      name: 'Wedding',
      // featured: [
      //   {
      //     name: 'New Arrivals',
      //     href: '#',
      //     imageSrc: 'assets/images/nav-product/product.jpg',
      //     imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
      //   },
      //   {
      //     name: 'Artwork Tees',
      //     href: '#',
      //     imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
      //     imageAlt:
      //       'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
      //   },
      // ],
      sections: [
        {
          id: 'category',
          name: 'Category',
          items: [
            { name: 'Bangles', id: 'bangle' },
            { name: 'Bracelets', id: 'bracelet' },
            { name: 'Earrings', id: 'earring' },
            { name: 'Necklaces', id: 'necklace' },
            { name: 'Rings', id: 'ring' },
          ],
        },
        {
          id: 'earrings',
          name: 'Earrings',
          items: [
            { name: 'Drop Earrings', id: 'drop' },
            { name: 'Hoop Earrings', id: 'hoop' },
            { name: 'Jhumkas', id: 'jhumka' },
            { name: 'Stud Earrings', id: 'stud' },
          ],
        },
        {
          id: 'rings',
          name: 'Rings',
          items: [
            { name: 'Eangagement Rings', id: 'eangagement-ring' },
            { name: 'Pearl Rings', id: 'pearl-ring' },
            { name: 'Bridal Rings', id: 'bridal-ring' },
            { name: 'Couple Rings', id: 'couple-ring' },
          ],
        },
        {
          id: 'necklaces',
          name: 'Necklaces',
          items: [
            { name: 'Pendants', id: 'pendant' },
            { name: 'Mangal Sutra', id: 'mangal-sutra' },
            { name: 'Chains', id: 'chain' },
            { name: 'Locket', id: 'locket' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', id: 'company' },
    { name: 'Stores', id: 'store' },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [openAuthModel, setOpenAuthModel] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  

  const handleCategoryClick = (category, section, item, close) => {
    navigate(`/${category.id}/${section.id}/${item.id}`);
    close();
  }

  const handleOpen = () => {
    setOpenAuthModel(true);
  }

  const handleClose = () => {
    setOpenAuthModel(false);
  }

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'border-pink-950 text-pink-800' : 'border-transparent text-pink-800',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                        {/* <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div key={item.name} className="group relative text-base sm:text-sm">
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                />
                              </div>
                              <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div> */}
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                      Sign in
                    </a>
                  </div>
                  <div className="flow-root">
                    <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                      Create account
                    </a>
                  </div>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative">
        <div className="bg-pink-100 text-pink-950 sm:px-6">

          <div className="my-header lg:ml-0 ">
            {/* Logo */}
            <Grid container xs={9} className='logo-search-div'>
              <a href='#' className='cursor-pointer'>
                <span className="sr-only">Your Company</span>
                <img
                  className="object-cover w-40 mt-4"
                  // width={140}
                  // height={140}
                  src="https://res.cloudinary.com/deq0hxr3t/image/upload/v1707743755/gayatri_logo_yylmuj.png"
                  alt=""
                />
              </a>

              {/* Search bar */}
              <div className='relative header-search-div'>
                <input type="text" placeholder='Search for Gold Jewellery, Diamond…' className='bg-white header-searchbar text-pink-950' />
                <span className='search-icon'>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
              </div>

            </Grid>

            {/* customer's action buttons */}
            <Grid container xs={3} justifyContent='space-around' className="flex items-center">
              {/* <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                  Sign in
                </a>
                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                  Create account
                </a>
              </div> */}

              {/* MUI Avatar */}
              {/* <Avatar
                onClick={()=>navigate('/account/orders')}
                sx={{ bgcolor: "#500724", width: 40, height: 40, fontSize: 16, marginLeft: 3, cursor: "pointer" }}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
              >
                KD
              </Avatar> */}

              <Grid onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} item xs={4} direction='column' className="flex items-center cursor-pointer transition duration-1000 border-pink-950 relative  hover:border-b-2 pb-2">
                <PermIdentityOutlinedIcon
                  sx={{ width: "30px", height: "30px" }}
                  className='opacity-60'
                />
                <span className="font-normal uppercase lg:text-sm">
                  Account
                </span>

                {
                  isHovering && 
                  <div className='p-3 absolute top-15 z-50 w-[16rem] text-center bg-white rounded-md shadow-lg space-y-3 text-pink-950 transition-all duration-1000'>
                    <h1 className='text-2xl font-normal uppercase'>My Account</h1>
                    <p className='text-xs font-normal'>LOGIN TO ACCESS YOUR ACCOUNT</p>

                    <div className='py-2 flex items-center justify-around'>
                      <Button
                        onClick={handleOpen}
                        variant="outlined"
                        type="submit"
                        sx={{ fontSize: '0.75rem', color: '#832729', borderColor: '#832729', "&:hover": { bgcolor: "#832729", color: '#fff', borderColor: '#832729' }, }}
                        className="flex items-center justify-center rounded-md border-none px-2 py-1"
                      >
                        log in
                      </Button>
                      <Button
                        onClick={handleOpen}
                        variant="contained"
                        type="submit"
                        sx={{ fontSize: '0.75rem', bgcolor: '#832729', "&:hover": { bgcolor: "#500724" }, }}
                        className="flex uppercase items-center justify-center rounded-md border-none px-2 py-1 text-white focus:outline-none"
                      >
                        sign up
                      </Button>
                    </div>

                  </div>
                }
              </Grid>



              {/* Favourite */}
              {/* <div className="flex lg:ml-6">
                <a href="#" className="text-gray-500 hover:text-gray-600">
                  <span className="sr-only">Favourite</span>
                  <FavoriteBorderIcon className="h-6 w-6 hover:h-8" aria-hidden="true" />
                </a>
              </div> */}

              <Grid item xs={4} direction='column' className="flex items-center cursor-pointer transition duration-1000 ease-in-out border-pink-950  hover:border-b-2 pb-2">
                <Badge badgeContent={0} color='secondary'>
                  <FavoriteBorderIcon
                    sx={{ width: "25px", height: "25px" }}
                    className='opacity-60'
                  />
                </Badge>
                <span className="font-normal uppercase lg:text-sm">
                  Wishlist
                </span>
              </Grid>

              {/* Cart */}
              {/* <div className="ml-4 flow-root lg:ml-6">
                <a href="#" className="group -m-2 flex items-center">
                  <AddShoppingCartIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                  <span className="sr-only">items in cart, view bag</span>
                </a>
              </div> */}

              <Grid onClick={()=>navigate('/account/orders')} item xs={4} direction='column' className="flex items-center cursor-pointer transition-all duration-1000 ease-in-out border-pink-950  hover:border-b-2 pb-2">
                <Badge badgeContent={0} color='secondary'>
                  <AddShoppingCartIcon
                    sx={{ width: "25px", height: "25px" }}
                    className='opacity-60'
                  />
                </Badge>
                <span className="font-normal uppercase lg:text-sm">
                  Cart
                </span>
              </Grid>
            </Grid>

          </div>

        </div>


        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Flyout menus */}
              <Popover.Group className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-pink-700 text-pink-950 border-b-2'
                                  : ' text-gray-700  hover:text-pink-950 unline-animation',
                                'z-10 -mb-px flex items-center  px-2 pt-px text-base font-medium transition-colors duration-200 ease-out'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-700">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-1 gap-x-8 gap-y-10 py-10">

                                    {/* <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div key={item.name} className="group relative text-sm">
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                                          </div>
                                          <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                            <span className="absolute inset-0 z-10" aria-hidden="true" />
                                            {item.name}
                                          </a>
                                          <p aria-hidden="true" className="mt-1">
                                            Shop now
                                          </p>
                                        </div>
                                      ))}

                                    </div> */}

                                    <div className="row-start-1 grid grid-cols-4 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p id={`${section.name}-heading`} className="font-semibold text-lg text-pink-950">
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li key={item.name} className="flex">
                                                <p onClick={() => {
                                                  handleCategoryClick(category, section, item, close)
                                                }} className="hover:text-gray-900 hover:underline hover:shadow-sm transition duration-300 cursor-pointer">
                                                  {item.name}
                                                </p>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {/* {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))} */}
                </div>
              </Popover.Group>

                
              {/*  */}
            </div>
          </div>
        </nav>
      </header>

      <AuthModel handleClose={handleClose} open={openAuthModel}/>
    </div>
  )
}
