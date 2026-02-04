import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { createAutoLogoutBaseQuery } from "./baseQuery/createAutoLogoutBaseQuery";

export const residentialApi = createApi({
    reducerPath: "residentialApi",
    // baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/residential`, credentials: "include" }),
    baseQuery: createAutoLogoutBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/residential`,
        redirectPath: "/residential-login"
    }),
    tagTypes: ["residential"],
    endpoints: (builder) => {
        return {

            allMaintenance: builder.query({
                query: userData => {
                    return {
                        url: "/get-all-maintenance",
                        method: "GET",
                        params: userData
                    }
                },
                transformErrorResponse: (error) => {
                    if (error?.status === 401) {
                        localStorage.clear();
                        window.location.replace("/residential-login");
                    }
                    return error;
                },
                providesTags: ["residential"]
            }),

            getFlatDetails: builder.query({
                query: () => {
                    return {
                        url: "/get-flat-details",
                        method: "GET"
                    }
                },
                providesTags: ["residential"]
            }),

            getPaymentHistory: builder.query({
                query: paymentData => {
                    return {
                        url: "/get-payment-history",
                        method: "GET",
                        params: paymentData
                    }
                },
                providesTags: ["residential"]
            }),

            getEvent: builder.query({
                query: eventData => {
                    return {
                        url: "/get-event",
                        method: "GET",
                        params: eventData
                    }
                },
                providesTags: ["residential"]
            }),

            getComplaint: builder.query({
                query: complaintData => {
                    return {
                        url: "/get-complaint",
                        method: "GET",
                        params: complaintData
                    }
                },
                providesTags: ["residential"]
            }),

            getResidentGuest: builder.query({
                query: guestData => {
                    return {
                        url: "/get-resident-guest",
                        method: "GET",
                        params: guestData
                    }
                },
                providesTags: ["residential"]
            }),

            getFacility: builder.query({
                query: bookingData => {
                    return {
                        url: "/get-facility",
                        method: "GET",
                        params: bookingData
                    }
                },
                providesTags: ["residential"]
            }),

            payMaintenance: builder.mutation({
                query: maintenanceData => {
                    return {
                        url: "/pay-maintenance",
                        method: "POST",
                        body: maintenanceData
                    }
                },
                invalidatesTags: ["residential"]
            }),

            addComplaint: builder.mutation({
                query: complaintData => {
                    return {
                        url: "/add-complaint",
                        method: "POST",
                        body: complaintData
                    }
                },
                invalidatesTags: ["residential"]
            }),

            bookingFacility: builder.mutation({
                query: bookingData => {
                    return {
                        url: "/add-facility",
                        method: "POST",
                        body: bookingData
                    }
                },
                invalidatesTags: ["residential"]
            }),

        }
    }
})

export const {
    useLazyAllMaintenanceQuery,
    useGetFlatDetailsQuery,
    useLazyGetPaymentHistoryQuery,
    useLazyGetEventQuery,
    useLazyGetComplaintQuery,
    usePayMaintenanceMutation,
    useCreateOrderMutation,
    useVerifyPaymentMutation,
    useAddComplaintMutation,
    useLazyGetResidentGuestQuery,
    useBookingFacilityMutation,
    useLazyGetFacilityQuery
} = residentialApi
