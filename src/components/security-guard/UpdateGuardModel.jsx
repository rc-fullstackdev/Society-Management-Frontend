import React, { useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useUpdateGuardInfoMutation } from "@/redux/api/secreatry.api";

const UpdateGuardModel = ({ open, onClose, securityGuard }) => {

    const [updateGuard, { isLoading }] = useUpdateGuardInfoMutation();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: securityGuard?.name || "",
            mobile: securityGuard?.mobile || "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Name is required"),
            mobile: yup
                .string()
                .required("Mobile number is required")
                .matches(/^[0-9]{10}$/, "Mobile must be 10 digits"),
        }),
        onSubmit: async (values) => {
            try {
                await updateGuard({
                    id: securityGuard._id,
                    guardData: values,
                }).unwrap();

                toast.success("Security guard updated successfully");
                onClose(false);
            } catch (error) {
                toast.error(
                    error?.data?.message ||
                    error?.error ||
                    "Update failed"
                );
                setTimeout(() => onClose(false), 3000);
            }
        },
    });

    useEffect(() => {
        if (!open) {
            formik.resetForm();
        }
    }, [open]);

    if (!securityGuard) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Update Security Guard
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        You can update security guard name and mobile number.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={formik.handleSubmit} className="space-y-5 mt-4">

                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Enter full name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            className="focus-visible:ring-2 focus-visible:ring-blue-500"
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-xs text-red-500">{formik.errors.name}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="mobile">Mobile Number</Label>
                        <Input
                            id="mobile"
                            name="mobile"
                            placeholder="10-digit mobile number"
                            value={formik.values.mobile}
                            onChange={formik.handleChange}
                            maxLength={10}
                            className="focus-visible:ring-2 focus-visible:ring-blue-500"
                        />
                        {formik.touched.mobile && formik.errors.mobile && (
                            <p className="text-xs text-red-500">{formik.errors.mobile}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button
                            type="button"
                            className="cursor-pointer"
                            variant="outline"
                            onClick={() => onClose(false)}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                            disabled={isLoading}
                        >
                            {isLoading ? "Updating..." : "Update"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateGuardModel;
