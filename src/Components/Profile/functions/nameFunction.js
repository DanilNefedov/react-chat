import { updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateName } from "../../../store/authSlice";
import { initialStateModal } from "../../../state/modalError";
import { initialStateProfile } from "../../../state/profileModalError";


export async function nameFunction(modalError, stateProfileArr, user, auth, db, dispatch, friend, group){
    const dispatchStateErr = modalError[1]
    const stateProfile = stateProfileArr[0]
    const dispatchStateProfile = stateProfileArr[1]
    

    await updateProfile(auth.currentUser, {
        displayName: stateProfile.name.trim() !== '' ? stateProfile.name.trim() : user.name.trim(),
    }).then(() => {
        dispatch(updateName({ name: stateProfile.name.trim() }))
        dispatchStateProfile({ type: 'setName', payload: initialStateProfile.name })
        dispatchStateProfile({ type: 'nameClassError', payload: initialStateProfile.nameClassError })
        dispatchStateErr({ type: 'resetModal', payload: initialStateModal })

        friend.map( async (el) =>{
            const docSnap = await getDoc(doc(db, 'chats', el.id));
            if (docSnap.exists()){
                const array = docSnap.data().messages;
                const updatedArray = array.map((element) =>{
                    if (element.userId === user.id) {
                        return { ...element, name: stateProfile.name };
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
                        return { ...element, name: stateProfile.name };
                    }else{
                        return element;
                    }
                })

                await updateDoc(doc(db, 'chats', el.id), { messages: updatedArray });
            }
        })
    }).catch((error) => {
        dispatchStateErr({ type: 'activeModalWindow', payload: true })
        dispatchStateErr({ type: 'errorClassName', payload: 'Error updating name or photo' })
        console.error(error)
    });


    await updateDoc(doc(db, 'users', user.id), {
        name: stateProfile.name.trim() !== '' ? stateProfile.name.trim() : user.name.trim(),
    })
    friend.map(async (el) => {
        if (el.friendId && !el.deleted) {
            await updateDoc(doc(db, 'chatsList', el.friendId), {
                [el.id + '.name']: {
                    name: stateProfile.name.trim() !== '' ? stateProfile.name.trim() : user.name.trim(),
                }
            })
        }
        if (el.friendId === undefined) {
            return
        }
    })
    dispatchStateProfile({ type: 'emailClassError', payload: initialStateProfile.emailClassError })
}