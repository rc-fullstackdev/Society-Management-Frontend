import React, { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import { Button } from '../ui/button';
import { FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useLazyGetSocietyGuestQuery } from '@/redux/api/secreatry.api';

const SecretaryVisitorList = () => {

    const [getAllSocietyGuest, { data, isLoading }] = useLazyGetSocietyGuestQuery();

    const [pagi, setPagi] = useState({ start: 0, limit: 2 })

    const navigate = useNavigate()

    useEffect(() => {
        getAllSocietyGuest(pagi)
    }, [pagi])

    if (isLoading) {
        return <Loading />;
    }

    const guest = data?.result || [];

    const formatTime = (time) => {
        if (!time) return "Not Set";

        return new Date(time).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    };

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    return (
        <div className="p-4">
            {guest.length === 0 ? (
                <p className="text-center text-gray-500 text-lg mt-10">
                    No guest information available
                </p>
            ) : (
                <>
                    <div className="overflow-x-auto w-full border border-gray-200 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-[#145EFB]">
                                <tr>
                                    <th className="px-4 py-3 text-center text-md font-medium text-white">Guest Name</th>
                                    <th className="px-4 py-3 text-center text-md font-medium text-white">Mobile</th>
                                    <th className="px-4 py-3 text-center text-md font-medium text-white">Visit Date</th>
                                    <th className="px-4 py-3 text-center text-md font-medium text-white">In Time</th>
                                    <th className="px-4 py-3 text-center text-md font-medium text-white">Out Time</th>
                                    <th className="px-4 py-3 text-center text-md font-medium text-white">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {guest.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-center text-md">{item.guestName}</td>
                                        <td className="px-4 py-3 text-center text-md">{item.mobileNumber}</td>
                                        <td className="px-4 py-3 text-center text-md">{formatDate(item.createdAt)}</td>
                                        <td className="px-4 py-3 text-center text-md">
                                            {formatTime(item.inTime)}
                                        </td>

                                        <td className="px-4 py-3 text-center text-md">
                                            {formatTime(item.outTime)}
                                        </td>

                                        <td className="px-4 py-3 text-center text-md">
                                            <div className="flex justify-center items-center h-full w-full">
                                                <FiEye
                                                    className="text-blue-600 cursor-pointer text-lg"
                                                    onClick={() =>
                                                        navigate("/secretary/society/guest/details", {
                                                            state: { societyGuestDetail: item }
                                                        })
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
                </>
            )
            }
        </div >
    );
};

export default SecretaryVisitorList;
