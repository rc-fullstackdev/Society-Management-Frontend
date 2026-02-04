import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
    Menu, X, Users, Wallet,
    Calendar, IndianRupee,
    User,
    UserPlusIcon,
    ShieldPlus,
    AlertCircle,
    ClipboardList,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useSecreatryLogoutMutation } from "@/redux/api/auth.api";
import { toast } from "react-toastify";

const SecretaryDashboard = () => {

    const { secreatry } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [secreatryLogout, { isSuccess }] = useSecreatryLogoutMutation()

    const [open, setOpen] = useState(true);

    const location = useLocation();

    const menuItems = [
        { label: "Add Residents", path: "/secretary/residents/register", icon: UserPlusIcon },
        { label: "Add Guard", path: "/secretary/guards/register", icon: ShieldPlus },
        { label: "Residents", path: "/secretary/residents", icon: Users },
        { label: "Security Guard", path: "/secretary/guard", icon: User },
        { label: "Maintenance List", path: "/secretary/maintenance", icon: Wallet },
        { label: "Payment", path: "/secretary/payment", icon: IndianRupee },
        { label: "Events", path: "/secretary/events", icon: Calendar },
        { label: "Complaint", path: "/secretary/all/complaint", icon: AlertCircle },
        { label: "Society Visitor", path: "/secretary/society/guest", icon: ClipboardList },
        { label: "Residents Booking", path: "/secretary/facility/booking", icon: ClipboardList },
    ];

    const getPageTitle = () => {
        const current = menuItems.find(item => location.pathname.startsWith(item.path));
        return current ? current.label : "Secretary Dashboard";
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Secreatry Logout Sucessfully")
            navigate("/secretary-login")
        }
    }, [isSuccess])

    useEffect(() => {
        if (location.pathname === "/secretary") {

            const timer = setTimeout(() => {
                navigate("/secretary/residents/register");
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
                        src={secreatry?.profileImage || "/default-user.png"}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover object-top border-2 border-white"
                    />

                    {open && (
                        <div className="hidden lg:block">
                            <h1 className="text-lg font-semibold">
                                {secreatry?.secretaryName || "No Name"}
                            </h1>
                        </div>
                    )}
                </div>

                <nav className="px-2 my-5 space-y-2 overflow-y-auto scrollbar-hide flex-1">
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
                        onClick={() => secreatryLogout()}
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

export default SecretaryDashboard;
