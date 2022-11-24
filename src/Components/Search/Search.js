import search from '../../img/search.svg';
import dots from '../../img/dots.svg';
import style from './Search.module.css'


export function Search({handleSubmit, text, setText, handleEvent}) {

    // const [user, setUser] = useState(null)


    // const db = getFirestore();
    // console.log(text)
    

    // const searchUsers = async () =>{
    //     const q = query(collection(db, "users"), where('displayName', '==', text));
    //     try{
    //         const querySnapshot = await getDocs(q);
    //         querySnapshot.forEach((doc) => {
    //             setUser(doc.data())
    //         });

    //     }catch (error){
    //         console.log(error)
    //     }
        
    // }

    // const handleEvent = (e) => {
    //     e.code === 'Enter' &&
    // }

    return (
        <section className={style.search}>
            <div className={style.cont}>
                <input onKeyDown={handleEvent} value={text} onChange={(e) => setText(e.target.value)} type="text" id={style.searchIcon} placeholder="Search" />
                <button onClick={handleSubmit} className={style.loupe} htmlFor="search-icon"><img src={search} alt="Search" /></button>
                <label className={style.dots} htmlFor="search-icon"><img src={dots} alt="Search" /></label>
            </div>
        </section>
    );

}