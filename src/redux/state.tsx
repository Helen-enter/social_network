
export type StoreType = {
    _state: stateType
    getState: () => stateType
    _callBackSubscriber: () => void
    subscribe: (observer: any) => void
    dispatch: (action: ActionsType) => void
}

export type AddPostActionType = {
    type: 'ADD-POST'
}

export type UpdateNewPostTextType = {
    type: 'UPDATE-NEW-POST-TEXT'
    newText: string
}

export type UpdateNewMessageBodyType = {
    type: 'UPDATE-NEW-MESSAGE-BODY'
    body: string
}

//export type UpdateNewMessageBodyType = ReturnType<typeof updateNewMessageBodyCreator>

export type SendMessageType = {
    type: 'SEND-MESSAGE'
}

export type ActionsType = AddPostActionType | UpdateNewPostTextType | UpdateNewMessageBodyType | SendMessageType

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'

let store: StoreType = {
    _state: {
    profilePage: {
        postsData: [
            {id: 1, message: 'Hi, how are you?', likesCount: 12},
            {id: 2, message: 'It\'s my first post', likesCount: 23},
            {id: 3, message: 'Hey', likesCount: 4}
        ],
        newPostText: 'Yo, it-kamasutra',
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
    }
},
    _callBackSubscriber() {
        console.log('State changed')
    },
    getState() {
        return this._state;
    },
    subscribe (observer) {
        this._callBackSubscriber = observer
    },
    dispatch(action) {
        if( action.type === ADD_POST) {

                let newPost: postsDataType= {
                    id: 10,
                    message: this._state.profilePage.newPostText,
                    likesCount: 0
                }
                this._state.profilePage.postsData.push(newPost);
                this._state.profilePage.newPostText = '';
                this._callBackSubscriber(/*this._state*/);

        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText
            this._callBackSubscriber(/*this._state*/);
        } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
            this._state.messagesPage.newMessageBody = action.body;
            this._callBackSubscriber(/*this._state*/)
        } else if (action.type === SEND_MESSAGE) {
            let body = this._state.messagesPage.newMessageBody
            this._state.messagesPage.newMessageBody = ''
            this._state.messagesPage.messagesData.push({id: 6, message: body})
            this._callBackSubscriber(/*this._state*/)
        }
    }
}

export const sendMessage = (): SendMessageType => ({type: SEND_MESSAGE})
export const updateNewMessageBodyCreator = (body: string): UpdateNewMessageBodyType => ({type: UPDATE_NEW_MESSAGE_BODY, body: body})
export const addPostActionCreator = (): AddPostActionType => ({type: ADD_POST})
export const updateNewPostTextActionCreator = (text: string): UpdateNewPostTextType =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text})

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
}

export type messagesPageType = {
    messagesData: Array<messagesDataType>
    dialogsData: Array<dialogsDataType>
    newMessageBody: string
}

export type stateType = {
    profilePage: profilePageType
    messagesPage: messagesPageType
}


export default store;
// window.store = store