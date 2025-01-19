import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ColorState {
    selectedColor: string;
}

const initialState: ColorState = {
    selectedColor: '',
};

const colorSlice = createSlice({
    name: "color",
    initialState,
    reducers: {
        changeColor: (state, action: PayloadAction<string>) => {
            state.selectedColor = action.payload;
        }
    }
})

export const { changeColor } = colorSlice.actions;

export default colorSlice.reducer;