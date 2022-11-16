import classNames from "classnames";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import style from './SingIn.module.css';



export function Form({formProps}) {
    
    const {nameForm, nameButton, link, nameLink} = formProps

    const navigate = useNavigate()//для переброса на главную после регистрации\лога
    const location = useLocation()

    const from = location.state?.from?.pathname || '/';//ссылка на главную

    //const auth = useAuth()


    return(
        <section className={style.sectionForm}>
        <form action="" className={style.form}>
            <h1 className={style.header}>CHAT</h1>
            <h2 className={classNames(style.headerForm, 'header')}>{nameForm}</h2>
            <div className={style.email}>
                <label htmlFor="email" className={classNames(style.headerEmail, 'head-name')}>Email:</label>
                <input type="email" placeholder="Enter your email"/>
            </div>
            <div className={style.pass}>
                <label htmlFor="password" className={classNames(style.headerPass, 'head-name')}>Password:</label>
                <input type="password" placeholder="Enter your password"/>
            </div>
            
            <button className={style.regBnt}>{nameButton}</button>

            <Link to={link} className={style.linkReg}>{nameLink}</Link>
            
        </form>
    </section>
    )
}