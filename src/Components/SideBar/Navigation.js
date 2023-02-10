import style from './SideBar.module.css';
import homeDark from '../../img/home-dark.svg';
import homeWhite from '../../img/home-white.svg';
import profileDark from '../../img/profile-dark.svg'
import profileWhite from '../../img/profile-white.svg'
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { removeUser } from '../../store/authSlice';
import exitDark from '../../img/exit-dark.svg'
import exitWhite from '../../img/exit-white.svg'
import classNames from "classnames";
import { removeFrined } from '../../store/friendSlice';
import { removeMessage } from '../../store/messagesSlice';



export function Navigation({infoClick}){

    const dispatch = useDispatch()
    const location = useLocation()
    const setActiveModal = infoClick.setModal
    const activeModal = infoClick.modal
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
                {location.pathname === '/profile' ?  
                    <NavLink className={style.link} to='/' exact='true' end  onClick={() => {if(activeModal){setActiveModal(false)}}}>
                        <div className={style.imgCont}>
                            <img src={homeDark} alt="Home" className={classNames(style.img, style.imgDark)} />
                            <img src={homeWhite} alt="Home" className={classNames(style.img, style.imgWhite, 'img-white')} />
                        </div>
                        <p className={classNames(style.nameNav, 'name-nav')}>Home</p>
                    </NavLink>
                : 
                    <NavLink className={style.link} to='/' exact='true' onClick={() => {if(activeModal){setActiveModal(false)}}}>
                        <div className={style.imgCont}>
                            <img src={homeDark} alt="Home" className={classNames(style.img, style.imgDark)} />
                            <img src={homeWhite} alt="Home" className={classNames(style.img, style.imgWhite, 'img-white')} />
                        </div>
                        <p className={classNames(style.nameNav, 'name-nav')}>Home</p>
                    </NavLink>
                }
                 
            </div>
            <div className={style.profile}>
                <NavLink className={style.link} to="/profile" onClick={() => {if(activeModal){setActiveModal(false)}}} end>
                    <div className={style.imgCont}>
                        <img src={profileDark} alt="Profile" className={classNames(style.img, style.imgDark)} />
                        <img src={profileWhite} alt="Profile" className={classNames(style.img, style.imgWhite, 'img-white')} />
                    </div>
                    <p className={classNames(style.nameNav, 'name-nav')}>Profile</p>
                </NavLink>
            </div>
            <div className={style.exit}>
                <NavLink className={style.link} to="/login" onClick={() => {if(activeModal){setActiveModal(false)}}} >
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