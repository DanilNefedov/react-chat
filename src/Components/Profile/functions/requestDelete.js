import { doc, getDoc, updateDoc } from "firebase/firestore";


export function requestDelete(friend, group, db, user){


    friend.map(async el => {
        if(el.deleted === false){
            await updateDoc(doc(db, 'chatsList', el.friendId), {
                [el.id + '.name']: {
                    name: 'Deleted'
                },
                [el.id + '.photo']: {
                    photo: null
                },
                [el.id + '.deleted']:{
                    deleted:true
                } 

            });
        }
        
    })
    friend.map( async (el) =>{
        const docSnap = await getDoc(doc(db, 'chats', el.id));
        if (docSnap.exists()){
            const array = docSnap.data().messages;
            const updatedArray = array.map((element) =>{
                if (element.userId !== user.id) {
                    element.photo = null
                    element.name = 'Deleted'
                    element.deleted = true
                    return { ...element};
                }else{
                    return element;
                }
            })

            await updateDoc(doc(db, 'chats', el.id), { messages: updatedArray });
        }
    })

    group.map(async el => {
        const userArr = Object.entries(el.users)
        userArr.map(async userGroup => {
            if(userGroup[0] !== user.uid && userGroup[1].deleted === false){
                await updateDoc(doc(db, 'chatsList', userGroup[0]), {
                    [`${el.id}.group.users.${user.uid}.name`]:'Deleted',
                    [`${el.id}.group.users.${user.uid}.photo`]:null,
                    [`${el.id}.group.users.${user.uid}.deleted`]:true
                });
            
            }
        })
    })


    group.map(async el => {
        const docSnap = await getDoc(doc(db, 'chats', el.id));
        if (docSnap.exists()){
            const array = docSnap.data().messages;
            const updatedArray = array.map((element) =>{
                if (element.userId === user.uid) {
                    element.photo = null
                    element.name = 'Deleted'
                    element.deleted = true
                    return { ...element};
                }else{
                    return element;
                }
            })

            await updateDoc(doc(db, 'chats', el.id), { messages: updatedArray });
        }
    })

}