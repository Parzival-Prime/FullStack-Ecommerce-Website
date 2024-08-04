import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        showPreview: true,
        isLoggedIn: false,
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
    }
})



export const {
    setShowPreviewFalse,
    setShowPreviewTrue,
    setIsLoggedInFalse,
    setIsLoggedInTrue,
} = counterSlice.actions



export default counterSlice.reducer