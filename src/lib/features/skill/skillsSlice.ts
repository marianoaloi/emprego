import { createSlice } from "@reduxjs/toolkit";
import { fetchSkills } from "./skillsTruck";
import { JobSkills } from "./skillsService";

interface DataState {
    skills: JobSkills | null;
    loading: boolean;
    error: string | null;
}

const initialState: DataState = {
    skills: null,
    loading: false,
    error: null
}

const skillSlice = createSlice({
    name: 'skills',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchSkills.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSkills.fulfilled, (state, action) => {
                state.loading = false;
                state.skills = action.payload
            })
            .addCase(fetchSkills.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch skills';
            })
    },
})

export default skillSlice.reducer;