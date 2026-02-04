import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { createAutoLogoutBaseQuery } from "./baseQuery/createAutoLogoutBaseQuery";

export const securityGuardApi = createApi({
    reducerPath: "securityGuardApi",
    baseQuery: createAutoLogoutBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/securityGuard`,
        redirectPath: "/guard-login"
    }),
    tagTypes: ["securityGuard"],
    endpoints: (builder) => {
        return {
            getAllResidential: builder.query({
                query: () => {
                    return {
                        url: "/get-all-residential",
                        method: "GET"
                    }
                },
                providesTags: ["securityGuard"]
            }),

            getAllGuest: builder.query({
                query: guestData => {
                    return {
                        url: "/get-all-guest",
                        method: "GET",
                        params: guestData
                    }
                },
                providesTags: ["securityGuard"]
            }),

            guestInformation: builder.mutation({
                query: userData => {
                    return {
                        url: "/guest-information",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["securityGuard"]
            }),

            guestOutTime: builder.mutation({
                query: id => {
                    return {
                        url: `/guest-out/${id}`,
                        method: "PATCH",
                    }
                },
                invalidatesTags: ["securityGuard"]
            }),

        }
    }
})

export const {
    useLazyGetAllResidentialQuery,
    useLazyGetAllGuestQuery,
    useGuestInformationMutation,
    useGuestOutTimeMutation
} = securityGuardApi
