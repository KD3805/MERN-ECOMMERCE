import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import MyAccount from './MyAccount';
import WishList from './WishList';
import ContactUs from './ContactUs';
import OrderHistory from '../MyOrders/OrderHistory';

const UserDetails = () => {
  const location = useLocation();
  const querySearch = new URLSearchParams(location.search);
  const layout = querySearch.get("layout")
  const [activeTab, setActiveTab] = useState(null);
  const navigate = useNavigate();

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  useEffect( ()=>{
    setActiveTab(layout)
  }, [layout]);

  const menuBar = [
    {
      name: 'My Account',
      nav: '/user-details/?layout=0'
    },
    {
      name: 'Wish List',
      nav: '/user-details/?layout=1'
    },
    {
      name: 'Order History',
      nav: '/user-details/?layout=2'
    },
    {
      name: 'Contact us',
      nav: '/user-details/?layout=3'
    }
  ]

  return (
    <div>
      <div className='py-10 px-32 flex justify-center items-center'>
        <div className='w-full'>
          <h1 className='text-3xl pb-3 font-semibold border-b text-end'>{menuBar?.[activeTab]?.name}</h1>

          <div className='flex'>
          <div className='w-1/5 border-r border-b'>
            {menuBar.map((item, index) => (
              <div className='border-b p-1' key={index}>
                <p 
                  className={`px-3 py-2 text-base font-semibold cursor-pointer rounded-sm ${
                    activeTab == index ? 'bg-pink-100 text-pink-900' : 'hover:bg-gray-100'
                  }`} 
                  onClick={() => {
                    handleTabClick(index)
                    navigate(item.nav)
                  }}
                >
                  {item.name}
                </p>
              </div>
            ))}
          </div>

          <div className='w-4/5 h-[80vh] overflow-y-scroll border-b' id='user-details'>
            {
              layout == '0' && <MyAccount />
            }
            {
              layout == '1' && <WishList />
            }
            {
              layout == '2' && <OrderHistory />
            }
            {
              layout == '3' && <ContactUs />
            }
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetails;
