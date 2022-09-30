import styles from "../../styles/drawer.module.css";
import React, {SetStateAction} from "react";
import {BsGrid} from "react-icons/bs";

export default function TopicOverlay({ setShowOverlay, ...rest }: { setShowOverlay: React.Dispatch<SetStateAction<boolean>>, [x:string]: any }) {

    return (
    <div {...rest} className={styles.container} style={{ boxShadow: "0 8px 16px rgba(0,0,0,0.10), 0 3px 3px rgba(0,0,0,0.15)" }} onClick={() => {
        setShowOverlay(true);
    }}
    >
        <BsGrid style={{ fontSize: "inherit" }} />
    </div>
    )
}
