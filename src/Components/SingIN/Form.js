import classNames from "classnames";
import { useReducer } from "react";
import { Link } from "react-router-dom";
import { initialStateAuth, reducerAuth } from "../../state/regForm";
import { ModuleError } from "../ModalError/ModalError";
import style from './SingIn.module.css';



function Form({ formProps, handleClick, state }) {
    const { nameForm, nameButton, link, nameLink } = formProps
    const [stateRegistration, dispatchRegistration] = useReducer(reducerAuth, initialStateAuth)

    return (
        <section className={ 
            state[0].errorClassName === 'errorLog'  
            ? classNames(style.errorLog,style.sectionForm ) : state[0].errorClassName === 'errorReg' 
            ? classNames(style.errorReg,style.sectionForm ) : classNames( style.sectionForm)   
        }>
            <form action="" className={style.form}>
                <h1 className={style.header}>CHAT</h1>
                <h2 className={classNames(style.headerForm, 'header')}>{nameForm}</h2>

                {nameForm === 'Registration' && <><div className={style.name}>
                    <label htmlFor="name" className={classNames(style.headerName, 'head-name')}>Name:</label>
                    <input value={stateRegistration.name} onChange={(e) => dispatchRegistration({type:'name', payload:e.target.value})} type='name' placeholder="Enter your name"></input>
                    </div>
                    <span className={style.infoReg}>*name length no more than 20 characters</span></>}

                <div className={style.email}>
                    <label htmlFor="email" className={classNames(style.headerEmail, 'head-name')}>Email:</label>
                    <input value={stateRegistration.email} onChange={(e) => dispatchRegistration({type:'email', payload:e.target.value})} type="email" placeholder="Enter your email" />
                </div>
                <div className={style.pass}>
                    <label htmlFor="password" className={classNames(style.headerPass, 'head-name')}>Password:</label>
                    <input value={stateRegistration.password} onChange={(e) => dispatchRegistration({type:'password', payload:e.target.value})} type="password" placeholder="Enter your password" />
                </div>
                {nameForm === 'Registration' ? <span className={style.infoReg}>*password length of 6 or more characters</span> : <></>}

                {nameForm === 'Registration' ?
                <button onClick={(e) => {
                    e.preventDefault()
                    handleClick( stateRegistration.name, stateRegistration.email, stateRegistration.password)
                }}
                    className={style.regBnt}>{nameButton}</button>
                :
                <button onClick={(e) => {
                    e.preventDefault()
                    handleClick( stateRegistration.email, stateRegistration.password)
                }}
                    className={style.regBnt}>{nameButton}</button>
                }
                

                <Link to={link} className={style.linkReg}>{nameLink}</Link>

            </form>
            {nameForm === 'Registration' && state[0].activeModalWindow ? <ModuleError state={state}></ModuleError> : <></>}
            
        </section>
    )
}

export default Form