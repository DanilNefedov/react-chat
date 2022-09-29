import messages from '../../img/messages.svg'
import style from './SiteBar.module.css'

export function Messages() {

    return (
        <div className={style.messages}>
            <a href="#" className={style.link}>
                <img src={messages} alt="Messages" className={style.img} />
            </a>

        </div>
    );

}