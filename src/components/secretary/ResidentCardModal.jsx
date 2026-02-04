import { Card, CardContent } from "@/components/ui/card";
import { Phone, Home, Building2, Building, ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetResidentByIdQuery } from "@/redux/api/secreatry.api";
import Loading from '../common/Loading';
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";

const ResidentCardModal = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const residentId = state?.residentId;

    const { data, isLoading, isError, error } = useGetResidentByIdQuery(residentId);

    useEffect(() => {
        if (isError) {
            toast.error(error.data.message || "unable to fetch data")
        }
    }, [isError])

    if (isLoading) {
        return <Loading />;
    }

    const resident = data?.result;

    return (
        <div className="relative min-h-screen px-4 sm:px-6">
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

            {/* Card */}
            <div className="flex items-center justify-center mt-8">
                <Card className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-[0_0_20px_#145EFB]">
                    <div className="flex justify-center mb-3">
                        <img
                            src={resident.residentialProfile}
                            alt={resident.name}
                            className="w-24 h-24 rounded-full object-cover object-top border-2 border-blue-500"
                        />
                    </div>

                    <h2 className="text-center text-xl font-semibold text-gray-800 mb-3">
                        {resident.name}
                    </h2>

                    <CardContent className="space-y-4">
                        {/* Mobile */}
                        <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-3">
                            <Phone className="text-blue-500" size={20} />
                            <span className="text-gray-500 text-sm">Mobile</span>
                            <span className="ml-auto font-semibold text-gray-800">{resident.mobile}</span>
                        </div>

                        {/* Flat */}
                        <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-3">
                            <Home className="text-blue-500" size={20} />
                            <span className="text-gray-500 text-sm">Flat</span>
                            <span className="ml-auto font-semibold text-gray-800">{resident.flatNumber}</span>
                        </div>

                        {/* Floor */}
                        <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-3">
                            <Building2 className="text-blue-500" size={20} />
                            <span className="text-gray-500 text-sm">Floor</span>
                            <span className="ml-auto font-semibold text-gray-800">{resident.floor}</span>
                        </div>

                        {/* Wing */}
                        <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-3">
                            <Building className="text-blue-500" size={20} />
                            <span className="text-gray-500 text-sm">Wing</span>
                            <span className="ml-auto font-semibold text-gray-800">{resident.wing}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ResidentCardModal;
