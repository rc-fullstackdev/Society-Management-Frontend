import { useLazyGetAllResidentialQuery } from '@/redux/api/securityGuard.api';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Home, Building2, Building, Search } from "lucide-react";
import Loading from '../common/Loading';
import { toast } from 'react-toastify';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const GetAllResidential = () => {

    const [getAllResidents, { data, isLoading, isError, error }] = useLazyGetAllResidentialQuery();

    const navigate = useNavigate()

    const [search, setSearch] = useState("");

    useEffect(() => {
        getAllResidents();
    }, []);

    if (isLoading) {
        return <Loading />
    }

    const filteredData =
        data?.result?.filter((item) => {
            const text = search.toLowerCase();
            return (
                item.name.toLowerCase().includes(text) ||
                item.mobile.includes(text) ||
                item.flatNumber.toLowerCase().includes(text) ||
                item.floor.toLowerCase().includes(text) ||
                item.wing.toLowerCase().includes(text)
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">

            {filteredData.length === 0 && (
                <p className="text-center text-gray-500 col-span-full">
                    No residents found.
                </p>
            )}

            {filteredData.map((item) => (
                <Card
                    key={item._id}
                    className="
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
                    <div className="flex justify-center">
                        <img
                            src={item.residentialProfile}
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
                                <span className="text-gray-500 text-sm">Mobile</span>
                            </div>

                            <span className="font-semibold text-gray-700 text-sm break-all">
                                {item.mobile}
                            </span>
                        </div>


                        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                            <div className="flex items-center gap-2">
                                <Home size={18} className="text-blue-500" />
                                <span className="text-gray-500 text-sm">Flat</span>
                            </div>
                            <span className="font-semibold text-gray-700 text-sm">
                                {item.flatNumber}
                            </span>
                        </div>

                        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                            <div className="flex items-center gap-2">
                                <Building2 size={18} className="text-blue-500" />
                                <span className="text-gray-500 text-sm">Floor</span>
                            </div>
                            <span className="font-semibold text-gray-700 text-sm">
                                {item.floor}
                            </span>
                        </div>

                        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                            <div className="flex items-center gap-2">
                                <Building size={18} className="text-blue-500" />
                                <span className="text-gray-500 text-sm">Wing</span>
                            </div>
                            <span className="font-semibold text-gray-700 text-sm">
                                {item.wing}
                            </span>
                        </div>

                    </CardContent>

                    <Button
                        className="bg-blue-600
                        text-white
                        cursor-pointer
                        px-4 py-2
                        mt-auto
                        border border-transparent
                        hover:border-blue-600
                        hover:text-blue-600
                        hover:bg-transparent"
                        onClick={() =>
                            navigate("/securityguard/add/guest", {
                                state: { residentId: item._id }
                            })
                        }
                    >
                        Add Guest
                    </Button>
                </Card>
            ))}
        </div>
    </>
};

export default GetAllResidential;



