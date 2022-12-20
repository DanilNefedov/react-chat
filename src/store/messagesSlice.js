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
                        //photoUser: action.payload.friendInfo.img,
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
                
            }
            // addMessagesOldFriend(state, action){
            //     console.log('old')
            //     const oldFriend = state.messages.find(el => el.chatId === action.payload.chatId)
            //     //console.log(action.payload.chatId)
                
                
            // }
        }
    })



    export const {addMessage, addMessagesOldFriend} = messagesSlice.actions;

    export default messagesSlice.reducer;