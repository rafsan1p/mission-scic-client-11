import React, { useContext, useEffect, useState } from 'react';
import { DollarSign, Heart, Users, Calendar } from 'lucide-react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAxios from '../../../hooks/useAxios';
import { AuthContext } from '../../../Provider/AuthProvider';
import toast from 'react-hot-toast';

const Funding = () => {
    const { user } = useContext(AuthContext);
    const [payments, setPayments] = useState([]);
    const [totalFunding, setTotalFunding] = useState(0);
    const [loading, setLoading] = useState(true);
    const [donating, setDonating] = useState(false);
    const axiosSecure = useAxiosSecure();
    const axiosInstance = useAxios();

    useEffect(() => {
        fetchPayments();
        fetchTotalFunding();
    }, []);

    const fetchPayments = async () => {
        try {
            const res = await axiosSecure.get('/payments');
            setPayments(res.data);
            setLoading(false);
        } catch(err) {
            toast.error('Failed to load funding data');
            setLoading(false);
        }
    };

    const fetchTotalFunding = async () => {
        try {
            const res = await axiosInstance.get('/payments/total');
            setTotalFunding(res.data.total);
        } catch(err) {
            console.error('Failed to load total funding');
        }
    };

    const handleDonate = async (e) => {
        e.preventDefault();
        setDonating(true);

        const donateAmount = e.target.donateAmount.value;

        if (!donateAmount || donateAmount <= 0) {
            toast.error('Please enter a valid amount');
            setDonating(false);
            return;
        }

        const formData = {
            donateAmount,
            donorEmail: user?.email,
            donorName: user?.displayName
        };

        try {
            const res = await axiosInstance.post('/create-payment-checkout', formData);
            window.location.href = res.data.url;
        } catch(err) {
            toast.error('Failed to process donation');
            setDonating(false);
        }
    };

    return (
        <div className="p-4 lg:p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 min-h-screen">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg">
                    <Heart className="w-8 h-8 text-white fill-white" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    Funding Support
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Your generous contributions help us save more lives. Every donation counts!
                </p>
            </div>

            {/* Total Funding Card */}
            <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white rounded-2xl shadow-2xl p-8 mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-green-100 text-lg mb-2">Total Funds Collected</p>
                        <h2 className="text-5xl font-bold">${totalFunding.toFixed(2)}</h2>
                        <p className="text-green-100 mt-2">Thank you for your support! 🙏</p>
                    </div>
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <DollarSign className="w-12 h-12" />
                    </div>
                </div>
            </div>

            {/* Donation Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                    <h3 className="text-2xl font-bold text-gray-900">Make a Donation</h3>
                </div>
                
                <form onSubmit={handleDonate} className="max-w-md">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Donation Amount (USD)
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-semibold">
                                $
                            </span>
                            <input
                                name="donateAmount"
                                type="number"
                                step="0.01"
                                min="1"
                                placeholder="Enter amount"
                                required
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    {/* Quick Amount Buttons */}
                    <div className="grid grid-cols-4 gap-2 mb-6">
                        {[10, 25, 50, 100].map(amount => (
                            <button
                                key={amount}
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector('input[name="donateAmount"]').value = amount;
                                }}
                                className="py-2 bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-700 font-semibold rounded-lg transition-all"
                            >
                                ${amount}
                            </button>
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={donating}
                        className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {donating ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Processing...
                            </>
                        ) : (
                            <>
                                <Heart className="w-5 h-5" />
                                Donate Now
                            </>
                        )}
                    </button>

                    <p className="text-xs text-gray-500 mt-3 text-center">
                        Secure payment powered by Stripe
                    </p>
                </form>
            </div>

            {/* Payments List */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Users className="w-6 h-6 text-blue-500" />
                    <h3 className="text-2xl font-bold text-gray-900">Recent Donations</h3>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : payments.length === 0 ? (
                    <div className="text-center py-12">
                        <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No donations yet</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Donor Name</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment, index) => (
                                    <tr key={payment._id}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div>
                                                <div className="font-bold">{payment.donorName || 'Anonymous'}</div>
                                                <div className="text-sm opacity-50">{payment.donorEmail}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="font-bold text-green-600">
                                                ${payment.amount.toFixed(2)}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm">
                                                    {new Date(payment.paidAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="badge badge-success text-white">
                                                {payment.payment_status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Thank You Message */}
            <div className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl shadow-lg p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">🎉 Thank You!</h3>
                <p className="text-lg opacity-90">
                    Your donations help us maintain this platform and save more lives.
                </p>
            </div>
        </div>
    );
};

export default Funding;