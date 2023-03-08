import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    group:[]
}


const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers:{
        addGroup(state, action){
            //console.log(action.payload.lastMessages)
            state.group.push({
                id:action.payload.combinedId,
                users:action.payload.users,
                photo:action.payload.photo,
                name:action.payload.name,
                admin:action.payload.admin,
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
        removeGroup(state){
            state.group = []
        }
        
    }
})


export const {removeGroup, addGroup, viewMessageGroup, addLastMessagesGroup} = groupSlice.actions
export default groupSlice.reducer;