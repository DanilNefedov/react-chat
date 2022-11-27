import './style/Variables.css';
import './style/App.css';
import { Friends } from './Components/HomePage/Friends';
import { MessagesMain } from './Components/MessagesPage/MessagesMain';
import { Route, Routes } from 'react-router-dom';
import { SingIn } from './Components/SingIN/SingIn';
import { ProtecteedRoute } from './Components/SingIN/ProtectedRoute';
import {Registration} from './Components/SingIN/Registration';
import { lazy, Suspense } from 'react';
import { Loader } from './Components/Loader/Loader';

//const ProtecteedRoute = lazy(() => import('./Components/SingIN/ProtectedRoute'))


function App() {


  return (
    <div className="wrapper">
      <Routes>
        <Route element={<ProtecteedRoute/>}>
          <Route index element={<Friends />} />
          <Route path='/:userId' element={<MessagesMain />} />
        </Route>
        <Route path='/login' element={<SingIn/>}/>
        <Route path='/registration' element={<Registration/>}/>
        
      </Routes>
    </div>
  );
}

export default App;
