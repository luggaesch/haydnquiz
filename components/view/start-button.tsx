import {motion} from "framer-motion";
import {PowerSettingsNew} from "@mui/icons-material";
import styles from "../../styles/start.module.css";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

export default function StartButton({ ...rest }: { [x:string]: any }) {
    return (
        <div {...rest} className={styles.container}>
            <div>
                <div className={styles.buttonContainer}>
                    <div className={styles.power}>
                        <PowerSettingsNew style={{ fontSize: "inherit" }} />
                    </div>
                </div>
                <motion.div
                    animate={{
                        scale: [1, 2, 4, 2, 1],
                        /*rotate: [0, 0, 180, 180, 0],*/
                        /*borderRadius: ["0%", "0%", "50%", "50%", "0%"],*/
                    }}
                    transition={{
                        duration: 5,
                        ease: "easeInOut",
                        times: [0, 1, 2, 3, 4, 5],
                        repeat: Infinity,
                        repeatDelay: 1
                    }}
                    className={styles.rotate}
                >
                    <motion.div className={styles.pulse}
                        animate={{color: ["#b64f4f", "#baaa3e", "#5db64f", "#45ccbe", "#4F58B6", "#c261d1"]}}
                                transition={{
                                    duration: 5,
                                    ease: "easeInOut",
                                    times: [0, 1, 2, 3, 4],
                                    repeat: Infinity,
                                    repeatDelay: 1
                                }}
                    >
                        <Spin style={{ color: "inherit" }} indicator={<LoadingOutlined style={{ fontSize: "12rem", color: "inherit" }} spin />}  />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
