import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    friend:[]
}


const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers:{
        addFrined(state, action){
            state.friend.push({
                id:action.payload.userId,
                name:action.payload.text,
                lastMessages:''
            })
        }
    }
})


export const {addFrined} = friendSlice.actions;

export default friendSlice.reducer;