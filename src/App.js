import './style/Variables.css'
import './style/App.css';
import './style/SiteBar.css';
import { SiteBarMain } from './Components/SiteBar/SiteBarMain';


function App() {
  return (
    <div className="wrapper">
      <main className='main-content'>
         <SiteBarMain/>
      </main>
    </div> 
  );
}

export default App;
