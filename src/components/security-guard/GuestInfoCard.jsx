import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User, Phone, Home, Layers, Building2, ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const GuestInfoCard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const guest = location.state?.guestDetail;
    const resident = guest?.residentId;

    if (!guest) {
        return <p className="text-center text-red-500 mt-10">No guest data found</p>;
    }

    // const formatTime = (time) => {
    //     if (!time) return "Not Set";
    //     const [hours, minutes] = time.split(":");
    //     const date = new Date();
    //     date.setHours(hours, minutes);
    //     return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
    // };

    const formatTime = (time) => {
        if (!time) return "Not Set";

        return new Date(time).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    };


    return (
        <div className="flex justify-center px-4 py-10">
            <Card className="w-full max-w-5xl rounded-3xl bg-gradient-to-br from-blue-50 to-white shadow-[0_12px_40px_rgba(59,130,246,0.35)] border-blue-100">

                {/* ================= HEADER WITH BACK BUTTON ================= */}
                <CardHeader className="px-6">
                    <div className="flex items-center justify-between">
                        <Button
                            onClick={() => navigate(-1)}
                            variant="ghost"
                            className="group flex items-center gap-2 rounded-full px-4 py-2 text-blue-600 hover:bg-blue-100 transition-all cursor-pointer"
                        >
                            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                            Back
                        </Button>

                        <CardTitle className="text-2xl text-center text-blue-600">
                            Guest & Resident Details
                        </CardTitle>

                        <div className="w-[88px]" />
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* ================= Guest Card ================= */}
                        <Card className="rounded-2xl shadow-md border-blue-100">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xl text-blue-600">Guest Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <div className="flex justify-center">
                                    <div className="w-24 h-24 rounded-full border-2 border-blue-500 bg-gray-100 flex items-center justify-center text-xl font-bold text-blue-600">
                                        {guest?.guestName?.charAt(0)}
                                    </div>
                                </div>

                                <InfoRow icon={<User />} iconBg="bg-blue-100 text-blue-600" label="Guest Name" value={guest?.guestName} />
                                <InfoRow icon={<Phone />} iconBg="bg-green-100 text-green-600" label="Mobile" value={guest?.mobileNumber} />
                                <InfoRow icon={<Home />} iconBg="bg-purple-100 text-purple-600" label="Vehicle Number" value={guest?.vehicleNumber || "Not Set"} />
                                <InfoRow icon={<Layers />} iconBg="bg-orange-100 text-orange-600" label="In Time" value={formatTime(guest?.inTime)} />
                                <InfoRow icon={<Layers />} iconBg="bg-red-100 text-red-600" label="Out Time" value={formatTime(guest?.outTime)} />
                            </CardContent>
                        </Card>

                        {/* ================= Resident Card ================= */}
                        <Card className="rounded-2xl shadow-md border-green-100">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xl text-blue-600">Resident Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <div className="flex justify-center">
                                    <img
                                        src={resident?.residentialProfile}
                                        alt={resident?.name}
                                        className="w-24 h-24 rounded-full object-cover object-top border-2 border-blue-500"
                                    />
                                </div>

                                <InfoRow icon={<User />} iconBg="bg-green-100 text-green-600" label="Resident Name" value={resident?.name} />
                                <InfoRow icon={<Phone />} iconBg="bg-blue-100 text-blue-600" label="Mobile" value={resident?.mobile} />
                                <InfoRow icon={<Home />} iconBg="bg-purple-100 text-purple-600" label="Flat Number" value={resident?.flatNumber} />
                                <InfoRow icon={<Layers />} iconBg="bg-orange-100 text-orange-600" label="Floor" value={resident?.floor} />
                                <InfoRow icon={<Building2 />} iconBg="bg-indigo-100 text-indigo-600" label="Wing" value={resident?.wing} />
                            </CardContent>
                        </Card>

                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

const InfoRow = ({ icon, iconBg, label, value }) => (
    <div className="flex items-center gap-4 rounded-xl bg-muted px-4 py-3">
        <div className={`p-2 rounded-lg ${iconBg}`}>{icon}</div>
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-semibold">{value}</p>
        </div>
    </div>
);

export default GuestInfoCard;
