import React, {useState} from "react";
import {Person, PersonAdd} from "@mui/icons-material";
import {Input} from "antd";

const teamColors = ["#d09151", "#5175d0", "#c855ef", "#64926e",
    "#d0b751", "#b2c3c0", "#d05151", "#51c5d0",
    "#51d053", "#7151d0", "#7adf3f", "#92aae6"];

export default function TeamInput({ onSubmit }: { onSubmit: (name: string, numOfMembers: number, color: string) => void }) {
    const [name, setName] = useState("");
    const [numOfMembers, setNumOfMembers] = useState(1);
    const [color] = useState(teamColors[Math.floor(Math.random() * teamColors.length)]);

    return (
        <div style={{ display: "grid", gridTemplateRows: "1fr 3fr 1fr", padding: 10, height: "100%" }}>
            <Input type={"text"} placeholder={"Name"} style={{ color: "var(--text)", fontSize: "1.5rem", width: "100%", backgroundColor: "transparent", margin: 0, border: "1px solid " + color, boxShadow: "none" }} value={name} onChange={(event) => setName(event.target.value)} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
                {[...Array(numOfMembers)].map((e, index) => (
                    <Person onClick={() => setNumOfMembers(numOfMembers - 1)} style={{ cursor: "pointer", fontSize: "4rem", color: color }} key={"p_" + index} />
                ))}
                {numOfMembers <= 7 && <div onClick={() => setNumOfMembers(numOfMembers + 1)} style={{ cursor: "pointer", fontSize: "4rem", backgroundColor: "transparent", color: `${color}80` }}>
                    <PersonAdd style={{ fontSize: "inherit" }} />
                </div>}
            </div>
            <div onClick={() => onSubmit(name, numOfMembers, color)} style={{ backgroundColor: "var(--accent)", color: "#222", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 12 }}>Submit</div>
        </div>
    )
}