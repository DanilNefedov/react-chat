import style from './SideBar.module.css';
import homeDark from '../../img/home-dark.svg';
import homeWhite from '../../img/home-white.svg';
import profileDark from '../../img/profile-dark.svg'
import profileWhite from '../../img/profile-white.svg'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { removeUser } from '../../store/authSlice';
import exitDark from '../../img/exit-dark.svg'
import exitWhite from '../../img/exit-white.svg'
import classNames from "classnames";
import { removeFrined } from '../../store/friendSlice';
import { removeMessage } from '../../store/messagesSlice';


export function Navigation(){

    const dispatch = useDispatch()

    const auth = getAuth();

    const clickOut = () => {
        signOut(auth).then(() => {
           dispatch(removeUser())
           dispatch(removeFrined())
           dispatch(removeMessage())
        }).catch((error) => {
            console.error(error)
        });
    } 

    return (
        <nav className={style.nav}>
            <div className={style.home}>
                <NavLink to='/' className={style.link}>
                    <div className={style.imgCont}>
                        <img src={homeDark} alt="Home" className={classNames(style.img, style.imgDark)} />
                        <img src={homeWhite} alt="Home" className={classNames(style.img, style.imgWhite, 'img-white')} />
                    </div>
                    <p className={classNames(style.nameNav, 'name-nav')}>Home</p>
                </NavLink>
            </div>
            <div className={style.profile}>
                <NavLink to="/profile" className={style.link}>
                    <div className={style.imgCont}>
                        <img src={profileDark} alt="Profile" className={classNames(style.img, style.imgDark)} />
                        <img src={profileWhite} alt="Profile" className={classNames(style.img, style.imgWhite, 'img-white')} />
                    </div>
                    <p className={classNames(style.nameNav, 'name-nav')}>Profile</p>
                </NavLink>
            </div>
            <div className={style.exit}>
                <NavLink to="/login" className={classNames(style.exitLink , style.link)}>
                    <div className={style.imgCont}>
                        <img onClick={()=>clickOut()} src={exitDark}  alt="Exit" className={classNames(style.img, style.imgDark)}/>
                        <img onClick={()=>clickOut()} src={exitWhite}  alt="Exit" className={classNames(style.img, style.imgWhite, 'img-white')} />
                    </div>
                    <p className={classNames(style.nameNav, 'name-nav')}>Exit</p>
                </NavLink>
            </div>
        </nav>
    );
}