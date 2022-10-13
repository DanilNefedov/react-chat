import './style/Variables.css';
import './style/App.css';
import { Layout } from './Components/Layout/Layout';
import { Friends } from './Components/HomePage/Friends';
import { MessagesMain } from './Components/MessagesPage/MessagesMain';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';



function App(props) {

  return (
    <div className="wrapper">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Friends friend={props.friend.friend} />}/>
          <Route path='/:friendId' element={<MessagesMain friend={props.friend.friend} messages={props.friend.messages}/>}/>
          {/* перезапись линки / убрать из сайтбара пункт сообщений */}
          <Route path='messages' element={<MessagesMain />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
