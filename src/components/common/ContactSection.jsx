import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import HandleClasses from "./HandleClasses";
import { useFormik } from "formik";
import clsx from "clsx";
import * as yup from "yup"
import { Textarea } from "../ui/textarea";
import { useContactUsMutation } from "@/redux/api/admin.api";
import { useEffect } from "react";
import { toast } from "react-toastify";


const ContactSection = ({ id }) => {

    const [sendMessage, { isSuccess, isError, error }] = useContactUsMutation()

    useEffect(() => {
        if (isSuccess) {
            toast.success("Message Send successfully")
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message || "Unable to Add Event");
        }
    }, [isError])

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: "",
            message: "",
        },
        validationSchema: yup.object({
            name: yup.string().required(),
            email: yup.string().required().email(),
            mobile: yup.string().required(),
            message: yup.string().required(),
        }),
        onSubmit: (values, { resetForm }) => {
            sendMessage(values)
            resetForm()
        }
    })

    return (
        <section id={id} className="py-16 px-6 md:px-24 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        Contact Us
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Get in touch for all your society management needs
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* LEFT SIDE — CARDS */}
                    <div className="space-y-6">

                        <ContactCard
                            icon={<Phone className="h-6 w-6 text-blue-600" />}
                            title="Phone Support"
                            value="+91 1800 123 4567"
                            description="Instant support for any urgent query"
                        />

                        <ContactCard
                            icon={<Mail className="h-6 w-6 text-blue-600" />}
                            title="Email Support"
                            value="support@societysaathi.com"
                            description="We reply within 2–4 hours"
                        />

                        <ContactCard
                            icon={<MapPin className="h-6 w-6 text-blue-600" />}
                            title="Office Address"
                            value="Society Saathi HQ, Mumbai"
                            description="123 Tech Park, Mumbai"
                        />

                        {/* 24/7 Support */}
                        <div className="p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-[0_8px_20px_rgba(19,94,250,0.25)] transition-all duration-300 cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="text-3xl font-bold text-blue-600">24/7</div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Support Available</h4>
                                    <p className="text-gray-600 text-sm">We're always ready to assist your society</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT SIDE — FORM */}
                    <div>
                        <div className="p-10 rounded-2xl border border-gray-200 shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Send us a Message
                            </h2>

                            <form onSubmit={formik.handleSubmit}>
                                <div className="space-y-5">
                                    <div className="flex flex-col gap-2">
                                        <Label className="text-md opacity-65">Full Name</Label>
                                        <Input
                                            {...formik.getFieldProps("name")}
                                            type="text"
                                            id="name"
                                            placeholder="Enter Name"
                                            className={clsx(
                                                "backdrop-blur-sm focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB] py-6",
                                                HandleClasses(formik, "name")
                                            )}
                                        />
                                        {formik.touched.name && formik.errors.name && (
                                            <p className="text-red-500 text-sm">{formik.errors.name}</p>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Label className="text-md opacity-65">Enter Email</Label>
                                        <Input
                                            {...formik.getFieldProps("email")}
                                            type="email"
                                            id="email"
                                            placeholder="Enter Email"
                                            className={clsx(
                                                "backdrop-blur-sm focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB] py-6",
                                                HandleClasses(formik, "email")
                                            )}
                                        />
                                        {formik.touched.email && formik.errors.email && (
                                            <p className="text-red-500 text-sm">{formik.errors.email}</p>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Label className="text-md opacity-65">Enter Mobile</Label>
                                        <Input
                                            {...formik.getFieldProps("mobile")}
                                            type="number"
                                            id="mobile"
                                            placeholder="Enter Mobile"
                                            className={clsx(
                                                "backdrop-blur-sm focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB] py-6",
                                                HandleClasses(formik, "mobile")
                                            )}
                                        />
                                        {formik.touched.mobile && formik.errors.mobile && (
                                            <p className="text-red-500 text-sm">{formik.errors.mobile}</p>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Label className="text-md opacity-65">Enter Message</Label>
                                        <Textarea
                                            {...formik.getFieldProps("message")}
                                            type="text"
                                            id="message"
                                            placeholder="Enter Message"
                                            className={clsx(
                                                "backdrop-blur-sm focus-visible:border-[#145EFB] focus-visible:ring-1 focus-visible:ring-[#145EFB] py-6",
                                                HandleClasses(formik, "message")
                                            )}
                                        />
                                        {formik.touched.message && formik.errors.message && (
                                            <p className="text-red-500 text-sm">{formik.errors.message}</p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full cursor-pointer bg-[#135EFA] hover:bg-blue-700 text-white py-5 text-lg rounded-xl"
                                    >
                                        Send Message
                                    </Button>
                                </div>
                            </form>

                            <p className="text-center text-gray-500 text-sm mt-6">
                                We usually reply within 24 hours
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

/* Contact Card Component */
const ContactCard = ({ icon, title, value, description }) => (
    <div className="p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-[0_8px_20px_rgba(19,94,250,0.25)] transition-all duration-300 cursor-pointer">
        <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">{icon}</div>
            <div>
                <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
                <p className="text-[#135EFA] font-medium text-lg">{value}</p>
                <p className="text-gray-600 text-sm mt-1">{description}</p>
            </div>
        </div>
    </div>
);

/* Input Field Component */
const InputField = ({ label, placeholder }) => (
    <div>
        <label className="block text-gray-700 mb-2">{label}</label>
        <input
            type="text"
            placeholder={placeholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#135EFA] focus:ring-1 focus:ring-[#135EFA]"
        />
    </div>
);

export default ContactSection;
