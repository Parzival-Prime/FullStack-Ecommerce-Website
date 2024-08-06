import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        showPreview: true,
        isLoggedIn: false,
        isAdmin: false
    },
    reducers: {
        setShowPreviewFalse: (state) => {
            state.showPreview = false
        },

        setShowPreviewTrue: (state) => {
            state.showPreview = true
        },

        setIsLoggedInTrue: (state) => {
            state.isLoggedIn = true
        },

        setIsLoggedInFalse: (state) => {
            state.isLoggedIn = false
        },

        setIsAdminFalse: (state) => {
            state.isAdmin = false
        },

        setIsAdminTrue: (state) => {
            state.isAdmin = true
        },
    }
})



export const {
    setShowPreviewFalse,
    setShowPreviewTrue,
    setIsLoggedInFalse,
    setIsLoggedInTrue,
    setIsAdminTrue,
    setIsAdminFalse
} = counterSlice.actions



export default counterSlice.reducer