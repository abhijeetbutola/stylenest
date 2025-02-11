import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
    const storedAuth = localStorage.getItem("authData");
    
    if (storedAuth) {
        return {
            isAuthenticated: true,
            user: JSON.parse(storedAuth)
        }
    }
    return {
        isAuthenticated: false,
        user: null,
    };
};

const authSlice = createSlice({
    name: 'auth',
    initialState: getInitialState(),
    reducers: {
        login(state, action) {
            state.isAuthenticated = true
            state.user = action.payload
        },
        logout(state) {
            state.isAuthenticated = false
            state.user = null
            localStorage.removeItem("cartState")
            localStorage.removeItem("authData")
        },
        rehydrate(state, action) {
            state.isAuthenticated = true
            state.user = action.payload
        }
    }
})

export const { login, logout, rehydrate } = authSlice.actions
export default authSlice.reducer