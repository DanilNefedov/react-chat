export const initialState = {
    email:'',
    password: '',
    name: ''
}

export function reducer(state, action) {
    switch(action.type){
        case 'email':
            return {
                ...state,
                email: action.payload
            }
        case 'password':
            return {
                ...state,
                password: action.payload
            }
        case 'name' :
            return {
                ...state,
                name: action.payload
            }
        default: 
            return state
    }
}