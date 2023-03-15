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
                // console.log('ww')
                if(oldFriend){
                    const oldMess = oldFriend.messages.find(el => el.messageId === action.payload.messageId)
                    if(!oldMess){
                        oldFriend.messages.push({
                            userId: action.payload.userId,
                            date: action.payload.datePush,
                            text: action.payload.messageText,
                            messageId: action.payload.messageId,
                            photo: action.payload.photo,
                            //name:action.payload.name
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
                                //name:action.payload.name
                            }
                        ]
                    })
                }
                
            },
            updateNamePhoto(state, action){
                // console.log(state.messages, action.payload.date)
                const oldFriend = state.messages.find(el => el.chatId === action.payload.chatId)
                // // const oldMess = action.payload.chatId
                // // console.log('w')
                // //console.log(state.messages.map(el => el.messages[0].text))
                // if(oldFriend){
                //     const oldMess = oldFriend.messages.find(el => el.messageId === action.payload.messageId)
                //     console.log('w')
                //     // if(!oldMess){
                //         oldFriend.messages = oldFriend.messages.map(el => {
                //             //console.log(el.text)
                //             console.log('ww')
                //             return {
                //                 ...el,
                //                 photo: action.payload.photo,
                //                 name: action.payload.name
                //             }
                //         })
                //     // }
                // }
                oldFriend.messages.map((elem) => {
                    // console.log('w')
                    if(elem.messageId === action.payload.messageId){
                        // console.log('w')
                        return{...elem, photo:action.payload.photo}
                    }else{
                        return elem
                    }
                })
                // state.messages.map(el => el.messages.map(mess =>{
                //     mess.photo = action.payload.photo,
                //     mess.name = action.payload.name
                // }))
                
            },
            removeMessage(state){
                state.messages = []
            }

        }
    })



    export const {updateNamePhoto, addMessage, addMessagesOldFriend, removeMessage} = messagesSlice.actions;

    export default messagesSlice.reducer;