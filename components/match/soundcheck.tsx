import styles from "../../styles/drawer.module.css";
// @ts-ignore
import soundcheckSfx from "../../assets/songs/soundcheck.mp3";
import useSound from "use-sound";
import {useEffect, useState} from "react";
import {Hearing, HearingDisabled} from "@mui/icons-material";
import {Button} from "antd";

export default function Soundcheck({ open, ...rest }: { open: boolean, [x:string]: any }) {
    const [play, { stop }] = useSound(soundcheckSfx, { volume: 1 });
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (!open) {
            stop();
            setIsPlaying(false);
        }
    }, [open])

    return (
        <div {...rest} style={{ boxShadow: "0 8px 16px rgba(0,0,0,0.10), 0 3px 3px rgba(0,0,0,0.15)" }} className={styles.container} onClick={() => {
            if (isPlaying) {
                stop();
                setIsPlaying(false);
            } else {
                play();
                setIsPlaying(true);
            }
        }}
        >
            {!isPlaying ? <Hearing style={{ fontSize: "inherit" }} /> : <HearingDisabled style={{ fontSize: "inherit" }} />}
        </div>
    )
}
