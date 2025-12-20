import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { Link } from 'react-router';
import { Droplet, Calendar, MapPin, Eye, Plus } from 'lucide-react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const MainDashboard = () => {
    const { user, role } = useContext(AuthContext);
    const [recentRequests, setRecentRequests] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (role === 'donor') {
            // Fetch recent 3 requests
            axiosSecure.get(`/recent-requests/${user?.email}`)
                .then(res => {
                    setRecentRequests(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    toast.error('Failed to load dashboard data');
                    setLoading(false);
                });
        } else if (role === 'admin' || role === 'volunteer') {
            // Fetch admin stats
            axiosSecure.get('/stats/admin')
                .then(res => {
                    setStats(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    toast.error('Failed to load stats');
                    setLoading(false);
                });
        }
    }, [role, user?.email]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="p-4 lg:p-8 bg-gray-50 min-h-screen">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 text-white rounded-2xl shadow-xl p-8 mb-8">
                <div className="flex items-center gap-4">
                    <img
                        src={user?.photoURL}
                        alt="Profile"
                        className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                    <div>
                        <h1 className="text-3xl font-bold mb-2">
                            Welcome back, {user?.displayName}! 👋
                        </h1>
                        <p className="text-white/90 text-lg">
                            {role === 'donor' && 'Thank you for being a life-saver!'}
                            {role === 'admin' && 'Manage your blood donation platform'}
                            {role === 'volunteer' && 'Help manage donation requests'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Donor Dashboard */}
            {role === 'donor' && (
                <>
                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <Link
                            to="/dashboard/add-request"
                            className="bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Create New Request</h3>
                                    <p className="opacity-90">Request blood donation</p>
                                </div>
                                <Plus className="w-12 h-12 opacity-80" />
                            </div>
                        </Link>

                        <Link
                            to="/donation-requests"
                            className="bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Browse Requests</h3>
                                    <p className="opacity-90">Find urgent requests</p>
                                </div>
                                <Droplet className="w-12 h-12 opacity-80 fill-white" />
                            </div>
                        </Link>
                    </div>

                    {/* Recent Requests */}
                    <div className="bg-white rounded-2xl shadow-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Recent Donation Requests
                            </h2>
                            <Link
                                to="/dashboard/my-request"
                                className="btn btn-sm btn-primary"
                            >
                                View All
                            </Link>
                        </div>

                        {recentRequests.length === 0 ? (
                            <div className="text-center py-12">
                                <Droplet className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 mb-4">No donation requests yet</p>
                                <Link to="/dashboard/add-request" className="btn btn-primary">
                                    Create Your First Request
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th>Recipient</th>
                                            <th>Location</th>
                                            <th>Blood Group</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentRequests.map(request => (
                                            <tr key={request._id}>
                                                <td className="font-medium">{request.recipient_name}</td>
                                                <td>
                                                    <div className="flex items-center gap-1 text-sm">
                                                        <MapPin className="w-3 h-3" />
                                                        {request.recipient_district}
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge badge-error text-white font-bold">
                                                        {request.blood_group}
                                                    </span>
                                                </td>
                                                <td>{request.donation_date}</td>
                                                <td>{request.donation_time}</td>
                                                <td>
                                                    <span className={`badge ${
                                                        request.donation_status === 'pending' ? 'badge-warning' :
                                                        request.donation_status === 'inprogress' ? 'badge-info' :
                                                        request.donation_status === 'done' ? 'badge-success' :
                                                        'badge-error'
                                                    }`}>
                                                        {request.donation_status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <Link
                                                        to={`/request-details/${request._id}`}
                                                        className="btn btn-xs btn-ghost"
                                                    >
                                                        <Eye className="w-3 h-3" />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* Admin/Volunteer Dashboard */}
            {(role === 'admin' || role === 'volunteer') && stats && (
                <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-blue-100 mb-1">Total Users</p>
                                    <h3 className="text-4xl font-bold">{stats.totalUsers}</h3>
                                </div>
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                    <Droplet className="w-8 h-8" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-red-100 mb-1">Total Requests</p>
                                    <h3 className="text-4xl font-bold">{stats.totalRequests}</h3>
                                </div>
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                    <Calendar className="w-8 h-8" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-green-100 mb-1">Total Funding</p>
                                    <h3 className="text-4xl font-bold">${stats.totalFunding}</h3>
                                </div>
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                    <span className="text-2xl">💰</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {role === 'admin' && (
                            <Link
                                to="/dashboard/all-users"
                                className="bg-white hover:bg-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-200"
                            >
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Manage Users</h3>
                                <p className="text-gray-600">View and manage all users</p>
                            </Link>
                        )}

                        <Link
                            to="/dashboard/all-blood-donation-request"
                            className="bg-white hover:bg-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-200"
                        >
                            <h3 className="text-lg font-bold text-gray-900 mb-2">All Requests</h3>
                            <p className="text-gray-600">Manage donation requests</p>
                        </Link>

                        <Link
                            to="/dashboard/funding"
                            className="bg-white hover:bg-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-200"
                        >
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Funding</h3>
                            <p className="text-gray-600">View all donations</p>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default MainDashboard;