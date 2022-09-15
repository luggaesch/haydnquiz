import React, {ReactNode, SetStateAction, useMemo} from "react";
import styles from "../../styles/question.module.css";
import {motion} from "framer-motion";
import {FcDown} from "react-icons/fc";

export default function PopupContainer({ isInitialScreen, showContent, setShowContent, backgroundColor, children }: { isInitialScreen: boolean, showContent: boolean, setShowContent: React.Dispatch<SetStateAction<boolean>>, backgroundColor?: string, children: ReactNode }) {
    const animation = useMemo(() => {
        if (isInitialScreen) return { scale: 0 };
        return {
            scale: showContent ? [0, 1] : [1, 0],
            y: showContent ? ["100vh", "0vh"] : ["0vh", "100vh"],
            x: ["0", "0"]
        }
    }, [showContent, isInitialScreen]);

    return (
        <motion.div
            animate={animation}
            transition={{
                duration: 0.8,
                ease: "easeInOut",
                times: [0, 1],
                repeat: 0,
                repeatDelay: 0
            }}
            className={styles.popupContainer}
            style={{ visibility: isInitialScreen ? "hidden" : "visible", backgroundColor: backgroundColor ?? "#ffffff40" }}
        >
            <div className={styles.popupContainerText} style={{ backgroundColor: backgroundColor ?? "#ffffff" }}>
                {children}
            </div>
            <div className={styles.popupContainerCollapse} onClick={() => {setShowContent(false);}}>
                <FcDown style={{ fontSize: "inherit" }} />
            </div>
        </motion.div>
    )
}