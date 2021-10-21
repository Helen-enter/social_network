import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import { SetCurrentPageType } from "./users-reducer";

export type ActionsType =
    AddPostActionType |
    UpdateNewPostTextType |
    UpdateNewMessageBodyType |
    SendMessageType |
    FollowUserType |
    UnFollowUserType |
    SetUsersType |
    SetCurrentPageType |
    SetStatusType |
    SetUserProfileType

export type SetUserProfileType = {
    type: 'SET_USER_PROFILE',
    profile: string
}

export type SetStatusType = {
    type: 'SET-STATUS'
    status: string
}

export type StoreType = {
    _state: stateType
    getState: () => stateType
    _callBackSubscriber: () => void
    subscribe: (observer: any) => void
    dispatch: (action: ActionsType) => void
}

export type AddPostActionType = {
    type: 'ADD-POST'
    newPostText: string
}

export type UpdateNewPostTextType = {
    type: 'UPDATE-NEW-POST-TEXT'
    newText: string
}

export type UpdateNewMessageBodyType = {
    type: 'UPDATE-NEW-MESSAGE-BODY'
    body: string
}

export type FollowUserType = {
    type: 'FOLLOW'
    userID: number
}

export type UnFollowUserType = {
    type: 'UNFOLLOW'
    userID: number
}

type LocationType = {
    country: string
    city: string
}

type UsersType = {
    id: number
    fullName: string
    status: string
    photoUrl: string
    followed: boolean
    location: LocationType
}

export type SetUsersType = {
    type: 'SET-USERS'
    users: Array<UsersType>
}

//export type UpdateNewMessageBodyType = ReturnType<typeof updateNewMessageBodyCreator>

export type SendMessageType = {
    newMessageBody: string;
    type: 'SEND-MESSAGE'
}



let store: StoreType = {
    _state: {
        profilePage: {
            postsData: [
                {id: 1, message: 'Hi, how are you?', likesCount: 12},
                {id: 2, message: 'It\'s my first post', likesCount: 23},
                {id: 3, message: 'Hey', likesCount: 4}
            ],
            newPostText: 'Yo!',
            status: '',
            profile: ''
        },
        messagesPage: {
            messagesData: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'Hello'},
                {id: 3, message: 'Yo'}
            ],
            dialogsData: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Andrey'},
                {id: 3, name: 'Sveta'},
                {id: 4, name: 'Sasha'},
                {id: 5, name: 'Viktor'},
                {id: 6, name: 'Valera'}
            ],
            newMessageBody: ''
        },
        sidebar: {}
    },
    _callBackSubscriber() {
        console.log('State changed')
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callBackSubscriber = observer
    },
    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)

        this._callBackSubscriber(/*this._state*/)
    }
}

export type postsDataType = {
    id: number
    message: string
    likesCount: number
}

export type dialogsDataType = {
    id: number
    name: string
}

export type messagesDataType = {
    id: number
    message: string
}

export type profilePageType = {
    postsData: Array<postsDataType>
    newPostText: string
    status: string
    profile: string
}

export type messagesPageType = {
    messagesData: Array<messagesDataType>
    dialogsData: Array<dialogsDataType>
    newMessageBody: string
}

export type stateType = {
    profilePage: profilePageType
    messagesPage: messagesPageType
    sidebar: any
}


export default store;

//window.store = store