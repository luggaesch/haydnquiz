import {motion} from "framer-motion";
import {IconButton} from "rsuite";
import {PowerSettingsNew} from "@mui/icons-material";
import styles from "../../styles/start.module.css";

export default function StartButton({ ...rest }: { [x:string]: any }) {
    return (
        <div {...rest} className={styles.container}>
            <div>
                <div className={styles.buttonContainer}>
                    <IconButton className={styles.power} icon={<PowerSettingsNew style={{ fontSize: "inherit" }} />} />
                </div>
                <motion.div
                    animate={{
                        scale: [1, 2, 2, 1, 1],
                        rotate: [0, 0, 180, 180, 0],
                        borderRadius: ["0%", "0%", "50%", "50%", "0%"],
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.5, 0.8, 1],
                        repeat: Infinity,
                        repeatDelay: 1
                    }}
                    className={styles.rotate}
                >
                    <motion.div className={styles.pulse}
                        animate={{backgroundColor: ["#b64f4f", "#baaa3e", "#5db64f", "#45ccbe", "#4F58B6", "#c261d1"]}}
                                transition={{
                                    duration: 5,
                                    ease: "easeInOut",
                                    times: [0, 1, 2, 3, 4],
                                    repeat: Infinity,
                                    repeatDelay: 1
                                }}
                    />
                </motion.div>
            </div>
        </div>
    );
}
