import styles from "../../styles/topic-overlay.module.css";
// @ts-ignore
import soundcheckSfx from "../../assets/songs/soundcheck.mp3";
import useSound from "use-sound";
import {IconButton} from "rsuite";
import {Grid, PauseOutline, PlayOutline} from "@rsuite/icons";
import React, {SetStateAction, useMemo, useState} from "react";
import PopupContainer from "./popup-container";
import Topics from "./topics";

export default function TopicOverlay({ setShowOverlay, setIsInitialScreen, ...rest }: { setShowOverlay: React.Dispatch<SetStateAction<boolean>>, setIsInitialScreen: React.Dispatch<SetStateAction<boolean>>,  [x:string]: any }) {

    return (
        <div {...rest} className={styles.container} onClick={() => {
            setShowOverlay(true);
            setIsInitialScreen(false);
        }}>
            <p>Themen</p>
            <IconButton style={{ color: "white", background: "transparent", fontSize: "3rem" }}
                        icon={<Grid style={{ fontSize: "inherit" }} />} />
        </div>
    )
}