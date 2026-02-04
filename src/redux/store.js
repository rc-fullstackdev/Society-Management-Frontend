import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth.api";
import { adminApi } from "./api/admin.api";
import { secreatryApi } from "./api/secreatry.api";
import { residentialApi } from "./api/residential.api";
import { securityGuardApi } from "./api/securityGuard.api";
import authSlice from "../redux/slice/auth.slice"

const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [secreatryApi.reducerPath]: secreatryApi.reducer,
        [residentialApi.reducerPath]: residentialApi.reducer,
        [securityGuardApi.reducerPath]: securityGuardApi.reducer,
        auth: authSlice
    },
    middleware: def => [...def(),
    authApi.middleware,
    adminApi.middleware,
    secreatryApi.middleware,
    residentialApi.middleware,
    securityGuardApi.middleware,
    ]
})

export default reduxStore