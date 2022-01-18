import React from "react";
import {create} from "react-test-renderer";
import {ProfileStatus} from "./ProfileStatus";
import {updateStatus} from "../../../redux/profile-reducer";

describe('ProfileStatus component', () => {
    test('status from props should be in state', () => {
        const component = create(<ProfileStatus status={'I like it'} updateStatus={updateStatus}/>)
        const instance = component.getInstance()
        expect(instance?.props.status).toBe('I like it')
    })
    test('after creation span should be displayed', () => {
        const component = create(<ProfileStatus status={'I like it'} updateStatus={updateStatus}/>)
        const root = component.root
        let span = root.findByType('span')
        expect(span).not.toBeNull()
    })
    test('after creation input should be displayed', () => {
        const component = create(<ProfileStatus status={'I like it'} updateStatus={updateStatus}/>)
        const root = component.root
        expect(() => {
            let input = root.findByType('input')
        }).toThrow()
    })
    test('after creation span should contains correct status', () => {
        const component = create(<ProfileStatus status={'I like it'} updateStatus={updateStatus}/>)
        const root = component.root
        let span = root.findByType('span')
        expect(span.children[0]).toBe('I like it')
    })
    test('input should be displayed in editMode instead of span', () => {
        const component = create(<ProfileStatus status={'I like it'} updateStatus={updateStatus}/>)
        const root = component.root
        let span = root.findByType('span')
        span.props.onDoubleClick()
        let input = root.findByType('input')
        expect(input.props.value).toBe('I like it')
    })
})