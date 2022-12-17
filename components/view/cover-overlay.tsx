import {AnimatePresence, motion} from "framer-motion";
import {useState} from "react";

export default function CoverOverlay() {
    const [visible, setVisible] = useState(true);

    return (
        <AnimatePresence>
            {visible &&
            <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setVisible(false)} style={{  cursor: "pointer", color: "var(--text", fontSize: "2em", position: "absolute", width: "100%", height: "100%", borderRadius: "inherit", zIndex: 10, background: "var(--dark-background)", display: "flex", justifyContent: "center", alignItems: "center", }}>
                ?
            </motion.div>}
        </AnimatePresence>
    )
}