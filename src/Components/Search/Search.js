import search from '../../img/search.svg';
import dots from '../../img/dots.svg';
import style from './Search.module.css'

export function Search() {

    return (
        <section className={style.search}>
            <div className={style.cont}>
                <input type="text" id={style.searchIcon} placeholder="Search" />
                <label className={style.loupe} htmlFor="search-icon"><img src={search} alt="Search" /></label>
                <label className={style.dots} htmlFor="search-icon"><img src={dots} alt="Search" /></label>
            </div>
        </section>
    );

}