import React, { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import { toast } from 'react-toastify';
import { Button } from '../ui/button';
import { useLazyGetPaymentHistoryQuery } from '@/redux/api/residential.api';

const PaymentHistory = () => {

    const [getAllPayment, { data, isLoading, isError, error }] = useLazyGetPaymentHistoryQuery();

    const [pagi, setPagi] = useState({ start: 0, limit: 2 })

    useEffect(() => {
        getAllPayment(pagi)
    }, [pagi])

    if (isLoading) {
        return <Loading />;
    }

    const payment = data?.result || [];

    return (
        <div className="p-4">
            {payment.length === 0 ? (
                <p className="text-center text-gray-500 text-lg mt-10">
                    No Payment History available
                </p>
            ) : (
                <>
                    <div className="overflow-x-auto w-full border border-gray-200 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-[#145EFB]">
                                <tr>
                                    <th className="px-4 py-3 text-center text-md font-medium text-white">Amount</th>
                                    <th className="px-4 py-3 text-center text-md font-medium text-white">payment Date</th>
                                    <th className="px-4 py-3 text-center text-md font-medium text-white">Method</th>
                                    <th className="px-4 py-3 text-center text-md font-medium text-white">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {payment.map((p) => (
                                    <tr key={p._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 text-center text-md">{p.amountPaid}</td>
                                        <td className="px-4 py-3 text-center text-md">
                                            {new Date(p.paymentDate).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric"
                                            })}
                                        </td>
                                        <td className="px-4 py-2 text-center text-md">{p.method}</td>
                                        <td className="px-4 py-2 text-center text-md font-semibold text-green-600">{p.status}</td>
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

export default PaymentHistory;
