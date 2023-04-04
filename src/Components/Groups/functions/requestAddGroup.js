import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { addGroupState } from "../../../store/groupSlice"
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"
import { initialStateModal } from "../../../state/modalError";
import { initialStateGroup } from "../../../state/group";



export async function requestAddGroup (users, myInfo, findGroup, dispatch, combinedId, db, navigate, stateErr, groupState){

    const dispatchStateErr = stateErr[1]
    const stateGroup = groupState[0]
    const dispatchStateGroup = groupState[1]

    const filteredUsers = users.map((obj) => {
        const copiedObg = { ...obj }
        const newKey = 'id'

        Object.keys(copiedObg).forEach(key => {
            if (key === 'friendId') {
                copiedObg[newKey] = copiedObg[key]
            }
        })

        delete copiedObg.date
        delete copiedObg.friendId
        delete copiedObg.idSender
        delete copiedObg.lastMessages
        delete copiedObg.newMess
        delete copiedObg.timePublic
        delete copiedObg.view

        return copiedObg
    })
    const userObj = {};

    const copiedObgMyInfo = { ...myInfo }
    Object.keys(copiedObgMyInfo).forEach(el => {
        if (el === 'email') {
            delete copiedObgMyInfo.email

        }
        copiedObgMyInfo.admin = true
        copiedObgMyInfo.deleted = false
    })

    userObj[copiedObgMyInfo.id] = { ...copiedObgMyInfo }
    filteredUsers.forEach(user => {
        userObj[user.id] = { ...user, admin: false };
    });


    if(!findGroup){
        const name = stateGroup.name.trim()
        const view = false
        const newMess = true
        const idSender = myInfo.id
        const users = userObj
        dispatch(addGroupState({combinedId, name, view, idSender, newMess, users}))
    }


    if (stateGroup.photo !== null) {
        const storage = getStorage();
        const storageRef = ref(storage, `groups/ID-${combinedId}`);
        const uploadTask = uploadBytesResumable(storageRef, stateGroup.photo);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if(progress < 100){
                    dispatchStateGroup({type: 'loadPhotoGroup', payload: true})
                }else{
                    dispatchStateGroup({type: 'loadPhotoGroup', payload: initialStateGroup.loadPhotoGroup})
                    navigate('/')
                }

            },
            () => {
                dispatchStateErr({ type: 'activeModalWindow', payload: true })
                dispatchStateErr({ type: 'errorClassName', payload: 'Error while downloading a file' })
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    dispatchStateErr({ type: 'resetModal', payload: initialStateModal })
                    await updateDoc(doc(db, 'chatsList', myInfo.id), {
                        [combinedId + '.photo']: {
                            photo: downloadURL
                        }
                    })

                    users.map(async user => {
                        await updateDoc(doc(db, 'chatsList', user.friendId), {
                            [combinedId + '.photo']: {
                                photo: downloadURL
                            }
                        })

                    })
                });
            }
        );
    }

    
    await setDoc(doc(db, 'chats', combinedId), { messages: [] })

    await updateDoc(doc(db, 'chatsList', myInfo.id), {
        [combinedId + '.group']: {
            users: userObj,
        },
        [combinedId + '.name']: {
            name: stateGroup.name.trim()
        },
        [combinedId + '.photo']: {
            photo: null
        },
        [combinedId + '.date']: serverTimestamp(),
        [combinedId + '.viewMessage']:{
            newMessView: true,
            idSender:myInfo.id,
            viewMess:false
        }
    })

    users.map(async user => {

        await updateDoc(doc(db, 'chatsList', user.friendId), {
            [combinedId + '.group']: {
                users: userObj,
            },
            [combinedId + '.name']: {
                name: stateGroup.name.trim()
            },
            [combinedId + '.photo']: {
                photo: null
            },
            [combinedId + '.date']: serverTimestamp(),
            [combinedId + '.viewMessage']:{
                newMessView: false,
                idSender:myInfo.id,
                viewMess:false
            }
        })

    })
    if(!stateGroup.photo){
        navigate('/')
    }
}