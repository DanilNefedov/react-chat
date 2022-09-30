
import { Search } from '../Search/Search';
import { Groups } from '../Groups/Groups';
import { Recents } from '../Recents/Recents';
import { Friends } from '../HomePage/Friends';
import { MessagesMain } from '../MessagesPage/MessagesMain';

export function Main() {

    return (
        <main className="section-main">
            <div className="second-column">
                <Search />
                <Groups />
                <Recents />
            </div>
            {/* <Friends /> */}
            <MessagesMain/>
        </main>
    );

}