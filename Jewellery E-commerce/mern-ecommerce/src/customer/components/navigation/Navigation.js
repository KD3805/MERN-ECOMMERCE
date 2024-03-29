import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Avatar from "@mui/material/Avatar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { useLocation, useNavigate } from "react-router-dom";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { Badge, Button, Grid } from "@mui/material";
import AuthModel from "../../auth/AuthModel";
import { getUser, logout } from "../../../state/auth/Action";
import { useDispatch, useSelector } from "react-redux";
import { ModalContext } from "../../../context/modal/modalContext";

const navigation = {
  categories: [
    {
      id: "all-jewellery",
      name: "All Jewellery",
      sections: [
        {
          id: "category",
          name: "Category",
          items: [
            { name: "All Jewellery", id: "jewellery" },
            { name: "Bangles", id: "bangle" },
            { name: "Bracelets", id: "bracelet" },
            { name: "Earrings", id: "earring" },
            { name: "Pendants", id: "pendant" },
            { name: "Mangal sutra", id: "mangal-sutra" },
            { name: "Chains", id: "chain" },
            { name: "Necklaces", id: "necklace" },
            { name: "Rings", id: "ring" },
          ],
        },
        {
          id: "type",
          name: "Jewellery Types",
          items: [
            { name: "Gold", id: "gold" },
            { name: "Diamond", id: "diamond" },
            { name: "Silver", id: "silver" },
            { name: "Platinum", id: "platinum" },
            { name: "Gemstones", id: "gemstone" },
          ],
        },
        // {
        //   id: 'gender',
        //   name: 'Gender',
        //   items: [
        //     { name: 'Women', id: 'women' },
        //     { name: 'Men', id: 'men' },
        //   ],
        // },
        {
          id: "occasion",
          name: "Occasion",
          items: [
            { name: "Bridal wear", id: "bridal" },
            { name: "Casual wear", id: "casual" },
            { name: "Engagement", id: "engagement" },
            { name: "Modern wear", id: "modern" },
            { name: "Office wear", id: "office" },
            { name: "Traditional & ethenic wear", id: "traditional-ethenic" },
          ],
        },
      ],
    },
    {
      id: "gold",
      name: "Gold",
      sections: [
        {
          id: "category",
          name: "Category",
          items: [
            { name: "Bangles", id: "bangle" },
            { name: "Bracelets", id: "bracelet" },
            { name: "Earrings", id: "earring" },
            { name: "Necklaces", id: "necklace" },
            { name: "Rings", id: "ring" },
          ],
        },
        {
          id: "earrings",
          name: "Earrings",
          items: [
            { name: "Drop Earrings", id: "drop" },
            { name: "Hoop Earrings", id: "hoop" },
            { name: "Jhumkas", id: "jhumka" },
            { name: "Stud Earrings", id: "stud" },
          ],
        },
        {
          id: "rings",
          name: "Rings",
          items: [
            { name: "Eangagement Rings", id: "eangagement-ring" },
            { name: "Pearl Rings", id: "pearl-ring" },
            { name: "Bridal Rings", id: "bridal-ring" },
            { name: "Couple Rings", id: "couple-ring" },
          ],
        },
        {
          id: "necklaces",
          name: "Necklaces",
          items: [
            { name: "Pendants", id: "pendant" },
            { name: "Mangal Sutra", id: "mangal-sutra" },
            { name: "Chains", id: "chain" },
            { name: "Locket", id: "locket" },
          ],
        },
      ],
    },
    {
      id: "diamond",
      name: "Diamond",
      sections: [
        {
          id: "category",
          name: "Category",
          items: [
            { name: "Bangles", id: "bangle" },
            { name: "Bracelets", id: "bracelet" },
            { name: "Earrings", id: "earring" },
            { name: "Necklaces", id: "necklace" },
            { name: "Rings", id: "ring" },
          ],
        },
        {
          id: "earrings",
          name: "Earrings",
          items: [
            { name: "Drop Earrings", id: "drop" },
            { name: "Hoop Earrings", id: "hoop" },
            { name: "Jhumkas", id: "jhumka" },
            { name: "Stud Earrings", id: "stud" },
          ],
        },
        {
          id: "rings",
          name: "Rings",
          items: [
            { name: "Eangagement Rings", id: "eangagement-ring" },
            { name: "Pearl Rings", id: "pearl-ring" },
            { name: "Bridal Rings", id: "bridal-ring" },
            { name: "Couple Rings", id: "couple-ring" },
          ],
        },
        {
          id: "necklaces",
          name: "Necklaces",
          items: [
            { name: "Pendants", id: "pendant" },
            { name: "Mangal Sutra", id: "mangal-sutra" },
            { name: "Chains", id: "chain" },
            { name: "Locket", id: "locket" },
          ],
        },
      ],
    },
    {
      id: "best-sellers",
      name: "Best Sellers",
      sections: [
        {
          id: "category",
          name: "Category",
          items: [
            { name: "Bangles", id: "bangle" },
            { name: "Bracelets", id: "bracelet" },
            { name: "Earrings", id: "earring" },
            { name: "Necklaces", id: "necklace" },
            { name: "Rings", id: "ring" },
          ],
        },
        {
          id: "earrings",
          name: "Earrings",
          items: [
            { name: "Drop Earrings", id: "drop" },
            { name: "Hoop Earrings", id: "hoop" },
            { name: "Jhumkas", id: "jhumka" },
            { name: "Stud Earrings", id: "stud" },
          ],
        },
        {
          id: "rings",
          name: "Rings",
          items: [
            { name: "Eangagement Rings", id: "eangagement-ring" },
            { name: "Pearl Rings", id: "pearl-ring" },
            { name: "Bridal Rings", id: "bridal-ring" },
            { name: "Couple Rings", id: "couple-ring" },
          ],
        },
        {
          id: "necklaces",
          name: "Necklaces",
          items: [
            { name: "Pendants", id: "pendant" },
            { name: "Mangal Sutra", id: "mangal-sutra" },
            { name: "Chains", id: "chain" },
            { name: "Locket", id: "locket" },
          ],
        },
      ],
    },
    {
      id: "wedding",
      name: "Wedding",
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
          id: "category",
          name: "Category",
          items: [
            { name: "Bangles", id: "bangle" },
            { name: "Bracelets", id: "bracelet" },
            { name: "Earrings", id: "earring" },
            { name: "Necklaces", id: "necklace" },
            { name: "Rings", id: "ring" },
          ],
        },
        {
          id: "earrings",
          name: "Earrings",
          items: [
            { name: "Drop Earrings", id: "drop" },
            { name: "Hoop Earrings", id: "hoop" },
            { name: "Jhumkas", id: "jhumka" },
            { name: "Stud Earrings", id: "stud" },
          ],
        },
        {
          id: "rings",
          name: "Rings",
          items: [
            { name: "Eangagement Rings", id: "eangagement-ring" },
            { name: "Pearl Rings", id: "pearl-ring" },
            { name: "Bridal Rings", id: "bridal-ring" },
            { name: "Couple Rings", id: "couple-ring" },
          ],
        },
        {
          id: "necklaces",
          name: "Necklaces",
          items: [
            { name: "Pendants", id: "pendant" },
            { name: "Mangal Sutra", id: "mangal-sutra" },
            { name: "Chains", id: "chain" },
            { name: "Locket", id: "locket" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Company", id: "company" },
    { name: "Stores", id: "store" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  // const [openAuthModel, setOpenAuthModel] = useState(false);
  const modal = useContext(ModalContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const jwt = localStorage.getItem("jwt");
  const { auth, cart } = useSelector((store) => store);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  useEffect(() => {
    if (auth.user) {
      handleClose();
    }
    // if (location.pathname === "/login" || location.pathname === "/register") {
    //   setOpenAuthModel(true);
    // }
  }, []);

  const handleCategoryClick = (category, section, item, close) => {
    navigate(
      `/${category.id.replace(/\s/g, "-").toLowerCase()}/${section.id
        .replace(/\s/g, "-")
        .toLowerCase()}/${item.id.replace(/\s/g, "-").toLowerCase()}`
    );
    close();
  };

  const handleSectionClick = (section, item, close) => {
    navigate(
      `/${section.id.replace(/\s/g, "-").toLowerCase()}/${item.id
        .replace(/\s/g, "-")
        .toLowerCase()}`
    );
    close();
  };

  const handleOpen = (e, auth) => {
    e.preventDefault();
    navigate(`/${auth}`);
    modal.openModal();
  };

  const handleClose = () => {
    navigate("/");
    modal.closeModal();
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

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
                          key={category.id}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-pink-950 text-pink-800"
                                : "border-transparent text-pink-800",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
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
                      <Tab.Panel
                        key={category.id}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
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
                          <div key={section.id}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.id} className="flow-root">
                                  <a
                                    href={item.href}
                                    className="-m-2 block p-2 text-gray-500"
                                  >
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
                  {navigation.pages.map((page, index) => (
                    <div key={`${page.name}-${index}`} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <a
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </a>
                  </div>
                  <div className="flow-root">
                    <a
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
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
          <div className="my-header">
            {/* Logo */}
            <div className="logo-search-div w-[85%]">
              <a href="#" className="cursor-pointer">
                <span className="sr-only">Your Company</span>
                <img
                  className="object-cover w-40 mt-4"
                  src="https://res.cloudinary.com/deq0hxr3t/image/upload/v1707743755/gayatri_logo_yylmuj.png"
                  alt=""
                />
              </a>

              {/* Search bar */}
              <div className="relative header-search-div">
                <input
                  type="text"
                  placeholder="Search for Gold Jewellery, Diamond…"
                  className="bg-white header-searchbar text-pink-950"
                />
                <span className="search-icon">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
              </div>
            </div>

            {/* customer's action buttons */}
            <div
              className="flex items-center justify-between w-[15%]"
            >
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

              <div
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                xs={4}
                className="flex items-center flex-col cursor-pointer transition duration-1000 border-pink-950 relative  hover:border-b-2 pb-2"
              >
                <PermIdentityOutlinedIcon
                  sx={{ width: "25px", height: "25px" }}
                  className="opacity-60"
                />
                <span className="font-sans font-medium uppercase text-sm">
                  {auth.user?.firstName ? auth.user?.firstName : "Account"}
                </span>

                {!auth.user?.firstName
                  ? isHovering && (
                      <div className="p-3 absolute top-14 z-50 w-[16rem] text-center bg-white rounded-md shadow-lg space-y-3 text-pink-950 transition-all duration-1000">
                        <h1 className="text-2xl font-normal uppercase">
                          My Account
                        </h1>
                        <p className="text-xs font-normal">
                          LOGIN TO ACCESS YOUR ACCOUNT
                        </p>

                        <div className="py-2 flex items-center justify-around">
                          <Button
                            onClick={(e) => handleOpen(e, "login")}
                            variant="outlined"
                            type="submit"
                            sx={{
                              fontSize: "0.75rem",
                              color: "#832729",
                              borderColor: "#832729",
                              "&:hover": {
                                boxShadow: "#f9a8d4 0px 5px 20px",
                                borderColor: "#832729",
                              },
                            }}
                            // sx={{ fontSize: '0.75rem', color: '#832729', borderColor: '#832729', "&:hover": { bgcolor: "#832729", color: '#fff', borderCo0or:5'#822729' }, }}
                            className="flex items-center justify-center rounded-md border-none px-2 py-1"
                          >
                            log in
                          </Button>
                          <Button
                            onClick={(e) => handleOpen(e, "register")}
                            variant="contained"
                            type="submit"
                            sx={{
                              fontSize: "0.75rem",
                              bgcolor: "#832729",
                              "&:hover": { bgcolor: "#500724" },
                            }}
                            className="flex uppercase items-center justify-center rounded-md border-none px-2 py-1 text-white focus:outline-none"
                          >
                            sign up
                          </Button>
                        </div>
                      </div>
                    )
                  : isHovering && (
                      <div
                        className="p-3 absolute top-14 z-50 w-[13rem] flex flex-col bg-white rounded-md shadow-lg space-y-2 transition-all duration-1000 uppercase"
                        style={{ color: "#832729" }}
                      >
                        <div className="px-2 pb-3 flex flex-col border-b-2 border-pink-950 space-y-1">
                          <h1 className="text-xl font-semibold">
                            Hi! {auth.user?.firstName},
                          </h1>
                          <h1 className="text-xs font-normal lowercase">
                            {auth.user?.email}
                          </h1>
                        </div>

                        <div
                          key="acount-details"
                          className="py-2 flex flex-col space-y-3"
                        >
                          <h1
                            key="my-acount"
                            className="text-md p-2 font-medium hover:text-pink-950 hover:font-bold hover:bg-pink-50"
                          >
                            My Account
                          </h1>
                          <h1
                            onClick={()=> navigate('/account/orders')}
                            key="order-history"
                            className="text-md p-2 font-medium hover:text-pink-950 hover:font-bold hover:bg-pink-50"
                          >
                            Order History
                          </h1>
                          <h1
                            key="contact-us"
                            className="text-md p-2 font-medium hover:text-pink-950 hover:font-bold hover:bg-pink-50"
                          >
                            Contact Us
                          </h1>
                          <h1
                            key="log-out"
                            className="text-md p-2 font-medium hover:text-pink-950 hover:font-bold hover:bg-pink-50"
                            onClick={handleLogout}
                          >
                            Log out
                          </h1>
                        </div>
                      </div>
                    )}
              </div>

              {/* Favourite */}
              <div
                xs={4}
                onClick={() => {
                  // document.getElementById('nav-fav-btn').classList.add("border-b-2");
                  navigate("/wishlist")
                }}
                className="flex items-center flex-col cursor-pointer border-pink-950  hover:border-b-2 pb-2"
              >
                <Badge badgeContent={0} color="error">
                  <FavoriteBorderIcon
                    sx={{ width: "25px", height: "25px" }}
                    className="opacity-60"
                  />
                </Badge>
                <span className="font-sans font-medium uppercase text-sm">
                  Wishlist
                </span>
              </div>

              {/* Cart */}
              <div
                onClick={() => {
                  // document.getElementById('nav-cart-btn').classList.add("border-b-2");
                  navigate("/cart")
                }}
                xs={4}
                id="nav-cart-btn"
                className="flex items-center flex-col cursor-pointer border-pink-950  hover:border-b-2 pb-2"
              >
                <Badge badgeContent={cart.cart?.totalItem} color="error">
                  <AddShoppingCartIcon
                    sx={{ width: "25px", height: "25px" }}
                    className="opacity-60"
                  />
                </Badge>
                <span className="font-sans font-medium uppercase text-sm">Cart</span>
              </div>
            </div>
          </div>
        </div>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
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
                  {navigation.categories.map((category, index) => (
                    <Popover key={`${category.name}-${index}`} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-pink-700 text-pink-950 border-b-2"
                                  : " text-gray-700  hover:text-pink-950 unline-animation",
                                "z-10 -mb-px flex items-center  px-2 pt-px text-base font-medium transition-colors duration-200 ease-out"
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
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

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
                                        <div key={section.id}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-semibold text-lg text-pink-950"
                                          >
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map(
                                              (item, index) => (
                                                <li
                                                  key={item.id}
                                                  className="flex"
                                                >
                                                  <p
                                                    onClick={() => {
                                                      handleCategoryClick(
                                                        category,
                                                        section,
                                                        item,
                                                        close
                                                      );
                                                    }}
                                                    className="hover:text-gray-900 hover:underline hover:shadow-sm transition duration-300 cursor-pointer"
                                                  >
                                                    {item.name}
                                                  </p>
                                                </li>
                                              )
                                            )}
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

      <AuthModel handleClose={handleClose} open={modal.state} />
    </div>
  );
}
