import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: []
}


const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage(state, action) {
            state.messages.push({
                date: new Date().toISOString(),
                idUser: 'friend1',
                messages: action.payload.text
            })
        }
    }
})


export const {addMessage} = messagesSlice.actions;

export default messagesSlice.reducer;