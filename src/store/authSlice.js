import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name:null,
    email:null,
    id:null,
    photo:null
}

const authSlice = createSlice({
    name: 'user',
    initialState, 
    reducers:{
        setUser(state, action) {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.photo = action.payload.photo
        },
        updateUser(state, action){
            state.photo = action.payload.photo
            state.name = action.payload.name
            state.email = action.payload.email
        },
        removePhoto(state){
            state.photo = null
        },
        removeUser(state) {
            state.name = null;
            state.email = null;
            state.id = null;
            state.photo = null;
        }
    }
})

export const {setUser, removeUser, updateUser, removePhoto} = authSlice.actions

export default authSlice.reducer;