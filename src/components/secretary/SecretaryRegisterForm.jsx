import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useFormik } from 'formik';
import * as yup from 'yup'
import clsx from "clsx"
import { useSecreatryRegisterMutation } from '@/redux/api/auth.api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../common/Loading';
import HandleClasses from '../common/HandleClasses';

const SecretaryRegisterForm = () => {

    const [secreatrySignUp, { isSuccess, isLoading, isError, error }] = useSecreatryRegisterMutation()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            societyName: "",
            societyAddress: "",
            societyImage: [],
            secretaryName: "",
            email: "",
            mobile: "",
            password: "",
            secretaryProfile: "",
        },
        validationSchema: yup.object({
            societyName: yup.string().required(),
            societyAddress: yup.string().required(),
            societyImage: yup.array().min(1, "At least one image required").required(),
            secretaryName: yup.string().required(),
            email: yup.string().required().email(),
            mobile: yup
                .string()
                .required("Mobile number is required")
                .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
            password: yup.string().required(),
            secretaryProfile: yup.string().required(),
        }),
        onSubmit: (values, { resetForm }) => {
            const fd = new FormData()

            fd.append("societyName", values.societyName),
                fd.append("societyAddress", values.societyAddress),

                values.societyImage.forEach((file) => {
                    fd.append("societyImage", file);
                });

            fd.append("secretaryName", values.secretaryName),
                fd.append("email", values.email),
                fd.append("mobile", values.mobile),
                fd.append("password", values.password),
                fd.append("secretaryProfile", values.secretaryProfile),

                secreatrySignUp(fd)

            resetForm()
        }
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success("Secreatry Register Successfully")
            navigate("/secretary-login")
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            toast.error(error.data.message || "unable to register")
        }
    }, [isError])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <form onSubmit={formik.handleSubmit} className="backdrop-blur-md border border-white/20 p-10 rounded-2xl shadow-[0_0_20px_#145EFB] w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-8 text-center text-blue-600">
                    Secretary Registration
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="societyName">Society Name</Label>
                        <Input
                            {...formik.getFieldProps("societyName")}
                            id="societyName"
                            placeholder="Enter Society Name"
                            className={clsx(
                                "backdrop-blur-sm focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB]",
                                HandleClasses(formik, "societyName")
                            )}
                        />
                        {formik.touched.societyName && formik.errors.societyName && (
                            <p className="text-red-500 text-sm">{formik.errors.societyName}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="societyAddress">Society Address</Label>
                        <Input
                            {...formik.getFieldProps("societyAddress")}
                            id="societyAddress"
                            placeholder="Enter Address"
                            className={clsx(
                                "backdrop-blur-sm focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB]",
                                HandleClasses(formik, "societyAddress")
                            )}
                        />
                        {formik.touched.societyAddress && formik.errors.societyAddress && (
                            <p className="text-red-500 text-sm">{formik.errors.societyAddress}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="societyImage">Society Image</Label>
                        <Input
                            multiple
                            onChange={(e) => {
                                formik.setFieldValue("societyImage", Array.from(e.target.files))
                            }}
                            type="file"
                            id="societyImage"
                            className={clsx(
                                "backdrop-blur-sm focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB]",
                                HandleClasses(formik, "societyImage")
                            )}
                        />
                        {formik.touched.societyImage && formik.errors.societyImage && (
                            <p className="text-red-500 text-sm">{formik.errors.societyImage}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="secretaryName">Secretary Name</Label>
                        <Input
                            {...formik.getFieldProps("secretaryName")}
                            id="secretaryName"
                            placeholder="Enter Secretary Name"
                            className={clsx(
                                "backdrop-blur-sm focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB]",
                                HandleClasses(formik, "secretaryName")
                            )}
                        />
                        {formik.touched.secretaryName && formik.errors.secretaryName && (
                            <p className="text-red-500 text-sm">{formik.errors.secretaryName}</p>
                        )}
                    </div>

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

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="mobile">Mobile</Label>
                        <Input
                            {...formik.getFieldProps("mobile")}
                            type="tel"
                            id="mobile"
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

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="secretaryProfile">Secretary Profile</Label>
                        <Input
                            onChange={(e) => {
                                formik.setFieldValue("secretaryProfile", e.target.files[0])
                            }}
                            type="file"
                            id="secretaryProfile"
                            className={clsx(
                                "backdrop-blur-sm focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB]",
                                HandleClasses(formik, "secretaryProfile")
                            )}
                        />
                        {formik.touched.secretaryProfile && formik.errors.secretaryProfile && (
                            <p className="text-red-500 text-sm">{formik.errors.secretaryProfile}</p>
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

                <p className="mt-4 text-center text-gray-700">
                    Already registered?{' '}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Login here
                    </a>
                </p>

            </form>
        </div>
    );
};

export default SecretaryRegisterForm;
