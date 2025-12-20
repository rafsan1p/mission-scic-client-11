import React from 'react';
import { Link } from 'react-router';
import { Droplet, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-gray-300">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Droplet className="w-8 h-8 text-red-500 fill-red-500" />
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">
                                BloodBridge
                            </h3>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Connecting blood donors with those in need. Together, we save lives and build a healthier community.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-3">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-800 hover:bg-sky-500 rounded-full flex items-center justify-center transition-all duration-300"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all duration-300"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-red-500 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/donation-requests" className="text-gray-400 hover:text-red-500 transition-colors">
                                    Donation Requests
                                </Link>
                            </li>
                            <li>
                                <Link to="/search-donors" className="text-gray-400 hover:text-red-500 transition-colors">
                                    Search Donors
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/funding" className="text-gray-400 hover:text-red-500 transition-colors">
                                    Funding
                                </Link>
                            </li>
                            <li>
                                <Link to="/signup" className="text-gray-400 hover:text-red-500 transition-colors">
                                    Register as Donor
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">Resources</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                                    About Blood Donation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                                    Eligibility Criteria
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                                    FAQs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-400">
                                    123 Blood Bank Street<br />
                                    Dhaka, Bangladesh
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-red-500 flex-shrink-0" />
                                <a href="tel:+8801234567890" className="text-sm text-gray-400 hover:text-red-500 transition-colors">
                                    +880 1234-567890
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-red-500 flex-shrink-0" />
                                <a href="mailto:info@bloodbridge.com" className="text-sm text-gray-400 hover:text-red-500 transition-colors">
                                    info@bloodbridge.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-400 text-center md:text-left">
                            © {new Date().getFullYear()} BloodBridge. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="text-sm text-gray-400 hover:text-red-500 transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-sm text-gray-400 hover:text-red-500 transition-colors">
                                Terms of Service
                            </a>
                            <a href="#" className="text-sm text-gray-400 hover:text-red-500 transition-colors">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;