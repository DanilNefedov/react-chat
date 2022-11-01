    import { createSlice } from "@reduxjs/toolkit";

    const initialState = {
        messages: []
    }



    const messagesSlice = createSlice({
        name: 'messages',
        initialState,
        reducers: {
            addMessage(state, action) {
                state.messages.push(
                    {
                        idUser: action.payload.friendInfo.id,
                        messages:[
                            {
                                date: new Date().toISOString(),
                                me: action.payload.messageText
                            }
                        ]
                    }
                )
            },
            addMessagesOldFriend(state, action){
                const oldFriend = state.messages.find(el => el.idUser === action.payload.friendInfo.id )
                oldFriend.messages.push({date: new Date().toISOString(), me:action.payload.messageText})
                
            }
        }
    })



    export const {addMessage, addMessagesOldFriend} = messagesSlice.actions;

    export default messagesSlice.reducer;