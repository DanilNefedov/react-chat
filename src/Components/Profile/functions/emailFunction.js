import { doc, updateDoc } from "firebase/firestore"
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, updateProfile } from "firebase/auth";
import { updateEmailStore} from "../../../store/authSlice"
import { initialStateModal } from "../../../state/modalError";
import { initialStateProfile } from "../../../state/profileModalError";




export async function emailFunction(modalError, stateProfileArr, auth, db, dispatch, user){
    const dispatchStateErr = modalError[1]
    const stateProfile = stateProfileArr[0]
    const dispatchStateProfile = stateProfileArr[1]

    
    const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        stateProfile.passwordModalReAuth
    )
    const reUser = auth.currentUser;

    await reauthenticateWithCredential(reUser, credential).then(async () => {
        await updateEmail(reUser, stateProfile.email).then(async () => {
            await updateProfile(auth.currentUser, {
                email: stateProfile.email !== '' ? stateProfile.email : user.email,
            }).then(() => {
                dispatch(updateEmailStore({ email: stateProfile.email }))
                dispatchStateProfile({ type: 'setEmail', payload: initialStateProfile.email })
                dispatchStateErr({ type: 'resetModal', payload: initialStateModal })
            }).catch(() => {
                dispatchStateErr({ type: 'activeModalWindow', payload: true })
                dispatchStateErr({ type: 'errorClassName', payload: 'Error in email update' })
            });

            await updateDoc(doc(db, 'users', user.id), {
                email: stateProfile.email !== '' ? stateProfile.email : user.email,
            })
            dispatchStateProfile({ type: 'setEmail', payload: initialStateProfile.email })
            dispatchStateProfile({ type: 'emailClassError', payload: initialStateProfile.emailClassError })
        }).catch(() => {
            dispatchStateProfile({ type: 'emailClassError', payload: true })
        })
        if (stateProfile.name.trim() === '') {
            dispatchStateProfile({ type: 'nameClassError', payload: initialStateProfile.emailClassError })
        }
        dispatchStateErr({ type: 'informationAboutError', payload: initialStateModal.informationAboutError })
        dispatchStateProfile({ type: 'passwordModalReAuth', payload: initialStateProfile.passwordModalReAuth })
        dispatchStateProfile({ type: 'setEmail', payload: initialStateProfile.email })
        dispatchStateProfile({ type: 'modalReAuth', payload: initialStateProfile.modalReAuth })
    }).catch(() => {
        dispatchStateProfile({ type: 'passwordModalReAuth', payload: initialStateProfile.passwordModalReAuth })
        dispatchStateProfile({ type: 'modalReAuth', payload: true })
        dispatchStateErr({ type: 'informationAboutError', payload: 'Error in re-authorization' })
    });
}