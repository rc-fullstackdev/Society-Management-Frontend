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
import { useAddEventMutation } from "@/redux/api/secreatry.api";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AddEvent = () => {

    const [createEvent, { isSuccess, isLoading, isError, error }] = useAddEventMutation();

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            date: "",
        },
        validationSchema: yup.object({
            title: yup.string().required(),
            description: yup.string().required(),
            date: yup.string().required(),
        }),
        onSubmit: (values, { resetForm }) => {
            createEvent(values);
            resetForm();
        },
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("Event Added Successfully");
            navigate("/secretary/events")
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
                        Add Event
                    </h2>

                    <div className="flex flex-col gap-2">
                        <Label>Title</Label>
                        <Input
                            {...formik.getFieldProps("title")}
                            type="text"
                            id="title"
                            placeholder="Enter title"
                            className={clsx(
                                "backdrop-blur-sm focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB]",
                                HandleClasses(formik, "title")
                            )}
                        />
                        {formik.touched.title && formik.errors.title && (
                            <p className="text-red-500 text-sm">{formik.errors.title}</p>
                        )}
                    </div>

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

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="date"> Date</Label>
                        <Input
                            {...formik.getFieldProps("date")}
                            type="date"
                            id="date"
                            min={new Date().toISOString().split("T")[0]}
                            className={clsx(
                                "focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB]",
                                HandleClasses(formik, "date")
                            )}
                        />
                        {formik.touched.date && formik.errors.date && (
                            <p className="text-red-500 text-sm">{formik.errors.date}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="bg-[#145EFB] hover:bg-blue-700 cursor-pointer text-white w-full mt-4"
                    >
                        Add Event
                    </Button>
                </form>
            </div>
        </div>
    </>
};

export default AddEvent;
