import { Timestamp, arrayUnion, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';


export async function requestSendMess(db, infoChat, messageText, user){

    const messageId = uuid()
    const date = Timestamp.now()

    await updateDoc(doc(db, 'chats', infoChat.id), {

        messages: arrayUnion({
            id: messageId,
            messageText,
            userId: user.id,
            date: date,
            photo: user.photo,
            name:user.name,
            deleted:false
        })
    })

    await updateDoc(doc(db, 'chatsList', user.id), {
        [infoChat.id + '.lastMessage']: {
            messageText
        },
        [infoChat.id + '.date']: serverTimestamp(),
        [infoChat.id + '.viewMessage']:{
            newMessView: true,
            idSender:user.id,
            viewMess:false
        }

    })

    if(infoChat.users){
        for(const key in infoChat.users){
            const res = await getDoc(doc(db, 'chatsList', key))
            if (res.exists()) {
                await updateDoc(doc(db, 'chatsList', key), {
                    [infoChat.id + '.lastMessage']: {
                        messageText
                    },
                    [infoChat.id + '.date']: serverTimestamp(),
                    [infoChat.id + '.viewMessage']:{
                        newMessView: false,
                        idSender:user.id,
                        viewMess:false
                    }
                })
            }
        }
        
    }else{
        const res = await getDoc(doc(db, 'chatsList', infoChat.friendId))
        if (res.exists()) {
            await updateDoc(doc(db, 'chatsList', infoChat.friendId), {
                [infoChat.id + '.lastMessage']: {
                    messageText
                },
                [infoChat.id + '.date']: serverTimestamp(),
                [infoChat.id + '.viewMessage']:{
                    newMessView: false,
                    idSender:user.id,
                    viewMess:false
                }
            })
        }
    }
}