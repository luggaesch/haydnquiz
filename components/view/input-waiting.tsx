import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import { motion } from "framer-motion";

export default function InputWaiting({ uploadRound }: { uploadRound: number }) {

    return (
        <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)", padding: 20, backgroundColor: "var(--question-item)", borderRadius: 12, width: "100%", maxWidth: 350, height: "50%",  gap: 30 }}>
                <motion.div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}
                            animate={{ color: ["rgb(0,255,139)", "rgb(0,128,255)", "rgb(255, 0, 89)" , "rgb(0,255,139)"] }}
                            transition={{ repeatType: "reverse", repeat: Infinity, ease: "easeInOut", duration: 2.5, times: [0, 0.5, 1.5, 2.5] }}
                >
                    <Spin style={{ color: "inherit" }} indicator={<LoadingOutlined style={{ fontSize: "12rem", color: "inherit" }} spin />}  />
                </motion.div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", color: "white", fontSize: 24, textAlign: "center" }}>
                    <div style={{ fontWeight: "bold" }}>Round {uploadRound + 1}</div>
                    <div >Please wait until Upload is unlocked!</div>
                </div>
            </div>
        </div>
    )
}
