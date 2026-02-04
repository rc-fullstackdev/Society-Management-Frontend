import React, { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import { Button } from '../ui/button';
import { FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useLazyGetAllComplaintQuery } from '@/redux/api/secreatry.api';

const ComplaintInfoTable = () => {

    const [getAllComplaint, { data, isLoading, isError, error }] = useLazyGetAllComplaintQuery();

    const [pagi, setPagi] = useState({ start: 0, limit: 2 })

    const navigate = useNavigate()

    useEffect(() => {
        getAllComplaint(pagi)
    }, [pagi])

    if (isLoading) {
        return <Loading />;
    }

    const complaint = data?.result || [];

    return (
        <div className="p-4">
            {complaint.length === 0 ? (
                <p className="text-center text-gray-500 text-lg mt-10">
                    No complaint available
                </p>
            ) : (
                <>
                    <div className="overflow-x-auto w-full border border-gray-200 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-[#145EFB]">
                                <tr>
                                    <th className="px-4 py-3 text-center text-md font-medium text-white">Title</th>
                                    <th className="px-4 py-3 text-center text-md font-medium text-white">Category</th>
                                    <th className="px-4 py-3 text-center text-md font-medium text-white">Status</th>
                                    <th className="px-4 py-3 text-center text-md font-medium text-white">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {complaint.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-center text-md">{item.title}</td>
                                        <td className="px-4 py-3 text-center text-md">{item.category}</td>
                                        <td className={`px-4 py-2 text-center text-md  ${item.status === "Resolved" ? "text-green-600 font-semibold" : "text-red-600"}`}>
                                            {item.status}
                                        </td>
                                        <td className="px-4 py-3 text-center text-md">
                                            <div className="flex justify-center items-center h-full w-full">
                                                <FiEye
                                                    className="text-blue-600 cursor-pointer text-lg"
                                                    onClick={() =>
                                                        navigate(`/secretary/complaint/${item._id}`)
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

export default ComplaintInfoTable;
