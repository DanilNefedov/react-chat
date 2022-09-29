
import { Search } from '../Search/Search';
import { Groups } from '../Groups/Groups';
import { Recents } from '../Recents/Recents';
import { Friends } from '../HomePage/Friends';

export function HomeMain() {

    return (
        <main className="section-main">
            <div className="second-column">
                <Search />
                <Groups />
                <Recents />
            </div>
            <Friends />
        </main>
    );

}