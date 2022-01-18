import React from "react";
import {sendMessageAC} from "../../redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";

let mapStateToProps = (state: AppStateType) => {
    return {
        messagesPage: state.messagesPage,
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        sendMessage: (newMessageBody: string) =>
            dispatch(sendMessageAC(newMessageBody))
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)

