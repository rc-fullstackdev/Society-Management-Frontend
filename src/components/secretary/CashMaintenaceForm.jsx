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
import { useCashMaintenacePayMutation } from "@/redux/api/secreatry.api";
import { useLocation, useNavigate } from "react-router-dom";

const CashMaintenaceForm = () => {

    const { state } = useLocation()

    const residentId = state?.residentId

    const navigate = useNavigate()

    const [payCashMaintenance, { isSuccess, isLoading, isError, error }] = useCashMaintenacePayMutation();

    const formik = useFormik({
        initialValues: {
            amountPaid: "",
            paymentDate: "",
            month: ""
        },
        validationSchema: yup.object({
            amountPaid: yup
                .number()
                .typeError("Amount must be a number")
                .positive("Amount must be greater than 0")
                .required("Amount is required"),
            paymentDate: yup.string().required(),
            month: yup.string().required(),
        }),
        onSubmit: (values, { resetForm }) => {
            payCashMaintenance({
                residentId: residentId,
                ...values
            });
            resetForm();
        },
    });

    useEffect(() => {
        if (!formik.values.paymentDate) {
            formik.setFieldValue(
                "paymentDate",
                new Date().toISOString().split("T")[0]
            );
        }
    }, []);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Cash Maintenance Paid Successfully");
            navigate("/secretary/payment")
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message || "Unable to paid cash maintenance");
        }
    }, [isError]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="flex items-center justify-center p-4">
            <form
                onSubmit={formik.handleSubmit}
                className="backdrop-blur-md border border-white/20 p-10 rounded-2xl shadow-[0_0_20px_#145EFB] w-full max-w-md space-y-6"
            >
                <h2 className="text-2xl font-bold text-center text-blue-600">
                    Cash Maintenance
                </h2>

                {/* Amount */}
                <div className="flex flex-col gap-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                        {...formik.getFieldProps("amountPaid")}
                        type="number"
                        id="amountPaid"
                        placeholder="Enter Amount"
                        className={clsx(
                            "backdrop-blur-sm focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB]",
                            HandleClasses(formik, "amountPaid")
                        )}
                    />
                    {formik.touched.amountPaid && formik.errors.amountPaid && (
                        <p className="text-red-500 text-sm">{formik.errors.amountPaid}</p>
                    )}
                </div>

                {/* Due Date */}
                <div className="flex flex-col gap-2">
                    <Label htmlFor="dueDate">Payment Date</Label>
                    <Input
                        {...formik.getFieldProps("paymentDate")}
                        type="date"
                        id="paymentDate"
                        max={new Date().toISOString().split("T")[0]}
                        className={clsx(
                            "focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB]",
                            HandleClasses(formik, "paymentDate")
                        )}
                    />
                    {formik.touched.paymentDate && formik.errors.paymentDate && (
                        <p className="text-red-500 text-sm">{formik.errors.paymentDate}</p>
                    )}
                </div>

                {/* Month Picker */}
                <div className="flex flex-col gap-2">
                    <Label htmlFor="month">Month</Label>
                    <Input
                        type="month"
                        id="month"
                        {...formik.getFieldProps("month")}
                        className={clsx(
                            "focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB]",
                            HandleClasses(formik, "month")
                        )}
                    />
                    {formik.touched.month && formik.errors.month && (
                        <p className="text-red-500 text-sm">{formik.errors.month}</p>
                    )}
                </div>

                <Button
                    type="submit"
                    className="bg-[#145EFB] hover:bg-blue-700 cursor-pointer text-white w-full mt-4"
                >
                    Pay Maintenance
                </Button>
            </form>
        </div>
    );
};

export default CashMaintenaceForm;