import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Droplet, User, Mail, MapPin, Building2, Calendar, Clock, MessageSquare, Heart } from 'lucide-react';
import useAxios from '../../hooks/useAxios';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';
import toast from 'react-hot-toast';

const RequestDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get(`/requests/${id}`)
            .then(res => {
                setRequest(res.data);
                setLoading(false);
            })
            .catch(err => {
                toast.error('Failed to load request details');
                setLoading(false);
            });
    }, [id]);

    const handleDonate = async (e) => {
        e.preventDefault();
        
        if(request.donation_status !== 'pending') {
            toast.error('This request is no longer available for donation');
            return;
        }

        try {
            await axiosSecure.patch(`/requests/${id}/assign-donor`, {
                donorName: user?.displayName,
                donorEmail: user?.email
            });
            toast.success('Successfully registered as donor!');
            setShowModal(false);
            navigate('/dashboard/my-request');
        } catch(err) {
            toast.error('Failed to register as donor');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!request) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Request not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl mb-4 shadow-lg">
                        <Droplet className="w-8 h-8 text-white fill-white" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                        Blood Donation Request Details
                    </h1>
                    <div className="inline-flex items-center gap-2">
                        <span className={`badge ${
                            request.donation_status === 'pending' ? 'badge-warning' :
                            request.donation_status === 'inprogress' ? 'badge-info' :
                            request.donation_status === 'done' ? 'badge-success' :
                            'badge-error'
                        } badge-lg`}>
                            {request.donation_status}
                        </span>
                    </div>
                </div>

                {/* Details Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="p-6 sm:p-8 space-y-6">
                        
                        {/* Requester Info */}
                        <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl p-6 border border-red-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-red-500" />
                                Requester Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Name</p>
                                    <p className="font-semibold text-gray-800">{request.requester_name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Email</p>
                                    <p className="font-semibold text-gray-800">{request.requester_email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Recipient Info */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Heart className="w-5 h-5 text-red-500" />
                                Recipient Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            Recipient Name
                                        </p>
                                        <p className="font-semibold text-gray-800">{request.recipient_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            Location
                                        </p>
                                        <p className="font-semibold text-gray-800">
                                            {request.recipient_upazila}, {request.recipient_district}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                                            <Building2 className="w-4 h-4" />
                                            Hospital
                                        </p>
                                        <p className="font-semibold text-gray-800">{request.hospital_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            Address
                                        </p>
                                        <p className="font-semibold text-gray-800">{request.full_address}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                                            <Droplet className="w-4 h-4" />
                                            Blood Group
                                        </p>
                                        <span className="inline-block px-4 py-2 bg-red-500 text-white font-bold rounded-lg">
                                            {request.blood_group}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            Donation Date
                                        </p>
                                        <p className="font-semibold text-gray-800">{request.donation_date}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            Donation Time
                                        </p>
                                        <p className="font-semibold text-gray-800">{request.donation_time}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Request Message */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-red-500" />
                                Request Message
                            </h3>
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <p className="text-gray-700 leading-relaxed">{request.request_message}</p>
                            </div>
                        </div>

                        {/* Donor Info (if assigned) */}
                        {request.donor_info && (
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <User className="w-5 h-5 text-green-600" />
                                    Assigned Donor
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Name</p>
                                        <p className="font-semibold text-gray-800">{request.donor_info.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Email</p>
                                        <p className="font-semibold text-gray-800">{request.donor_info.email}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Donate Button */}
                        {request.donation_status === 'pending' && (
                            <button
                                onClick={() => setShowModal(true)}
                                className="w-full py-4 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <Heart className="w-5 h-5" />
                                I Want to Donate
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Donation Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Confirm Donation
                        </h3>
                        <form onSubmit={handleDonate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    value={user?.displayName}
                                    readOnly
                                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    value={user?.email}
                                    readOnly
                                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                <p className="text-sm text-blue-800">
                                    By confirming, you agree to donate blood on the specified date and time.
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold rounded-xl transition-all"
                                >
                                    Confirm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestDetails;