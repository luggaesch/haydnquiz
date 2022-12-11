import {Assignment, Group, Smartphone, Topic} from "@mui/icons-material";
import strings from "../../assets/text/tutorial";
import {BiLaugh} from "react-icons/bi";
import {GiCardJoker} from "react-icons/gi";
import {BsSegmentedNav} from "react-icons/bs";
import {useState} from "react";
import Topics from "../../components/match/topics";
import PopupContainer from "../../components/questions/parts/popup-container";
import {Typography} from "@mui/material";

type Section = {
    icon: any,
    text: string,
    handler?: () => void
}



export default function Tutorial({ onSubmit }: { onSubmit: () => void }) {
    const [showOverlay, setShowOverlay] = useState(false);
    const sections: Section[] = [
        { icon: Group, text: strings.teams },
        { icon: Assignment, text: strings.questions },
        { icon: Topic, text: strings.topics, handler: () => setShowOverlay(true) },
        { icon: BsSegmentedNav, text: strings.blocks },
        { icon: GiCardJoker, text: strings.jokers },
        { icon: BiLaugh, text: strings.bonus },
        { icon: Smartphone, text: strings.phones },
    ]

    return (
        <div style={{ width: "100vw", height: "100vh", overflowY: "scroll", overflowX: "hidden" }}>
            <div style={{ width: "100vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px 20px", gap: 30, overflowY: "scroll" }}>
                <Typography style={{ fontSize: 64, color: "#bbb" }}>So funktionierts:</Typography>
                {sections.map((section, index) => {
                    const Icon = section.icon;
                    return (
                        <div key={index} style={{ gridTemplateRows: "1fr", padding: 30, width: "90%", color: "white", backgroundColor: "#282828", boxShadow: "var(--elevation-shadow)", height: "80vh", borderRadius: 8, display: "grid", gridTemplateColumns: index % 2 === 0 ? "1fr 5fr" : "5fr 1fr" }}>
                            <div style={{ gridRow: 1, gridColumn: index % 2 === 0 ? 1 : 2, height: "100%", display: "flex", justifyContent: "center", alignItems: "center", fontSize: 120 }}>
                                <div onClick={() => section.handler && section.handler()} style={{ color: "var(--accent)", cursor: section.handler ? "pointer" : "default", display: "flex", justifyContent: "center" ,alignItems: "center", borderRadius: "50%", width: 300, height: 300, border: "3px solid var(--accent" }}>
                                    <Icon style={{ fontSize: "inherit" }} />
                                </div>
                                <PopupContainer open={showOverlay} setOpen={setShowOverlay}>
                                    <Topics />
                                </PopupContainer>
                            </div>
                            <div style={{ gridRow: 1, gridColumn: index % 2 === 0 ? 2 : 1, padding: "10px 50px", fontSize: 60, width: "100%", height: "100%", display: "flex", alignItems: "center", textAlign: "center" }}>{section.text}</div>
                        </div>
                    )
                })}
                <div onClick={onSubmit} style={{ width: "50%", backgroundColor: "var(--accent)", borderRadius: 20, textAlign: "center", fontSize: 40, padding: 20, cursor: "pointer" }}>
                    Zur ersten Frage
                </div>
            </div>
        </div>
    )
}