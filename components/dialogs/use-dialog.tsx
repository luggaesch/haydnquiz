import React, {Dispatch, ReactNode, SetStateAction} from "react";
import Match from "../../types/match";

interface DialogValue {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>
}

const DialogContenxt = React.createContext<DialogValue | undefined>(undefined);

export function useDialog() {
    const context = React.useContext(DialogContenxt);
    if (!context) {
        throw Error("Context can only be consumed from within a DialogProvider or its children.")
    }
    return context;
}


export const DialogProvider = (props: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, loading: boolean, setLoading: Dispatch<SetStateAction<boolean>>, children: ReactNode } ) => {

    return (
        <DialogContenxt.Provider value={props}>
            {props.children}
        </DialogContenxt.Provider>
    )
}