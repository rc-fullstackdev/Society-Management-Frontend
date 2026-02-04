import React, { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import { Button } from '../ui/button';
import { useLazyGetEventQuery } from '@/redux/api/residential.api';

const GetAllSocietyEvent = () => {

    const [getAllEvent, { data, isLoading, isError, error }] = useLazyGetEventQuery();

    const [pagi, setPagi] = useState({ start: 0, limit: 2 })

    useEffect(() => {
        getAllEvent(pagi)
    }, [pagi])

    if (isLoading) {
        return <Loading />;
    }

    const event = data?.result || [];

    return (
        <div className="p-4">
            {event.length === 0 ? (
                <p className="text-center text-gray-500 text-lg mt-10">
                    No events available
                </p>
            ) : (
                <>
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

export default GetAllSocietyEvent;
