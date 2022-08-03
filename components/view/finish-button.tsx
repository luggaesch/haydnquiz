import styles from "../../styles/soundcheck.module.css";
// @ts-ignore
import soundcheckSfx from "../../assets/songs/soundcheck.mp3";
import {IconButton} from "rsuite";
import {PageEnd} from "@rsuite/icons";

export default function FinishButton({ onPress, ...rest }: { onPress: () => void, [x:string]: any }) {

    return (
        <div {...rest} className={styles.container} onClick={() => onPress()}>
            <p>Weiter</p>
            <IconButton style={{ color: "white", background: "transparent", fontSize: "3rem" }}
                        icon={<PageEnd style={{ fontSize: "inherit" }} />} />
        </div>
    )
}