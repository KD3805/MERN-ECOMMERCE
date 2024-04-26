import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ProductCard from "./productCard";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { findProducts } from '../../../state/product/Action';
import { store } from '../../../state/store';
import { Pagination } from '@mui/material';
import Loading from '../../../Loading';
import './productStyle.css'


const sortOptions = [
  { name: "Price: Low to High", value: "low_to_high", current: false },
  { name: "Price: High to Low", value: "high_to_low", current: false },
];

const rangeFilters = [
  {
    id: "price",
    name: "Price",
  },
  {
    id: "discount",
    name: "Discount",
  },
];

const filters = [
  {
    id: "type",
    name: "Jewellery Type",
    options: [
      { value: "diamond", label: "Diamond Jewellery", checked: false },
      { value: "gold", label: "Gold Jewellery", checked: false },
      { value: "silver", label: "Silver Jewellery", checked: false },
      { value: "gemstones", label: "Jewellery with Gemstones", checked: false },
      { value: "platinum", label: "Platinum Jewellery", checked: false },
    ],
  },
  {
    id: "color",
    name: "Color",
    options: [
      { value: "rose", label: "Rose", checked: false },
      { value: "rose-white", label: "Rose and White", checked: false },
      { value: "white", label: "White", checked: false },
      { value: "yellow", label: "Yellow", checked: false },
      { value: "yellow-white", label: "Yellow and White", checked: false },
      { value: "yellow-rose", label: "Yellow and Rose", checked: false },
      {
        value: "yellow-white-rose",
        label: "Yellow white and Rose",
        checked: false,
      },
    ],
  },
  {
    id: "occasion",
    name: "Occasion",
    options: [
      { value: "bridal", label: "Bridal wear", checked: false },
      { value: "casual", label: "Casual wear", checked: false },
      { value: "engagement", label: "Engagement", checked: false },
      { value: "modern", label: "Modern wear", checked: false },
      { value: "office", label: "Office wear", checked: false },
      {
        value: "traditional-ethenic",
        label: "Traditional and ethenic wear",
        checked: false,
      },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [priceVal, setPriceVal] = useState([1000, 60000]);
  const [discountVal, setDiscountVal] = useState([10, 50]);
  const location = useLocation();
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector(store => store);

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const colorValue = searchParams.get("color");
  const priceValue = searchParams.get("price");
  const discountValue = searchParams.get("discount");
  const sortValue = searchParams.get("sort");
  const pageNumberValue = searchParams.get("page");
  const typeValue = searchParams.get("type");
  const occasionValue = searchParams.get("occasion");

  useEffect(() => {
    const [minPrice, maxPrice] = priceValue === null ? [100, 1000000] : priceValue.split(",").map(Number);
    const [minDiscount, maxDiscount] = discountValue === null ? [0, 100] : discountValue.split(",").map(Number);

    try {
      // check for jewellery type for all-jewellery category

      const jewelryType = ['gold', 'diamond', 'silver', 'gemstone', 'platinum'];

      const typeParam = jewelryType.includes(param.levelThree) ? param.levelThree : param.levelOne;

      if (jewelryType.includes(typeParam)) {
        searchParams.set("type", typeParam);

        if (jewelryType.includes(param.levelThree)) {
          navigate(`/${param.levelOne}/${param.levelThree}/jewellery?${searchParams}`);
        } else {
          navigate(`/${param.levelOne}/${param.levelTwo}/${param.levelThree}?${searchParams}`);
        }
      }

      // check for jewellery occasion for all-jewellery category

      const occasionTypes = ['bridal', 'casual', 'engagement', 'modern', 'office', 'traditional-ethenic'];

      if (occasionTypes.includes(param.levelThree)) {
        searchParams.set("occasion", param.levelThree);
        navigate(`/${param.levelOne}/${param.levelThree}/jewellery?${searchParams}`);
      }

      const data = {
        category: param.levelThree,
        color: colorValue || [],
        minPrice,
        maxPrice,
        minDiscount,
        maxDiscount,
        sort: sortValue || "low_to_high",
        pageNumber: parseInt(pageNumberValue) || 1,
        pageSize: 12,
        occasion: occasionValue || [],
        type: typeValue || [],
      }
      dispatch(findProducts(data));

    } catch (error) {
      console.error('Error in useEffect:', error);
    }

  }, [
    param.levelThree,
    colorValue,
    priceValue,
    discountValue,
    sortValue,
    pageNumberValue,
    occasionValue,
    typeValue
  ])

  // Handle multiple filters on cards
  const handleFilters = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search);

    let filterValue = searchParams.getAll(sectionId);

    if (filterValue.length > 0 && filterValue[0].split(',').includes(value)) {
      filterValue = filterValue[0].split(',').filter((item) => item !== value);

      if (filterValue.length === 0) {
        searchParams.delete(sectionId)
      }
    }
    else {
      filterValue.push(value)
    }

    if (filterValue.length > 0) {
      searchParams.set(sectionId, filterValue.join(','));
    }

    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  }


  // Handle PRICE range filters on cards
  const handlePriceRangeFilter = (sectionId) => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.set(sectionId, priceVal);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  }

  // Handle DISCOUNT range filters on cards
  const handleDiscountRangeFilter = (sectionId) => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.set(sectionId, discountVal);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  }

  // Handle SORT selection filters on cards
  const handleSortFilter = (sortVal) => {
    const searchParams = new URLSearchParams(location.search);
    console.log('filter method', sortVal)
    searchParams.set('sort', sortVal);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  }

  // Handle pagination
  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set("page", value)
    const query = searchParams.toString()
    navigate({ search: `?${query}` })
  }

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
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
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>

                    {filters.map((section, index) => (
                      <Disclosure
                        as="div"
                        key={`${section.id}-${index}`}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <RemoveIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <AddIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={`${option.value}-${optionIdx}`}
                                    className="flex items-center"
                                  >
                                    <input
                                      onChange={() => handleFilters(option.value, section.id)}
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <KeyboardArrowDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.value}>
                          {({ active }) => (
                            <p
                              onClick={() => {
                                handleSortFilter(option.value);
                              }}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm cursor-pointer"
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <SpaceDashboardIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FilterAltIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>

                {/* Price range slider */}
                <Disclosure
                  as="div"
                  key='price'
                  className="border-b border-gray-200 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            Price
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <RemoveIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <AddIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          <RangeSlider
                            onThumbDragEnd={(e) => handlePriceRangeFilter('price')}
                            value={priceVal}
                            onInput={setPriceVal}
                            min={100}
                            max={1000000}
                            step={5}
                            id="range-slider-price"
                          />

                          <div className="d-flex pt-2 pb-2 priceRange">
                            <span>
                              From:{" "}
                              <strong className="text-pink-800">
                                Rs: {priceVal[0]}
                              </strong>
                            </span>
                            <span className="ml-auto">
                              From:{" "}
                              <strong className="text-pink-800">
                                Rs: {priceVal[1]}
                              </strong>
                            </span>
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                {/* Discount range slider */}
                <Disclosure
                  as="div"
                  key='discount'
                  className="border-b border-gray-200 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            Discount
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <RemoveIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <AddIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          <RangeSlider
                            onThumbDragEnd={(e) => handleDiscountRangeFilter('discount')}
                            value={discountVal}
                            onInput={setDiscountVal}
                            min={0}
                            max={90}
                            step={1}
                            id="range-slider-discount"
                          />

                          <div className="d-flex pt-2 pb-2 priceRange">
                            <span>
                              From:{" "}
                              <strong className="text-pink-800">
                                {discountVal[0]} %
                              </strong>
                            </span>
                            <span className="ml-auto">
                              From:{" "}
                              <strong className="text-pink-800">
                                {discountVal[1]} %
                              </strong>
                            </span>
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                {/* Multiple checkbox filter */}
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <RemoveIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <AddIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  onChange={() => handleFilters(option.value, section.id)}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600 cursor-pointer"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-4 w-full">
                <div className="flex flex-wrap justify-center bg-white py-3">
                  {products.products?.content ? (
                    products.products.content.length === 0 ? (
                      <div className='flex items-center justify-center h-[50vh]'>
                        <div className='flex flex-col space-y-5'>
                          <img src="https://res.cloudinary.com/deq0hxr3t/image/upload/v1709462235/no-found_mnvvpf.svg" alt="" />
                          <h1 className='text-3xl font-semibold text-pink-950'>No products found</h1>
                        </div>
                      </div>
                    ) : (
                      products.products?.content?.map((product, idx) => (
                        <div className='h-[25rem] w-fit'>
                          <ProductCard product={product} key={product._id} index={idx} />
                        </div>
                      ))
                    )
                  ) : (
                    <Loading />
                  )}
                </div>
              </div>

            </div>
          </section>

          {/* Pagination */}
          <section className='w-full px-[3.6rem]'>
            <div className='px-4 py-5 flex justify-center'>
              <Pagination count={products.products?.totalPages} color='error' onChange={handlePaginationChange} />
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
