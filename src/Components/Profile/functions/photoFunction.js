import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { initialStateModal } from "../../../state/modalError";
import { initialStateProfile } from "../../../state/profileModalError";
import { updateProfile } from "firebase/auth";
import { updatePhoto } from "../../../store/authSlice";
import { updatePhotoMessages } from "../../../store/messagesSlice";
import { doc, getDoc, updateDoc } from "firebase/firestore";


export function photoFunction(modalError, stateProfileArr, user, auth, db, dispatch, friend, group){
    const dispatchStateErr = modalError[1]
    const stateProfile = stateProfileArr[0]
    const dispatchStateProfile = stateProfileArr[1]


    const storage = getStorage();
    const storageRef = ref(storage, `avatar/${user.name.trim()}ID-${user.id}`);
    const uploadTask = uploadBytesResumable(storageRef, stateProfile.photo);
    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (progress < 100) {
                dispatchStateProfile({ type: "loadPhoto", payload: true })
            } else {
                dispatchStateProfile({ type: "loadPhoto", payload: initialStateProfile.loadPhoto })
            }
        },
        () => {
            dispatchStateErr({ type: 'activeModalWindow', payload: true })
            dispatchStateErr({ type: 'errorClassName', payload: 'Error while downloading a file' })
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                await updateProfile(auth.currentUser, {
                    photoURL: downloadURL
                }).then(() => {
                    dispatchStateErr({ type: 'resetModal', payload: initialStateModal })
                    dispatch(updatePhoto({photo:downloadURL}))
                    friend.map( async (el) =>{
                        const docSnap = await getDoc(doc(db, 'chats', el.id));
                        if (docSnap.exists()){
                            const array = docSnap.data().messages;
                            const updatedArray = array.map((element) =>{
                                if (element.userId === user.id) {
                                    const messageId = element.id
                                    const chatId = el.id
                                    const photo = downloadURL
                                    dispatch(updatePhotoMessages({chatId, messageId, photo}))
                                    return { ...element, photo: downloadURL };
                                }else{
                                    return element;
                                }
                            })

                            await updateDoc(doc(db, 'chats', el.id), { messages: updatedArray });
                        }
                    })
                    group.map( async (el) =>{
                        const docSnap = await getDoc(doc(db, 'chats', el.id));
                        if (docSnap.exists()){
                            const array = docSnap.data().messages;
                            const updatedArray = array.map((element) =>{
                                if (element.userId === user.id) {
                                    const messageId = element.id
                                    const chatId = el.id
                                    const photo = downloadURL
                                    dispatch(updatePhotoMessages({chatId, messageId, photo}))
                                    return { ...element, photo: downloadURL };
                                }else{
                                    return element;
                                }
                            })

                            await updateDoc(doc(db, 'chats', el.id), { messages: updatedArray });
                        }
                    })

                }).catch(() => {
                    dispatchStateErr({ type: 'activeModalWindow', payload: true })
                    dispatchStateErr({ type: 'errorClassName', payload: 'Error in photo update' })
                });

                await updateDoc(doc(db, 'users', user.id), {
                    photoURL: downloadURL
                })
                friend.map(async (el) => {
                    if (el.friendId && el.deleted === false) {
                        await updateDoc(doc(db, 'chatsList', el.friendId), {
                            [el.id + '.photo']: {
                                photo: downloadURL
                            }
                        })
                    }
                    if (el.friendId === undefined) {
                        return
                    }

                })
                dispatchStateProfile({ type: 'selectedPhoto', payload: initialStateProfile.selectedPhoto })
            });

        }
    );
    if (stateProfile.email === '') {
        dispatchStateProfile({ type: 'emailClassError', payload: initialStateProfile.emailClassError })
    }
    if (stateProfile.name.trim() === '') {
        dispatchStateProfile({ type: 'nameClassError', payload: initialStateProfile.nameClassError })
    }
}