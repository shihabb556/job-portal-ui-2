import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: JSON.parse(localStorage.getItem("job-portal_token")) || null,
        loading: null, // Initially, loading is set to null.
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            // If the token is part of the user object, make sure to update it.
            if (action.payload.token) {
                state.token = action.payload.token;
                localStorage.setItem("job-portal_token", JSON.stringify(action.payload.token));
            }
        },
        setLoading: (state, action) => {
            state.loading = action.payload; // Correctly update the loading state.
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("job-portal_token");
        },
    },
});

export const { setUser, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
