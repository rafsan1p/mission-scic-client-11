import React from 'react';

import { MdHome, MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router';

const Error = () => {
    const navigate = useNavigate();

    return (
        <div className='min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4'>
            <div className='max-w-2xl mx-auto text-center'>
                {/* Error Image */}
                <div className='mb-8'>
                    <img 
                        src="/error-404.png" 
                        alt="404 Error" 
                        className='w-full max-w-lg mx-auto drop-shadow-2xl'
                    />
                </div>

                {/* Error Message */}
                <h1 className='text-5xl md:text-6xl font-bold text-white mb-4'>
                    Oops! Page Not Found
                </h1>
                <p className='text-xl text-gray-300 mb-8'>
                    The page you're looking for doesn't exist or has been moved.
                </p>

                {/* Action Buttons */}
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                    <button 
                        onClick={() => navigate(-1)}
                        className='px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2'>
                        <MdArrowBack className='w-5 h-5' />
                        Go Back
                    </button>
                    <button 
                        onClick={() => navigate('/')}
                        className='px-8 py-4 bg-linear-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2'>
                        <MdHome className='w-5 h-5' />
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Error;