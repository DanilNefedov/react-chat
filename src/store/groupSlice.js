import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    group:[]
}


const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers:{
        addGroup(state, action){
            state.group.push({
                id:action.payload.combinedId,
                users:action.payload.users,
                photo:action.payload.photo,
                name:action.payload.name
            })
        }
        
    }
})
