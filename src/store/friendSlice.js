import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    friend:[]
}


const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers:{
        addFrined(state, action){
            //console.log(action.payload)
            state.friend.push({
                id:action.payload.data.name,
                name:action.payload.data.id,
                userImg: action.payload.data.email,
                date: '',
                lastMessages:''
            })
        },
        addLastMessage(state, action){
            const friend = state.friend.find(el => el.id === action.payload.friendInfo.id)
            friend.lastMessages = action.payload.messageText
            friend.date = action.payload.datePush
        }
    }
})


export const {addFrined, addLastMessage} = friendSlice.actions;

export default friendSlice.reducer;