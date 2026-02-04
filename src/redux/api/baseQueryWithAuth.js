import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { forceLogout } from "../slice/auth.slice"

const rawBaseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/auth`,
    credentials: "include"
})

export const baseQueryWithAuth = async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions)

    // 🔥 COOKIE EXPIRED OR INVALID
    if (result.error?.status === 401) {
        api.dispatch(forceLogout())
        window.location.href = "/login"
    }

    return result
}
