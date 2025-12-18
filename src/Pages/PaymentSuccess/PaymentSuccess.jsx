import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, Link } from 'react-router';
import useAxios from '../../hooks/useAxios';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const axiosInstance = useAxios();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const hasProcessed = useRef(false);

    useEffect(() => {
        if (!sessionId) {
            setLoading(false);
            setError(true);
            return;
        }

        // Prevent duplicate calls
        if (hasProcessed.current) {
            setLoading(false);
            return;
        }

        hasProcessed.current = true;

        axiosInstance.post(`/success-payment?session_id=${sessionId}`)
            .then(res => {
                console.log('Payment response:', res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Payment error:', err);
                setError(true);
                setLoading(false);
            });
    }, [axiosInstance, sessionId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-50">
                <div className="text-center">
                    <Loader className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
                    <p className="text-lg text-gray-600">Processing your payment...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 to-rose-50 p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Failed</h1>
                    <p className="text-gray-600 mb-6">
                        Something went wrong with your payment. Please try again.
                    </p>
                    <Link to="/donate" className="btn btn-error w-full">
                        Try Again
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-emerald-50 p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                <p className="text-gray-600 mb-6">
                    Thank you for your generous donation. Your contribution will help save lives.
                </p>
                <div className="bg-green-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-600">Transaction ID:</p>
                    <p className="text-sm font-mono text-gray-800 break-all">{sessionId}</p>
                </div>
                <div className="space-y-3">
                    <Link to="/" className="btn btn-primary w-full">
                        Go to Home
                    </Link>
                    <Link to="/dashboard" className="btn btn-outline w-full">
                        View Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;