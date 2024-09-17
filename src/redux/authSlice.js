import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem("job-portal_user")) || null,
        token: JSON.parse(localStorage.getItem("job-portal_token")) || null,
        admin: JSON.parse(localStorage.getItem("job-portal_admin")) || null,
        adminToken: JSON.parse(localStorage.getItem("job-portal_admin-token")) || null,
        loading: null, // Initially, loading is set to null.
    },
    reducers: {
        setUser: (state, action) => {
            const { user, token } = action.payload; // Destructure user and token from payload
            if (user && token) {
                state.user = user;
                state.token = token;
                // Store user and token in localStorage
                localStorage.setItem("job-portal_user", JSON.stringify(user));
                localStorage.setItem("job-portal_token", JSON.stringify(token));
            }
        },
        setLoading: (state, action) => {
            state.loading = action.payload; // Correctly update the loading state.
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("job-portal_user");
            localStorage.removeItem("job-portal_token");
        },
        setAdmin: (state, action) => {
            const { admin, token } = action.payload; // Destructure admin and token from payload
            if (admin && token) {
                state.admin = admin;
                state.adminToken = token;

                // Store admin and admin token in localStorage
                localStorage.setItem("job-portal_admin", JSON.stringify(admin));
                localStorage.setItem("job-portal_admin-token", JSON.stringify(token));
            }
        },
        clearAdmin: (state) => {
            state.admin = null;
            state.adminToken = null;
            localStorage.removeItem("job-portal_admin");
            localStorage.removeItem("job-portal_admin-token");
        }
    },
});

export const { setUser, logout, setLoading, setAdmin, clearAdmin } = authSlice.actions;
export default authSlice.reducer;
