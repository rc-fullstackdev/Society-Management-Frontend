import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import * as yup from "yup";
import clsx from "clsx";
import HandleClasses from "../common/HandleClasses";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useBookingFacilityMutation } from "@/redux/api/residential.api";
import Loading from "../common/Loading";
import { toast } from "react-toastify";

const FacilityBookingForm = () => {

    const [createFacility, { isSuccess, isLoading }] = useBookingFacilityMutation()

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            facilityType: "",
            bookingDate: "",
            startTime: "",
            endTime: "",
        },
        validationSchema: yup.object({
            facilityType: yup.string()
                .oneOf(["garden", "club", "swimming_pool", "gym"], "Invalid facility type")
                .required("Facility type is required"),
            bookingDate: yup.string().required("Booking date is required"),
            startTime: yup.string().required("Start time is required"),
            endTime: yup
                .string()
                .required("End time is required")
                .test(
                    "is-greater",
                    "End time must be after start time",
                    function (value) {
                        const { startTime } = this.parent;
                        return startTime && value ? value > startTime : true;
                    }
                ),
        }),
        onSubmit: (values, { resetForm }) => {
            createFacility(values)
            resetForm();
        },
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("Facility Booking Successfully")
            navigate("/residential/get/facility/booking")
        }
    }, [isSuccess])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="relative min-h-screen">
            <Button onClick={() => navigate(-1)} className="rounded-full bg-blue-600 px-7 py-2 text-white cursor-pointer">
                <ArrowLeft size={18} /> Back
            </Button>

            <div className="flex items-center justify-center p-4">
                <form
                    onSubmit={formik.handleSubmit}
                    className="backdrop-blur-md border border-white/20 p-10 rounded-2xl shadow-[0_0_20px_#145EFB] w-full max-w-md space-y-6"
                >
                    <h2 className="text-2xl font-bold text-center text-blue-600">
                        Facility Booking
                    </h2>

                    {/* Facility Type */}
                    <div className="flex flex-col gap-2">
                        <Label>Facility Type</Label>

                        <Select
                            value={formik.values.facilityType}
                            onValueChange={(value) =>
                                formik.setFieldValue("facilityType", value)
                            }
                        >
                            <SelectTrigger
                                className={clsx(
                                    "w-full focus-visible:border-[#145EFB]",
                                    HandleClasses(formik, "facilityType")
                                )}
                            >
                                <SelectValue placeholder="Select Facility" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="garden">Garden</SelectItem>
                                <SelectItem value="club">Club</SelectItem>
                                <SelectItem value="swimming_pool">Swimming Pool</SelectItem>
                                <SelectItem value="gym">Gym</SelectItem>
                            </SelectContent>
                        </Select>

                        {formik.touched.facilityType && formik.errors.facilityType && (
                            <p className="text-red-500 text-sm">
                                {formik.errors.facilityType}
                            </p>
                        )}
                    </div>

                    {/* Booking Date */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="bookingDate">Booking Date</Label>
                        <Input
                            type="date"
                            id="bookingDate"
                            min={new Date().toISOString().split("T")[0]}
                            {...formik.getFieldProps("bookingDate")}
                            className={clsx(
                                "focus-visible:border-[#145EFB]",
                                HandleClasses(formik, "bookingDate")
                            )}
                        />
                        {formik.touched.bookingDate && formik.errors.bookingDate && (
                            <p className="text-red-500 text-sm">{formik.errors.bookingDate}</p>
                        )}
                    </div>

                    {/* Start Time */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="startTime">Start Time</Label>
                        <Input
                            type="time"
                            id="startTime"
                            {...formik.getFieldProps("startTime")}
                            className={clsx(
                                "focus-visible:border-[#145EFB]",
                                HandleClasses(formik, "startTime")
                            )}
                        />
                        {formik.touched.startTime && formik.errors.startTime && (
                            <p className="text-red-500 text-sm">{formik.errors.startTime}</p>
                        )}
                    </div>

                    {/* End Time */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="endTime">End Time</Label>
                        <Input
                            type="time"
                            id="endTime"
                            {...formik.getFieldProps("endTime")}
                            className={clsx(
                                "focus-visible:border-[#145EFB]",
                                HandleClasses(formik, "endTime")
                            )}
                        />
                        {formik.touched.endTime && formik.errors.endTime && (
                            <p className="text-red-500 text-sm">{formik.errors.endTime}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="bg-[#145EFB] hover:bg-blue-700 text-white w-full cursor-pointer"
                    >
                        Book Facility
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default FacilityBookingForm;

