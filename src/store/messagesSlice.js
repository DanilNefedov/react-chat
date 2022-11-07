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
                        //photoUser: action.payload.friendInfo.img,
                        messages:[
                            {
                                date: action.payload.datePush,
                                me: action.payload.messageText
                            }
                        ]
                    }
                )
            },
            addMessagesOldFriend(state, action){
                const oldFriend = state.messages.find(el => el.idUser === action.payload.friendInfo.id )
                oldFriend.messages.push({date: action.payload.datePush, me:action.payload.messageText})
                
            }
        }
    })



    export const {addMessage, addMessagesOldFriend} = messagesSlice.actions;

    export default messagesSlice.reducer;