import { useLazyGetAllEventQuery } from '@/redux/api/secreatry.api';
import React, { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import { toast } from 'react-toastify';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const GetEvent = () => {

    const [getAllEvent, { data, isLoading, isError, error }] = useLazyGetAllEventQuery();

    const [pagi, setPagi] = useState({ start: 0, limit: 2 })

    const navigate = useNavigate()

    useEffect(() => {
        getAllEvent(pagi)
    }, [pagi])

    if (isLoading) {
        return <Loading />;
    }

    const event = data?.result || [];

    const AddEventButton = () => (
        <Button
            onClick={() => navigate("/secretary/events/create")}
            className="bg-[#145EFB] hover:bg-blue-700 cursor-pointer text-white px-6 py-2"
        >
            Add Event
        </Button>
    );

    return (
        <div className="p-4 min-h-screen flex flex-col">
            {event.length === 0 ? (
                <div className="flex flex-col justify-center items-center flex-1 gap-4 text-center px-4">
                    <p className="text-gray-500 text-lg sm:text-xl">
                        No events available
                    </p>
                    <AddEventButton />
                </div>
            ) : (
                <>
                    <div className="flex justify-end mb-4">
                        <AddEventButton />
                    </div>

                    <div className="overflow-x-auto w-full border border-gray-200 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-[#145EFB]">
                                <tr>
                                    <th className="px-4 py-3 text-center text-md font-medium text-white">Title</th>
                                    <th className="px-4 py-3 text-center text-md font-medium text-white">Date</th>
                                    <th className="px-4 py-3 text-center text-md font-medium text-white">Description</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {event.map((e) => (
                                    <tr key={e._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-center text-md">{e.title}</td>
                                        <td className="px-4 py-3 text-center text-md">
                                            {new Date(e.date).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric"
                                            })}
                                        </td>
                                        <td className="px-4 py-3 text-center text-md">{e.description || "NO Description Available"}</td>
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

export default GetEvent;
