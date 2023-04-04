import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';



export async function requestSearch ({combinedId, db, myInfo, id, name, photo}){
    const res = await getDoc(doc(db, 'chats', combinedId))
    if (!res.exists()) {

        await setDoc(doc(db, 'chats', combinedId), {messages: [] })

        await updateDoc(doc(db, 'chatsList', myInfo.id), {
            [combinedId + '.chat']:{
                id: id
            },
            [combinedId + '.name'] : {
                name: name,
            },
            [combinedId + '.photo'] : {
                photo: photo
            },
            [combinedId + '.date']: serverTimestamp(),
            [combinedId + '.deleted']:{
                deleted:false
            },
            [combinedId + '.viewMessage']:{
                newMessView: true,
                idSender:myInfo.id,
                viewMess:false
            }
        })

        await updateDoc(doc(db, 'chatsList', id), {
            [combinedId + '.chat']:{
                id: myInfo.id
            },
            [combinedId + '.name'] : {
                name: myInfo.name,
            },
            [combinedId + '.photo'] : {
                photo: myInfo.photo
            },
            [combinedId + '.date']: serverTimestamp(),
            [combinedId + '.deleted']:{
                deleted:false
            },
            [combinedId + '.viewMessage']:{
                newMessView: false,
                idSender:myInfo.id,
                viewMess:false
            }
        })
    }

}