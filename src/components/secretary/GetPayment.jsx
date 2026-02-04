import React, { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import { toast } from 'react-toastify';
import { Button } from '../ui/button';
import { useLazyGetAllPaymentQuery } from '@/redux/api/secreatry.api';
import { useNavigate } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';

const GetPayment = () => {

    const [GetAllPayment, { data, isLoading, isError, error }] = useLazyGetAllPaymentQuery();

    const [pagi, setPagi] = useState({ start: 0, limit: 2 })

    const navigate = useNavigate()

    useEffect(() => {
        GetAllPayment(pagi)
    }, [pagi])

    if (isLoading) {
        return <Loading />;
    }

    const payments = data?.result || [];

    return (
        <div className="p-4">
            {payments.length === 0 ? (
                <p className="text-center text-gray-500 text-lg mt-10">
                    No Payment History Available
                </p>
            ) : (
                <>
                    <div className="overflow-x-auto w-full border border-gray-200 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-[#145EFB]">
                                <tr>
                                    <th className="px-2 py-3 text-center text-md font-medium text-white">Amount Paid</th>
                                    <th className="px-2 py-3 text-center text-md font-medium text-white">Payment Date</th>
                                    <th className="px-2 py-3 text-center text-md font-medium text-white">Maintenance Month</th>
                                    <th className="px-2 py-3 text-center text-md font-medium text-white">Method</th>
                                    <th className="px-2 py-3 text-center text-md font-medium text-white">Status</th>
                                    <th className="px-2 py-3 text-center text-md font-medium text-white">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {payments.map((p) => (
                                    <tr key={p._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 text-center text-md">{p.amountPaid}</td>
                                        <td className="px-4 py-3 text-center text-md">
                                            {new Date(p.paymentDate).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric"
                                            })}
                                        </td>
                                        <td className="px-4 py-3 text-center text-md">
                                            {p.maintenanceId
                                                ? new Date(p.maintenanceId.month).toLocaleDateString("en-GB", {
                                                    month: "long",
                                                    year: "numeric",
                                                })
                                                : "N/A"}
                                        </td>

                                        <td className="px-4 py-2 text-center text-md">{p.method}</td>
                                        <td className={`px-4 py-2 text-center text-md  ${p.status === "Paid" ? "text-green-600 font-semibold" : "text-black"}`}>
                                            {p.status}
                                        </td>
                                        <td>
                                            <div className="flex justify-center items-center h-full w-full">
                                                <FiEye
                                                    className="text-blue-600 cursor-pointer text-lg"
                                                    onClick={() =>
                                                        navigate("/secretary/view/residential", {
                                                            state: { residentId: p.residentId }
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

export default GetPayment;
