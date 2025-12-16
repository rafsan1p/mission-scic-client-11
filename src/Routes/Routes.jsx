import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";
import Error from "../Pages/Error";
import ManageProduct from "../Pages/Dashboard/ManageProduct/ManageProduct";
import AddRequest from "../Pages/Dashboard/AddRequest/AddRequest";



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
        path:'dashboard',
        element:<DashboardLayout></DashboardLayout>,
        children:[
            {
                path:'/dashboard',
                element: <MainDashboard></MainDashboard>
            },
            {
                path:'add-request',
                element: <AddRequest></AddRequest>
            },
            {
                path:'manage-product',
                element: <ManageProduct></ManageProduct>
            }
        ]
    }
]);





export default router;