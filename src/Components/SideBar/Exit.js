import { getAuth, signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import exit from '../../img/exit.svg'
import { removeUser, setUser } from '../../store/authSlice';
import style from './SideBar.module.css'

export function Exit() {
    const dispatch = useDispatch()

    const auth = getAuth();

    const clickOut = () => {
        signOut(auth).then(() => {
           dispatch(removeUser())
        }).catch((error) => {
            console.error(error)
        });
    } 

    

    return (
        <div className={style.exit}>
            <a  href="#" className={style.exitLink}>
                <img onClick={()=>clickOut()} src={exit} alt="Exit" />
            </a>
        </div>
    );

}