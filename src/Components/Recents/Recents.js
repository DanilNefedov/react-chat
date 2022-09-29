import dots from '../../img/dots.svg';
import user from '../../img/user-M.png';
import check from '../../img/check-mess.svg'
import style from './Recents.module.css';
import classNames from 'classnames';


export function Recents() {


    return (
        <section className={style.recents}>
            <div className={classNames(style.container, "container")}>
                <div className={classNames(style.head, 'head')}>
                    <h2 className="header">
                        Recents
                    </h2>
                    <div className="search-dots"><img src={dots} alt="Search" /></div>
                </div>

                <div className={classNames(style.list, 'list-content')} >
                    <div className={style.mess}>
                        <div className={classNames(style.user, 'user-mess')}>
                            <img src={user} alt="User" />
                        </div>
                        <div className="recents-list__messages">
                            <p className={classNames(style.name, 'head-name')}>Raghav</p>
                            <p className={classNames(style.messameUser, 'head-mess')}>Dinner?</p>
                        </div>
                    </div>
                    <div className={classNames(style.dateCheck, 'list-date-check')}>
                        <div className={classNames(style.date, 'list-date')}>
                            Today, 8:56pm
                        </div>
                        <div className="recents-list__check-img ">
                            <img src={check} alt="Check" />
                        </div>
                    </div>
                </div>
                <div className={classNames(style.list, 'list-content')} >
                    <div className={style.mess}>
                        <div className={classNames(style.user, 'user-mess')}>
                            <img src={user} alt="User" />
                        </div>
                        <div className="recents-list__messages">
                            <p className={classNames(style.name, 'head-name')}>Raghav</p>
                            <p className={classNames(style.messameUser, 'head-mess')}>Dinner?</p>
                        </div>
                    </div>
                    <div className={classNames(style.dateCheck, 'list-date-check')}>
                        <div className={classNames(style.date, 'list-date')}>
                            Today, 8:56pm
                        </div>
                        <div className="recents-list__check-img ">
                            <img src={check} alt="Check" />
                        </div>
                    </div>
                </div>
                <div className={classNames(style.list, 'list-content')} >
                    <div className={style.mess}>
                        <div className={classNames(style.user, 'user-mess')}>
                            <img src={user} alt="User" />
                        </div>
                        <div className="recents-list__messages">
                            <p className={classNames(style.name, 'head-name')}>Raghav</p>
                            <p className={classNames(style.messameUser, 'head-mess')}>Dinner?</p>
                        </div>
                    </div>
                    <div className={classNames(style.dateCheck, 'list-date-check')}>
                        <div className={classNames(style.date, 'list-date')}>
                            Today, 8:56pm
                        </div>
                        <div className="recents-list__check-img ">
                            <img src={check} alt="Check" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

}