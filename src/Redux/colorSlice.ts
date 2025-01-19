import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ColorState {
    selectedColor: string;
    proposedColors: string[];
}

const initialState: ColorState = {
    selectedColor: '',
    proposedColors: ['#ff9063', '#f0d075', '#0dccfb', '#be8dff', '#daf383'],
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