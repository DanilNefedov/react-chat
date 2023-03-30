import { useLocation } from "react-router-dom"
import download from '../../../img/add.svg'
import edit from '../../../img/edit.svg'
import style from './EditGroup.module.css'


export default function EditGroup () {
    const {state} = useLocation()
    console.log(state)

    return(
        <section>
            <div className="container">
                <div className="photoGroup">
                    <div className="photo">
                        <img src={state.photo} alt="Photo group" className={style.photoState} />
                    </div>
                    <div className="editPhoto">
                        <img src={download} alt="dedit photo" />
                        <button className="editPhoto">
                            <span>Edit Photo</span>
                        </button>
                    </div>
                    
                </div>
                <div className="nameGroup">
                    <img src={edit} alt="edit name" />
                    <input id="edit-name" type="text" placeholder={state.name}/>
                    <label form="edit-name"></label>
                </div>
            </div>
        </section>
        
    )
} 

