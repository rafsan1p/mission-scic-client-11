import React, { useEffect, useState } from "react";
import { Search, Droplet, MapPin, Mail } from "lucide-react";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";
import axios from "axios";

const SearchRequest = () => {
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [donors, setDonors] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const axiosInstance = useAxios();

  useEffect(() => {
    axios.get("/upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });

    axios.get("/district.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!bloodGroup && !district && !upazila) {
      toast.error('Please select at least one search criteria');
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      // Build query string manually
      let queryString = '';
      if (bloodGroup) queryString += `bloodGroup=${encodeURIComponent(bloodGroup)}&`;
      if (district) queryString += `district=${encodeURIComponent(district)}&`;
      if (upazila) queryString += `upazila=${encodeURIComponent(upazila)}&`;

      // Remove trailing &
      queryString = queryString.slice(0, -1);

      console.log('🔍 Searching with:', queryString);

      const res = await axiosInstance.get(`/search-donors?${queryString}`);

      console.log('✅ Response:', res.data);
      setDonors(res.data);

      if (res.data.length === 0) {
        toast('No donors found with selected criteria', { icon: '🔍' });
      } else {
        toast.success(`Found ${res.data.length} donor(s)!`);
      }
    } catch (err) {
      console.error('❌ Search error:', err);
      toast.error('Failed to search donors');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setBloodGroup('');
    setDistrict('');
    setUpazila('');
    setDonors([]);
    setSearched(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Search className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Search Blood Donors
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find blood donors by blood group, district, and upazila
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8 mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Blood Group */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Group
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">All Blood Groups</option>
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

              {/* District */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  District
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">All Districts</option>
                  {districts.map((d) => (
                    <option value={d?.name} key={d.id}>
                      {d?.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upazila */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upazila
                </label>
                <select
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">All Upazilas</option>
                  {upazilas.map((u) => (
                    <option value={u?.name} key={u.id}>
                      {u?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Search Donors
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        {searched && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results
              </h2>
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">
                {donors.length} Donors Found
              </span>
            </div>

            {donors.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <Droplet className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                  No Donors Found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {donors.map((donor) => (
                  <div
                    key={donor._id}
                    className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {/* Header with Avatar */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={donor.mainPhotoUrl}
                          alt={donor.name}
                          className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
                        />
                        <div className="text-white">
                          <h3 className="text-xl font-bold">{donor.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Droplet className="w-4 h-4 fill-white" />
                            <span className="text-2xl font-bold">{donor.blood}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">{donor.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span className="text-sm">
                          {donor.upazila}, {donor.district}
                        </span>
                      </div>
                      <div className="pt-3">
                        <span className={`badge ${donor.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                          {donor.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchRequest;