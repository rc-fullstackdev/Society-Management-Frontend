import { Home, Phone, MapPin, Layers, Building2, User, } from "lucide-react";
import { useGetFlatDetailsQuery } from "@/redux/api/residential.api";
import { Card, CardHeader, CardTitle, CardContent, } from "@/components/ui/card";
import Loading from "../common/Loading";
import { useEffect } from "react";
import { toast } from "react-toastify";

const FlatDetails = () => {

    const { data, isLoading, isError, error } = useGetFlatDetailsQuery();

    if (isLoading) {
        return <Loading />
    }

    const flat = data?.result?.[0];
    const society = flat?.secretaryId;

    return (
        <div className="flex justify-center px-4 py-10">

            {/* ================= Parent Card ================= */}

            <Card className="w-full max-w-5xl rounded-3xl bg-gradient-to-br from-blue-50 to-white
        shadow-[0_12px_40px_rgba(59,130,246,0.35)] border-blue-100">

                <CardHeader>
                    <CardTitle className="text-center text-2xl text-blue-600">
                        Flat & Society Details
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* ================= Society Card ================= */}
                        <Card className="rounded-2xl shadow-md border-blue-100">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xl text-blue-600">
                                    Society Details
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-5">
                                {/* Secretary Profile */}
                                <div className="flex items-center gap-4">
                                    <img
                                        src={society?.secretaryProfile}
                                        alt="Secretary"
                                        className="w-16 h-16 rounded-full border-2 border-blue-500 object-cover object-top"
                                    />
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Secretary
                                        </p>
                                        <p className="font-semibold text-gray-800">
                                            {society?.societyName}
                                        </p>
                                    </div>
                                </div>

                                {/* Society Images */}
                                <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                                    {society?.societyImage?.map((img, i) => (
                                        <img
                                            key={i}
                                            src={img}
                                            alt="Society"
                                            className="h-24 w-36 rounded-xl object-cover shadow-sm"
                                        />
                                    ))}
                                </div>

                                <InfoRow
                                    icon={<Phone />}
                                    iconBg="bg-blue-100 text-blue-600"
                                    label="Society Mobile"
                                    value={society?.mobile}
                                />

                                <InfoRow
                                    icon={<MapPin />}
                                    iconBg="bg-purple-100 text-purple-600"
                                    label="Address"
                                    value={society?.societyAddress}
                                />
                            </CardContent>
                        </Card>

                        {/* ================= Resident Card ================= */}
                        <Card className="rounded-2xl shadow-md border-green-100">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xl text-blue-600">
                                    Resident Details
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-5">
                                {/* Resident Profile */}
                                <div className="flex justify-center">
                                    <img
                                        src={flat?.residentialProfile}
                                        alt="Resident"
                                        className="w-24 h-24 rounded-full border-2 border-sky-500 object-cover object-top"
                                    />
                                </div>

                                <InfoRow
                                    icon={<Phone />}
                                    iconBg="bg-green-100 text-green-600"
                                    label="Resident Mobile"
                                    value={flat?.mobile}
                                />

                                <InfoRow
                                    icon={<Home />}
                                    iconBg="bg-blue-100 text-blue-600"
                                    label="Flat Number"
                                    value={flat?.flatNumber}
                                />

                                <InfoRow
                                    icon={<Layers />}
                                    iconBg="bg-orange-100 text-orange-600"
                                    label="Floor"
                                    value={flat?.floor}
                                />

                                <InfoRow
                                    icon={<Building2 />}
                                    iconBg="bg-indigo-100 text-indigo-600"
                                    label="Wing"
                                    value={flat?.wing}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

/* ================= Reusable Row ================= */

const InfoRow = ({ icon, iconBg, label, value }) => (
    <div className="flex items-center gap-4 rounded-xl bg-muted px-4 py-3">
        <div className={`p-2 rounded-lg ${iconBg}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-semibold">{value}</p>
        </div>
    </div>
);

export default FlatDetails;
