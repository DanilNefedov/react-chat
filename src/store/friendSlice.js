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
                lastMessages:action.payload.lastMessages,
                timePublic: action.payload.timePublic
            })
        },
        addLastMessage(state, action){
            const friend = state.friend.find(el => el.id === action.payload.friendInfo)
            //console.log(friend)
            friend.lastMessages = action.payload.messageText
            friend.date = action.payload.datePush
            friend.timePublic = action.payload.timePublic
        }
    }
})


export const {addFrined, addLastMessage} = friendSlice.actions;

export default friendSlice.reducer;