import React from 'react';

const Pricing = ({ tickSign, crossSign }) => {
    return (
        <div className='px-4 py-8 max-w-7xl mx-auto'>
            <div className='flex justify-center gap-2'>
                {/* Trial Plan */}
                <div className="bg-white shadow-md rounded-lg p-6 max-w-[320px] max-h-[400px]">
                    <h3 className='text-2xl text-center font-bold'>Trial</h3>
                    <p>Perfect for trying out the platform with limited features. Start learning for free!</p>
                    <ul>
                        <li>Access to 1-3 introductory courses</li>
                        <li>Simple and structured content</li>
                        <li>Basic progress tracking</li>
                        <li>No access to premium courses or live sessions</li>
                        <li>Limited support (email only)</li>
                    </ul>
                    <button className='bg-blue-500 px-4 py-2 rounded-lg text-center text-white font-semibold hover:bg-blue-600'>Get Started (Free)</button>
                </div>

                {/* Pro Plan */}
                <div className="bg-white shadow-md rounded-lg p-6 max-w-[320px] max-h-[400px]">
                    <h3 className='text-2xl text-center font-bold'>Pro Plan</h3>
                    <p>$29/month - Unlock all features for a complete learning experience.</p>
                    <ul>
                        <li>Access to all courses (including advanced and premium)</li>
                        <li>Personalized learning paths</li>
                        <li>Live classes with professionals</li>
                        <li>Speech and communication support tools</li>
                        <li>Full parent/caregiver dashboard</li>
                        <li>Priority support (24/7)</li>
                    </ul>
                    <button className='bg-blue-500 px-4 py-2 rounded-lg text-center text-white font-semibold hover:bg-blue-600'>Upgrade to Pro</button>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
