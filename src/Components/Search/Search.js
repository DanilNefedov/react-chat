import search from '../../img/search.svg';
import dots from '../../img/dots.svg';
import style from './Search.module.css'
import { FriendsList } from '../HomePage/FriendsList/FriendsList';
import { useDispatch, useSelector } from 'react-redux';
import { addFrined } from '../../store/friendSlice';
import {SearchList} from './SearchList'


export function Search({ user, handleSubmit, text, setText, handleEvent }) {

    const name = user.name;
    const id = user.id;
    const email = user.email;

    const dispatch = useDispatch()
    

    const friend = useSelector(state => state.friend.friend)
   // console.log(friend, user)
    


    const bindSearch = () => {
        const find = friend.find(el => el.id === user.id)
        if(!find){
            dispatch(addFrined({id, name, email}))
        }
    }



    return (
        <>
            <section className={style.search}>
                <div className={style.cont}>
                    <input onKeyDown={handleEvent} value={text} onChange={(e) => setText(e.target.value)} type="text" id={style.searchIcon} placeholder="Search" />
                    <button onClick={handleSubmit} className={style.loupe} htmlFor="search-icon"><img src={search} alt="Search" /></button>
                    <label className={style.dots} htmlFor="search-icon"><img src={dots} alt="Search" /></label>
                </div>

            </section>
            <section className={style.searchList}>
                <div className={style.searchCont}>
                    <h2 className='header'>Search List</h2>
                    {(!user) ? (
                        <div className="">Friend list empty</div>
                    ) : (
                        <SearchList userName={name} userId={id} clickLink={bindSearch} />
                    )
                    }
                </div>
            </section>
        </>

    );

}