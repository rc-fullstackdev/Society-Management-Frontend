import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useResidentialLoginMutation } from "@/redux/api/auth.api";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup"
import clsx from "clsx"
import HandleClasses from "../common/HandleClasses";
import { toast } from "react-toastify";
import Loading from "../common/Loading";

const ResidentialLoginForm = () => {

    const [residentialSignIn, { isSuccess, isLoading, isError, error }] = useResidentialLoginMutation()

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().required().email(),
            password: yup.string().required(),
        }),
        onSubmit: (values, { resetForm }) => {
            residentialSignIn(values)
            resetForm()
        }
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success("Residential Login Successfully")
            navigate("/residential")
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            toast.error(error.data.message || "unable to login")
        }
    }, [isError])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <form onSubmit={formik.handleSubmit} className="backdrop-blur-md border border-white/20 p-10 rounded-2xl shadow-[0_0_20px_#145EFB] w-full max-w-md">

                <h2 className="text-2xl font-bold mb-8 text-center text-blue-600">
                    Residential Login
                </h2>

                <div className="flex flex-col gap-6">

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
                            )} />

                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-sm">{formik.errors.email}</p>
                        )}
                    </div>

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
                            )} />

                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-sm">{formik.errors.password}</p>
                        )}
                    </div>

                </div>

                <div className="mt-8">
                    <Button
                        type="submit"
                        className="bg-[#145EFB] hover:bg-blue-700 cursor-pointer text-white w-full"
                    >
                        Login
                    </Button>
                </div>

            </form>
        </div>
    );
};

export default ResidentialLoginForm;