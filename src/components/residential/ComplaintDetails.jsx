import React, { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import { Button } from '../ui/button';
import { useLazyGetComplaintQuery } from '@/redux/api/residential.api';
import { FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ComplaintDetails = () => {

    const [getAllComplaint, { data, isLoading, isError, error }] = useLazyGetComplaintQuery();

    const [pagi, setPagi] = useState({ start: 0, limit: 2 })

    const navigate = useNavigate()

    useEffect(() => {
        getAllComplaint(pagi)
    }, [pagi])

    if (isLoading) {
        return <Loading />;
    }

    const complaint = data?.result || [];

    const AddComplaintButton = () => (
        <Button
            onClick={() => navigate("/residential/complaint/form")}
            className="bg-[#145EFB] hover:bg-blue-700 cursor-pointer text-white px-6 py-2"
        >
            Add Complaint
        </Button>
    );

    return (
        <div className="p-4 min-h-screen flex flex-col">
            {
                complaint.length === 0 ? (
                    <div className="flex flex-col justify-center items-center flex-1 gap-4 text-center px-4">
                        <p className="text-gray-500 text-lg sm:text-xl">
                            No complaint available
                        </p>
                        <AddComplaintButton />
                    </div>
                ) : (
                    <>
                        <div className="flex justify-end mb-4">
                            <AddBookingButton />
                        </div>

                        <div className='flex justify-end mb-2'>
                            <Button
                                onClick={() => navigate("/residential/complaint/form")}
                                className="bg-[#145EFB] hover:bg-blue-700 cursor-pointer text-white px-4 py-5"
                            >
                                Add Complaint
                            </Button>
                        </div>

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
                                                            navigate("/residential/complaint/card", {
                                                                state: { societyDetails: item }
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

export default ComplaintDetails;
