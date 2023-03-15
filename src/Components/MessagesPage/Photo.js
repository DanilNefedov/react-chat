import style from './MessagesMain.module.css'
import img from '../../img/user-M.png'



export function Photo({about}) {
    const photo = about.photo
    console.log(photo, about)
    return (
        <span className={style.imgSenderBlock}>
            <img className={style.photoSender} src={photo ? photo : img} alt="Photo user" />
        </span>
    )
}