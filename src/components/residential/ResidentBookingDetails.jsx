import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "../ui/button";

const ResidentFacilityBookingDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const booking = state?.bookingDetails;

    if (!booking) {
        return (
            <p className="text-center text-gray-500 mt-10">
                Booking details not found
            </p>
        );
    }

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };


    const formatTime = (time) => {
        if (!time) return "N/A";

        const [hours, minutes] = time.split(":");
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);

        return date.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    };

    const statusStyle = {
        pending: "bg-yellow-100 text-yellow-700",
        approved: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700",
        cancelled: "bg-gray-100 text-gray-700",
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10">
            {/* Top Header */}
            <div className="mb-8 relative flex items-center justify-center">
                <Button
                    onClick={() => navigate(-1)}
                    variant="ghost"
                    className="group absolute left-0 flex items-center gap-1 rounded-full px-4 py-2 text-blue-600 hover:bg-blue-100 transition-all cursor-pointer" >
                    <ArrowLeft
                        size={18}
                        className="transition-transform group-hover:-translate-x-1"
                    />
                    Back
                </Button>

                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Facility Booking Details
                    </h1>
                    <p className="text-gray-600 mt-2">
                        View and manage facility booking information
                    </p>
                </div>
            </div>

            {/* Parent Card */}
            <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-white capitalize">
                        {booking.facilityType.replace("_", " ")}
                    </h2>

                    <span
                        className={`px-6 py-2 rounded-full text-sm font-semibold ${statusStyle[booking.status]}`}
                    >
                        {booking.status}
                    </span>
                </div>

                {/* Content */}
                <div className="p-10 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InfoCard
                            label="Facility Type"
                            value={booking.facilityType.replace("_", " ")}
                        />

                        <InfoCard
                            label="Booking Date"
                            value={formatDate(booking.bookingDate)}
                            icon={<Calendar size={18} />}
                        />

                        <InfoCard
                            label="Time Slot"
                            value={`${formatTime(booking.startTime)} - ${formatTime(
                                booking.endTime
                            )}`}
                            icon={<Clock size={18} />}
                        />
                    </div>

                    <hr />

                    {/* Booking Details */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">
                            Booking Information
                        </h3>

                        <div className="bg-gray-50 border rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Detail
                                label="Booking Amount"
                                value={
                                    booking.bookingAmount
                                        ? `₹ ${booking.bookingAmount}`
                                        : "Not Assigned"
                                }
                            />
                            <Detail
                                label="Payment Status"
                                value={booking.paymentStatus}
                            />
                        </div>
                    </div>

                    {/* Reject Reason */}
                    {booking.status === "rejected" && (
                        <div>
                            <h3 className="text-xl font-semibold mb-3">
                                Reject Reason
                            </h3>
                            <div className="bg-red-50 border border-red-200 p-5 rounded-xl text-red-700">
                                {booking.rejectReason}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const InfoCard = ({ label, value, icon }) => (
    <div className="border rounded-2xl p-6 flex items-center gap-4 bg-white">
        {icon && <div className="text-blue-600">{icon}</div>}
        <div>
            <p className="text-gray-500 text-sm">{label}</p>
            <p className="font-semibold text-lg capitalize">{value}</p>
        </div>
    </div>
);

const Detail = ({ label, value }) => (
    <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="font-medium text-lg capitalize">{value}</p>
    </div>
);

export default ResidentFacilityBookingDetails;
