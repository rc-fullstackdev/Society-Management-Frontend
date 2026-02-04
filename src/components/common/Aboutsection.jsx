import aboutImage from "../../assets/images/about.jpeg"
import thumbnail1 from "../../assets/images/gym.jpg"
import thumbnail2 from "../../assets/images/play-ground.jpg"
import thumbnail3 from "../../assets/images/about2.jpg"
import { CheckCircle2 } from "lucide-react"

const AboutUsSection = ({ id }) => {
    return (
        <div id={id} className="py-16 px-6 md:px-16 bg-white">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                    About Society Saathi
                </h1>
                <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
                    Smart, simple & powerful society management for modern communities
                </p>
            </div>

            <div className="max-w-7xl mx-auto">
                <div
                    className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] rounded-3xl overflow-hidden shadow-2xl"
                    style={{
                        boxShadow: "0 25px 50px -12px #125FFA40"
                    }}
                >

                    {/* LEFT — IMAGE COLLAGE */}
                    <div className="relative p-8 bg-gradient-to-br from-[#135EFA]/5 to-white">
                        <div className="grid grid-cols-2 gap-4 h-full">
                            <div className="space-y-4">
                                <div className="h-48 rounded-xl overflow-hidden shadow-lg">
                                    <img src={aboutImage} alt="Main" className="w-full h-full object-cover" />
                                </div>
                                <div className="h-32 rounded-xl overflow-hidden shadow-lg">
                                    <img src={thumbnail1} alt="Gym" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="space-y-4 pt-8">
                                <div className="h-32 rounded-xl overflow-hidden shadow-lg">
                                    <img src={thumbnail2} alt="Play Ground" className="w-full h-full object-cover" />
                                </div>
                                <div className="h-48 rounded-xl overflow-hidden shadow-lg">
                                    <img src={thumbnail3} alt="Club House" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — TEXT */}
                    <div className="bg-white p-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Making Society Management Simple
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-lg mb-6">
                            Society Saathi is a powerful platform that helps multiple societies operate
                            smoothly with automation, transparency, and digitized workflows.
                        </p>
                        <div className="space-y-4 text-gray-700">
                            {["Independent dashboards for each society", "Maintenance billing & payment tracking", "Resident communication & announcements", "Amenities, complaints & security management"].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="text-[#135EFA] mt-1" size={22} />
                                    <span className="text-lg">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsSection;