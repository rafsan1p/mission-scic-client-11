import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { User, Mail, Droplet, MapPin, Edit2, Save, X } from 'lucide-react';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [upazilas, setUpazilas] = useState([]);
    const [districts, setDistricts] = useState([]);
    const axiosSecure = useAxiosSecure();
    
    const [formData, setFormData] = useState({
        name: user?.displayName || '',
        blood: '',
        district: '',
        upazila: '',
        mainPhotoUrl: user?.photoURL || ''
    });

    useEffect(() => {
        // Fetch user data
        axios.get(`http://localhost:5000/users/role/${user?.email}`)
            .then(res => {
                setFormData({
                    name: res.data.name,
                    blood: res.data.blood,
                    district: res.data.district,
                    upazila: res.data.upazila,
                    mainPhotoUrl: res.data.mainPhotoUrl
                });
            });

        // Fetch districts and upazilas
        axios.get('/upazila.json').then(res => setUpazilas(res.data.upazilas));
        axios.get('/district.json').then(res => setDistricts(res.data.districts));
    }, [user?.email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axiosSecure.patch(`/users/${user?.email}`, formData);
            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } catch(err) {
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset form data
        axios.get(`http://localhost:5000/users/role/${user?.email}`)
            .then(res => {
                setFormData({
                    name: res.data.name,
                    blood: res.data.blood,
                    district: res.data.district,
                    upazila: res.data.upazila,
                    mainPhotoUrl: res.data.mainPhotoUrl
                });
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                        <User className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                        User Profile
                    </h1>
                    <p className="text-gray-600">Manage your profile information</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    {/* Avatar Section */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8">
                        <div className="flex justify-center">
                            <div className="relative">
                                <img
                                    src={formData.mainPhotoUrl}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                                />
                                <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg">
                                    <Droplet className="w-6 h-6 text-red-500 fill-red-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="p-6 sm:p-8">
                        {/* Edit Button */}
                        <div className="flex justify-end mb-6">
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="btn btn-primary btn-sm gap-2"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Edit Profile
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleCancel}
                                        className="btn btn-outline btn-sm gap-2"
                                    >
                                        <X className="w-4 h-4" />
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email (Read Only) */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <Mail className="w-4 h-4 text-blue-500" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={user?.email}
                                    readOnly
                                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                                />
                                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                            </div>

                            {/* Name */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <User className="w-4 h-4 text-blue-500" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                                />
                            </div>

                            {/* Blood Group */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    <Droplet className="w-4 h-4 text-red-500" />
                                    Blood Group
                                </label>
                                <select
                                    value={formData.blood}
                                    onChange={(e) => setFormData({...formData, blood: e.target.value})}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                                >
                                    <option value="">Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
                            </div>

                            {/* District & Upazila */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                        <MapPin className="w-4 h-4 text-green-500" />
                                        District
                                    </label>
                                    <select
                                        value={formData.district}
                                        onChange={(e) => setFormData({...formData, district: e.target.value})}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    >
                                        <option value="">Select District</option>
                                        {districts.map(d => (
                                            <option key={d.id} value={d.name}>{d.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                        <MapPin className="w-4 h-4 text-green-500" />
                                        Upazila
                                    </label>
                                    <select
                                        value={formData.upazila}
                                        onChange={(e) => setFormData({...formData, upazila: e.target.value})}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    >
                                        <option value="">Select Upazila</option>
                                        {upazilas.map(u => (
                                            <option key={u.id} value={u.name}>{u.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Save Button */}
                            {isEditing && (
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5" />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;