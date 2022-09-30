import './style/Variables.css'
import './style/App.css';
import { SiteBarMain } from './Components/SiteBar/SiteBarMain';
import { Main } from './Components/Main/Main';


function App() {
  return (
    <div className="wrapper">
      <section className='main-content'>
          <SiteBarMain/>
          <Main/>
      </section>
    </div> 
  );
}

export default App;
