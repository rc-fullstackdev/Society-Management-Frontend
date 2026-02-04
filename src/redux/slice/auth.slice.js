import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/auth.api";

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        admin: JSON.parse(localStorage.getItem("admin")) || null,
        secreatry: JSON.parse(localStorage.getItem("secreatry")) || null,
        residential: JSON.parse(localStorage.getItem("residential")) || null,
        securityGuard: JSON.parse(localStorage.getItem("securityGuard")) || null
    },
    reducers: {

    },

    extraReducers: builder => builder
        /* -------- Admin -------------*/

        .addMatcher(authApi.endpoints.adminLogin.matchFulfilled, (state, { payload }) => {
            state.admin = payload
        })

        .addMatcher(authApi.endpoints.adminLogout.matchFulfilled, (state, { payload }) => {
            state.admin = payload
        })

        /* -------- Secreatry -------------*/

        .addMatcher(authApi.endpoints.secreatryLogin.matchFulfilled, (state, { payload }) => {
            state.secreatry = payload
        })

        .addMatcher(authApi.endpoints.secreatryLogout.matchFulfilled, (state, { payload }) => {
            state.secreatry = null
        })

        /* -------- Residential -------------*/

        .addMatcher(authApi.endpoints.residentialLogin.matchFulfilled, (state, { payload }) => {
            state.residential = payload
        })

        .addMatcher(authApi.endpoints.residentialLogout.matchFulfilled, (state, { payload }) => {
            state.residential = null
        })

        /* -------- Security Guard -------------*/

        .addMatcher(authApi.endpoints.securityGuardLogin.matchFulfilled, (state, { payload }) => {
            state.securityGuard = payload
        })

        .addMatcher(authApi.endpoints.securityGuardLogout.matchFulfilled, (state, { payload }) => {
            state.securityGuard = null
        })
})


export const { invalidate } = authSlice.actions
export default authSlice.reducer