
import { useNavigate, useParams } from "react-router-dom";
import { Phone, Home, Layers, Building2, Calendar, AlertCircle, Image as ImageIcon, ArrowLeft, Upload } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useGetComplaintByIdQuery, useUpdateComplaintMutation } from "@/redux/api/secreatry.api";
import Loading from "../common/Loading";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const ComplaintInfoCard = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const { data, refetch } = useGetComplaintByIdQuery(id);
    const [updateComplaint, { isLoading }] = useUpdateComplaintMutation();
    const complaint = data?.result;
    const resident = data?.result?.residentId;

    const formattedDate = new Date(complaint?.createdAt).toLocaleDateString(
        "en-IN",
        { day: "2-digit", month: "short", year: "numeric" }
    );

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            status: complaint?.status ?? "",
            workingImages: [],
        },
        onSubmit: async (values, { resetForm }) => {
            const formData = new FormData();
            formData.append("status", values.status);
            values.workingImages.forEach((file) => formData.append("workingImages", file));
            try {
                await updateComplaint({ id: complaint._id, complaintData: formData }).unwrap();
                await refetch();
                toast.success("Complaint updated successfully");
                resetForm();
            } catch (error) {
                toast.error("Update failed");
            }
        },
    });

    if (isLoading) return <Loading />;
    if (!data?.result) return <p>No complaint found</p>;

    return (
        <div className="flex justify-center px-4 py-10">
            <Card className="w-full max-w-6xl rounded-3xl bg-gradient-to-br from-blue-50 to-white shadow-lg">
                <CardHeader className="px-6">
                    <div className="flex items-center justify-between">
                        <Button
                            onClick={() => navigate(-1)}
                            variant="ghost"
                            className="group flex items-center gap-2 rounded-full px-4 py-2 text-blue-600 hover:bg-blue-100 transition-all cursor-pointer" >
                            <ArrowLeft
                                size={18}
                                className="transition-transform group-hover:-translate-x-1"
                            />
                            Back
                        </Button>

                        {/* CENTER: Heading */}
                        <CardTitle className="text-2xl font-semibold text-blue-600 text-center">
                            Complaint & Resident Details
                        </CardTitle>

                        {/* RIGHT: Spacer (keeps title centered) */}
                        <div className="w-[88px]" />
                    </div>
                </CardHeader>


                <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                        {/* LEFT: COMPLAINT DETAILS */}
                        <Card className="rounded-2xl shadow-md pt-0">
                            <div className="bg-blue-600 text-white rounded-t-2xl p-5 flex items-center">
                                <h2 className="text-xl font-semibold">{complaint.title}</h2>
                                <Badge className="ml-auto bg-yellow-100 text-yellow-800">{complaint.status}</Badge>
                            </div>

                            <CardContent className="space-y-6 pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <InfoBox label="Category" value={complaint.category} />
                                    <InfoBox
                                        label="Priority"
                                        value={complaint.priority}
                                        valueClass={
                                            complaint.priority === "High" ? "text-red-600" : "text-yellow-600"
                                        }
                                    />
                                    <InfoBox
                                        label="Date"
                                        value={formattedDate}
                                        icon={<Calendar size={16} />}
                                    />
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="flex items-center gap-2 font-semibold mb-2">
                                        <AlertCircle size={18} /> Description
                                    </h3>
                                    <div className="bg-muted p-4 rounded-xl">{complaint.description}</div>
                                </div>

                                {complaint.complaintImages?.length > 0 && (
                                    <>
                                        <Separator />
                                        <div>
                                            <h3 className="flex items-center gap-2 font-semibold mb-4">
                                                <ImageIcon size={18} /> Attached Images
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {complaint.complaintImages.map((img, i) => (
                                                    <img
                                                        key={i}
                                                        src={img}
                                                        className="h-44 w-full object-cover rounded-xl border"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {complaint.workingImages?.length > 0 && (
                                    <>
                                        <Separator />
                                        <div>
                                            <h3 className="flex items-center gap-2 font-semibold mb-4 text-green-600">
                                                <ImageIcon size={18} /> Working Images
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {complaint.workingImages.map((img, i) => (
                                                    <img
                                                        key={i}
                                                        src={img}
                                                        alt={`Working ${i}`}
                                                        className="h-44 w-full object-cover rounded-xl border border-green-200"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        {/* RIGHT: RESIDENT DETAILS + Work Update */}
                        <div className="flex flex-col justify-between h-full space-y-6">
                            <Card className="rounded-2xl shadow-md h-full">
                                <CardHeader>
                                    <CardTitle className="text-xl text-blue-600">Resident Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-5">
                                    <div className="flex justify-center">
                                        <img
                                            src={resident?.residentialProfile}
                                            className="w-24 h-24 rounded-full border object-cover object-top"
                                        />
                                    </div>
                                    <InfoRow icon={<Phone />} iconBg="bg-green-100 text-green-600" label="Mobile" value={resident?.mobile} />
                                    <InfoRow icon={<Home />} iconBg="bg-blue-100 text-blue-600" label="Flat" value={resident?.flatNumber} />
                                    <InfoRow icon={<Layers />} iconBg="bg-orange-100 text-orange-600" label="Floor" value={resident?.floor} />
                                    <InfoRow icon={<Building2 />} iconBg="bg-indigo-100 text-indigo-600" label="Wing" value={resident?.wing} />
                                </CardContent>
                            </Card>

                            <Card className="rounded-2xl shadow-md bg-blue-50 h-full">
                                <CardHeader>
                                    <CardTitle className="text-lg text-blue-600">Work Update (Secretary)</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                                        <Select
                                            value={formik.values.status}
                                            onChange={formik.handleChange}
                                            onValueChange={(value) => formik.setFieldValue("status", value)}
                                        >
                                            <SelectTrigger className="w-full backdrop-blur-sm focus:ring-1 focus:ring-[#145EFB] border border-blue-600">
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem>Select Status</SelectItem>
                                                <SelectItem value="Pending">Pending</SelectItem>
                                                <SelectItem value="In Progress">In Progress</SelectItem>
                                                <SelectItem value="Resolved">Resolved</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <label className="flex items-center gap-2 cursor-pointer border rounded-md p-3 bg-white">
                                            <Upload size={18} /> Upload Working Images
                                            <input
                                                type="file"
                                                multiple
                                                hidden
                                                onChange={(e) =>
                                                    formik.setFieldValue(
                                                        "workingImages",
                                                        Array.from(e.target.files)
                                                    )
                                                }
                                            />
                                        </label>

                                        {formik.values.workingImages.length > 0 && (
                                            <div className="grid grid-cols-2 gap-3">
                                                {formik.values.workingImages.map((file, i) => (
                                                    <img
                                                        key={i}
                                                        src={URL.createObjectURL(file)}
                                                        className="h-28 w-full object-cover rounded-md"
                                                    />
                                                ))}
                                            </div>
                                        )}

                                        <Button type="submit" className="w-full bg-[#145EFB] hover:bg-blue-700 text-white cursor-pointer">
                                            Update Complaint
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

const InfoRow = ({ icon, iconBg, label, value }) => (
    <div className="flex items-center gap-4 bg-muted px-4 py-3 rounded-xl">
        <div className={`p-2 rounded-lg ${iconBg}`}>{icon}</div>
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-semibold">{value}</p>
        </div>
    </div>
);

const InfoBox = ({ label, value, icon, valueClass = "" }) => (
    <div className="bg-muted p-4 rounded-xl">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="flex items-center gap-2">
            {icon}
            <p className={`font-semibold ${valueClass}`}>{value}</p>
        </div>
    </div>
);

export default ComplaintInfoCard;
