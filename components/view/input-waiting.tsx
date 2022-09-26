import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

export default function InputWaiting() {

    return (
        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <Spin indicator={<LoadingOutlined style={{ width: 200, height: 200, color: "var(--accent)" }} spin />}  />
            <div style={{ display: "flex", justifyContent: "center", color: "white", fontSize: 20, marginTop: 20 }}>Please wait until Upload is opened.</div>
        </div>
    )
}
