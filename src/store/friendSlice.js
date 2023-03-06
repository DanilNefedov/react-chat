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
                id:action.payload.combinedId,
                name:action.payload.name,
                date: action.payload.date,
                friendId: action.payload.friendId,
                lastMessages:action.payload.lastMessages,
                timePublic: action.payload.timePublic,
                photo: action.payload.photo,
                view:action.payload.view,
                idSender: action.payload.idSender,
                newMess: action.payload.newMess
            })
        },
        addLastMessage(state, action){
            const friend = state.friend.find(el => el.id === action.payload.combinedId)
            friend.lastMessages = action.payload.lastMessages
            friend.date = action.payload.date
            friend.timePublic = action.payload.timePublic
            friend.view = action.payload.view
            friend.idSender = action.payload.idSender
        },
        updatePhotoName(state,action){
            const friend = state.friend.find(el => el.id === action.payload.combinedId)
            friend.photo = action.payload.photo
            friend.name = action.payload.name
        },
        updatePhotoFriend(state, action){
            const friend = state.friend.find(el => el.id === action.payload.combinedId)
            friend.photo = action.payload.photo
        },
        viewMessage(state, action){
            const friend = state.friend.find(el => el.id === action.payload.combinedId)
            friend.view = action.payload.view 
            friend.idSender = action.payload.idSender
            friend.newMess = action.payload.newMess
        },
        removeFrined(state){
            state.friend = []
        }
    }
})


export const {updatePhotoFriend, addFrined, addLastMessage, updatePhoto, updatePhotoName, viewMessage, removeFrined} = friendSlice.actions;

export default friendSlice.reducer;