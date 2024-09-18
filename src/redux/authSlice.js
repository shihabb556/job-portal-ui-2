import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem("job-portal_user")) || null,
        token: JSON.parse(localStorage.getItem("job-portal_token")) || null,
        loading: null, // Initially, loading is set to null.
    },
    reducers: {
        setUser: (state, action) => {
            const { user, token } = action?.payload; // Destructure user and token from payload
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
   
    },
});

export const { setUser, logout, setLoading, setAdmin, clearAdmin } = authSlice.actions;
export default authSlice.reducer;
