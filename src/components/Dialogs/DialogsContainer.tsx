import React from "react";
import {sendMessage, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";

const DialogsContainer = () => {
    return <StoreContext.Consumer>
        {(store) => {
            let onSendMessageClick = () => {
                store.dispatch(sendMessage())
            }
            let onNewMessageChange = (body: any) => {
                store.dispatch(updateNewMessageBodyCreator(body))
            }
            return <Dialogs updateNewMessageBody={onNewMessageChange}
                            sendMessage={onSendMessageClick}
                            messagesPage={store.getState().messagesPage}
            />
        }
        }
    </StoreContext.Consumer>
}

export default DialogsContainer;