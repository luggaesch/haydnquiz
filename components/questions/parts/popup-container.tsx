import {Dispatch, ReactNode, SetStateAction} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {FaArrowDown} from "react-icons/fa";

export default function PopupContainer({ children, open, setOpen }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, children: ReactNode,  }) {

    return (
        <>
            <AnimatePresence>
                {open &&
                    <motion.div
                        initial={{ scale: 0, y: "100vh" }}
                        animate={{ scale: 1, y: "0vh" }}
                        exit={{ scale: 0, y: "100vh" }}
                        transition={{
                            duration: 0.6,
                            ease: "easeInOut",
                            times: [0, 1],
                            repeat: 0,
                            repeatDelay: 0
                        }}
                        style={{
                            width: "100vw", height: "100vh", position: "absolute", zIndex: 100, top: "0vh", left: "0vw", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden"
                        }}
                    >
                        <div style={{ background: "var(--dark-paper)", width: "98%", height: "98%", borderRadius: 8, overflow: "hidden" }}>
                            {children}
                        </div>
                        <div style={{ cursor: "pointer", borderRadius: 8, display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", bottom: "1.2%", left: "50%", transform: "translateX(-50%)", color: "var(--text)", width: 50, height: 50, backgroundColor: "#11111160" }}
                             onClick={() => setOpen(false)}
                        >
                            <FaArrowDown />
                        </div>
                    </motion.div>}
            </AnimatePresence>
            {open && <div style={{ width: "100vw", height: "100vh", background: "var(--dark-paper-transparent)", position: "fixed", zIndex: 99, top: 0, left: 0, overflow: "hidden" }}></div>}
        </>
    )
}
