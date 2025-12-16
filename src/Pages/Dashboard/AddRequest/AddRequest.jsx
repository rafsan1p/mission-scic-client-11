import React, { useState } from 'react';
import { Droplet, User, Mail, MapPin, Building2, Calendar, Clock, MessageSquare } from 'lucide-react';

const BloodDonationForm = () => {
  const [formData, setFormData] = useState({
    requesterName: 'John Doe', 
    requesterEmail: 'john.doe@example.com',
    recipientName: '',
    recipientDistrict: '',
    recipientUpazila: '',
    hospitalName: '',
    fullAddress: '',
    bloodGroup: '',
    donationDate: '',
    donationTime: '',
    requestMessage: '',
    donationStatus: 'pending' // Default value, not shown in form
  });

  const districts = [
    'Dhaka', 'Chattogram', 'Rajshahi', 'Khulna', 'Barishal', 'Sylhet', 
    'Rangpur', 'Mymensingh', 'Comilla', 'Gazipur', 'Narayanganj', 'Jessore'
  ];

  const upazilas = {
    'Dhaka': ['Dhanmondi', 'Gulshan', 'Mirpur', 'Mohammadpur', 'Uttara', 'Tejgaon'],
    'Chattogram': ['Patenga', 'Kotwali', 'Double Mooring', 'Pahartali', 'Halishahar'],
    'Rajshahi': ['Boalia', 'Motihar', 'Rajpara', 'Shah Makhdum'],
    'Khulna': ['Sonadanga', 'Khalishpur', 'Daulatpur', 'Khan Jahan Ali'],
    'Barishal': ['Kotwali', 'Bakerganj', 'Banaripara'],
    'Sylhet': ['Jalalabad', 'South Surma', 'Companiganj'],
    'Rangpur': ['Rangpur Sadar', 'Mithapukur', 'Badarganj'],
    'Mymensingh': ['Mymensingh Sadar', 'Muktagacha', 'Trishal'],
    'Comilla': ['Comilla Sadar', 'Laksam', 'Daudkandi'],
    'Gazipur': ['Gazipur Sadar', 'Kaliakair', 'Kapasia'],
    'Narayanganj': ['Narayanganj Sadar', 'Rupganj', 'Sonargaon'],
    'Jessore': ['Jessore Sadar', 'Jhikargachha', 'Sharsha']
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Blood Donation Request:', formData);
    alert('Blood donation request submitted successfully!');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset upazila when district changes
      ...(name === 'recipientDistrict' && { recipientUpazila: '' })
    }));
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
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-gray-200">
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
                    name="requesterName"
                    value={formData.requesterName}
                    readOnly
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Your Email</label>
                  <input
                    type="email"
                    name="requesterEmail"
                    value={formData.requesterEmail}
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
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleChange}
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
                      name="recipientDistrict"
                      value={formData.recipientDistrict}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0.75rem center',
                        backgroundSize: '1.25em 1.25em'
                      }}
                    >
                      <option value="">Select district</option>
                      {districts.map(district => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-500" />
                      Recipient Upazila *
                    </label>
                    <select
                      name="recipientUpazila"
                      value={formData.recipientUpazila}
                      onChange={handleChange}
                      required
                      disabled={!formData.recipientDistrict}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0.75rem center',
                        backgroundSize: '1.25em 1.25em'
                      }}
                    >
                      <option value="">Select upazila</option>
                      {formData.recipientDistrict && upazilas[formData.recipientDistrict]?.map(upazila => (
                        <option key={upazila} value={upazila}>{upazila}</option>
                      ))}
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
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleChange}
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
                    name="fullAddress"
                    value={formData.fullAddress}
                    onChange={handleChange}
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
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1.25em 1.25em'
                    }}
                  >
                    <option value="">Select blood group</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
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
                      value={formData.donationDate}
                      onChange={handleChange}
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
                      value={formData.donationTime}
                      onChange={handleChange}
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
                    value={formData.requestMessage}
                    onChange={handleChange}
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

export default BloodDonationForm;