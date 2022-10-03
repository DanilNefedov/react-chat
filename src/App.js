import './style/Variables.css'
import './style/App.css';
import { Layout } from './Components/Layout/Layout';
import { Friends } from './Components/HomePage/Friends';
import { MessagesMain } from './Components/MessagesPage/MessagesMain';
import { Route, Routes } from 'react-router-dom';



function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Friends />}/>
          <Route path='/:friend1' element={<MessagesMain/>}/>
          {/* перезапись линки */}
          <Route path='messages' element={<MessagesMain />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
