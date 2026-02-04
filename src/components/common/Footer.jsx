import { Separator } from "@/components/ui/separator";
import { FaFacebook, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-50 via-white to-blue-50 text-gray-700 pt-16 pb-10 mt-20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-12">

                {/* BRANDING */}
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                        Society Saathi
                    </h2>
                    <p className="mt-4 text-gray-600 leading-relaxed">
                        A complete society automation platform for gated communities,
                        apartments and RWAs. Manage residents, maintenance, complaints,
                        visitors and payments — all in one dashboard.
                    </p>
                </div>

                {/* PRODUCT LINKS */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Product</h3>
                    <ul className="space-y-2">
                        <li><a className="hover:text-blue-600 cursor-pointer">Home</a></li>
                        <li><a className="hover:text-blue-600 cursor-pointer">Features</a></li>
                        <li><a className="hover:text-blue-600 cursor-pointer">Pricing</a></li>
                        <li><a className="hover:text-blue-600 cursor-pointer">Services</a></li>
                        <li><a className="hover:text-blue-600 cursor-pointer">Contact</a></li>
                        <li><a className="hover:text-blue-600 cursor-pointer">Login</a></li>
                    </ul>
                </div>

                {/* FEATURE MODULES */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Modules</h3>
                    <ul className="space-y-2">
                        <li>Maintenance Collection</li>
                        <li>Resident Management</li>
                        <li>Complaint Handling</li>
                        <li>Visitor Tracking</li>
                        <li>Payments & Reports</li>
                        <li>Notice Board</li>
                        <li>Facility Booking</li>
                    </ul>
                </div>

                {/* SUPPORT */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Support</h3>
                    <ul className="space-y-3">
                        <li><a className="hover:text-blue-600 cursor-pointer">Help Center</a></li>
                        <li><a className="hover:text-blue-600 cursor-pointer">FAQs</a></li>
                        <li><a className="hover:text-blue-600 cursor-pointer">Privacy Policy</a></li>
                        <li><a className="hover:text-blue-600 cursor-pointer">Terms & Conditions</a></li>
                    </ul>
                </div>

                {/* CONTACT INFO */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <FaPhoneAlt size={18} className="text-blue-600" />
                            <span>+91 98765 43210</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="inline-flex">
                                <FaEnvelope size={18} className="text-blue-600" />
                            </span>
                            <span>support@societysaathi.com</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <FaMapMarkerAlt size={18} className="text-blue-600" />
                            <span>Pune, India</span>
                        </div>

                        <div className="flex items-center gap-4 mt-3">
                            <FaFacebook className="text-blue-600 hover:text-blue-800 cursor-pointer" size={20} />
                            <FaInstagram className="text-pink-600 hover:text-pink-700 cursor-pointer" size={20} />
                            <FaLinkedin className="text-blue-700 hover:text-blue-900 cursor-pointer" size={20} />
                        </div>
                    </div>
                </div>

            </div>

            <Separator className="my-10 bg-blue-200" />

            <div className="text-center text-gray-600 text-sm">
                © {new Date().getFullYear()} Society Saathi. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
