import React, { useContext, useEffect, useState } from 'react';
import { Droplet, User, Mail, MapPin, Building2, Calendar, Clock, MessageSquare } from 'lucide-react';
import { AuthContext } from '../../../Provider/AuthProvider';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AddRequest = () => {

    const {user} = useContext(AuthContext);
    const [upazilas, setUpazilas] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState('');
    const [upazila, setUpazila] = useState('');
    const axiosSecure = useAxiosSecure();
    const [bloodGroup, setBloodGroup] = useState('');

    useEffect(()=>{
        axios.get('/upazila.json')
        .then(res=>{
            setUpazilas(res.data.upazilas)
        })

        axios.get('/district.json')
        .then(res=>{
            setDistricts(res.data.districts)
        })
    }, [])

    const handleRequest = (e) => {
        e.preventDefault();
        const form = e.target

        const requester_name = form.requester_name.value;
        const requester_email = form.requester_email.value;
        const recipient_name = form.recipient_name.value;
        const recipient_district = district;
        const recipient_upazila = upazila;
        const hospital_name = form.hospital_name.value;
        const full_address = form.full_address.value;
        const blood_group = form.blood_group.value;

        const formData = {
            requester_name,
            requester_email,
            recipient_name,
            recipient_district,
            recipient_upazila,
            hospital_name,
            full_address,
            blood_group,
            donation_status:'pending'
        }
        axiosSecure.post('/requests', formData)
        .then(res=>{
            alert(res.data.insertedId);
        })
        .catch(err=> console.log(err));
    };

  

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-pink-50 to-rose-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-red-500 to-rose-600 rounded-2xl mb-4 shadow-lg">
            <Droplet className="w-8 h-8 text-white fill-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Blood Donation Request
          </h1>
          <p className="text-gray-600">Help save a life by requesting blood donation</p>
        </div>

        {/* Form */}
        <form onSubmit={handleRequest} className="bg-white rounded-2xl shadow-xl border border-gray-200">
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Requester Information (Read Only) */}
            <div className="bg-linear-to-r from-red-50 to-rose-50 rounded-xl p-4 border border-red-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-red-500" />
                Requester Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Your Name</label>
                  <input
                    type="text"
                    name="requester_name"
                    value={user?.displayName}
                    readOnly
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Your Email</label>
                  <input
                    type="email"
                    name="requester_email"
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
                {/* Recipient Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipient Name *
                  </label>
                  <input
                    type="text"
                    name="recipient_name"
                    placeholder="Enter recipient's full name"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder:text-gray-400"
                  />
                </div>

                {/* District & Upazila */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-500" />
                      Recipient District *
                    </label>
                    <select
                      name="recipient_district"
                      value={district}
                      onChange={(e)=> setDistrict(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0.75rem center',
                        backgroundSize: '1.25em 1.25em'
                      }}
                    >
                      <option value="" disabled>Select your District</option>
                        {
                            districts.map(d=> <option value={d?.name} key={d.id}>{d?.name}</option>)
                        }
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-500" />
                      Recipient Upazila *
                    </label>
                    <select
                      name="recipient_upazila"
                      value={upazila}
                      onChange={(e)=> setUpazila(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0.75rem center',
                        backgroundSize: '1.25em 1.25em'
                      }}
                    >
                      <option value="" disabled>Select your Upazila</option>
                        {
                            upazilas.map(u=> <option value={u?.name} key={u.id}>{u?.name}</option>)
                        }
                    </select>
                  </div>
                </div>

                {/* Hospital Name */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-red-500" />
                    Hospital Name *
                  </label>
                  <input
                    type="text"
                    name="hospital_name"
                    placeholder="e.g., Dhaka Medical College Hospital"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder:text-gray-400"
                  />
                </div>

                {/* Full Address */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-500" />
                    Full Address Line *
                  </label>
                  <input
                    type="text"
                    name="full_address"
                    placeholder="e.g., Zahir Raihan Rd, Dhaka"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder:text-gray-400"
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
                {/* Blood Group */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Group *
                  </label>
                  <select
                    name="blood_group"
                    value={bloodGroup}
                    onChange={(e)=> setBloodGroup(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1.25em 1.25em'
                    }}
                  >
                    <option value="" disabled>Choose Blood Group</option>
                    <option value='A+'>A+</option>
                    <option value='A-'>A-</option>
                    <option value='B+'>B+</option>
                    <option value='B-'>B-</option>
                    <option value='O+'>O+</option>
                    <option value='O-'>O-</option>
                    <option value='AB+'>AB+</option>
                    <option value='AB-'>AB-</option>
                  </select>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-red-500" />
                      Donation Date *
                    </label>
                    <input
                      type="date"
                      name="donationDate"
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
                      name="donationTime"
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Request Message */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-red-500" />
                    Request Message *
                  </label>
                  <textarea
                    name="requestMessage"
                    rows="4"
                    placeholder="Please explain why you need blood donation in detail..."
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none placeholder:text-gray-400"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-linear-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Droplet className="w-5 h-5" />
              Submit Blood Request
            </button>
          </div>
        </form>

        {/* Info Box */}
        <div className="mt-6 bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            <span className="font-semibold text-red-500">Important:</span> Your request will be marked as "Pending" and donors will be notified. Please ensure all information is accurate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddRequest;