import classNames from "classnames";
import { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { initialState, reducer } from "../../state/regForm";
import { ModuleError } from "../ModuleError/ModuleError";
import style from './SingIn.module.css';



function Form({ formProps, handleClick, setErrorReg, setModuleErr, moduleErr }) {
    const { nameForm, nameButton, link, nameLink, errorClass } = formProps

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <section className={ 
            errorClass === 'errorLog'  
            ? classNames(style.errorLog,style.sectionForm ) : errorClass === 'errorReg' 
            ? classNames(style.errorReg,style.sectionForm ) : classNames( style.sectionForm)   
        }>
            <form action="" className={style.form}>
                <h1 className={style.header}>CHAT</h1>
                <h2 className={classNames(style.headerForm, 'header')}>{nameForm}</h2>

                {nameForm === 'Registration' && <div className={style.name}>
                    <label htmlFor="name" className={classNames(style.headerName, 'head-name')}>Name:</label>
                    <input value={state.name} onChange={(e) => dispatch({type:'name', payload:e.target.value})} type='name' placeholder="Enter your name"></input>
                </div>}

                <div className={style.email}>
                    <label htmlFor="email" className={classNames(style.headerEmail, 'head-name')}>Email:</label>
                    <input value={state.email} onChange={(e) => dispatch({type:'email', payload:e.target.value})} type="email" placeholder="Enter your email" />
                </div>
                <div className={style.pass}>
                    <label htmlFor="password" className={classNames(style.headerPass, 'head-name')}>Password:</label>
                    <input value={state.password} onChange={(e) => dispatch({type:'password', payload:e.target.value})} type="password" placeholder="Enter your password" />
                </div>

                {nameForm === 'Registration' ?
                <button onClick={(e) => {
                    e.preventDefault()
                    if(state.name.length > 20){
                        setErrorReg(false)
                    }else{
                        setErrorReg(true)
                        setModuleErr(false)
                        handleClick( state.name, state.email, state.password)
                    }
                    
                }}
                    className={style.regBnt}>{nameButton}</button>
                :
                <button onClick={(e) => {
                    e.preventDefault()
                    handleClick( state.email, state.password)
                }}
                    className={style.regBnt}>{nameButton}</button>
                }
                

                <Link to={link} className={style.linkReg}>{nameLink}</Link>

            </form>
            {nameForm === 'Registration' && moduleErr ? <ModuleError setModuleErr={setModuleErr}></ModuleError> : <></>}
            
        </section>
    )
}

export default Form