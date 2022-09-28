import styles from "../../styles/drawer.module.css";
import React, {SetStateAction} from "react";
import {BsGrid} from "react-icons/bs";

export default function TopicOverlay({ setShowOverlay, ...rest }: { setShowOverlay: React.Dispatch<SetStateAction<boolean>>, [x:string]: any }) {

    return (
    <div {...rest} className={styles.container} onClick={() => {
        setShowOverlay(true);
    }}
    >
        <BsGrid style={{ fontSize: "inherit" }} />
    </div>
    )
}
