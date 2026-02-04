import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useFormik } from 'formik';
import * as yup from 'yup'
import clsx from "clsx"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../common/Loading';
import HandleClasses from '../common/HandleClasses';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useAddComplaintMutation } from '@/redux/api/residential.api';

const ComplaintForm = () => {

    const [addComplaint, { isSuccess, isLoading, isError, error }] = useAddComplaintMutation()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            title: "",
            category: "",
            description: "",
            priority: "",
            complaintImages: "",
        },
        validationSchema: yup.object({
            title: yup.string().required(),
            category: yup.string().required(),
            description: yup.string().required(),
            priority: yup.string().required(),
            complaintImages: yup.string(),
        }),
        onSubmit: (values, { resetForm }) => {

            const fd = new FormData()

            fd.append("title", values.title)
            fd.append("category", values.category)
            fd.append("description", values.description)
            fd.append("priority", values.priority)
            fd.append("complaintImages", values.complaintImages)

            addComplaint(fd)

            resetForm()
        }
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success("Complaint Send Successfully")
            navigate("/residential/society/details")
        }
    }, [isSuccess])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="flex items-center justify-center p-4">
            <form onSubmit={formik.handleSubmit} className="backdrop-blur-md border border-white/20 p-10 rounded-2xl shadow-[0_0_20px_#145EFB] w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-8 text-center text-blue-600">
                    Society Complaint Form
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="societyName">Title</Label>
                        <Input
                            {...formik.getFieldProps("title")}
                            id="title"
                            placeholder="Enter Title"
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
                        <Label>Category</Label>

                        <Select
                            value={formik.values.category}
                            onValueChange={(value) => formik.setFieldValue("category", value)}
                        >
                            <SelectTrigger
                                className={clsx(
                                    "w-full backdrop-blur-sm focus:ring-1 focus:ring-[#145EFB]",
                                    HandleClasses(formik, "category")
                                )}
                            >
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="Water">Water</SelectItem>
                                <SelectItem value="Plumbing">Plumbing</SelectItem>
                                <SelectItem value="Electricity">Electricity</SelectItem>
                                <SelectItem value="Lift">Lift</SelectItem>
                                <SelectItem value="Parking">Parking</SelectItem>
                                <SelectItem value="Security">Security</SelectItem>
                                <SelectItem value="Noise in Society">Noise in Society</SelectItem>
                                <SelectItem value="Common Area Maintenance">Common Area Maintenance</SelectItem>
                                <SelectItem value="CCTV / Surveillance">CCTV / Surveillance</SelectItem>
                            </SelectContent>
                        </Select>

                        {formik.touched.category && formik.errors.category && (
                            <p className="text-red-500 text-sm">{formik.errors.category}</p>
                        )}
                    </div>


                    <div className="flex flex-col gap-2">
                        <Label>Priority</Label>

                        <Select
                            value={formik.values.priority}
                            onValueChange={(value) => formik.setFieldValue("priority", value)}
                        >
                            <SelectTrigger
                                className={clsx(
                                    "w-full backdrop-blur-sm focus:ring-1 focus:ring-[#145EFB]",
                                    HandleClasses(formik, "priority")
                                )}
                            >
                                <SelectValue placeholder="Select Priority" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="Low">Low</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="High">High</SelectItem>
                            </SelectContent>
                        </Select>

                        {formik.touched.priority && formik.errors.priority && (
                            <p className="text-red-500 text-sm">{formik.errors.priority}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="complaintImages">Complaint Images</Label>
                        <Input
                            multiple
                            onChange={(e) => {
                                formik.setFieldValue("complaintImages", Array.from(e.target.files))
                            }}
                            type="file"
                            id="complaintImages"
                            className={clsx(
                                "backdrop-blur-sm focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB]",
                                HandleClasses(formik, "complaintImages")
                            )}
                        />
                        {formik.touched.complaintImages && formik.errors.complaintImages && (
                            <p className="text-red-500 text-sm">{formik.errors.complaintImages}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 md:col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            {...formik.getFieldProps("description")}
                            id="description"
                            placeholder="Enter Description"
                            className={clsx(
                                "w-full backdrop-blur-sm focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB]",
                                HandleClasses(formik, "description")
                            )}
                        />
                        {formik.touched.description && formik.errors.description && (
                            <p className="text-red-500 text-sm">{formik.errors.description}</p>
                        )}
                    </div>

                </div>

                <div className="mt-6">
                    <Button
                        type="submit"
                        className="bg-[#145EFB] hover:bg-blue-700 cursor-pointer text-white w-full"
                    >
                        Send Complaint
                    </Button>
                </div>

            </form>
        </div>
    );
};

export default ComplaintForm;
