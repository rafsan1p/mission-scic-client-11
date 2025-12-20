import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/SearchRequest/Login";
import Register from "../Pages/SearchRequest/Register";

import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";
import Error from "../Pages/SearchRequest/Error";
import AddRequest from "../Pages/Dashboard/AddRequest/AddRequest";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import PrivateRoute from "./PrivateRoute";
import MyRequest from "../Pages/Dashboard/MyRequest/MyRequest";
import PaymentSuccess from "../Pages/PaymentSuccess/PaymentSuccess";
import Donate from "../Pages/Donate/Donate";
import Profile from "../Pages/Dashboard/Profile/Profile";
import RequestDetails from "../Pages/RequestDetails/RequestDetails";
import AllBloodDonationRequests from "../Pages/AllBloodDonationRequests/AllBloodDonationRequests";
import Funding from "../Pages/Dashboard/Donate/Funding";
import AllBloodDonationRequestAdmin from "../Pages/Dashboard/AllBloodDonationRequestAdmin/AllBloodDonationRequestAdmin";
import EditRequest from "../Pages/Dashboard/EditRequest/EditRequest";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import SearchRequest from "../Pages/SearchRequest/SearchRequest";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Register />
            },
            {
                path: '/search-donors',
                element: <SearchRequest />
            },
            {
                path: '/donation-requests',
                element: <AllBloodDonationRequests />
            },
            {
                path: '/request-details/:id',
                element: <PrivateRoute><RequestDetails /></PrivateRoute>
            },
            {
                path: '/donate',
                element: <PrivateRoute><Donate /></PrivateRoute>
            },
            {
                path: '/payment-success',
                element: <PaymentSuccess />
            },
            {
                path: '/payment-cancelled',
                element: <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Cancelled</h1>
                        <p className="text-gray-600">Your payment was cancelled. You can try again.</p>
                    </div>
                </div>
            }
        ]
    },
    {
        path:'dashboard',
        element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
        children:[
            {
                path:'/dashboard',
                element: <MainDashboard />
            },
            {
                path:'profile',
                element: <Profile />
            },
            {
                path:'add-request',
                element: <AddRequest />
            },
            {
                path:'all-users',
                element: <AllUsers />
            },
            {
                path:'my-request',
                element: <MyRequest />
            },
            {
                path:'all-blood-donation-request',
                element: <AllBloodDonationRequestAdmin />
            },
            {
                path:'funding',
                element: <Funding />
            },
            {
                path:'edit-request/:id',
                element: <EditRequest />
            }
        ]
    }
]);

export default router;