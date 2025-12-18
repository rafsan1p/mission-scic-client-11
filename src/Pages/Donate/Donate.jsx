import React, { useContext } from 'react';
import useAxios from '../../hooks/useAxios';
import { AuthContext } from '../../Provider/AuthProvider';

const Donate = () => {
    const axiosInstance = useAxios();
    const {user} = useContext(AuthContext)
    

    const handleCheckout = (e)=>{
        e.preventDefault();

        const donateAmount = e.target.donateAmount.value;
        const donorEmail = user?.email;
        const donorName = user?.displayName;

        const formData = {
            donateAmount,
            donorEmail,
            donorName
        }

        axiosInstance.post('/create-payment-checkout', formData)
        .then(res=>{
            console.log(res.data);
            window.location.href = res.data.url
        })
        
    }
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Donate Blood</h2>
                <form onSubmit={handleCheckout} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Your Name</label>
                        <input name = 'donateAmount'
                            type="text" 
                            placeholder="Type here" 
                            className="input input-bordered w-full" 
                        />
                    </div>
                    <button className='btn btn-primary w-full' type='submit'>
                        Donate
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Donate;