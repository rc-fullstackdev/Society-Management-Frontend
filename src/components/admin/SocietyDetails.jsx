import { useLazyGetSocietyDetailsQuery, useSecretaryAccessMutation } from '@/redux/api/admin.api'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Loading from '../common/Loading'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { FiEye } from 'react-icons/fi'

const SocietyDetails = () => {

    const [getSocietyDetails, { data, isLoading, isError, error }] = useLazyGetSocietyDetailsQuery()

    const [updateSecretaryAccess] = useSecretaryAccessMutation()

    const navigate = useNavigate()

    const [pagi, setPagi] = useState({ start: 0, limit: 2 })

    useEffect(() => {
        getSocietyDetails(pagi)
    }, [pagi])

    useEffect(() => {
        if (isError) {
            toast.error(data.message.error || "unable to fetch data")
        }
    }, [isError])

    if (isLoading) {
        return <Loading />
    }

    const societyDetails = data?.result || [];


    return (
        <div className="p-4">
            {societyDetails.length === 0 ? (
                <p className="text-center text-gray-500 text-lg mt-10">
                    No Society Details Available
                </p>
            ) : (
                <>
                    <div className="overflow-x-auto w-full border border-gray-200 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-[#145EFB]">
                                <tr>
                                    <th className="px-4 py-3 text-center text-md font-medium text-white">Society Name</th>
                                    <th className="px-4 py-3 text-center text-md font-medium text-white">Secretary Name</th>
                                    <th className="px-4 py-3 text-center text-md font-medium text-white">Status</th>
                                    <th className="px-4 py-3 text-center text-md font-medium text-white">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {societyDetails.map((secretaryDetails) => (
                                    <tr key={secretaryDetails._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-center text-md">{secretaryDetails.societyName}</td>
                                        <td className="px-4 py-3 text-center text-md">{secretaryDetails.secretaryName}</td>
                                        <td className="px-4 py-3 text-center">
                                            <Button
                                                onClick={() =>
                                                    updateSecretaryAccess({
                                                        id: secretaryDetails._id,
                                                        isActive: !secretaryDetails.isActive
                                                    })
                                                }
                                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer
                                                    ${secretaryDetails.isActive
                                                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                        : "bg-red-100 text-red-700 hover:bg-red-200"
                                                    }
                                                        `}
                                            >
                                                {secretaryDetails.isActive ? "Active" : "Inactive"}
                                            </Button>
                                        </td>
                                        <td>
                                            <div className="flex justify-center items-center h-full w-full">
                                                <FiEye
                                                    className="text-blue-600 cursor-pointer text-lg"
                                                    onClick={() => navigate(`/admin/secretary/details/${secretaryDetails._id}`)}
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
}

export default SocietyDetails