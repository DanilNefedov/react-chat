import { doc, getDoc, updateDoc } from "firebase/firestore";
import { editMessage } from "../../../store/messagesSlice";
import { editLastMessageGroup } from "../../../store/groupSlice";
import { editLastMessageFriend } from "../../../store/friendSlice";



export async function requestEditMess(db, chatId, infoChat, messageId, dispatch, messageText, myInfo){

    const docSnap = await getDoc(doc(db, 'chats', chatId));
    if (docSnap.exists()){
        const array = docSnap.data().messages;
        const updatedArray = array.map((element) =>{
            if (element.id === messageId) {
                dispatch(editMessage({chatId, messageId, messageText}))
                return { ...element, messageText: messageText };
            }else{
                return element;
            }
        })

        await updateDoc(doc(db, 'chats', chatId), { messages: updatedArray });
    }


    if(infoChat.users){
        const usersArr = Object.entries(infoChat.users)
        usersArr.map(async el =>{
            if(el[1].deleted === false ){
                await updateDoc(doc(db, 'chatsList', el[0]), {
                    [`${infoChat.id}.lastMessage.messageText`]: messageText 
                })
                const lastMessages = messageText
                const combinedId = infoChat.id
                dispatch(editLastMessageGroup({combinedId, lastMessages}))

            }
        })
    }else{
        await updateDoc(doc(db, 'chatsList', infoChat.friendId), {
            [`${infoChat.id}.lastMessage.messageText`]: messageText 
        })
        await updateDoc(doc(db, 'chatsList', myInfo.id), {
            [`${infoChat.id}.lastMessage.messageText`] :messageText
        })
        const lastMessages = messageText
        const combinedId = infoChat.id
        dispatch(editLastMessageFriend({combinedId, lastMessages}))

    }


}