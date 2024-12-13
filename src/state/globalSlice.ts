import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface initialStateTypes {
  user: { id: string } | null;
}

const initialState: initialStateTypes = { user: null }

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ id: string } | null>) => {
            state.user = action.payload;
        },
    }
})

export const { setUser } = globalSlice.actions;
export default globalSlice.reducer;
