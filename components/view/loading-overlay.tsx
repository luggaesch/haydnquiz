import {motion} from "framer-motion";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import React from "react";

export default function LoadingOverlay() {

    return (
        <motion.div style={{ position: "absolute", top: 0, left: 0, backgroundColor: "#111111BB", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
                    animate={{ color: ["rgb(0,255,139)", "rgb(0,128,255)", "rgb(255, 0, 89)" , "rgb(0,255,139)"] }}
                    transition={{ repeatType: "reverse", repeat: Infinity, ease: "easeInOut", duration: 2.5, times: [0, 0.5, 1.5, 2.5] }}
        >
            <Spin style={{ color: "inherit" }} indicator={<LoadingOutlined style={{ fontSize: "12rem", color: "inherit" }} spin />}  />
        </motion.div>
    )
}
