import styles from "../../styles/drawer.module.css";
import {Grid} from "@rsuite/icons";
import React, {SetStateAction} from "react";

export default function TopicOverlay({ setShowOverlay, setIsInitialScreen, ...rest }: { setShowOverlay: React.Dispatch<SetStateAction<boolean>>, setIsInitialScreen: React.Dispatch<SetStateAction<boolean>>,  [x:string]: any }) {

    return (
    <div {...rest} className={styles.container} onClick={() => {
        setShowOverlay(true);
        setIsInitialScreen(false);
    }}
    >
        <Grid style={{ fontSize: "inherit" }} />
    </div>
    )
}
