import React from 'react';
import { Link } from 'react-router';
import { Droplet, Heart, Users, Search, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-red-600 via-rose-500 to-pink-600 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-pulse">
                            <Droplet className="w-10 h-10 fill-white" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                            Donate Blood, Save Lives
                        </h1>
                        <p className="text-xl sm:text-2xl mb-10 max-w-3xl mx-auto opacity-95">
                            Your blood is precious. Donate, save a life, make a difference.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/signup"
                                className="px-8 py-4 bg-white text-red-600 font-bold rounded-full shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2"
                            >
                                <Heart className="w-5 h-5" />
                                Join as Donor
                            </Link>
                            <Link
                                to="/search-donors"
                                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full border-2 border-white hover:bg-white/20 hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2"
                            >
                                <Search className="w-5 h-5" />
                                Search Donors
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-8 bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl border border-red-100">
                            <Droplet className="w-12 h-12 text-red-500 mx-auto mb-4 fill-red-500" />
                            <h3 className="text-4xl font-bold text-gray-900 mb-2">1000+</h3>
                            <p className="text-gray-600 font-medium">Lives Saved</p>
                        </div>
                        <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                            <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                            <h3 className="text-4xl font-bold text-gray-900 mb-2">500+</h3>
                            <p className="text-gray-600 font-medium">Active Donors</p>
                        </div>
                        <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                            <Heart className="w-12 h-12 text-green-500 mx-auto mb-4" />
                            <h3 className="text-4xl font-bold text-gray-900 mb-2">2000+</h3>
                            <p className="text-gray-600 font-medium">Successful Donations</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Section - Why Donate Blood */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Why Donate Blood?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Every donation can save up to three lives. Be a hero today!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                                <CheckCircle className="w-6 h-6 text-red-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Save Lives</h3>
                            <p className="text-gray-600">One donation can save up to 3 lives</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                <Heart className="w-6 h-6 text-blue-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Health Benefits</h3>
                            <p className="text-gray-600">Regular donation keeps you healthy</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                                <Users className="w-6 h-6 text-green-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Community Service</h3>
                            <p className="text-gray-600">Help your community in need</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                <Droplet className="w-6 h-6 text-purple-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Free Checkup</h3>
                            <p className="text-gray-600">Get free health screening</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            How It Works
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Simple steps to become a life-saver
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                                1
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Register</h3>
                            <p className="text-gray-600">Sign up and create your donor profile</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                                2
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Get Notified</h3>
                            <p className="text-gray-600">Receive requests matching your blood type</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                                3
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Donate & Save</h3>
                            <p className="text-gray-600">Visit the location and donate blood</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Contact Us
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Have questions? We're here to help!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        rows="4"
                                        placeholder="Your message..."
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                                    ></textarea>
                                </div>
                                <button className="w-full py-3 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl shadow-lg p-6 flex items-start gap-4">
                                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-red-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">Phone</h3>
                                    <p className="text-gray-600">+880 1234-567890</p>
                                    <p className="text-gray-600">+880 1234-567891</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-6 flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-blue-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">Email</h3>
                                    <p className="text-gray-600">info@bloodbridge.com</p>
                                    <p className="text-gray-600">support@bloodbridge.com</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-6 flex items-start gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-green-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">Address</h3>
                                    <p className="text-gray-600">123 Blood Bank Street</p>
                                    <p className="text-gray-600">Dhaka, Bangladesh</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-red-600 via-rose-500 to-pink-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                        Ready to Make a Difference?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join thousands of donors who are saving lives every day
                    </p>
                    <Link
                        to="/signup"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 font-bold rounded-full shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all duration-300"
                    >
                        <Heart className="w-5 h-5" />
                        Register Now
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;