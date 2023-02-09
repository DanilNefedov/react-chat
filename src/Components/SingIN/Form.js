import classNames from "classnames";
import { useContext, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { initialStateModule, reducerModule } from "../../state/moduleError";
import { initialState, initialStateAuth, reducer, reducerAuth } from "../../state/regForm";
import { ModuleError } from "../ModuleError/ModuleError";
import { ContextRegistration } from "./Registration";
import { ContextAuth } from "./SingIn";
import style from './SingIn.module.css';



function Form({ formProps, handleClick  }) {//setModuleErr, moduleErr
    const { nameForm, nameButton, link, nameLink } = formProps
    const contextSingIn = useContext(ContextAuth)
    console.log(contextSingIn)
    const contextReg = useContext(ContextRegistration)
    console.log(contextReg)

    const [stateAuth, dispatchAuth] = useReducer(reducerAuth, initialStateAuth)
    const [stateModule, dispatchModule] = useReducer(reducerModule, initialStateModule)
    //console.log(stateModule)

    return (
        <section className={ 
            stateModule.registration.errorClassName === 'errorLog'  
            ? classNames(style.errorLog,style.sectionForm ) : stateModule.registration.errorClassName === 'errorReg' 
            ? classNames(style.errorReg,style.sectionForm ) : classNames( style.sectionForm)   
        }>
            <form action="" className={style.form}>
                <h1 className={style.header}>CHAT</h1>
                <h2 className={classNames(style.headerForm, 'header')}>{nameForm}</h2>

                {nameForm === 'Registration' && <div className={style.name}>
                    <label htmlFor="name" className={classNames(style.headerName, 'head-name')}>Name:</label>
                    <input value={stateAuth.name} onChange={(e) => dispatchAuth({type:'name', payload:e.target.value})} type='name' placeholder="Enter your name"></input>
                </div>}

                <div className={style.email}>
                    <label htmlFor="email" className={classNames(style.headerEmail, 'head-name')}>Email:</label>
                    <input value={stateAuth.email} onChange={(e) => dispatchAuth({type:'email', payload:e.target.value})} type="email" placeholder="Enter your email" />
                </div>
                <div className={style.pass}>
                    <label htmlFor="password" className={classNames(style.headerPass, 'head-name')}>Password:</label>
                    <input value={stateAuth.password} onChange={(e) => dispatchAuth({type:'password', payload:e.target.value})} type="password" placeholder="Enter your password" />
                </div>

                {nameForm === 'Registration' ?
                <button onClick={(e) => {
                    e.preventDefault()
                    if(stateAuth.name.length > 20){
                        dispatchModule({type:'registrationActiveModalWindow', payload:true})
                    }else{
                        //setErrorReg(true)
                        dispatchModule({type:'registrationActiveModalWindow', payload:false})
                        //setModuleErr(false)
                        handleClick( stateAuth.name, stateAuth.email, stateAuth.password)
                    }
                    
                }}
                    className={style.regBnt}>{nameButton}</button>
                :
                <button onClick={(e) => {
                    e.preventDefault()
                    handleClick( stateAuth.email, stateAuth.password)
                }}
                    className={style.regBnt}>{nameButton}</button>
                }
                

                <Link to={link} className={style.linkReg}>{nameLink}</Link>

            </form>
            {nameForm === 'Registration' && stateModule.registration.activeModalWindow ? <ModuleError ></ModuleError> : <></>}
            
        </section>
    )
}

export default Form