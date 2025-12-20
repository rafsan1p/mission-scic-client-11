import React, { useContext, useEffect, useState } from 'react';
import { Droplet, User, MapPin, Building2, Calendar, Clock, MessageSquare } from 'lucide-react';
import { AuthContext } from '../../../Provider/AuthProvider';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';

const EditRequest = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [upazilas, setUpazilas] = useState([]);
    const [districts, setDistricts] = useState([]);
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        recipient_name: '',
        recipient_district: '',
        recipient_upazila: '',
        hospital_name: '',
        full_address: '',
        blood_group: '',
        donation_date: '',
        donation_time: '',
        request_message: ''
    });

    useEffect(() => {
        // Load districts and upazilas
        axios.get('/upazila.json').then(res => setUpazilas(res.data.upazilas));
        axios.get('/district.json').then(res => setDistricts(res.data.districts));

        // Load request data
        axiosSecure.get(`/requests/${id}`)
            .then(res => {
                setFormData({
                    recipient_name: res.data.recipient_name,
                    recipient_district: res.data.recipient_district,
                    recipient_upazila: res.data.recipient_upazila,
                    hospital_name: res.data.hospital_name,
                    full_address: res.data.full_address,
                    blood_group: res.data.blood_group,
                    donation_date: res.data.donation_date,
                    donation_time: res.data.donation_time,
                    request_message: res.data.request_message
                });
                setLoadingData(false);
            })
            .catch(err => {
                toast.error('Failed to load request data');
                setLoadingData(false);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axiosSecure.patch(`/requests/${id}`, formData);
            if (res.data.modifiedCount > 0) {
                toast.success('Request updated successfully!');
                navigate('/dashboard/my-request');
            }
        } catch (err) {
            toast.error('Failed to update request!');
        } finally {
            setLoading(false);
        }
    };

    if (loadingData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl mb-4 shadow-lg">
                        <Droplet className="w-8 h-8 text-white fill-white" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                        Edit Donation Request
                    </h1>
                    <p className="text-gray-600">Update your blood donation request details</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-gray-200">
                    <div className="p-6 sm:p-8 space-y-6">
                        
                        {/* Requester Information (Read Only) */}
                        <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl p-4 border border-red-100">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <User className="w-4 h-4 text-red-500" />
                                Requester Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Your Name</label>
                                    <input
                                        type="text"
                                        value={user?.displayName}
                                        readOnly
                                        className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Your Email</label>
                                    <input
                                        type="email"
                                        value={user?.email}
                                        readOnly
                                        className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Recipient Information */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                <User className="w-4 h-4 text-red-500" />
                                Recipient Information
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Recipient Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.recipient_name}
                                        onChange={(e) => setFormData({...formData, recipient_name: e.target.value})}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-red-500" />
                                            District *
                                        </label>
                                        <select
                                            value={formData.recipient_district}
                                            onChange={(e) => setFormData({...formData, recipient_district: e.target.value})}
                                            required
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                        >
                                            <option value="">Select District</option>
                                            {districts.map(d => <option value={d?.name} key={d.id}>{d?.name}</option>)}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-red-500" />
                                            Upazila *
                                        </label>
                                        <select
                                            value={formData.recipient_upazila}
                                            onChange={(e) => setFormData({...formData, recipient_upazila: e.target.value})}
                                            required
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                        >
                                            <option value="">Select Upazila</option>
                                            {upazilas.map(u => <option value={u?.name} key={u.id}>{u?.name}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                        <Building2 className="w-4 h-4 text-red-500" />
                                        Hospital Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.hospital_name}
                                        onChange={(e) => setFormData({...formData, hospital_name: e.target.value})}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-red-500" />
                                        Full Address *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.full_address}
                                        onChange={(e) => setFormData({...formData, full_address: e.target.value})}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Donation Details */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                <Droplet className="w-4 h-4 text-red-500" />
                                Donation Details
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Blood Group *
                                    </label>
                                    <select
                                        value={formData.blood_group}
                                        onChange={(e) => setFormData({...formData, blood_group: e.target.value})}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                    >
                                        <option value="">Choose Blood Group</option>
                                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                                            <option key={bg} value={bg}>{bg}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-red-500" />
                                            Donation Date *
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.donation_date}
                                            onChange={(e) => setFormData({...formData, donation_date: e.target.value})}
                                            required
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-red-500" />
                                            Donation Time *
                                        </label>
                                        <input
                                            type="time"
                                            value={formData.donation_time}
                                            onChange={(e) => setFormData({...formData, donation_time: e.target.value})}
                                            required
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4 text-red-500" />
                                        Request Message *
                                    </label>
                                    <textarea
                                        rows="4"
                                        value={formData.request_message}
                                        onChange={(e) => setFormData({...formData, request_message: e.target.value})}
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="flex-1 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-4 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Droplet className="w-5 h-5" />
                                        Update Request
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditRequest;