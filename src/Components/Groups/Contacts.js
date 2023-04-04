import style from './Groups.module.css'
import img from '../../img/user-M.png'
import classNames from 'classnames';
import { useState } from 'react';



export function Contacts ({friends, indexBlock, addFriend}){
    const { name, photo} = friends

    const [selected, setSelected] = useState([]);

    function handleClick(indexBlock) {
        let newSelected = [...selected];
        if (newSelected.includes(indexBlock)) {
        newSelected = newSelected.filter((i) => i !== indexBlock);
        } else {
        newSelected.push(indexBlock);
        }
        setSelected(newSelected);

    }

    return(

        <div onClick={() => {
            handleClick( indexBlock)
            addFriend(friends)
            }} className={selected.includes(indexBlock) ? classNames(style.friend, 'active-contact') : classNames(style.friend)}>
            <div className={style.containerFriend}>
                <div className={style.photo}>
                    <img src={photo !== null ? photo : img} alt="User" />
                </div>
                <p className={style.name}>
                    {name}
                </p>
            </div>
        </div>
    )
}