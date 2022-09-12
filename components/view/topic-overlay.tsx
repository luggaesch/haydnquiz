import styles from "../../styles/topic-overlay.module.css";
// @ts-ignore
import soundcheckSfx from "../../assets/songs/soundcheck.mp3";
import {IconButton} from "rsuite";
import {Grid} from "@rsuite/icons";
import React, {SetStateAction} from "react";

export default function TopicOverlay({ setShowOverlay, setIsInitialScreen, ...rest }: { setShowOverlay: React.Dispatch<SetStateAction<boolean>>, setIsInitialScreen: React.Dispatch<SetStateAction<boolean>>,  [x:string]: any }) {

    return (
        <div {...rest} className={styles.container} onClick={() => {
            setShowOverlay(true);
            setIsInitialScreen(false);
        }}>
            <IconButton style={{ color: "white", background: "transparent", fontSize: "3rem" }}
                        icon={<Grid style={{ fontSize: "inherit" }} />} />
        </div>
    )
}
