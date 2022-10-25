import search from '../../img/search.svg';
import dots from '../../img/dots.svg';
import style from './Search.module.css'

export function Search({handleSubmit, text, setText}) {

    return (
        <section className={style.search}>
            <div className={style.cont}>
                <input value={text} onChange={(e) => setText(e.target.value)} type="text" id={style.searchIcon} placeholder="Search" />
                <button onClick={handleSubmit} className={style.loupe} htmlFor="search-icon"><img src={search} alt="Search" /></button>
                <label className={style.dots} htmlFor="search-icon"><img src={dots} alt="Search" /></label>
            </div>
        </section>
    );

}