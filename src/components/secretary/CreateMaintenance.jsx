import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import * as yup from "yup";
import clsx from "clsx";
import HandleClasses from "../common/HandleClasses";
import { toast } from "react-toastify";
import Loading from "../common/Loading";
import { useCreateMaintenanceMutation } from "@/redux/api/secreatry.api";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CreateMaintenance = () => {

    const [addMaintenance, { isSuccess, isLoading, isError, error }] = useCreateMaintenanceMutation();

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            month: "",
            amount: "",
            dueDate: "",
            description: "",
        },
        validationSchema: yup.object({
            month: yup.string().required(),
            amount: yup
                .number()
                .typeError("Amount must be a number")
                .positive("Amount must be greater than 0")
                .required("Amount is required"),
            dueDate: yup.string().required(),
            description: yup.string(),
        }),
        onSubmit: (values, { resetForm }) => {
            addMaintenance(values);
            resetForm();
        },
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("Maintenance Created Successfully");
            navigate("/secretary/maintenance")
        }
    }, [isSuccess]);

    if (isLoading) {
        return <Loading />;
    }

    return <>
        <div className="relative min-h-screen">
            <Button
                onClick={() => navigate(-1)}
                className="
                           group
                           relative
                           flex items-center gap-2
                           rounded-full
                           bg-blue-600
                           px-7 py-2
                           text-white
                           shadow-md
                           transition-all duration-300
                           hover:bg-blue-700
                           hover:shadow-lg
                           hover:-translate-y-0.5
                           active:translate-y-0
                           cursor-pointer
                        "
            >
                <ArrowLeft
                    size={18}
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                />
                Back
            </Button>

            <div className="flex items-center justify-center p-4">
                <form
                    onSubmit={formik.handleSubmit}
                    className="backdrop-blur-md border border-white/20 p-10 rounded-2xl shadow-[0_0_20px_#145EFB] w-full max-w-md space-y-6"
                >
                    <h2 className="text-2xl font-bold text-center text-blue-600">
                        Create Maintenance
                    </h2>

                    {/* Month Picker */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="month">Month</Label>
                        <Input
                            type="month"
                            id="month"
                            {...formik.getFieldProps("month")}
                            min={new Date().toISOString().slice(0, 7)}
                            className={clsx(
                                "focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB]",
                                HandleClasses(formik, "month")
                            )}
                        />
                        {formik.touched.month && formik.errors.month && (
                            <p className="text-red-500 text-sm">{formik.errors.month}</p>
                        )}
                    </div>

                    {/* Amount */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            {...formik.getFieldProps("amount")}
                            type="text"
                            id="amount"
                            placeholder="Enter Amount"
                            className={clsx(
                                "backdrop-blur-sm focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB]",
                                HandleClasses(formik, "amount")
                            )}
                        />
                        {formik.touched.amount && formik.errors.amount && (
                            <p className="text-red-500 text-sm">{formik.errors.amount}</p>
                        )}
                    </div>

                    {/* Due Date */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input
                            {...formik.getFieldProps("dueDate")}
                            type="date"
                            id="dueDate"
                            min={new Date().toISOString().split("T")[0]}
                            className={clsx(
                                "focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB]",
                                HandleClasses(formik, "dueDate")
                            )}
                        />
                        {formik.touched.dueDate && formik.errors.dueDate && (
                            <p className="text-red-500 text-sm">{formik.errors.dueDate}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            {...formik.getFieldProps("description")}
                            type="text"
                            id="description"
                            placeholder="Enter Description"
                            className={clsx(
                                "backdrop-blur-sm focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB]",
                                HandleClasses(formik, "description")
                            )}
                        />
                        {formik.touched.description && formik.errors.description && (
                            <p className="text-red-500 text-sm">{formik.errors.description}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="bg-[#145EFB] hover:bg-blue-700 cursor-pointer text-white w-full mt-4"
                    >
                        Create Maintenance
                    </Button>
                </form>
            </div>
        </div>
    </>
};

export default CreateMaintenance;
