import React, { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import { toast } from 'react-toastify';
import { Button } from '../ui/button';
import { useLazyAllMaintenanceQuery, usePayMaintenanceMutation } from '@/redux/api/residential.api';

const PayMaintenance = () => {

    const [getAllMaintenance, { data, isLoading, isError, error, refetch }] = useLazyAllMaintenanceQuery();
    const [payMaintenance, { isSuccess }] = usePayMaintenanceMutation();

    const [pagi, setPagi] = useState({ start: 0, limit: 2 })

    useEffect(() => {
        getAllMaintenance(pagi)
    }, [pagi])


    useEffect(() => {
        if (isSuccess) {
            toast.success("Maintenance Payed Successfully")
        }
    }, [isSuccess])

    if (isLoading) {
        return <Loading />;
    }

    const maintenances = data?.result || [];

    const handlePayNow = async (maintenance) => {
        try {
            // STEP 1: CREATE ORDER
            const orderData = await payMaintenance({
                maintenanceId: maintenance._id,
                month: maintenance.month,
                method: "Razorpay",
                amountPaid: maintenance.amount,
            }).unwrap();

            const options = {
                key: import.meta.env.VITE_RAZORPAY_API_KEY,
                amount: orderData.amount * 100,
                currency: "INR",
                name: "Society Maintenance",
                description: maintenance.description || "Monthly Maintenance",
                order_id: orderData.orderId,

                handler: async (response) => {
                    await payMaintenance({
                        method: "Razorpay",
                        maintenanceId: maintenance._id,
                        amountPaid: maintenance.amount,
                        month: maintenance.month,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    }).unwrap();

                    refetch()
                },

                theme: { color: "#145EFB" },
            };

            new window.Razorpay(options).open();

        } catch (err) {
            toast.error(err?.data?.message || err.message || "Payment failed");
        }
    };

    return (
        <div className="p-4">
            {maintenances.length === 0 ? (
                <p className="text-center text-gray-500 text-lg mt-10">
                    No maintenance available
                </p>
            ) : (
                <>
                    <div className="overflow-x-auto w-full border border-gray-200 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-[#145EFB]">
                                <tr>
                                    <th className="px-4 py-3 text-center text-md font-medium text-white">Month</th>
                                    <th className="px-4 py-3 text-center text-md font-medium text-white">Amount</th>
                                    <th className="px-4 py-3 text-center text-md font-medium text-white">Due Date</th>
                                    <th className="px-4 py-3  text-center text-white hidden lg:table-cell">Description</th>
                                    <th className="px-4 py-3 text-center text-md font-medium text-white">Status</th>
                                    <th className="px-4 py-3 text-center text-md font-medium text-white">Action</th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                                {maintenances.map((m) => (
                                    <tr key={m._id} className="hover:bg-gray-50">

                                        <td className="px-4 py-3 text-center text-md">
                                            {new Date(m.month).toLocaleString('default', { month: 'long', year: 'numeric' })}
                                        </td>

                                        <td className="px-4 py-2 text-center text-md">
                                            ₹{m.amount}
                                        </td>

                                        <td className="px-4 py-3 text-center text-md">
                                            {new Date(m.dueDate).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric"
                                            })}
                                        </td>

                                        <td className="px-4 py-3 text-center hidden lg:table-cell truncate">
                                            {m.description || "No Description"}
                                        </td>

                                        {/* STATUS */}
                                        <td className={`px-4 py-2 text-center font-semibold
                                            ${m.status === "Paid" ? "text-green-600" :
                                                m.status === "Overdue" ? "text-red-600" :
                                                    "text-yellow-600"}
      `}>
                                            {m.status}
                                        </td>

                                        {/* ACTION */}
                                        <td className="px-4 py-2 text-center">
                                            {m.status === "Paid" ? (
                                                <span className="text-green-600 font-medium">Paid</span>
                                            ) : (
                                                <Button
                                                    onClick={() => handlePayNow(m)}
                                                    className="bg-[#145EFB] hover:bg-blue-700 cursor-pointer text-white px-4 py-1"
                                                >
                                                    Pay Now
                                                </Button>
                                            )}
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

export default PayMaintenance;


