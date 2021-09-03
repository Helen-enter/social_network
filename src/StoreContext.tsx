import React from "react";
import {StoreType} from "./redux/store";

export type ProviderType = {
    children: React.ReactNode
    store: StoreType
}

const StoreContext = React.createContext({} as StoreType)

export const Provider = (props: ProviderType) => {
    return <StoreContext.Provider value={props.store}>
        {props.children}
    </StoreContext.Provider>
}

export default StoreContext;