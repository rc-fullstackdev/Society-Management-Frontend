import React, { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import { Button } from '../ui/button';
import { useLazyGetFacilityQuery } from '@/redux/api/residential.api';
import { FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ResidentFacilityBookingList = () => {

    const [getResidentBooking, { data, isLoading }] = useLazyGetFacilityQuery();

    const [pagi, setPagi] = useState({ start: 0, limit: 2 })

    const navigate = useNavigate()

    useEffect(() => {
        getResidentBooking(pagi)
    }, [pagi])

    if (isLoading) {
        return <Loading />;
    }

    const facility = data?.booking || [];

    const formatTime = (time) => {
        if (!time) return "N/A";

        const [hours, minutes] = time.split(":");
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);

        return date.toLocaleTimeString("en-IN", {
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

    const AddBookingButton = () => (
        <Button
            onClick={() => navigate("/residential/add/facility/booking")}
            className="bg-[#145EFB] hover:bg-blue-700 cursor-pointer text-white px-6 py-2"
        >
            Facility Booking
        </Button>
    );

    return (
        <div className="p-4 min-h-screen flex flex-col">
            {
                facility.length === 0 ? (
                    <div className="flex flex-col justify-center items-center flex-1 gap-4 text-center px-4">
                        <p className="text-gray-500 text-lg sm:text-xl">
                            No facility booking available
                        </p>
                        <AddBookingButton />
                    </div>
                ) : (
                    <>

                        <div className="flex justify-end mb-4">
                            <AddBookingButton />
                        </div>

                        <div className="overflow-x-auto w-full border border-gray-200 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-[#145EFB]">
                                    <tr>
                                        <th className="px-4 py-3 text-center text-md font-medium text-white">Facility Type</th>
                                        <th className="px-4 py-3 text-center text-md font-medium text-white">Booking Date</th>
                                        <th className="px-4 py-3 text-center text-md font-medium text-white">Start Time</th>
                                        <th className="px-4 py-3 text-center text-md font-medium text-white">End Time</th>
                                        <th className="px-4 py-3 text-center text-md font-medium text-white">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {facility.map((item) => (
                                        <tr key={item._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-center text-md">{item.facilityType}</td>
                                            <td className="px-4 py-3 text-center text-md">{formatDate(item.bookingDate)}</td>
                                            <td className="px-4 py-3 text-center text-md">
                                                {formatTime(item.startTime)}
                                            </td>

                                            <td className="px-4 py-3 text-center text-md">
                                                {formatTime(item.endTime)}
                                            </td>

                                            <td className="px-4 py-3 text-center text-md">
                                                <div className="flex justify-center items-center h-full w-full">
                                                    <FiEye
                                                        className="text-blue-600 cursor-pointer text-lg"
                                                        onClick={() =>
                                                            navigate("/residential/facility/booking/details", {
                                                                state: { bookingDetails: item }
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
                )}
        </div>
    );
};

export default ResidentFacilityBookingList;
