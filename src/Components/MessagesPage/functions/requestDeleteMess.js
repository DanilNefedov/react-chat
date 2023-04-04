import { doc, getDoc, updateDoc } from "firebase/firestore";
import { editLastMessageGroup } from "../../../store/groupSlice";
import { editLastMessageFriend } from "../../../store/friendSlice";


export async function requestDeleteMess(chatId, messageId, db, dispatch, infoChat, messagesState, myInfo){

    const docSnapChats = await getDoc(doc(db, 'chats', chatId));
    if (docSnapChats.exists()){
        const array = docSnapChats.data().messages;
        const updatedArray = array.findIndex((element) => element.id === messageId)
        array.splice(updatedArray, 1)
        await updateDoc(doc(db, 'chats', chatId), { messages: array });
    }


    const messageStateChat = messagesState.find(el => el.chatId === infoChat.id)
    const newLastMessage = messageStateChat.messages.length >= 2 ? messageStateChat.messages[messageStateChat.messages.length - 2].text : "No messages"
    if(messageStateChat.messages[messageStateChat.messages.length - 1].messageId === messageId){
        
        if(infoChat.users){
            const usersArr = Object.entries(infoChat.users)
            usersArr.map(async el =>{
                if(el[1].deleted === false ){
                    await updateDoc(doc(db, 'chatsList', el[0]), {
                        [`${infoChat.id}.lastMessage.messageText`]: newLastMessage 
                    })
                    const lastMessages = newLastMessage
                    const combinedId = infoChat.id
                    dispatch(editLastMessageGroup({combinedId, lastMessages}))
                }
            })
        }else{
            await updateDoc(doc(db, 'chatsList', infoChat.friendId), {
                [`${infoChat.id}.lastMessage.messageText`]: newLastMessage 
            })
            await updateDoc(doc(db, 'chatsList', myInfo.id), {
                [`${infoChat.id}.lastMessage.messageText`] :newLastMessage 
            })
            const lastMessages = newLastMessage 
            const combinedId = infoChat.id
            dispatch(editLastMessageFriend({combinedId, lastMessages}))
        }
        
    }
}