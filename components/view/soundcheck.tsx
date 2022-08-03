import styles from "../../styles/soundcheck.module.css";
// @ts-ignore
import soundcheckSfx from "../../assets/songs/soundcheck.mp3";
import useSound from "use-sound";
import {IconButton} from "rsuite";
import {PauseOutline, PlayOutline} from "@rsuite/icons";
import {useState} from "react";

export default function Soundcheck({ ...rest }: { [x:string]: any }) {
    const [play, { stop }] = useSound(soundcheckSfx, { volume: 1 });
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div {...rest} className={styles.container}
        >
            <p>Soundcheck</p>
            <IconButton style={{ color: "white", background: "transparent", fontSize: "3rem" }}
                        icon={!isPlaying ? <PlayOutline style={{ fontSize: "inherit" }} /> : <PauseOutline style={{ fontSize: "inherit" }} />} onClick={() => {
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