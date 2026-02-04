import React from 'react';
import { FaPlay, FaArrowRight, FaStar, FaCheck } from 'react-icons/fa';
import herobgImage from "../../assets/images/hero-section.jpeg";
import heroImage from "../../assets/images/hero-image.jpg";

const HeroSection = ({ id }) => {
    return (
        <section id={id} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
            <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent z-10"></div>

            <div className="absolute top-10 right-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-50 rounded-full blur-3xl opacity-40"></div>

            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${herobgImage})`,
                }}
            ></div>

            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10"></div>

            {/* Main Content */}
            <div className="relative z-20 container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="text-gray-800 space-y-8">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full px-4 py-2 shadow-lg">
                            <FaStar className="text-yellow-300 text-sm" />
                            <span className="text-sm font-medium text-white">Society Sathi</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Manage Your
                            <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                Society Seamlessly
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                            Manage your society effortlessly. Track residents, maintenance, and visitors—all in one intuitive platform. Simplify operations and stay in control.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                'Maintenance Collection',
                                'Resident Management',
                                'Complaint Handling',
                                'Payments & Reports'
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-1 shadow-sm">
                                        <FaCheck className="text-white text-xs" />
                                    </div>
                                    <span className="text-gray-700 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button className="group cursor-pointer bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-3">
                                <span>Let's Start</span>
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 border-8 border-white">
                            <img
                                src={heroImage}
                                alt="Society Management Dashboard"
                                className="w-full h-auto"
                            />
                        </div>

                        <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-2xl border border-gray-100">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">24/7</div>
                                <div className="text-xs text-gray-600">Support</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;