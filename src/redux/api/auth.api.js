import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
// import { baseQueryWithAuth } from "./baseQueryWithAuth"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/auth`, credentials: "include" }),
    tagTypes: ["auth"],
    endpoints: (builder) => {
        return {
            /* -------- Admin Auth Start --------*/

            adminLogin: builder.mutation({
                query: userData => {
                    return {
                        url: "/admin-login",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("admin", JSON.stringify(data))
                    return data
                },
                invalidatesTags: ["auth"]
            }),

            adminLogout: builder.mutation({
                query: () => {
                    return {
                        url: "/admin-logout",
                        method: "POST",
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("admin")
                    return data.result
                },
                invalidatesTags: ["auth"]
            }),

            /* -------- Admin Auth End --------*/

            /* -------- Secreatry Auth Start --------*/

            secreatryRegister: builder.mutation({
                query: userData => {
                    return {
                        url: "/secreatry-register",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"]
            }),

            secreatryLogin: builder.mutation({
                query: userData => {
                    return {
                        url: "/secreatry-login",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("secreatry", JSON.stringify(data))
                    return data
                },

                invalidatesTags: ["auth"]
            }),

            secreatryLogout: builder.mutation({
                query: () => {
                    return {
                        url: "/secreatry-logout",
                        method: "POST",
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("secreatry")
                    return data.result
                },
                invalidatesTags: ["auth"]
            }),

            /* -------- Secreatry Auth End --------*/

            /* -------- Residential Auth Start --------*/

            residentialRegister: builder.mutation({
                query: userData => {
                    return {
                        url: "/residential-register",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"]
            }),

            residentialLogin: builder.mutation({
                query: userData => {
                    return {
                        url: "/residential-login",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("residential", JSON.stringify(data))
                    return data
                },
                invalidatesTags: ["auth"]
            }),

            residentialLogout: builder.mutation({
                query: () => {
                    return {
                        url: "/residential-logout",
                        method: "POST",
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("residential")
                    return data.result
                },
                invalidatesTags: ["auth"]
            }),

            /* -------- Residential Auth End --------*/

            /* -------- Security Guard Auth Start --------*/

            securityGuardRegister: builder.mutation({
                query: userData => {
                    return {
                        url: "/securityGuard-register",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"]
            }),

            securityGuardLogin: builder.mutation({
                query: userData => {
                    return {
                        url: "/securityGuard-login",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("securityGuard", JSON.stringify(data))
                    return data
                },
                invalidatesTags: ["auth"]
            }),

            securityGuardLogout: builder.mutation({
                query: () => {
                    return {
                        url: "/securityGuard-logout",
                        method: "POST",
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("securityGuard")
                    return data.result
                },
                invalidatesTags: ["auth"]
            }),

            /* -------- Security Guard Auth End --------*/
        }
    }
})

export const {
    useAdminLoginMutation,
    useAdminLogoutMutation,

    useSecreatryRegisterMutation,
    useSecreatryLoginMutation,
    useSecreatryLogoutMutation,

    useResidentialRegisterMutation,
    useResidentialLoginMutation,
    useResidentialLogoutMutation,

    useSecurityGuardRegisterMutation,
    useSecurityGuardLoginMutation,
    useSecurityGuardLogoutMutation
} = authApi
