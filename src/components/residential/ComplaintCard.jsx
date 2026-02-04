import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, AlertCircle, Image as ImageIcon, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ComplaintCard = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const complaint = state?.societyDetails;

    if (!complaint) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] p-8">
                <AlertCircle className="w-16 h-16 text-gray-300 mb-4" />
                <div className="text-xl font-medium text-gray-500">
                    No complaint data found
                </div>
                <p className="text-sm text-gray-400 mt-2">
                    Please go back and select a complaint
                </p>
            </div>
        );
    }

    const formattedDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-3xl mx-auto">

                <div className="mb-8 relative flex items-center justify-center">
                    <Button
                        onClick={() => navigate(-1)}
                        variant="ghost"
                        className="group absolute left-0 flex items-center gap-1 rounded-full px-4 py-2 text-blue-600 hover:bg-blue-100 transition-all cursor-pointer" >
                        <ArrowLeft
                            size={18}
                            className="transition-transform group-hover:-translate-x-1"
                        />
                        Back
                    </Button>

                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Complaint Details
                        </h1>
                        <p className="text-gray-600 mt-2">
                            View and manage complaint information
                        </p>
                    </div>
                </div>

                <Card className="shadow-lg pt-0">

                    <div className="bg-linear-to-r from-blue-500 to-blue-600 text-white h-24 flex items-center rounded-t-2xl">
                        <CardHeader className="w-full py-0">
                            <div className="flex items-center w-full">
                                <CardTitle className="text-2xl font-bold">
                                    {complaint.title}
                                </CardTitle>

                                <Badge
                                    className={`ml-auto px-4 py-1.5 text-sm font-semibold ${complaint.status === "Pending"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : complaint.status === "In Progress"
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-green-100 text-green-800"
                                        }`}
                                >
                                    {complaint.status}
                                </Badge>
                            </div>
                        </CardHeader>
                    </div>

                    <CardContent className="p-6">

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-gray-50 p-4 rounded-lg border">
                                <p className="text-sm text-gray-500 mb-2">Category</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                                    <p className="font-semibold text-gray-800">
                                        {complaint.category}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg border">
                                <p className="text-sm text-gray-500 mb-2">Priority</p>
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`w-3 h-3 rounded-full ${complaint.priority === "High"
                                            ? "bg-red-500"
                                            : complaint.priority === "Medium"
                                                ? "bg-yellow-500"
                                                : "bg-green-500"
                                            }`}
                                    />
                                    <p
                                        className={`font-semibold ${complaint.priority === "High"
                                            ? "text-red-600"
                                            : complaint.priority === "Medium"
                                                ? "text-yellow-600"
                                                : "text-green-600"
                                            }`}
                                    >
                                        {complaint.priority}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg border">
                                <p className="text-sm text-gray-500 mb-2">Date</p>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-600" />
                                    <p className="font-semibold text-gray-800">
                                        {formattedDate}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Separator className="my-6" />

                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                Description
                            </h3>
                            <div className="bg-gray-50 p-5 rounded-lg border">
                                <p className="text-gray-700 leading-relaxed">
                                    {complaint.description}
                                </p>
                            </div>
                        </div>

                        {complaint.complaintImages?.length > 0 && (
                            <>
                                <Separator className="my-6" />
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                        <ImageIcon className="w-5 h-5" />
                                        Attached Images
                                        <Badge variant="outline" className="ml-2">
                                            {complaint.complaintImages.length}
                                        </Badge>
                                    </h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {complaint.complaintImages.map((img, index) => (
                                            <div
                                                key={index}
                                                className="overflow-hidden rounded-lg border bg-white"
                                            >
                                                <img
                                                    src={img}
                                                    alt={`Complaint image ${index + 1}`}
                                                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="p-3">
                                                    <p className="text-sm text-gray-600 text-center">
                                                        Image {index + 1}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}


                        {complaint.workingImages?.length > 0 && (
                            <>
                                <Separator className="my-6" />

                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                        <ImageIcon className="w-5 h-5 text-green-600" />
                                        Working Images
                                        <Badge variant="outline" className="ml-2 text-green-600">
                                            {complaint.workingImages.length}
                                        </Badge>
                                    </h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {complaint.workingImages.map((img, index) => (
                                            <div
                                                key={index}
                                                className="overflow-hidden rounded-lg border bg-white"
                                            >
                                                <img
                                                    src={img}
                                                    alt={`Working image ${index + 1}`}
                                                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="p-3 bg-green-50">
                                                    <p className="text-sm text-green-700 text-center font-medium">
                                                        Work Image {index + 1}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

            </div>
        </div>
    );
};

export default ComplaintCard;
