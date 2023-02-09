import './style/Variables.css';
import './style/App.css';
import { Route, Routes } from 'react-router-dom';
import { SingIn } from './Components/SingIN/SingIn';
import { ProtecteedRoute } from './Components/SingIN/ProtectedRoute';
import {Registration} from './Components/SingIN/Registration';
import React, { Suspense } from 'react';
import { Loader } from './Components/Loader/Loader';
import { Page404 } from './Components/404/Page404';




const Friends = React.lazy(() => import('./Components/HomePage/Friends'))
const MessagesMain = React.lazy(() => import('./Components/MessagesPage/MessagesMain'))
const Profile = React.lazy(() => import('./Components/Profile/Profile'))

function App() {
  
  return (
      <Routes>
        <Route element={<ProtecteedRoute/>}>
          <Route index element={
            <Suspense fallback={<Loader></Loader>}>
              <Friends />
            </Suspense>
          } />
          <Route path='/:userId' element={
            <Suspense fallback={<Loader></Loader>}>
              <MessagesMain />
            </Suspense>
          } />
          
          <Route path='/profile' element={
            <Suspense fallback={<Loader></Loader>}>
              <Profile/>
            </Suspense>
          }/>
        </Route>
        <Route path='/login' element={<SingIn/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/*' element={<Page404></Page404>}/>
      </Routes>
  );
}

export default App;
