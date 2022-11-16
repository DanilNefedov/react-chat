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
                userImg: action.payload.userImg,
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