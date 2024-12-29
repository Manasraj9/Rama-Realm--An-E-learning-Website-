import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaRupeeSign } from "react-icons/fa"; // Using React Icons instead of Font Awesome

const Pricing = () => {
    // Animation variants for container
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    // Animation variants for cards
    const cardVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const trialFeatures = [
        { feature: "Access to limited courses", available: true },
        { feature: "Personalized learning paths", available: false },
        { feature: "Additional support or hints while Interacting with VR Courses", available: false },
        { feature: "Speech and communication support tools", available: false },
        { feature: "Basic parent/caregiver dashboard", available: false },
        { feature: "Priority support (24/7)", available: false },
    ];

    const proFeatures = [
        { feature: "Access to all courses (including advanced and premium)", available: true },
        { feature: "Personalized learning paths", available: true },
        { feature: "Additional support or hints while Interacting with VR Courses", available: true },
        { feature: "Speech and communication support tools", available: true },
        { feature: "Full parent/caregiver dashboard", available: true },
        { feature: "Priority support (24/7)", available: true },
    ];

    const plans = [
        {
            title: "Trial Plan",
            price: "0",
            features: trialFeatures,
            description: "Perfect for beginners to explore our platform",
            footerText: "Start Free Trial",
            bgColor: "bg-gradient-to-br from-gray-50 to-gray-100",
            buttonColor: "bg-blue-600 text-white hover:bg-blue-700",
        },
        {
            title: "Pro Plan",
            price: "199",
            features: proFeatures,
            description: "Unlock full potential with premium features",
            footerText: "Get Pro Access",
            bgColor: "bg-gradient-to-br from-blue-600 to-indigo-700",
            buttonColor: "bg-white hover:bg-gray-100 text-blue-600",
            isPopular: true,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-20 px-4">
            <motion.div 
                className="max-w-7xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.h1 
                        className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Choose Your Plan
                    </motion.h1>
                    <motion.p 
                        className="text-gray-600 text-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Select the perfect plan for your learning journey
                    </motion.p>
                </div>

                {/* Pricing Cards Container */}
                <div className="flex flex-wrap justify-center gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className={`w-full max-w-md rounded-2xl ${plan.bgColor} ${plan.isPopular ? 'shadow-2xl scale-105' : 'shadow-xl'} overflow-hidden`}
                        >
                            {/* Popular Badge */}
                            {plan.isPopular && (
                                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-center py-2 text-white font-semibold">
                                    Most Popular Choice
                                </div>
                            )}

                            {/* Card Content */}
                            <div className="p-8">
                                <h3 className={`text-3xl font-bold mb-2 ${plan.isPopular ? 'text-white' : 'text-gray-900'}`}>
                                    {plan.title}
                                </h3>
                                <div className={`flex items-center mb-4 ${plan.isPopular ? 'text-white' : 'text-gray-900'}`}>
                                    <FaRupeeSign className="text-2xl mr-1" />
                                    <span className="text-5xl font-bold">{plan.price}</span>
                                    <span className="ml-2 text-lg opacity-80">/month</span>
                                </div>
                                <p className={`mb-6 ${plan.isPopular ? 'text-white opacity-90' : 'text-gray-600'}`}>
                                    {plan.description}
                                </p>

                                {/* Features List */}
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3">
                                            {feature.available ? (
                                                <FaCheck className={`${plan.isPopular ? 'text-green-300' : 'text-green-500'}`} />
                                            ) : (
                                                <FaTimes className="text-red-500" />
                                            )}
                                            <span className={`${plan.isPopular ? 'text-white opacity-90' : 'text-gray-700'}`}>
                                                {feature.feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Action Button */}
                                <button className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${plan.buttonColor}`}>
                                    {plan.footerText}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Pricing;