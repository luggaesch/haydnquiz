import React, {ElementType, ReactNode, useState} from "react";
import {DialogProvider} from "./use-dialog";
import {motion} from "framer-motion";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

export default function Dialog({ HandlerElement, handlerContent, children }: { HandlerElement: ElementType, handlerContent: ReactNode, children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <>
            <HandlerElement onClick={() => setOpen(true)}>
                {handlerContent}
            </HandlerElement>
            {open && <div onClick={() => setOpen(false)} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "#111111f0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div onClick={(event) => event.stopPropagation()}  style={{ position: "relative", boxShadow: "var(--elevation-shadow)", width: "50%", minWidth: 300, height: "50%", backgroundColor: "#282828", borderRadius: 4 }}>
                    <DialogProvider open={open} setOpen={setOpen} loading={loading} setLoading={setLoading}>
                        {loading &&
                            <motion.div style={{ backgroundColor: "#111111F0", position: "absolute", zIndex: 100, width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
                                        animate={{ color: ["rgb(0,255,139)", "rgb(0,128,255)", "rgb(255, 0, 89)" , "rgb(0,255,139)"] }}
                                        transition={{ repeatType: "reverse", repeat: Infinity, ease: "easeInOut", duration: 2.5, times: [0, 0.5, 1.5, 2.5] }}
                            >
                                <Spin style={{ color: "inherit" }} indicator={<LoadingOutlined style={{ fontSize: "3rem", color: "inherit" }} spin />}  />
                            </motion.div>
                        }
                        {children}
                    </DialogProvider>
                </div>
            </div>}
        </>
    )
}