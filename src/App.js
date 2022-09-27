import './style/Variables.css'
import './style/App.css';
import { SiteBarMain } from './Components/SiteBar/SiteBarMain';
import { HomeMain } from './Components/MainContent/HomeMain';


function App() {
  return (
    <div className="wrapper">
      <section className='main-content'>
          <SiteBarMain/>
          <HomeMain/>
      </section>
    </div> 
  );
}

export default App;
