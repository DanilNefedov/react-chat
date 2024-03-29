import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    group:[]
}


const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers:{
        addGroupState(state, action){
            state.group.push({
                id:action.payload.combinedId,
                users:action.payload.users,
                photo:action.payload.photo,
                name:action.payload.name,
                lastMessages: action.payload.lastMessages,
                date:action.payload.date,
                timePublic: action.payload.timePublic,
                view:action.payload.view,
                idSender: action.payload.idSender,
                newMess: action.payload.newMess
            })
        },
        viewMessageGroup(state, action){
            const group = state.group.find(el => el.id === action.payload.combinedId)
            group.view = action.payload.view 
            group.idSender = action.payload.idSender
            group.newMess = action.payload.newMess
        },
        addLastMessagesGroup(state,action){
            const group = state.group.find(el => el.id === action.payload.combinedId)
            group.lastMessages = action.payload.lastMessages
            group.date = action.payload.date
            group.timePublic = action.payload.timePublic
            group.view = action.payload.view
            group.idSender = action.payload.idSender
        },
        updatePhotoGroup(state, action){
            const group = state.group.find(el => el.id === action.payload.combinedId)
            group.photo = action.payload.photo
        },
        updateNameGroup(state, action){
            const group = state.group.find(el => el.id === action.payload.combinedId)
            group.name = action.payload.name
        },
        deletedUser(state, action){
            const group = state.group.find(el => el.id === action.payload.combinedId)
            group.users = action.payload.users
        },
        editLastMessageGroup(state, action){
            const group = state.group.find(el => el.id === action.payload.combinedId)
            group.lastMessages = action.payload.lastMessages
        },
        removeGroup(state){
            state.group = []
        }
        
    }
})


export const {editLastMessageGroup, updateNameGroup, updatePhotoGroup, deletedUser, removeGroup, addGroupState, viewMessageGroup, addLastMessagesGroup} = groupSlice.actions
export default groupSlice.reducer;