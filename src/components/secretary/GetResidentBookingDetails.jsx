import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Home, Layers, Building2, Phone } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetResidentBookingByIdQuery, useUpdateBookingStatusMutation } from "@/redux/api/secreatry.api";
import { useFormik } from "formik";
import * as yup from "yup"
import clsx from "clsx"
import { toast } from "react-toastify";
import HandleClasses from "../common/HandleClasses";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const GetResidentBookingDetails = () => {

    const { id } = useParams()
    const navigate = useNavigate();

    const { data } = useGetResidentBookingByIdQuery(id)
    const [modifyBookingStatus, { isLoading }] = useUpdateBookingStatusMutation()

    const booking = data?.result;
    const resident = data?.result?.residentId;

    const [actionStatus, setActionStatus] = useState(booking?.status || "");

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            status: booking?.status ?? "",
            bookingAmount: "",
            rejectReason: "",
        },
        validationSchema: yup.object({
            status: yup.string().required("Status is required"),

            bookingAmount: yup.number().when("status", {
                is: "approved",
                then: (schema) => schema.required("Amount is required"),
                otherwise: (schema) => schema.notRequired(),
            }),

            rejectReason: yup.string().when("status", {
                is: "rejected",
                then: (schema) => schema.required("Reject reason is required"),
                otherwise: (schema) => schema.notRequired(),
            }),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                await modifyBookingStatus({
                    bookingId: booking._id,
                    bookingData: values
                }).unwrap();
                toast.success("Facility Booking updated successfully");
                resetForm();
                setActionStatus("");
            } catch (error) {
                toast.error("Update failed");
            }
        },
    });

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    const formatTime = (time) => {
        if (!time) return "N/A";
        const [h, m] = time.split(":");
        const d = new Date();
        d.setHours(h, m);
        return d.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    useEffect(() => {
        if (booking?.status) {
            setActionStatus(booking.status);
            formik.setFieldValue("status", booking.status);
        }
    }, [booking]);

    if (!booking) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <p className="text-gray-500 text-lg">Loading booking details...</p>
            </div>
        );
    }


    return (
        <div className="flex justify-center px-4 py-10">
            <Card className="w-full max-w-6xl rounded-3xl bg-gradient-to-br from-blue-50 to-white shadow-lg">

                {/* HEADER */}
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <Button
                            onClick={() => navigate(-1)}
                            variant="ghost"
                            className="group flex items-center gap-2 rounded-full px-4 py-2 text-blue-600 hover:bg-blue-100 transition-all cursor-pointer" >
                            <ArrowLeft
                                size={18}
                                className="transition-transform group-hover:-translate-x-1"
                            />
                            Back
                        </Button>

                        <CardTitle className="text-2xl text-blue-600 text-center">
                            Facility Booking & Resident Details
                        </CardTitle>

                        <div className="w-[80px]" />
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* LEFT – BOOKING DETAILS */}
                        <Card className="rounded-2xl shadow-md pt-0">
                            <div className="bg-blue-600 text-white rounded-t-2xl p-5 flex items-center">
                                <h2 className="text-xl font-semibold capitalize">
                                    {booking.facilityType} Booking
                                </h2>

                                <Badge className="ml-auto bg-yellow-100 text-yellow-800 capitalize">
                                    {booking.status}
                                </Badge>
                            </div>

                            <CardContent className="space-y-6 pt-6">

                                {/* INFO ROW */}
                                <div className="bg-muted rounded-xl p-5 space-y-4">

                                    {/* Facility Type */}
                                    <div className="flex gap-3">
                                        <span className="text-sm text-gray-500 min-w-[110px]">
                                            Facility Type :
                                        </span>
                                        <span className="font-semibold capitalize">
                                            {booking.facilityType}
                                        </span>
                                    </div>

                                    {/* Booking Date */}
                                    <div className="flex gap-3">
                                        <span className="text-sm text-gray-500 min-w-[110px]">
                                            Booking Date :
                                        </span>
                                        <span className="font-semibold">
                                            {formatDate(booking.bookingDate)}
                                        </span>
                                    </div>

                                    {/* Time Slot */}
                                    <div className="flex gap-3">
                                        <span className="text-sm text-gray-500 min-w-[110px]">
                                            Time Slot :
                                        </span>
                                        <span className="font-semibold">
                                            {formatTime(booking.startTime)} – {formatTime(booking.endTime)}
                                        </span>
                                    </div>

                                </div>

                                <Separator />

                                {/* PAYMENT DETAILS */}
                                <div>
                                    <h3 className="font-semibold mb-2">
                                        Payment Details
                                    </h3>

                                    <div className="bg-muted p-4 rounded-xl grid grid-cols-2 gap-4">
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
                                            value={booking.paymentStatus || "Pending"}
                                        />
                                    </div>
                                </div>

                                {/* REJECT REASON */}
                                {booking.status === "rejected" && (
                                    <>
                                        <Separator />
                                        <div>
                                            <h3 className="font-semibold mb-2 text-red-600">
                                                Reject Reason
                                            </h3>

                                            <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-red-700">
                                                {booking.rejectReason}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        <div className="flex flex-col gap-6">

                            {/* RESIDENT DETAILS */}
                            <Card className="rounded-2xl shadow-md">
                                <CardHeader>
                                    <CardTitle className="text-blue-600">
                                        Resident Details
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-5">
                                    <div className="flex justify-center">
                                        <img
                                            src={resident?.residentialProfile}
                                            alt="Resident"
                                            className="w-24 h-24 rounded-full border object-cover object-top"
                                        />
                                    </div>

                                    <InfoRow icon={<Phone />} label="Mobile" value={resident?.mobile} />
                                    <InfoRow icon={<Home />} label="Flat" value={resident?.flatNumber} />
                                    <InfoRow icon={<Layers />} label="Floor" value={resident?.floor} />
                                    <InfoRow icon={<Building2 />} label="Wing" value={resident?.wing} />
                                </CardContent>
                            </Card>

                            {/* SECRETARY ACTION */}
                            <Card className="rounded-2xl shadow-md bg-blue-50">
                                <CardHeader>
                                    <CardTitle className="text-blue-600">
                                        Booking Action
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <form className="space-y-4" onSubmit={formik.handleSubmit}>
                                        <Select
                                            value={formik.values.status}
                                            onValueChange={(value) => {
                                                setActionStatus(value)
                                                formik.setFieldValue("status", value);
                                            }}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Update Status" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="approved">Approved</SelectItem>
                                                <SelectItem value="rejected">Rejected</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        {actionStatus === "approved" && (
                                            <div className="flex flex-col gap-2">
                                                <Input
                                                    {...formik.getFieldProps("bookingAmount")}
                                                    type="number"
                                                    placeholder="Enter Amount"
                                                    className={clsx(
                                                        "backdrop-blur-sm focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB]",
                                                        HandleClasses(formik, "bookingAmount")
                                                    )}
                                                />
                                                {formik.touched.bookingAmount && formik.errors.bookingAmount && (
                                                    <p className="text-red-500 text-sm">{formik.errors.bookingAmount}</p>
                                                )}
                                            </div>
                                        )}

                                        {actionStatus === "rejected" && (
                                            <div className="flex flex-col gap-2">
                                                <Textarea
                                                    {...formik.getFieldProps("rejectReason")}
                                                    placeholder="Enter Reject Reason"
                                                    className={clsx(
                                                        "backdrop-blur-sm focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB]",
                                                        HandleClasses(formik, "rejectReason")
                                                    )}
                                                />
                                                {formik.touched.rejectReason && formik.errors.rejectReason && (
                                                    <p className="text-red-500 text-sm">{formik.errors.rejectReason}</p>
                                                )}
                                            </div>
                                        )}

                                        <Button
                                            type="submit"
                                            className="w-full bg-[#145EFB] hover:bg-blue-700 text-white cursor-pointer"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Updating..." : "Update Booking"}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>

                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

/* ---------------- SMALL COMPONENTS ---------------- */

const InfoBox = ({ label, value, icon }) => (
    <div className="bg-muted p-5 rounded-xl flex flex-col gap-2 min-w-0 h-full">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
            {icon}
            <span>{label}</span>
        </div>

        <div className="font-semibold text-lg text-gray-900 break-words">
            {value}
        </div>
    </div>
);

const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-center gap-4 bg-muted px-4 py-3 rounded-xl">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            {icon}
        </div>

        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-semibold">{value}</p>
        </div>
    </div>
);

const Detail = ({ label, value }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-semibold">{value}</p>
    </div>
);

export default GetResidentBookingDetails;
