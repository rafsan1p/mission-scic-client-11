import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import Error from "../Pages/Error";



const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                Component:Home
            },
            {
                path: '/login',
                Component:Login
            },
            {
                path: 'signup',
                Component:Register
            }
        ]
    },
    {
        path:'/dashboard',
        element:<DashboardLayout></DashboardLayout>,
        children:[
            {
                path:'main',
                element: <MainDashboard></MainDashboard>
            },
            {
                path:'add-product',
                element: <AddProduct></AddProduct>
            }
        ]
    }
]);





export default router;