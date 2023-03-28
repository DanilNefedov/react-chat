export const initialStateGroup = {
    users:[],
    photo:null,
    name:'',
    selectedPhoto:null,
    loadPhotoGroup:false,
    lengthNameErr:false,
    emptyUsers:false
}


export function initGroup (initialStateGroup){
    return { 
        ...initialStateGroup
    }
}


export function reducerGroup(state, action){
    switch(action.type){
        case 'users':
            return{
                ...state, 
                users: action.payload
            }
        case 'photo':
            return{
                ...state, 
                photo: action.payload
            }
        case "selectedPhotoGroup":
            return{
                ...state,
                selectedPhoto: action.payload
            }
        case 'loadPhotoGroup':
            return{
                ...state,
                loadPhotoGroup: action.payload
            }
        case 'name':
            return{
                ...state, 
                name: action.payload
            }
        case 'lengthNameErr':
            return{
                ...state,
                lengthNameErr: action.payload
            }
        case 'emptyUsers':
            return{
                ...state,
                emptyUsers: action.payload
            }
        case 'init':
            return initGroup(action.payload)
    }
}
