//import {rerenderEntireTree} from "../index";
// let rerenderEntireTree = () => {
//     console.log('State changed')
// }

export type StoreType = {
    _state: stateType
    getState: () => stateType
    _rerenderEntireTree: () => void
    addPost: () => void
    updateNewPostText: (newText: string) => void
    subscribe: (observer: any) => void
}

let store: StoreType = {
    _state: /*stateType*/ {
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
        ]
    }
},
    getState() {
        return this._state;
    },
    _rerenderEntireTree() {
        console.log('State changed')
    },
    addPost() {
        let newPost: postsDataType= {
            id: 10,
            message: this._state.profilePage.newPostText,
            likesCount: 0
        }
        this._state.profilePage.postsData.push(newPost);
        this._state.profilePage.newPostText = '';
        this._rerenderEntireTree(/*this._state*/);
    },
    updateNewPostText(newText) {

        this._state.profilePage.newPostText = newText
        this._rerenderEntireTree(/*this._state*/);
    },
    subscribe (observer) {
        this._rerenderEntireTree = observer
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
}

export type messagesPageType = {
    messagesData: Array<messagesDataType>
    dialogsData: Array<dialogsDataType>
}

export type stateType = {
    profilePage: profilePageType
    messagesPage: messagesPageType
}

/*let state: stateType = {
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
        ]
    }
}*/

// export const addPost = () => {
//     let newPost: postsDataType= {
//         id: 10,
//         message: state.profilePage.newPostText,
//         likesCount: 0
//     }
//     state.profilePage.postsData.push(newPost);
//     state.profilePage.newPostText = '';
//     rerenderEntireTree(state);
// }

// export let updateNewPostText = (newText: string) => {
//
//     state.profilePage.newPostText = newText
//     rerenderEntireTree(state);
// }

// export const subscribe = (observer: any) => {
//     rerenderEntireTree = observer
// }


export default store;
// window.store = store