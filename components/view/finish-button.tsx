import styles from "../../styles/soundcheck.module.css";
// @ts-ignore
import soundcheckSfx from "../../assets/songs/soundcheck.mp3";
import {IconButton} from "rsuite";
import {PageNext} from "@rsuite/icons";

export default function FinishButton({ onPress, ...rest }: { onPress: () => void, [x:string]: any }) {

    return (
        <div {...rest} className={styles.container} onClick={() => onPress()}>
            <IconButton style={{ color: "white", background: "transparent", fontSize: "3rem" }}
                        icon={<PageNext style={{ fontSize: "inherit" }} />} />
        </div>
    )
}
