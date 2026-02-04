import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Search, Mail, Pencil } from "lucide-react";
import Loading from '../common/Loading';
import { toast } from 'react-toastify';
import { Button } from '../ui/button';
import { useGetSecurityGuardQuery, useUserAccessMutation } from '@/redux/api/secreatry.api';
import UpdateGuardModel from '../security-guard/UpdateGuardModel';

const GetSecurityGuard = () => {

    const { data, isLoading } = useGetSecurityGuardQuery();

    const [updateGuardAccess] = useUserAccessMutation()

    const [openModal, setOpenModal] = useState(false);

    const [selectedGuard, setSelectedGuard] = useState(null);

    const [search, setSearch] = useState("");

    if (isLoading) {
        return <Loading />
    }

    const filteredData =
        data?.result?.filter((item) => {
            const text = search.toLowerCase();
            return (
                item.name.toLowerCase().includes(text) ||
                item.mobile.includes(text)
            );
        }) || [];

    return <>

        <div className="max-w-md mx-auto mb-6 relative">
            <Search className="absolute left-3 top-3 text-gray-500" size={20} />
            <input
                type="text"
                placeholder="Search residents by name, mobile, flat..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6"> */}
        <div className="flex justify-center items-center">

            {filteredData.length === 0 && (
                <p className="text-center text-gray-500 col-span-full">
                    No security guard found.
                </p>
            )}

            {filteredData.map((item) => (
                <Card
                    key={item._id}
                    className="
                    relative
                    bg-white 
                    rounded-2xl 
                    p-6 
                    transition-all 
                    duration-300 
                    shadow-md 
                    hover:shadow-[0_0_20px_#145EFB]
                    cursor-pointer
                "
                >
                    <Button
                        onClick={() => {
                            setSelectedGuard(item);
                            setOpenModal(true);
                        }}
                        className="absolute 
                                top-4 
                                right-4 
                                w-10 
                                h-10 
                                rounded-full
                                border
                                border-blue-600
                                flex 
                                items-center 
                                justify-center 
                                text-blue-600
                                shadow-md 
                                transition
                                bg-white
                                hover:bg-white
                                cursor-pointer"
                    >
                        <Pencil size={18} />
                    </Button>

                    <div className="flex justify-center">
                        <img
                            src={item.securityGuardProfile}
                            alt={item.name}
                            className="w-24 h-24 rounded-full object-cover object-top border-2 border-blue-500"
                        />
                    </div>

                    <h2 className="text-center text-xl font-semibold text-gray-800">
                        {item.name}
                    </h2>

                    <CardContent className="space-y-3">

                        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg 
                                        max-md:flex-wrap max-md:gap-1 max-md:max-w-[90%]">

                            <div className="flex items-center gap-2">
                                <Phone size={18} className="text-blue-500" />
                                <span className="text-gray-500 text-sm me-5">Mobile :</span>
                            </div>

                            <span className="font-semibold text-gray-700 text-sm break-all">
                                {item.mobile}
                            </span>
                        </div>
                    </CardContent>


                    <Button
                        onClick={() =>
                            updateGuardAccess({
                                role: "guard",
                                id: item._id,
                                isActive: !item.isActive
                            })
                        }
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer
                            ${item.isActive
                                ? "bg-green-100 text-green-700 hover:bg-green-200"
                                : "bg-red-100 text-red-700 hover:bg-red-200"
                            }
                        `}
                    >
                        {item.isActive ? "Active" : "Inactive"}
                    </Button>

                </Card>
            ))}
        </div>

        <UpdateGuardModel
            open={openModal}
            onClose={setOpenModal}
            securityGuard={selectedGuard}
        />

    </>
};

export default GetSecurityGuard;



