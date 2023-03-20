import { createSlice } from "@reduxjs/toolkit";


    const initialState = {
        messages: []
    }



    const messagesSlice = createSlice({
        name: 'messages',
        initialState,
        reducers: {
            addMessage(state, action) {
                const oldFriend = state.messages.find(el => el.chatId === action.payload.chatId)
                if(oldFriend){
                    const oldMess = oldFriend.messages.find(el => el.messageId === action.payload.messageId)
                    if(!oldMess){
                        oldFriend.messages.push({
                            userId: action.payload.userId,
                            date: action.payload.datePush,
                            text: action.payload.messageText,
                            messageId: action.payload.messageId,
                            photo: action.payload.photo,
                            name:action.payload.name
                        })
                    }
                }else{
                    state.messages.push({
                        chatId: action.payload.chatId,
                        messages:[
                            {
                                userId: action.payload.userId,
                                date: action.payload.datePush,
                                text: action.payload.messageText,
                                messageId: action.payload.messageId,
                                photo: action.payload.photo,
                                name:action.payload.name
                            }
                        ]
                    })
                }
                
            },
            updatePhotoMessages(state, action){
                const oldFriend = state.messages.find(el => el.chatId === action.payload.chatId)
                if(oldFriend){
                    oldFriend.messages.map((elem) => {
                        if(elem.messageId === action.payload.messageId){
                            elem.photo = action.payload.photo
                        }
                    })
                }
            },
            updateNameMessages(state, action){
                const oldFriend = state.messages.find(el => el.chatId === action.payload.chatId)
                if(oldFriend){
                    oldFriend.messages.map((elem) => {
                        if(elem.messageId === action.payload.messageId){
                            elem.name = action.payload.name
                        }
                    })
                }
            },
            removeMessage(state){
                state.messages = []
            }

        }
    })



    export const {updateNameMessages, updatePhotoMessages, addMessage, addMessagesOldFriend, removeMessage} = messagesSlice.actions;

    export default messagesSlice.reducer;