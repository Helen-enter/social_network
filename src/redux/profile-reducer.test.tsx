import React from "react";
import {addPostAC, deletePost, InitialStateType, profileReducer} from "./profile-reducer";

let state: InitialStateType = {
    postData: [
        {id: 1, message: 'I like ice cream!', likesCount: 3},
        {id: 2, message: 'Hello world!', likesCount: 5},
        {id: 3, message: 'juice and cake', likesCount: 10},
    ],
    newPostText: 'this is new social network',
    profile: null,
    status: ''
}

it('length of post should be incremented', () => {
    let action = addPostAC('hi, I am testing adding post')

    let newState = profileReducer(state, action)
    expect(newState.postData.length).toBe(4)
});

it('post should be added', () => {
    let action = addPostAC('hi, I am testing adding post')

    let newState = profileReducer(state, action)
    expect(newState.postData[0].message).toBe('hi, I am testing adding post')
});

it('after deleting length of message should be decrement', () => {
    let action = deletePost(1)

    let newState = profileReducer(state, action)
    expect(newState.postData.length).toBe(2)
});
