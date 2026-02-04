import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

const PricingPlans = ({ id }) => {
    const plans = [
        {
            title: "Free",
            price: "₹0 / month",
            description: "Perfect for getting started and testing the system.",
            features: [
                "Resident List",
                "Maintenance Overview",
                "Basic Dashboard",
            ],
            buttonText: "Get Started",
            recommended: false,
        },
        {
            title: "Basic",
            price: "₹499 / month",
            description: "Ideal for small societies.",
            features: [
                "All Free Features",
                "Maintenance Collection",
                "Resident Management",
                "Basic Reports",
            ],
            buttonText: "Choose Basic",
            recommended: false,
        },
        {
            title: "Premium",
            price: "₹1,499 / month",
            description: "Full automation with advanced tools.",
            features: [
                "Everything in Basic",
                "Complaint Handling",
                "Advanced Reports",
                "Priority Support",
            ],
            buttonText: "Choose Premium",
            recommended: true,
        },
    ];

    return (
        <section id={id} className="py-16">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-4">Pricing Plans</h2>
                <p className="text-gray-600 mb-12">
                    Choose the plan that best fits your society's needs.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, idx) => (
                        <div key={idx} className="relative">
                            {plan.recommended && (
                                <div className="absolute -top-3 right-3 bg-indigo-600 text-white px-3 py-1 text-sm rounded-full shadow">
                                    Recommended
                                </div>
                            )}
                            <Card
                                className={clsx(
                                    "rounded-2xl border flex flex-col h-full",
                                    plan.recommended
                                        ? "border-indigo-600 shadow-[0_8px_20px_0_rgba(18,95,250,0.25)]"
                                        : "border-gray-200"
                                )}
                            >
                                <CardHeader>
                                    <CardTitle className="text-2xl font-semibold">{plan.title}</CardTitle>

                                    <p className="text-3xl font-bold text-indigo-600 mt-2">{plan.price}</p>

                                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                                </CardHeader>

                                <CardContent className="flex flex-col flex-grow">
                                    <ul className="space-y-2 text-left mt-4 flex-grow">
                                        {plan.features.map((feature, fIdx) => (
                                            <li key={fIdx} className="flex items-center gap-2">
                                                <span className="text-green-600 text-lg">✔</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button className="mt-6 w-full py-4 text-lg rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
                                        {plan.buttonText}
                                    </Button>
                                </CardContent>
                            </Card>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default PricingPlans;
