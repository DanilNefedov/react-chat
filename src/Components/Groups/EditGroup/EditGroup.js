import { doc, getFirestore, updateDoc } from "firebase/firestore"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { useReducer } from "react"
import { useDispatch } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { initialStateGroup, reducerGroup } from "../../../state/group"
import { initialStateModal, reducerModal } from "../../../state/modalError"
import { updateNameGroup, updatePhotoGroup } from "../../../store/groupSlice"
import { Loader } from "../../Loader/Loader"
import { ModuleError } from "../../ModalError/ModalError"
import style from './EditGroup.module.css'
import { EditName } from "./EditName"
import { EditPhoto } from "./EditPhoto"
import back from '../../../img/close.svg'


export default function EditGroup () {
    const {state} = useLocation()
    const [stateGroup, dispatchStateGroup] = useReducer(reducerGroup, initialStateGroup)
    const dispatch = useDispatch()
    const db = getFirestore()
    const [stateModalErr, dispatchStateErr] = useReducer(reducerModal, initialStateModal)


    const submitUpdates = async () =>{
        const combinedId = state.id
        const usersArr = Object.entries(state.users)


        if(stateGroup.photo !== null){            
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
                    }
                },
                () => {
                    dispatchStateErr({ type: 'activeModalWindow', payload: true })
                    dispatchStateErr({ type: 'errorClassName', payload: 'Error while downloading a file' })
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        const photo = downloadURL
                        dispatch(updatePhotoGroup({photo, combinedId}))
                        usersArr.map( async el => {
                            if(el[1].deleted === false){
                                await updateDoc(doc(db, 'chatsList', el[0]), {
                                    [`${combinedId}.photo.photo`]:downloadURL
                                })
                            }
                        })
                    });
                }
            );
        }

        
        if(stateGroup.name.length < 20 && stateGroup.name !== ''){
            const name = stateGroup.name
            dispatch(updateNameGroup({combinedId, name}))

            usersArr.map( async el => {
                if(el[1].deleted === false){
                    await updateDoc(doc(db, 'chatsList', el[0]), {
                        [`${combinedId}.name.name`]:name
                    })
                }
            })
        }else if(stateGroup.name.length > 20){
            dispatchStateGroup({type: 'lengthNameErr', payload: true})
        }
    }


    return(
        (stateGroup.loadPhotoGroup ? 
        <Loader></Loader>:
        <>
        <section className={style.editGroup}>
            <div className={style.container}>
                <EditPhoto state={state} stateGroup={[stateGroup, dispatchStateGroup]}></EditPhoto>
               
                <EditName state={state} stateGroup={[stateGroup, dispatchStateGroup]}></EditName>

                <div className={style.accept}>
                    <button onClick={() => submitUpdates()} className={style.btnAccept}>Accept</button>
                </div>
            </div>
            <Link to={`/${state.id}`} className={style.back}>
                <img src={back} alt="back" />
            </Link>
        </section>
        {stateModalErr.activeModalWindow ? <ModuleError state={[stateModalErr, dispatchStateErr]}></ModuleError> : <></>}
        </>)
        
    )
} 

