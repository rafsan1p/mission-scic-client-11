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
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import PrivateRoute from "./PrivateRoute";
import MyRequest from "../Pages/Dashboard/MyRequest/MyRequest";
import PaymentSuccess from "../Pages/PaymentSuccess/PaymentSuccess";
import Donate from "../Pages/Donate/Donate";
import SearchRequest from "../Pages/SearchRequest/SearchRequest";



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
                path: '/signup',
                Component:Register
            },
            {
                path: '/donate',
                element: <PrivateRoute><Donate></Donate></PrivateRoute>
            },
            {
                path: '/payment-success',
                Component:PaymentSuccess
            },
            {
                path: '/search',
                Component:SearchRequest
            }
        ]
    },
    {
        path:'dashboard',
        element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
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
                path:'all-users',
                element: <AllUsers></AllUsers>
            },
            {
                path:'my-request',
                element: <MyRequest></MyRequest>
            }
        ]
    }
]);





export default router;