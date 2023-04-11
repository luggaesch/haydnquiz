import React, {Dispatch, SetStateAction} from "react";
import {useSwiper} from "swiper/react";
import {Input} from "antd";
import {ChevronRight} from "@mui/icons-material";

export default function Players({ memberNames, setMemberNames }: { memberNames: string[], setMemberNames: Dispatch<SetStateAction<string[]>> }) {
    const swiper = useSwiper();

    return (
        <div style={{ position: "relative", overflowY: "auto", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p style={{ marginTop: 18, width: "100%", textAlign: "left", fontSize: 11, color: "#bbb" }}>Spieler*innen</p>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
                {memberNames.map((m, index) => (
                    <Input style={{ background: "transparent", color: "white", width: "100%" }} key={index} placeholder={memberNames.length === 1 ? "Dein Name" : "Mitglied " + (index + 1)} value={m} onChange={(event) => setMemberNames([...memberNames.slice(0, index), event.target.value, ...memberNames.slice(index + 1)] )} />
                ))}
            </div>
            {memberNames.findIndex((b) => b === "") === -1 && <div onClick={() => swiper.slideNext()} style={{ cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "var(--elevation-shadow)", position: "absolute", bottom: 10, right: 0, width: 50, height: 50, backgroundColor: "#303030", borderRadius: "50%" }}>
                <ChevronRight style={{ color: "var(--accent)" }} />
            </div>}
        </div>
    )
}