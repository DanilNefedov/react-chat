import classNames from 'classnames';
import { Link } from 'react-router-dom';
import style from './Page404.module.css'


export function Page404 () {
    return( 
        <div className={ classNames(style.page404) }> 
            <h1 className={classNames(style.header)}>PAGE 404</h1>   
            <p className={classNames(style.text)}>Incorrect link or it does not exist </p> 
            <Link to='/' className={ classNames(style.link)}>go home</Link>
        </div>
    )
}