import './style/Variables.css'
import './style/App.css';
import './style/SiteBar.css';
import './style/Search.css';
import './style/Groups.css';
import './style/Recents.css'
import { SiteBarMain } from './Components/SiteBar/SiteBarMain';
import { Search } from './Components/Search/Search';
import { Groups } from './Components/Groups/Groups';
import { Recents } from './Components/Recents/Recents';
import { Friends } from './Components/Friends/Friends';


function App() {
  return (
    <div className="wrapper">
      <main className='main-content'>
         <SiteBarMain/>
         <div className="second-column">
          <Search/>
          <Groups/>
          <Recents/>
         </div>
          <Friends/>
      </main>
    </div> 
  );
}

export default App;
