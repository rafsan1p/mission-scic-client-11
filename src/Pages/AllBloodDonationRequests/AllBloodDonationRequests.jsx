import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Droplet, MapPin, Calendar, Clock, Eye } from 'lucide-react';
import useAxios from '../../hooks/useAxios';
import toast from 'react-hot-toast';

const AllBloodDonationRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosInstance = useAxios();

    useEffect(() => {
        axiosInstance.get('/pending-requests')
            .then(res => {
                setRequests(res.data);
                setLoading(false);
            })
            .catch(err => {
                toast.error('Failed to load requests');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-pink-50 to-rose-50">
                <span className="loading loading-spinner loading-lg text-red-500"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl mb-4 shadow-lg">
                        <Droplet className="w-8 h-8 text-white fill-white" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                        Blood Donation Requests
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Help save lives by donating blood. Browse through urgent blood donation requests.
                    </p>
                    <div className="mt-4">
                        <span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full font-semibold">
                            {requests.length} Pending Requests
                        </span>
                    </div>
                </div>

                {/* Requests Grid */}
                {requests.length === 0 ? (
                    <div className="text-center py-20">
                        <Droplet className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                            No Pending Requests
                        </h3>
                        <p className="text-gray-500">
                            There are currently no pending blood donation requests.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {requests.map((request) => (
                            <div
                                key={request._id}
                                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                {/* Blood Group Badge */}
                                <div className="bg-gradient-to-r from-red-500 to-rose-600 p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Droplet className="w-6 h-6 text-white fill-white" />
                                            <span className="text-3xl font-bold text-white">
                                                {request.blood_group}
                                            </span>
                                        </div>
                                        <span className="badge badge-warning badge-lg">Urgent</span>
                                    </div>
                                </div>

                                <div className="p-6 space-y-4">
                                    {/* Recipient Name */}
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                                            {request.recipient_name}
                                        </h3>
                                        <p className="text-sm text-gray-500">Recipient</p>
                                    </div>

                                    {/* Location */}
                                    <div className="flex items-start gap-2">
                                        <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-gray-800">
                                                {request.recipient_upazila}, {request.recipient_district}
                                            </p>
                                            <p className="text-sm text-gray-600">{request.hospital_name}</p>
                                        </div>
                                    </div>

                                    {/* Date & Time */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-700">{request.donation_date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-700">{request.donation_time}</span>
                                        </div>
                                    </div>

                                    {/* View Button */}
                                    <Link
                                        to={`/request-details/${request._id}`}
                                        className="btn btn-primary w-full gap-2"
                                    >
                                        <Eye className="w-4 h-4" />
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* CTA Section */}
                <div className="mt-16 bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl shadow-2xl p-8 sm:p-12 text-center text-white">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Want to Become a Donor?
                    </h2>
                    <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                        Join our community of life-savers. Register now and help those in need.
                    </p>
                    <Link
                        to="/signup"
                        className="btn btn-lg bg-white text-red-500 hover:bg-gray-100 border-0 font-bold shadow-lg"
                    >
                        Register as Donor
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AllBloodDonationRequests;