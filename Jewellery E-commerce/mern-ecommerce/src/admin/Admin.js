import {
  Avatar,
  Box,
  CssBaseline,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ProductsTable from "./components/ProductsTable";
import CustomersTable from "./components/CustomersTable";
import OrdersTable from "./components/OrdersTable";
import CreateProductForm from "./components/CreateProductForm";
import AdminDashboard from "./components/AdminDashboard";
import { useSelector } from "react-redux";
import { store } from "../state/store";

const menu = [
  { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
  { name: "Products", path: "/admin/products", icon: <LocalMallIcon /> },
  { name: "Customers", path: "/admin/customers", icon: <Diversity1Icon /> },
  { name: "Orders", path: "/admin/orders", icon: <LocalShippingIcon /> },
  { name: "Add Product", path: "/admin/product/create", icon: <AddBoxIcon /> },
];

const Admin = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const navigate = useNavigate();
  const { auth } = useSelector(store => store);

  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
        // width: 220
      }}
    >
      {/* {isLargeScreen && <Toolbar />} */}

      <List>
        
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "fit-content",
            width: "100%",
          }}
        >
          <Link to={'/'}>
            <img src="https://res.cloudinary.com/deq0hxr3t/image/upload/v1711774124/gayatri_favicon_ttagsd.png" alt="Gayatri" className="w-12 my-3" />
          </Link>
        </Box>

        {menu.map((item, index) => (
          <ListItem
            key={item.name}
            disablePadding
            onClick={() => navigate(item.path)}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List>
        <ListItem
          disablePadding
        // onClick={() => navigate(item.path)}
        />

        <ListItemButton>
          <ListItemIcon>
            <Avatar className='text-white' sx={{ width: 30, height: 30, fontSize: '1rem', bgcolor: '#832729' }}>
              {auth.user?.firstName.charAt(0).toUpperCase()}
            </Avatar>
          </ListItemIcon>
          <ListItemText>{auth?.user?.firstName} {auth?.user?.lastName}</ListItemText>
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <div>
      <div
        // sx={{ display: `${isLargeScreen} ? "flex" : "block"` }}
        className="flex h-[100vh]"
      >
        <CssBaseline />

        <div className="w-[15%] border border-r-gray-300 h-full fixed bottom-0 top-0 left-0">
          {drawer}
        </div>


        <div className="w-[85%] h-[100vh] absolute left-[15%]">

          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/products" element={<ProductsTable />} />
            <Route path="/customers" element={<CustomersTable />} />
            <Route path="/orders" element={<OrdersTable />} />
            <Route path="/product/create" element={<CreateProductForm />} />
          </Routes>

        </div>
      </div>
    </div>
  );
};

export default Admin;
