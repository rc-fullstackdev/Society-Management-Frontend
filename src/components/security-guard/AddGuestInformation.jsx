import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import * as yup from "yup"
import clsx from "clsx"
import { toast } from "react-toastify";
import Loading from "../common/Loading";
import HandleClasses from "../common/HandleClasses";
import { useLocation, useNavigate } from "react-router-dom";
import { useGuestInformationMutation } from "@/redux/api/securityGuard.api";

const AddGuestInformation = () => {

    const { state } = useLocation()

    const residentId = state?.residentId

    const [guestInformation, { isSuccess, isLoading, isError, error }] = useGuestInformationMutation()

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            guestName: "",
            mobileNumber: "",
            vehicleNumber: "",
        },
        validationSchema: yup.object({
            guestName: yup.string().required(),
            mobileNumber: yup
                .string()
                .required("Mobile number is required")
                .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
            vehicleNumber: yup.string().required(),
        }),
        onSubmit: (values, { resetForm }) => {
            guestInformation({ residentId: residentId, ...values })
            resetForm()
        }
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success("Guest Information Added  Successfully")
            navigate("/securityguard/all/guest")
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            toast.error(error.data.message || "unable to add guest information")
        }
    }, [isError])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="flex items-center justify-center p-4">
            <form onSubmit={formik.handleSubmit} className="backdrop-blur-md border border-white/20 p-10 rounded-2xl shadow-[0_0_20px_#145EFB] w-full max-w-4xl">

                <h2 className="text-2xl font-bold mb-8 text-center text-blue-600">
                    Add Guest Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            {...formik.getFieldProps("guestName")}
                            id="guestName"
                            placeholder="Enter Full Name"
                            className={clsx(
                                "backdrop-blur-sm focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB]",
                                HandleClasses(formik, "guestName")
                            )}
                        />

                        {formik.touched.guestName && formik.errors.guestName && (
                            <p className="text-red-500 text-sm">{formik.errors.guestName}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="mobileNumber">Mobile</Label>
                        <Input
                            {...formik.getFieldProps("mobileNumber")}
                            type="number"
                            id="mobileNumber"
                            placeholder="Enter Email"
                            className={clsx(
                                "backdrop-blur-sm focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB]",
                                HandleClasses(formik, "mobileNumber")
                            )}
                        />

                        {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                            <p className="text-red-500 text-sm">{formik.errors.mobileNumber}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                        <Input
                            {...formik.getFieldProps("vehicleNumber")}
                            type="text"
                            id="vehicleNumber"
                            maxLength={10}
                            placeholder="Enter vehicleNumber Number"
                            className={clsx(
                                "backdrop-blur-sm focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB]",
                                HandleClasses(formik, "vehicleNumber")
                            )}
                        />

                        {formik.touched.vehicleNumber && formik.errors.vehicleNumber && (
                            <p className="text-red-500 text-sm">{formik.errors.vehicleNumber}</p>
                        )}
                    </div>
                </div>

                <div className="mt-6">
                    <Button
                        type="submit"
                        className="bg-[#145EFB] hover:bg-blue-700 cursor-pointer text-white w-full"
                    >
                        Add Guest
                    </Button>
                </div>

            </form>
        </div>
    );
};

export default AddGuestInformation;