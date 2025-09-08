import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSkillsRequest } from "./skillsService";


export const fetchSkills = createAsyncThunk(
    'data/fetchSkills',
    async (jobId: string) =>{
        return await getSkillsRequest(jobId);
    }
)