// State Management of Redux

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {}
})

// eslint-disable-next-line no-empty-pattern
export const { } = globalSlice.actions
export default globalSlice.reducer