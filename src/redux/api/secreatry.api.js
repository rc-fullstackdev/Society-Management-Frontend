import { createApi } from "@reduxjs/toolkit/query/react"
import { createAutoLogoutBaseQuery } from "./baseQuery/createAutoLogoutBaseQuery"

export const secreatryApi = createApi({
    reducerPath: "secreatryApi",
    baseQuery: createAutoLogoutBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/secretary`,
        redirectPath: "/secretary-login"
    }),
    tagTypes: ["secreatry"],
    endpoints: (builder) => {
        return {
            GetAllResidential: builder.query({
                query: () => {
                    return {
                        url: "/get-all-residents",
                        method: "GET"
                    }
                },
                providesTags: ["secreatry"]
            }),

            GetSecurityGuard: builder.query({
                query: () => {
                    return {
                        url: "/get-guard",
                        method: "GET"
                    }
                },
                providesTags: ["secreatry"]
            }),

            UserAccess: builder.mutation({
                query: ({ role, id, isActive }) => ({
                    url: `/user-access/${role}/${id}`,
                    method: "PATCH",
                    body: { isActive }
                }),
                invalidatesTags: ["secreatry"]
            }),

            createMaintenance: builder.mutation({
                query: maintenanceData => {
                    return {
                        url: "/create-maintenance",
                        method: "POST",
                        body: maintenanceData
                    }
                },
                invalidatesTags: ["secreatry"]
            }),

            getAllMaintenance: builder.query({
                query: userData => {
                    return {
                        url: "/get-all-maintenance",
                        method: "GET",
                        params: userData
                    }
                },
                providesTags: ["secreatry"]
            }),

            getAllPayment: builder.query({
                query: paymentData => {
                    return {
                        url: "/get-all-payment",
                        method: "GET",
                        params: paymentData
                    }
                },
                providesTags: ["secreatry"]
            }),

            CashMaintenacePay: builder.mutation({
                query: maintenanceData => {
                    return {
                        url: "/cash-payment",
                        method: "POST",
                        body: maintenanceData
                    }
                },
                invalidatesTags: ["secreatry"]
            }),

            getResidentById: builder.query({
                query: (residentId) => ({
                    url: `/residential/${residentId}`,
                    method: "GET",
                }),
                providesTags: ["secreatry"]
            }),

            addEvent: builder.mutation({
                query: eventData => {
                    return {
                        url: "/add-event",
                        method: "POST",
                        body: eventData
                    }
                },
                invalidatesTags: ["secreatry"]
            }),

            getAllEvent: builder.query({
                query: eventData => {
                    return {
                        url: "/get-all-event",
                        method: "GET",
                        params: eventData
                    }
                },
                providesTags: ["secreatry"]
            }),

            getAllComplaint: builder.query({
                query: complaintData => {
                    return {
                        url: "/get-complaint",
                        method: "GET",
                        params: complaintData
                    }
                },
                providesTags: ["secreatry"]
            }),

            getComplaintById: builder.query({
                query: id => {
                    return {
                        url: `/complaint/${id}`,
                        method: "GET",
                    }
                },
                providesTags: ["secreatry"]
            }),

            getSocietyGuest: builder.query({
                query: guestData => {
                    return {
                        url: "/get-society-guest",
                        method: "GET",
                        params: guestData
                    }
                },
                providesTags: ["secreatry"]
            }),

            getResidentBooking: builder.query({
                query: bookingData => {
                    return {
                        url: "/get-facility-booking",
                        method: "GET",
                        params: bookingData
                    }
                },
                providesTags: ["secreatry"]
            }),

            getResidentBookingById: builder.query({
                query: (id) => {
                    return {
                        url: `/get-resident-booking/${id}`,
                        method: "GET",
                    }
                },
                providesTags: ["secreatry"]
            }),

            updateComplaint: builder.mutation({
                query: ({ id, complaintData }) => {
                    return {
                        url: `/update-complaint/${id}`,
                        method: "PATCH",
                        body: complaintData
                    }
                },
                invalidatesTags: ["secreatry"]
            }),

            updateResidentInfo: builder.mutation({
                query: ({ id, residentData }) => {
                    return {
                        url: `/update-resident/${id}`,
                        method: "PATCH",
                        body: residentData
                    }
                },
                invalidatesTags: ["secreatry"]
            }),

            updateGuardInfo: builder.mutation({
                query: ({ id, guardData }) => {
                    return {
                        url: `/update-guard/${id}`,
                        method: "PATCH",
                        body: guardData
                    }
                },
                invalidatesTags: ["secreatry"]
            }),

            updateBookingStatus: builder.mutation({
                query: ({ bookingId, bookingData }) => {
                    return {
                        url: `/update-facility-booking/${bookingId}`,
                        method: "PATCH",
                        body: bookingData
                    }
                },
                invalidatesTags: ["secreatry"]
            }),

            createBookingBill: builder.mutation({
                query: billId => {
                    return {
                        url: `/facility-booking/${billId}/generate-bill`,
                        method: "POST",
                    }
                },
                invalidatesTags: ["secreatry"]
            }),
        }
    }
})

export const {
    useGetAllResidentialQuery,
    useGetSecurityGuardQuery,
    useUserAccessMutation,
    useCreateMaintenanceMutation,
    useLazyGetAllMaintenanceQuery,
    useLazyGetAllPaymentQuery,
    useCashMaintenacePayMutation,
    useGetResidentByIdQuery,
    useAddEventMutation,
    useLazyGetAllEventQuery,
    useLazyGetAllComplaintQuery,
    useUpdateComplaintMutation,
    useGetComplaintByIdQuery,
    useUpdateResidentInfoMutation,
    useUpdateGuardInfoMutation,
    useLazyGetSocietyGuestQuery,
    useLazyGetResidentBookingQuery,
    useUpdateBookingStatusMutation,
    useGetResidentBookingByIdQuery,
    useCreateBookingBillMutation
} = secreatryApi
