export const initialStateModal = {
    errorClassName:'',
    activeModalWindow: false,
    informationAboutError: ''
}

export function initModalError (initialStateModule){
    return { 
        ...initialStateModule
    }
}

export function reducerModal(state, action){
    switch(action.type){
        case 'errorClassName':
            return{
                ...state, 
                errorClassName: action.payload
                
            }
        case 'activeModalWindow':
            return{
                ...state, 
                activeModalWindow: action.payload
                
            }
        case 'resetModal':
            return initModalError(action.payload)
            
    }
}

