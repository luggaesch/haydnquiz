import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

export default function InputWaiting({ uploadRound }: { uploadRound: number }) {

    return (
        <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)", padding: 20, backgroundColor: "var(--question-item)", borderRadius: 12, width: "100%", maxWidth: 350, height: "50%",  gap: 30 }}>
                <Spin indicator={<LoadingOutlined style={{ fontSize: "12rem", color: "var(--accent)" }} spin />}  />
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", color: "white", fontSize: 24, textAlign: "center" }}>
                    <div style={{ fontWeight: "bold" }}>Round {uploadRound + 1}</div>
                    <div >Please wait until Upload is unlocked!</div>
                </div>
            </div>
        </div>
    )
}
