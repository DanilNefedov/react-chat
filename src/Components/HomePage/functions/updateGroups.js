import { addGroupState, addLastMessagesGroup, deletedUser, editLastMessageGroup, updateNameGroup, updatePhotoGroup, viewMessageGroup } from "../../../store/groupSlice"

export function updateGroups (groupList, infoChat, findMyDayBase, findMyDayUser, userDate, minute, combinedId, dispatch, newMess, view, timePublic, lastMessages, photo, idSender){
    const find = groupList.find(el => el.id === combinedId)
    const findUsers = find !== undefined && Object.entries(find.users) 
    const users = infoChat.group.users
    const dataUsers = Object.entries(users)
    const name = infoChat.name.name
    if (findMyDayBase === findMyDayUser) {
        const date = `${userDate.getHours()}:${minute}`
        if (!find) {
            dispatch(addGroupState({ combinedId, users, photo, name, lastMessages, date, timePublic, view, idSender, newMess }))
        } else if (find && find.timePublic !== timePublic) {
            dispatch(addLastMessagesGroup({ idSender, view, combinedId, lastMessages, date, timePublic }))
        }else if(find.photo !== photo){
            dispatch(updatePhotoGroup({photo, combinedId}))
        }else if (find.name !== name){
            dispatch(updateNameGroup({name, combinedId}))
        }else if(find.lastMessage !== lastMessages &&  find.timePublic === timePublic){
            dispatch(editLastMessageGroup({combinedId, lastMessages}))
        }
    } else if (findMyDayBase !== findMyDayUser) {
        const date = findMyDayBase
        if (!find) {
            dispatch(addGroupState({ combinedId, users, photo, name, lastMessages, date, timePublic, view, idSender, newMess }))
        } else if (find.timePublic !== timePublic) {
            dispatch(addLastMessagesGroup({ idSender, view, combinedId, lastMessages, date, timePublic }))
        }else if(find.photo !== photo){
            dispatch(updatePhotoGroup({photo, combinedId})) 
        }else if (find.name !== name){
            dispatch(updateNameGroup({name, combinedId}))
        }else if(find.lastMessage !== lastMessages &&  find.timePublic === timePublic){
            dispatch(editLastMessageGroup({combinedId, lastMessages}))
        }
    }
    for(let i = 0; i < findUsers.length; i++){
        if(findUsers[i][1].deleted !== dataUsers[i][1].deleted){
            dispatch(deletedUser({combinedId, users}))
        }
    }

    dispatch(viewMessageGroup({ newMess, view, combinedId, idSender }))
}