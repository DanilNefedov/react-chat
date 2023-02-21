export const initialStateProfile = {
    photo: null,
    selectedPhoto: null,
    name:'',
    email:'',
    emailClassError:false,
    nameClassError:false,
    modalReAuth: false,
    deletedFriend:false,
    passwordModalReAuth:'',
    loadPhoto: false
}

export function initProfile (initialStateProfile){
    return { 
        ...initialStateProfile
    }
}



export function reducerProfile(state, action){
    switch(action.type){
        case "setPhoto":
            return{
                ...state,
                photo: action.payload
            }
        case "selectedPhoto":
            return{
                ...state,
                selectedPhoto: action.payload
            }
        case "setName":
            return{
                ...state,
                name: action.payload
            }
        case "setEmail":
            return{
                ...state,
                email:action.payload
            }
        case "emailClassError":
            return{
                ...state,
                emailClassError: action.payload
            }
        case "nameClassError":
            return{
                ...state,
                nameClassError: action.payload
            }
        case "modalReAuth":
            return{
                ...state,
                modalReAuth: action.payload
            }
        case "deletedFriend":
            return{
                ...state,
                deletedFriend: action.payload
            }
        case "passwordModalReAuth":
            return{
                ...state,
                passwordModalReAuth: action.payload
            }
        case "loadPhoto": 
            return{
                ...state,
                loadPhoto: action.payload
            }
        case "resetProfile": {
            return initProfile(action.payload)
        }
        
    }
}
