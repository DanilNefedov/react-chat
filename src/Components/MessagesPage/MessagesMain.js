import classNames from 'classnames';
import style from './MessagesMain.module.css';
import styleFriends from '../HomePage/Friends.module.css';
import user from '../../img/user-M.png';
import dots from '../../img/dots.svg';
import send from '../../img/send.svg';


export function MessagesMain() {
    return (
        <section className={styleFriends.friends}>
            <div className={classNames(style.container, 'container')}>
                <header className={style.header}>
                    <div className={style.user}>
                        <div className={style.userImg}>
                            <img src={user} alt="User" />
                        </div>
                        <div className={style.about}>
                            <h2 className={style.name}>
                                Swathi
                            </h2>
                            <div className={style.online}>Online</div>
                        </div>

                    </div>
                    <div className={classNames(style.dots, 'search-dots')}>
                        <img src={dots} alt="Dots" />
                    </div>
                </header>

                <section className={style.messages}>

                </section>

                <section className={style.textArea}>
                    {/* <div className={style.textBlock}> */}
                        {/* <label className={style.send} htmlFor="textarea"><img src={send} alt="Send" /></label> */}
                    <textarea name="textarea" id='textarea' className={style.input} rows="1"></textarea>
                    {/* </div> */}
                    <button type='submit' className={style.send}>
                        <img src={send} alt="Send" />
                    </button>
                </section>
            </div>
        </section>
    );
}