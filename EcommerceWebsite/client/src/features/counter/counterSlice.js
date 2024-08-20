import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        showPreview: true,
        isLoggedIn: false,
        isAdmin: false,
        theme: 'dark'
    },
    reducers: {
        setShowPreviewFalse: (state) => {
            state.showPreview = false; // This is handled immutably by Immer
        },

        setShowPreviewTrue: (state) => {
            state.showPreview = true; // This is handled immutably by Immer
        },

        setIsLoggedInTrue: (state) => {
            state.isLoggedIn = true; // This is handled immutably by Immer
            if (process.env.NODE_ENV !== 'production') {
                console.log('Counter says logged In true'); // Log only in development
            }
        },

        setIsLoggedInFalse: (state) => {
            state.isLoggedIn = false; // This is handled immutably by Immer
            if (process.env.NODE_ENV !== 'production') {
                console.log("Counter says logged in false"); // Log only in development
            }
        },

        setIsAdminFalse: (state) => {
            state.isAdmin = false; // This is handled immutably by Immer
        },

        setIsAdminTrue: (state) => {
            state.isAdmin = true; // This is handled immutably by Immer
        },

        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light'; // This is handled immutably by Immer
        },
    }
});

export const {
    setShowPreviewFalse,
    setShowPreviewTrue,
    setIsLoggedInFalse,
    setIsLoggedInTrue,
    setIsAdminTrue,
    setIsAdminFalse,
    toggleTheme
} = counterSlice.actions;

export default counterSlice.reducer;
