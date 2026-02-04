import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSecurityGuardRegisterMutation } from "@/redux/api/auth.api";
import { useFormik } from "formik";
import * as yup from "yup"
import clsx from "clsx"
import { toast } from "react-toastify";
import Loading from "../common/Loading";
import HandleClasses from "../common/HandleClasses";

const GuardRegisterForm = () => {

    const [guardSignUp, { isSuccess, isLoading, isError, error }] = useSecurityGuardRegisterMutation()

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: "",
            password: "",
            securityGuardProfile: "",
        },
        validationSchema: yup.object({
            name: yup.string().required(),
            email: yup.string().required().email(),
            mobile: yup
                .string()
                .required("Mobile number is required")
                .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
            password: yup.string().required(),
            securityGuardProfile: yup.string().required(),
        }),
        onSubmit: (values, { resetForm }) => {

            const fd = new FormData()

            fd.append("name", values.name)
            fd.append("email", values.email)
            fd.append("mobile", values.mobile)
            fd.append("password", values.password)
            fd.append("securityGuardProfile", values.securityGuardProfile)

            guardSignUp(fd)

            resetForm()
        }
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success("Security Guard Register Successfully")
        }
    }, [isSuccess])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="flex items-center justify-center p-4">
            <form onSubmit={formik.handleSubmit} className="backdrop-blur-md border border-white/20 p-10 rounded-2xl shadow-[0_0_20px_#145EFB] w-full max-w-4xl">

                <h2 className="text-2xl font-bold mb-8 text-center text-blue-600">
                    Security Guard Registration
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Name */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            {...formik.getFieldProps("name")}
                            id="name"
                            placeholder="Enter Full Name"
                            className={clsx(
                                "backdrop-blur-sm focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB]",
                                HandleClasses(formik, "name")
                            )}
                        />

                        {formik.touched.name && formik.errors.name && (
                            <p className="text-red-500 text-sm">{formik.errors.name}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            {...formik.getFieldProps("email")}
                            type="email"
                            id="email"
                            placeholder="Enter Email"
                            className={clsx(
                                "backdrop-blur-sm focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB]",
                                HandleClasses(formik, "email")
                            )}
                        />

                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-sm">{formik.errors.email}</p>
                        )}
                    </div>

                    {/* Mobile */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="mobile">Mobile</Label>
                        <Input
                            {...formik.getFieldProps("mobile")}
                            type="number"
                            id="mobile"
                            maxLength={10}
                            placeholder="Enter Mobile Number"
                            className={clsx(
                                "backdrop-blur-sm focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB]",
                                HandleClasses(formik, "mobile")
                            )}
                        />

                        {formik.touched.mobile && formik.errors.mobile && (
                            <p className="text-red-500 text-sm">{formik.errors.mobile}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            {...formik.getFieldProps("password")}
                            type="password"
                            id="password"
                            placeholder="Enter Password"
                            className={clsx(
                                "backdrop-blur-sm focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB]",
                                HandleClasses(formik, "password")
                            )}
                        />

                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-sm">{formik.errors.password}</p>
                        )}
                    </div>

                    {/* Security Guard Profile */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <Label htmlFor="securityGuardProfile">Security Guard Profile</Label>
                        <Input
                            onChange={(e) => {
                                formik.setFieldValue("securityGuardProfile", e.target.files[0])
                            }}
                            type="file"
                            id="securityGuardProfile"
                            className={clsx(
                                "backdrop-blur-sm focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB]",
                                HandleClasses(formik, "securityGuardProfile")
                            )}
                        />

                        {formik.touched.securityGuardProfile && formik.errors.securityGuardProfile && (
                            <p className="text-red-500 text-sm">{formik.errors.securityGuardProfile}</p>
                        )}
                    </div>

                </div>

                <div className="mt-6">
                    <Button
                        type="submit"
                        className="bg-[#145EFB] hover:bg-blue-700 cursor-pointer text-white w-full"
                    >
                        Register
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default GuardRegisterForm;