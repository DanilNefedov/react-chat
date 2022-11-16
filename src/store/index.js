import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from './messagesSlice';
import friendReducer from './friendSlice';
import userReducer from './authSlice';

export default configureStore({
  reducer:{
    friend:friendReducer,
    message: messagesReducer,
    user: userReducer,
  }  
})