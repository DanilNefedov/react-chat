import { createSlice } from "@reduxjs/toolkit";


    const initialState = {
        messages: []
    }



    const messagesSlice = createSlice({
        name: 'messages',
        initialState,
        reducers: {
            addMessage(state, action) {
                //console.log('new')
                const oldFriend = state.messages.find(el => el.chatId === action.payload.chatId)

                if(oldFriend){
                    const oldMess = oldFriend.messages.find(el => el.messageId === action.payload.messageId)
                    if(!oldMess){
                        //console.log('old')
                        //console.log(oldFriend.messages)
                        oldFriend.messages.push({
                            userId: action.payload.userId,
                            date: action.payload.datePush,
                            text: action.payload.messageText,
                            messageId: action.payload.messageId
                        })
                    }
                }else{
                    //console.log('new')
                    state.messages.push({
                        chatId: action.payload.chatId,
                        messages:[
                            {
                                userId: action.payload.userId,
                                date: action.payload.datePush,
                                text: action.payload.messageText,
                                messageId: action.payload.messageId
                            }
                        ]
                    })
                }
                
            },
            removeMessage(state){
                state.messages = []
            }

        }
    })



    export const {addMessage, addMessagesOldFriend, removeMessage} = messagesSlice.actions;

    export default messagesSlice.reducer;