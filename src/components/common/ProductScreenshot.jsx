import { Card, CardContent } from "@/components/ui/card";
import image from "../../assets/images/dashboard.jpeg"

const ProductScreenshot = ({ id }) => {
    return (
        <section id={id} className="py-16 min-h-scree">
            <div className="max-w-6xl mx-auto px-5 text-center">

                <h2 className="text-4xl font-bold mb-4">
                    Product Screenshot Preview
                </h2>
                <p className="text-gray-600 mb-10">
                    A clean look at your dashboard — simple, clear, and trustworthy.
                </p>

                <Card className="shadow-xl border rounded-2xl overflow-hidden py-0">
                    <CardContent className="p-0">
                        <img
                            src={image}
                            alt="Dashboard Preview"
                            className="w-full h-auto object-cover"
                        />
                    </CardContent>
                </Card>

            </div>
        </section>
    );
};

export default ProductScreenshot;
