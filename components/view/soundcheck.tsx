import styles from "../../styles/soundcheck.module.css";
// @ts-ignore
import soundcheckSfx from "../../assets/songs/soundcheck.mp3";
import useSound from "use-sound";
import {IconButton} from "rsuite";
import {useEffect, useState} from "react";
import {Hearing, HearingDisabled} from "@mui/icons-material";

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
        <div {...rest} className={styles.container}
        >
            <IconButton style={{ color: "white", background: "transparent", fontSize: "3rem" }}
                        icon={!isPlaying ? <Hearing style={{ fontSize: "inherit" }} /> : <HearingDisabled style={{ fontSize: "inherit" }} />} onClick={() => {
                if (isPlaying) {
                    stop();
                    setIsPlaying(false);
                } else {
                    play();
                    setIsPlaying(true);
                }
            }}/>
        </div>
    )
}
