export const initialStateModule = {
    registration:{
        errorClassName:'',
        activeModalWindow: false//для каждого компонента свой актив
    }
}

export function initRegistration (initialStateModule){
    return { 
        registration:{
            errorClassName: initialStateModule,
            activeModalWindow: initialStateModule
        }
    }
}

export function reducerModule(state, action){
    switch(action.type){
        case 'registrationErrorClassName':
            return{
                ...state,
                registration:{
                    ...state.registration, 
                    errorClassName: action.payload
                }
            }
        case 'registrationActiveModalWindow':
            return{
                ...state,
                registration:{
                    ...state, 
                    activeModalWindow: action.payload
                }
            }
        case 'registrationReset':

            return initRegistration(action.payload)
            
    }
}

