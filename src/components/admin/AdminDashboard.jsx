import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Building2Icon, UsersIcon, } from "lucide-react";
import { toast } from "react-toastify";
import { useAdminLogoutMutation } from "@/redux/api/auth.api";
import profileImage from "../../assets/images/default-man.jpg"

const AdminDashboard = () => {

    const navigate = useNavigate()

    const [adminLogout, { isSuccess }] = useAdminLogoutMutation()

    const [open, setOpen] = useState(true);

    const location = useLocation();

    const menuItems = [
        { label: "All Society Details", path: "/admin/society/details", icon: Building2Icon },
        { label: "ContactUs Details", path: "/admin/contact/details", icon: UsersIcon },
    ];

    const getPageTitle = () => {
        const current = menuItems.find(item => location.pathname === item.path);
        return current ? current.label : "Admin Dashboard";
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Admin Logout Sucessfully")
            // navigate("/admin-login")
        }
    }, [isSuccess])

    useEffect(() => {
        if (location.pathname === "/admin") {

            const timer = setTimeout(() => {
                navigate("/admin/society/details");
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [location.pathname]);


    return (
        <div className="flex min-h-screen bg-gray-100">

            <aside
                className={`
                    fixed top-0 left-0 h-screen bg-blue-600 text-white z-40
                    transition-all duration-300
                    sm:w-20                      /* Tablet ALWAYS collapsed */
                    ${open ? "lg:w-64" : "lg:w-20"}  /* Laptop toggle */
                    hidden sm:flex flex-col
                `}
            >

                <div className="flex items-center justify-center lg:justify-start gap-3 p-4 border-b border-blue-500">

                    <img
                        src={profileImage}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover object-top border-2 border-white"
                    />

                    {open && (
                        <div className="hidden lg:block">
                            <h1 className="text-lg font-semibold">
                                Admin
                            </h1>
                        </div>
                    )}
                </div>

                <nav className="px-2 mt-3 space-y-2 overflow-y-auto">
                    {menuItems.map((item, i) => {
                        const Icon = item.icon;
                        const active = location.pathname === item.path;

                        return (
                            <Link
                                key={i}
                                to={item.path}
                                className={`
                                    flex items-center gap-3 p-3 rounded-lg transition
                                    ${active ? "bg-blue-700" : "hover:bg-blue-500"}

                                    justify-center         /* Tablet: icons only */
                                    lg:justify-start        /* Laptop: icons + text */
                                `}
                            >
                                <Icon size={22} />

                                {open && <span className="hidden lg:inline">{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            <main
                className={`
                    flex-1 transition-all duration-300
                    sm:ml-20              /* Tablet margin */
                    ${open ? "lg:ml-64" : "lg:ml-20"}   /* Laptop margin */
                `}
            >
                <header className="p-4 bg-white shadow flex items-center justify-between sticky top-0 z-50">

                    {/* LEFT SIDE — Toggle + Title */}
                    <div className="flex items-center gap-3">
                        <div className="hidden lg:block">
                            {open ? (
                                <X size={28} className="cursor-pointer" onClick={() => setOpen(false)} />
                            ) : (
                                <Menu size={28} className="cursor-pointer" onClick={() => setOpen(true)} />
                            )}
                        </div>

                        <h2 className="text-lg font-semibold">{getPageTitle()}</h2>
                    </div>

                    <button
                        onClick={() => adminLogout()}
                        className="border border-red-700 text-red-600 cursor-pointer px-4 py-2 rounded-md hover:bg-red-600 hover:text-white transition"
                    >
                        Logout
                    </button>

                </header>

                <div className="p-6 flex-1">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
