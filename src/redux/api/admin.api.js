import { createApi } from "@reduxjs/toolkit/query/react"
import { createAutoLogoutBaseQuery } from "./baseQuery/createAutoLogoutBaseQuery";

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: createAutoLogoutBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/admin`,
        redirectPath: "/admin-login"
    }),
    tagTypes: ["admin"],
    endpoints: (builder) => {
        return {
            getSocietyDetails: builder.query({
                query: userData => {
                    return {
                        url: "/get-society-details",
                        method: "GET",
                        params: userData
                    }
                },
                // transformErrorResponse: (error) => {
                //     if (error?.status === 401) {
                //         localStorage.clear();
                //         window.location.replace("/admin-login");
                //     }
                //     return error;
                // },
                providesTags: ["admin"]
            }),

            getContactDetails: builder.query({
                query: userData => {
                    return {
                        url: "/get-contact-details",
                        method: "GET",
                        params: userData
                    }
                },
                providesTags: ["admin"]
            }),

            secretaryAccess: builder.mutation({
                query: ({ id, isActive }) => ({
                    url: `/secretary-access/${id}`,
                    method: "PATCH",
                    body: { isActive }
                }),
                invalidatesTags: ["admin"]
            }),

            contactUs: builder.mutation({
                query: userData => ({
                    url: "/contact-us",
                    method: "POST",
                    body: userData
                }),
                invalidatesTags: ["admin"]
            }),
        }
    }
})

export const {
    useLazyGetSocietyDetailsQuery,
    useLazyGetContactDetailsQuery,
    useSecretaryAccessMutation,
    useContactUsMutation
} = adminApi
