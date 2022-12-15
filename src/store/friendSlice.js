import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    friend:[]
}


const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers:{
        addFrined(state, action){
            //console.log(action.payload.date[0])
            state.friend.push({
                id:action.payload.combinedId,
                name:action.payload.name,
                date: action.payload.date,
                friendId: action.payload.friendId,
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