export const initialState = {
    registration:{
        errorClassName:'',
        activeModalWindow: false//для каждого компонента свой актив
    }
}

export function reducer(state, action){
    switch(action.type){
        case 'registrationErrorClassName':
            return{
                registration:{
                    ...state, 
                    errorClassName: action.payload
                }
            }
        case 'registrationActiveModalWindow':
            return{
                registration:{
                    ...state, 
                    activeModalWindow: action.payload
                }
            }
            
    }
}

