import classNames from "classnames"
import { useSelector } from "react-redux"
import style from './Profile.module.css'
import img from '../../img/user-M.png'


export function Profile (){

    const user = useSelector(state => state.user)

    console.log(user)
    return(
        <section className={classNames(style.profile, 'profile')}>
            <div className={classNames(style.container, 'container')}>

                {user.img ? 
                    <div className={classNames(style.photoSection, 'photo')}>
                        <div className={classNames(style.userPhoto, "user-photo")}>
                            <img src={user.img} alt="user" />
                        </div>
                        <div className={classNames(style.editPhoto,"edit-photo")}>
                            <label className={style.downloadImg} htmlFor={style.loadPhoto}>Edit Photo</label>
                            <input id={style.loadPhoto} type="file" />
                        </div>
                    </div>
                : 
                <div className={classNames(style.photoSection, 'photo')}>
                    <div className={classNames(style.userPhoto, "user-photo")}>
                        <img src={img} alt="user" />
                    </div>
                    <div className={classNames(style.editPhoto,"edit-photo")}>
                        <label className={style.downloadImg} htmlFor={style.loadPhoto}>Download Photo</label>
                        <input id={style.loadPhoto} type="file" />
                    </div>
                </div>
                }
                
                <div className={classNames(style.nameSection, 'name')}>
                    <p className={classNames(style.nameUser, "name-user")}>
                        <span className={classNames(style.editAbout, "head-name")}>Name:</span>  
                        <span className="header">{user.name}</span> 
                    </p>
                    <span className={classNames(style.editField,'head-name')}>Edit Name: </span><input placeholder="enter name" type="text" className={classNames('edit-field', style.editName)}/>
                </div>

                <div className={classNames(style.emailSection, "email")}>
                    <p className={classNames(style.emailUser, "emailUser header")}>
                        <span className={classNames(style.editAbout, "head-name")}> Email:</span>    
                        <span className="header">{user.email}</span>
                    </p>
                    <span className={classNames(style.editField,'head-name')}>Edit Email: </span><input placeholder="enter email" type="email" className={classNames('edit-field', style.editEmail)}/>
                </div>
                <div className={classNames(style.updateSection, 'update')}>
                    <button className={classNames(style.btnUpdate)}>Update</button>
                </div>
            </div>
        </section>
    )
}