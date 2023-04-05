import { addFrined, addLastMessage, deletedFriend, editLastMessageFriend, updatePhotoName, viewMessage } from "../../../store/friendSlice"


export function updateFriends(friendList, infoChat, findMyDayBase, findMyDayUser, userDate, minute, combinedId, dispatch, newMess, view, timePublic, lastMessages, photo, idSender){

    const find = friendList.find(el => el.id === combinedId)
    const friendId = infoChat.chat.id
    const name = infoChat.name.name
    const deleted = infoChat.deleted.deleted
    if (findMyDayBase === findMyDayUser) {
        const date = `${userDate.getHours()}:${minute}`

        if (!find ) {

            dispatch(addFrined({deleted, newMess, view, combinedId, name, date, friendId, timePublic, lastMessages, photo, idSender }))

        } else if (find && find.timePublic !== timePublic ) {

            dispatch(addLastMessage({deleted, idSender, view, combinedId, lastMessages, date, timePublic }))

        } else if (find.name !== name || find.photo !== photo) {

            dispatch(updatePhotoName({ combinedId, photo, name }))

        } else if (find && deleted){

            dispatch(deletedFriend({combinedId, deleted, name, photo}))

        }else if(find.lastMessage !== lastMessages &&  find.timePublic === timePublic){

            dispatch(editLastMessageFriend({combinedId, lastMessages}))

        }

    } else {
        const date = findMyDayBase
        if (!find ) {

            dispatch(addFrined({deleted, newMess, view, combinedId, name, date, friendId, timePublic, lastMessages, photo, idSender }))

        } else if (find && find.lastMessages !== lastMessages ) {

            dispatch(addLastMessage({deleted, idSender, view, combinedId, lastMessages, date, timePublic }))

        } else if (find.name !== name || find.photo !== photo) {

            dispatch(updatePhotoName({ combinedId, photo, name }))

        } else if (find && deleted){

            dispatch(deletedFriend({combinedId, deleted, name, photo}))

        }else if(find.lastMessage !== lastMessages &&  find.timePublic === timePublic){
            
            dispatch(editLastMessageFriend({combinedId, lastMessages}))
        }
    }
    dispatch(viewMessage({ newMess, view, combinedId, idSender }))
}