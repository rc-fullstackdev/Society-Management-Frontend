import { Phone, MapPin, Mail, User, ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../common/Loading";
import { useLazyGetSocietyDetailsQuery } from "@/redux/api/admin.api";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";

const SecretaryDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate()

    const [getSocietyDetails, { data, isLoading, isError }] = useLazyGetSocietyDetailsQuery();

    useEffect(() => {
        getSocietyDetails();
    }, []);

    useEffect(() => {
        if (isError) toast.error("Unable to fetch data");
    }, [isError]);

    if (isLoading) return <Loading />;

    const society = data?.result?.find(item => item._id === id);

    if (!society) {
        return <p className="text-center mt-10">Society not found</p>;
    }

    return (
        <div className="flex justify-center px-4 py-10">
            <Card className="w-full max-w-5xl rounded-3xl bg-gradient-to-br from-blue-50 to-white
        shadow-[0_12px_40px_rgba(59,130,246,0.35)] border-blue-100">

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

                        <CardTitle className="text-center font-semibold text-2xl text-blue-600">
                            Society & Secretary Details
                        </CardTitle>

                        <div className="w-[88px]" />
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* ================= Society Card ================= */}
                        <Card className="rounded-2xl shadow-md border-blue-100">
                            <CardHeader>
                                <CardTitle className="text-xl text-blue-600">
                                    Society Details
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-5">
                                <h3 className="font-semibold text-lg">
                                    {society.societyName}
                                </h3>

                                <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                                    {society.societyImage.map((img, i) => (
                                        <img
                                            key={i}
                                            src={img}
                                            className="h-24 w-36 rounded-xl object-cover"
                                        />
                                    ))}
                                </div>

                                <InfoRow
                                    icon={<Phone />}
                                    iconBg="bg-blue-100 text-blue-600"
                                    label="Society Mobile"
                                    value={society.mobile}
                                />

                                <InfoRow
                                    icon={<MapPin />}
                                    iconBg="bg-purple-100 text-purple-600"
                                    label="Address"
                                    value={society.societyAddress}
                                />
                            </CardContent>
                        </Card>

                        {/* ================= Secretary Card ================= */}
                        <Card className="rounded-2xl shadow-md border-green-100">
                            <CardHeader>
                                <CardTitle className="text-xl text-blue-600">
                                    Secretary Details
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-5">
                                <div className="flex justify-center">
                                    <img
                                        src={society.secretaryProfile}
                                        className="w-24 h-24 rounded-full border-2 border-sky-500 object-cover"
                                    />
                                </div>

                                <InfoRow
                                    icon={<User />}
                                    iconBg="bg-indigo-100 text-indigo-600"
                                    label="Name"
                                    value={society.secretaryName}
                                />

                                <InfoRow
                                    icon={<Phone />}
                                    iconBg="bg-green-100 text-green-600"
                                    label="Mobile"
                                    value={society.mobile}
                                />

                                <InfoRow
                                    icon={<Mail />}
                                    iconBg="bg-orange-100 text-orange-600"
                                    label="Email"
                                    value={society.email}
                                />
                            </CardContent>
                        </Card>

                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

const InfoRow = ({ icon, iconBg, label, value }) => (
    <div className="flex items-center gap-4 rounded-xl bg-muted px-4 py-3">
        <div className={`p-2 rounded-lg ${iconBg}`}>{icon}</div>
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-semibold">{value}</p>
        </div>
    </div>
);

export default SecretaryDetails;
