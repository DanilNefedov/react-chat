export const initialEditMessage = {
    modal:false,
    editMess: {},
    editText: ''
}


export function initEditMessage (initialEditMessage){
    return { 
        ...initialEditMessage
    }
}


export function reducerEditMessage(state, action){
    switch(action.type){
        case 'modal':
            return{
                ...state, 
                modal: action.payload
            }
        case 'editMess':
            return{
                ...state, 
                editMess: action.payload
            }
        case 'editText': 
            return{
                ...state,
                editText: action.payload
            }
        case 'init':
            return initEditMessage(action.payload)
    }
}
