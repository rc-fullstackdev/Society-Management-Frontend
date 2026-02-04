// import React, { useEffect, useState } from 'react';
// import Loading from '../common/Loading';
// import { toast } from 'react-toastify';
// import { Button } from '../ui/button';
// import { useLazyGetContactDetailsQuery } from '@/redux/api/admin.api';

// const ContactDetails = () => {

//     const [getContact, { data, isLoading, isError, error }] = useLazyGetContactDetailsQuery();

//     const [pagi, setPagi] = useState({ start: 0, limit: 2 })

//     useEffect(() => {
//         getContact(pagi)
//     }, [pagi])

//     if (isError) {
//         toast.error(error?.data?.message || 'Unable to fetch contact details');
//     }

//     if (isLoading) {
//         return <Loading />;
//     }

//     const contact = data?.result || [];

//     return (
//         <div className="p-4">
//             {contact.length === 0 ? (
//                 <p className="text-center text-gray-500 text-lg mt-10">
//                     No contact details available
//                 </p>
//             ) : (
//                 <>
//                     <div className="overflow-x-auto w-full border border-gray-200 rounded-lg">
//                         <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-[#145EFB]">
//                                 <tr>
//                                     <th className="px-4 py-3 text-center text-md font-medium text-white">Name</th>
//                                     <th className="px-4 py-3 text-center text-md font-medium text-white">Email</th>
//                                     <th className="px-4 py-3 text-center text-md font-medium text-white">Mobile</th>
//                                     <th className="px-4 py-3 text-center text-md font-medium text-white">Message</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {contact.map((c) => (
//                                     <tr key={c._id} className="hover:bg-gray-50">
//                                         <td className="px-4 py-3 text-center text-md">{c.name}</td>
//                                         <td className="px-4 py-3 text-center text-md">{c.email}</td>
//                                         <td className="px-4 py-3 text-center text-md">{c.mobile}</td>
//                                         <td className="px-4 py-3 text-center text-md">{c.message}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     <div className="flex justify-center gap-2 mt-10">
//                         {data && [...Array(Math.ceil(data.total / pagi.limit))].map((_, i) => (
//                             <Button
//                                 key={i}
//                                 onClick={() => setPagi({ ...pagi, start: i * pagi.limit })}
//                                 className={`px-4 py-2 rounded cursor-pointer ${i === pagi.start / pagi.limit
//                                     ? "bg-[#145EFB] text-white"
//                                     : "border border-[#145EFB] text-[#145EFB] bg-transparent"
//                                     }`}
//                             >
//                                 {i + 1}
//                             </Button>
//                         ))}
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default ContactDetails;


// import React, { useEffect, useState } from "react";
// import Loading from "../common/Loading";
// import { toast } from "react-toastify";
// import { Button } from "../ui/button";
// import { useLazyGetContactDetailsQuery } from "@/redux/api/admin.api";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";

// const ContactDetails = () => {
//     const [getContact, { data, isLoading, isError, error }] =
//         useLazyGetContactDetailsQuery();

//     const [pagi, setPagi] = useState({ start: 0, limit: 2 });
//     const [selectedMessage, setSelectedMessage] = useState("");

//     useEffect(() => {
//         getContact(pagi);
//     }, [pagi]);

//     if (isError) {
//         toast.error(error?.data?.message || "Unable to fetch contact details");
//     }

//     if (isLoading) return <Loading />;

//     const contact = data?.result || [];

//     const shortMessage = (msg, length = 80) =>
//         msg?.length > length ? msg.slice(0, length) + "..." : msg;

//     return (
//         <div className="p-4">
//             {/* 🔹 TABLE: visible only on large screens */}
//             <div className="hidden lg:block overflow-x-auto border rounded-lg">
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-[#145EFB]">
//                         <tr>
//                             <th className="px-3 py-3 text-white text-center">Name</th>
//                             <th className="px-3 py-3 text-white text-center">Email</th>
//                             <th className="px-3 py-3 text-white text-center">Mobile</th>
//                             <th className="px-3 py-3 text-white text-center">Message</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y">
//                         {contact.map((c) => (
//                             <tr key={c._id}>
//                                 <td className="px-3 py-3 text-center">{c.name}</td>
//                                 <td className="px-3 py-3 text-center">{c.email}</td>
//                                 <td className="px-3 py-3 text-center">{c.mobile}</td>
//                                 <td className="px-3 py-3 text-center max-w-[200px]">
//                                     {shortMessage(c.message)}
//                                     {c.message.length > 80 && (
//                                         <button
//                                             onClick={() => setSelectedMessage(c.message)}
//                                             className="ml-2 text-xs text-[#145EFB]"
//                                         >
//                                             View
//                                         </button>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* 🔹 CARD VIEW: mobile + tablet */}
//             <div className="grid gap-4 lg:hidden">
//                 {contact.map((c) => (
//                     <Card key={c._id}>
//                         <CardHeader className="pb-2">
//                             <h3 className="font-semibold">{c.name}</h3>
//                         </CardHeader>

//                         <CardContent className="space-y-2 text-sm">
//                             {/* 🔹 full details shown in tablet */}
//                             <p><span className="font-medium">Email:</span> {c.email}</p>
//                             <p><span className="font-medium">Mobile:</span> {c.mobile}</p>

//                             {/* 🔹 message short in mobile */}
//                             <p className="text-gray-700">
//                                 {shortMessage(c.message, 120)}
//                             </p>

//                             {c.message.length > 120 && (
//                                 <button
//                                     onClick={() => setSelectedMessage(c.message)}
//                                     className="text-xs text-[#145EFB]"
//                                 >
//                                     View full message
//                                 </button>
//                             )}
//                         </CardContent>
//                     </Card>
//                 ))}
//             </div>

//             <div className="flex justify-center gap-2 mt-10">
//                 {data &&
//                     [...Array(Math.ceil(data.total / pagi.limit))].map((_, i) => (
//                         <Button
//                             key={i}
//                             onClick={() => setPagi({ ...pagi, start: i * pagi.limit })}
//                         >
//                             {i + 1}
//                         </Button>
//                     ))}
//             </div>

//             {/* 🔹 MODAL */}
//             {selectedMessage && (
//                 <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//                     <Card className="w-full max-w-md">
//                         <CardHeader className="flex justify-between items-center">
//                             <h3 className="font-semibold">Message</h3>
//                             <button onClick={() => setSelectedMessage("")}>✕</button>
//                         </CardHeader>
//                         <CardContent className="whitespace-pre-wrap text-sm">
//                             {selectedMessage}
//                         </CardContent>
//                     </Card>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ContactDetails;




import React, { useEffect, useState } from "react";
import Loading from "../common/Loading";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { useLazyGetContactDetailsQuery } from "@/redux/api/admin.api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

const ContactDetails = () => {
    const [getContact, { data, isLoading, isError, error }] =
        useLazyGetContactDetailsQuery();

    const [pagi, setPagi] = useState({ start: 0, limit: 1 });
    const [selectedMessage, setSelectedMessage] = useState("");

    useEffect(() => {
        getContact(pagi);
    }, [pagi]);

    if (isError) {
        toast.error(error?.data?.message || "Unable to fetch contact details");
    }

    if (isLoading) return <Loading />;

    const contact = data?.result || [];

    const shortMessage = (msg, length = 140) =>
        msg?.length > length ? msg.slice(0, length) + "..." : msg;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="space-y-6">
                {contact.map((c) => (
                    <Card
                        key={c._id}
                        className=" bg-white rounded-2xl p-6 transition-all duration-300 shadow-md hover:shadow-[0_0_20px_#145EFB]"
                    >
                        <CardHeader>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {c.name}
                            </h3>
                        </CardHeader>

                        <CardContent className="space-y-3 text-sm text-gray-700">
                            <p className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-blue-500" />
                                <span className="font-medium text-gray-900">
                                    {c.email}
                                </span>
                            </p>

                            <p className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-green-500" />
                                <span className="font-medium text-gray-900">
                                    {c.mobile}
                                </span>
                            </p>

                            <div className="border-t pt-4 mt-4">
                                <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                                    Message
                                </p>

                                <p className="leading-relaxed">
                                    {shortMessage(c.message)}
                                </p>

                                {c.message.length > 140 && (
                                    <button
                                        onClick={() => setSelectedMessage(c.message)}
                                        className="mt-2 text-xs font-medium text-blue-600 hover:underline cursor-pointer"
                                    >
                                        View full message
                                    </button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex justify-center gap-2 mt-10">
                {data && [...Array(Math.ceil(data.total / pagi.limit))].map((_, i) => (
                    <Button
                        key={i}
                        onClick={() => setPagi({ ...pagi, start: i * pagi.limit })}
                        className={`px-4 py-2 rounded cursor-pointer ${i === pagi.start / pagi.limit
                            ? "bg-[#145EFB] text-white"
                            : "border border-[#145EFB] text-[#145EFB] bg-transparent"
                            }`}
                    >
                        {i + 1}
                    </Button>
                ))}
            </div>

            {selectedMessage && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <Card
                        className="
                            w-full max-w-md
                            rounded-xl
                            border border-gray-200
                            shadow-xl shadow-blue-300/30
                        "
                    >
                        <CardHeader className="flex justify-between items-center">
                            <h3 className="text-base font-semibold text-gray-900">
                                Full Message
                            </h3>
                            <button
                                onClick={() => setSelectedMessage("")}
                                className="text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                                ✕
                            </button>
                        </CardHeader>

                        <CardContent className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
                            {selectedMessage}
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default ContactDetails;
