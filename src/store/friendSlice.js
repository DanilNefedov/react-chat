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
                view:action.payload.view 
            })
        },
        addLastMessage(state, action){
            const friend = state.friend.find(el => el.id === action.payload.friendInfo)
            //console.log(action.payload.view)
            friend.lastMessages = action.payload.messageText
            friend.date = action.payload.datePush
            friend.timePublic = action.payload.timePublic
            friend.view = action.payload.view 
        },
        updatePhotoName(state,action){
            const friend = state.friend.find(el => el.id === action.payload.friendInfo)
            friend.photo = action.payload.photo
            friend.name = action.payload.name
            
        },
        // viewMessage(state, action){
        //     console.log(action.payload, state.friend.find(el => el.id === action.payload.friendId))
        //     // const friend = state.friend.find(el => el.id === action.payload.friendId)
        //     // friend.view = action.payload.view ? action.payload.view : true
        // },
        removeFrined(state){
            state.friend = []
        }
    }
})


export const {addFrined, addLastMessage, updatePhoto, updatePhotoName, viewMessage, removeFrined} = friendSlice.actions;

export default friendSlice.reducer;