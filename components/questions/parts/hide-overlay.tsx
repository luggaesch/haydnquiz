import {AnimatePresence, motion} from "framer-motion";
import {Dispatch, SetStateAction} from "react";

export default function HideOverlay({ visible, setVisible }: { visible: boolean, setVisible: Dispatch<SetStateAction<boolean>> }) {
    return (
        <AnimatePresence>
            {visible &&
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                        times: [0, 1],
                        repeat: 0,
                        repeatDelay: 0
                    }}
                    onClick={() => setVisible(false)}
                    style={{
                        width: "100vw", height: "100vh", background: "var(--dark-background)", position: "fixed", zIndex: 100, top: 0, left: 0, display: "flex", justifyContent: "center", alignItems: "center", color: "var(--text)", fontSize: "8rem"
                    }}
                >
                    ?
                </motion.div>}
        </AnimatePresence>
    )
}