import React from "react";
import {sendMessageAC, updateNewMessageBodyAC} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";

/*export type DialogsContainerType = {
    store: StoreType
}*/

/*export const DialogsContainer = (props: DialogsContainerType) => {

    let state = props.store.getState().messagesPage

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageAC())
    }

    let onNewMessageChange = (body: string) => {
        props.store.dispatch(updateNewMessageBodyAC(body))
    }
    return (<Dialogs updateNewMessageBody={onNewMessageChange} sendMessage={onSendMessageClick} messagesPage={state}/>)
}*/

let mapStateToProps = (state: AppStateType) => {
    return {
        messagesPage: state.messagesPage,
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateNewMessageBody: (body: string) => dispatch(updateNewMessageBodyAC(body)),
        sendMessage: () => dispatch(sendMessageAC())
    }
}

/*let AuthRedirectComponent = (props: DialogsType) => {
    if(!props.isAuth) return <Redirect to={'/login'}/>
    return <DialogsContainer/>
}*/

//let AuthRedirectComponent = WithAuthRedirect(Dialogs)

export default compose<any>(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs)

//export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)