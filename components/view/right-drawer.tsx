import React, {Dispatch, ReactNode, SetStateAction} from "react";
import {Drawer} from "rsuite";

export default function RightDrawer({ open, setOpen, children }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, children: ReactNode }) {

    return (
        <Drawer size="sm" open={open} onClose={() => setOpen(false)} placement="right" >
            <Drawer.Body style={{ height: "100%", overflowY: "hidden", background: "#222222", display: "grid", gridTemplateRows: "1fr 1fr 10fr 2fr" }}>
                {children}
            </Drawer.Body>
        </Drawer>
    )
}
