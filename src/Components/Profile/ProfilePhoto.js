import classNames from "classnames"
import { useSelector } from "react-redux"
import style from './Profile.module.css'
import img from '../../img/user-M.png'


export function ProfilePhoto ({stateProfile}) {
    const user = useSelector(state => state.user)

    return(
        <>
        {stateProfile.selectedPhoto ?
            <div className={classNames(style.photoSection, 'photo')}>
                <div className={classNames(style.userPhoto, "user-photo")}>
                    <img src={stateProfile.selectedPhoto} alt="user" />
                </div>
            </div>
            :
            user.photo ? 
                <div className={classNames(style.photoSection, 'photo')}>
                    <div className={classNames(style.userPhoto, "user-photo")}>
                        <img src={user.photo} alt="user" />
                    </div>
                </div> 
                    :
                <div className={classNames(style.photoSection, 'photo')}>
                    <div className={classNames(style.userPhoto, "user-photo")}>
                        <img src={img} alt="user" />
                    </div>
                </div> 
        }
        </>
        
    )
}