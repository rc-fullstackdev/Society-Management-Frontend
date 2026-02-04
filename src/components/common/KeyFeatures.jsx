import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FaTools, FaUsers, FaExclamationCircle, FaFileInvoiceDollar } from "react-icons/fa";

const KeyFeatures = ({ id }) => {
    const features = [
        {
            title: "Maintenance Collection",
            description: "Easily manage and track all maintenance payments.",
            icon: <FaTools className="w-8 h-8 text-indigo-600" />,
        },
        {
            title: "Resident Management",
            description: "Keep detailed records of residents and their info.",
            icon: <FaUsers className="w-8 h-8 text-green-600" />,
        },
        {
            title: "Complaint Handling",
            description: "Log, track, and resolve resident complaints efficiently.",
            icon: <FaExclamationCircle className="w-8 h-8 text-red-600" />,
        },
        {
            title: "Payments & Reports",
            description: "Generate financial reports and manage all payments.",
            icon: <FaFileInvoiceDollar className="w-8 h-8 text-yellow-600" />,
        },
    ];

    return (
        <section id={id} className="px-10 py-16">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 h2 className="text-4xl font-bold mb-2" > Key Features</h2 >
                <p className="text-gray-600 mb-12">Only the most important features for smooth society management.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, idx) => (
                        <Card
                            key={idx}
                            className="transition-shadow duration-300 hover:shadow-[0_10px_20px_0_rgba(18,95,250,0.4)]"
                        >
                            <CardHeader className="flex flex-col items-center justify-center">
                                {feature.icon}
                                <CardTitle className="mt-4 text-lg font-semibold text-center">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600 text-center">{feature.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div >
        </section >
    );
};

export default KeyFeatures;
