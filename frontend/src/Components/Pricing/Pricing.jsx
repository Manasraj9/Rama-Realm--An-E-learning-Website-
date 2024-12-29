import React from 'react';
import { motion } from 'framer-motion'; // Import framer-motion for animation

const Pricing = () => {
    const tickSign = <i className="fas fa-check-circle text-green-500"></i>;
    const crossSign = <i className="fas fa-times-circle text-red-500"></i>;
    const rupeeSign = <i className="fas fa-indian-rupee-sign text-green-700"></i>; // Using Font Awesome's Indian Rupee Sign icon

    // Features for Trial and Pro plans with availability (true = available, false = unavailable)
    const trialFeatures = [
        { feature: "Access to limited courses", available: true },
        { feature: "Personalized learning paths", available: true },
        { feature: "No live classes", available: false },
        { feature: "Speech and communication support tools", available: false },
        { feature: "Basic parent/caregiver dashboard", available: true },
        { feature: "Priority support (24/7)", available: false },
    ];

    const proFeatures = [
        "Access to all courses (including advanced and premium)",
        "Personalized learning paths",
        "Live classes with professionals",
        "Speech and communication support tools",
        "Full parent/caregiver dashboard",
        "Priority support (24/7)",
    ];

    // Define the plans array with features linked to each plan
    const plans = [
        {
            title: "Trial Plan",
            price: "0",
            features: trialFeatures,
            description: "Start with the basics, explore free courses.",
            footerText: "Try Free",
        },
        {
            title: "Pro Plan",
            price: "4999",
            features: proFeatures,
            description: "Access everything and unlock full potential.",
            footerText: "Switch to Pro",
        },
    ];

    return (
        <div className="px-4 py-8 max-w-7xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-5xl font-bold text-gray-800">Choose Your Plan</h1>
            </div>

            {/* Parent div containing both Trial and Pro plans */}
            <div className="flex justify-center gap-4 flex-wrap">
                <div className="flex flex-wrap gap-4">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }} // Initial state (hidden)
                            animate={{ opacity: 1, y: 0 }} // Final state (visible)
                            transition={{ duration: 0.5, delay: index * 0.2 }} // Delay for staggered effect
                            className="bg-white shadow-md rounded-lg p-6 max-w-[400px] max-h-[700px] transform transition-all hover:scale-105"
                        >
                            <h3 className="text-4xl text-center font-bold">{plan.title}</h3>
                            <h4 className="text-3xl font-semibold text-gray-500 mb-2">
                                {rupeeSign} {plan.price} {/* Display the rupee symbol */}
                            </h4>
                            <p className="text-center text-lg text-gray-600 mb-2">{plan.description}</p>

                            {/* Features list for Trial Plan */}
                            <ul className="space-y-2">
                                {plan.title === "Trial Plan" &&
                                    plan.features.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            {item.available ? tickSign : crossSign} {item.feature}
                                        </li>
                                    ))}

                                {/* Features list for Pro Plan */}
                                {plan.title === "Pro Plan" &&
                                    plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            {tickSign} {feature}
                                        </li>
                                    ))}
                            </ul>

                            {/* Footer Text: only show for Pro Plan */}
                            {plan.footerText && (
                                <div className="flex justify-end mt-4">
                                    <button className="bg-blue-500 px-4 py-2 rounded-lg text-center text-white font-semibold hover:bg-blue-600">
                                        {plan.footerText}
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Pricing;
