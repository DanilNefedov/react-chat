import classNames from "classnames";
import { useState } from "react";
import { Link } from "react-router-dom";
import style from './SingIn.module.css';



export function Form({ formProps, handleClick }) {
    const { nameForm, nameButton, link, nameLink } = formProps


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nameUser, setNameUser] = useState('')

    //console.log(user)
    return (
        <section className={style.sectionForm}>
            <form action="" className={style.form}>
                <h1 className={style.header}>CHAT</h1>
                <h2 className={classNames(style.headerForm, 'header')}>{nameForm}</h2>

                {nameForm === 'Registration' && <div className={style.name}>
                    <label htmlFor="name" className={classNames(style.headerName, 'head-name')}>Name:</label>
                    <input value={nameUser} onChange={(e) => setNameUser(e.target.value)} type='name' placeholder="Enter your name"></input>
                </div>}

                <div className={style.email}>
                    <label htmlFor="email" className={classNames(style.headerEmail, 'head-name')}>Email:</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" />
                </div>
                <div className={style.pass}>
                    <label htmlFor="password" className={classNames(style.headerPass, 'head-name')}>Password:</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" />
                </div>

                {nameForm === 'Registration' ?
                <button onClick={(e) => {
                    e.preventDefault()
                    handleClick( nameUser, email, password)
                }}
                    className={style.regBnt}>{nameButton}</button>
                :
                <button onClick={(e) => {
                    e.preventDefault()
                    handleClick( email, password)
                }}
                    className={style.regBnt}>{nameButton}</button>
                }
                

                <Link to={link} className={style.linkReg}>{nameLink}</Link>

            </form>
        </section>
    )
}