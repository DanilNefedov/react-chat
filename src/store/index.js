import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from './messagesSlice';
import friendReducer from './friendSlice';

export default configureStore({
  reducer:{
    friend:friendReducer,
    message: messagesReducer,
  }  
})