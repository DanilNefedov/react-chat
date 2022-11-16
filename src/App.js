import './style/Variables.css';
import './style/App.css';
import { Friends } from './Components/HomePage/Friends';
import { MessagesMain } from './Components/MessagesPage/MessagesMain';
import { Route, Routes } from 'react-router-dom';
import { SingIn } from './Components/SingIN/SingIn';
import { ProtecteedRoute } from './Components/SingIN/ProtectedRoute';
import {Registration} from './Components/SingIN/Registration';



function App() {


  return (
    <div className="wrapper">
      <Routes>
        <Route path='/login' element={<SingIn/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route element={<ProtecteedRoute/>}>
          <Route index element={<Friends />} />
          <Route path='/:friend' element={<MessagesMain />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
