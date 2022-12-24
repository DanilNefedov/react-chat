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
                timePublic: action.payload.timePublic,
                photo: action.payload.photo
            })
        },
        addLastMessage(state, action){
            const friend = state.friend.find(el => el.id === action.payload.friendInfo)
            //console.log(friend)
            friend.lastMessages = action.payload.messageText
            friend.date = action.payload.datePush
            friend.timePublic = action.payload.timePublic
        },
        updatePhotoName(state,action){
            const friend = state.friend.find(el => el.id === action.payload.friendInfo)
            friend.photo = action.payload.photo 
            friend.name = action.payload.name
            
        }
        // updateName(state,action){
        //     const friend = state.friend.find(el => el.id === action.payload.friendInfo)
           
        // }
    }
})


export const {addFrined, addLastMessage, updatePhoto, updatePhotoName} = friendSlice.actions;

export default friendSlice.reducer;