import style from './MessagesMain.module.css'
import img from '../../img/user-M.png'
import { useSelector } from 'react-redux'



export function Photo({ about}) {
    const messageId = about.messageId
    const messagesState = useSelector(state => state.message.messages)
    const thisChat = messagesState.find(el => el.messages )
    // const thisMess = thisChat.find(el => el )
    console.log( about)

   // const photoSet = update[0]
    // console.log(updatePhoto)
    return (

            <span className={style.imgSenderBlock}>
                {/* <img className={style.photoSender} src={thisMessage.photo ? thisMessage.photo : img} alt="Photo user" /> */}
            </span>
           
        
        
    )
}






