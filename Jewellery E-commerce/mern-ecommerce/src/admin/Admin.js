import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PersonIcon from "@mui/icons-material/Person";
import ProductsTable from "./components/ProductsTable";
import CustomersTable from "./components/CustomersTable";
import OrdersTable from "./components/OrdersTable";
import CreateProductForm from "./components/CreateProductForm";
import AdminDashboard from "./components/AdminDashboard";

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
            <PersonIcon />
          </ListItemIcon>
          <ListItemText>Account</ListItemText>
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
