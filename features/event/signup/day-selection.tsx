import React, {Dispatch, SetStateAction, useState} from "react";
import {Check} from "@mui/icons-material";

export default function DaySelection({ days, selectedDays, setSelectedDays, isSolo, onSubmit }: { days: string[], selectedDays: string[], setSelectedDays: Dispatch<SetStateAction<string[]>>, isSolo?: boolean, onSubmit: () => void }) {
    const [noneSelected, setNoneSelected] = useState(false);

    return (
        <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p style={{ marginTop: 18, width: "100%", textAlign: "left", fontSize: 11, color: "#bbb" }}>{isSolo ? "Wann hast du Zeit?" : "Wann habt ihr Zeit?"}</p>
            <div style={{ width: "100%", overflowY: "auto", maxHeight: "80%", display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                {days.map((d, index) => (
                    <div onClick={() => {
                        if (selectedDays.includes(d)) {
                            const s = [...selectedDays];
                            s.splice(selectedDays.findIndex((el) => el === d), 1);
                            setSelectedDays(s);
                        } else {
                            setSelectedDays([...selectedDays, d]);
                            setNoneSelected(false);
                        }
                    }
                    } style={{ fontSize: 12, backgroundColor: selectedDays.includes(d) ? "var(--accent)" : "transparent", width: "50%", padding: 10, color: selectedDays.includes(d) ? "#111" : "white", borderRadius: 4, border: selectedDays.includes(d) ? "1px solid transparent" : "1px solid white", cursor: "pointer" }} key={index}>
                        {new Date(Date.parse(d)).toLocaleDateString("de-DE", { day: "numeric", month: "long" })}
                    </div>
                ))}
                <div onClick={() => {
                    setSelectedDays([]);
                    setNoneSelected(!noneSelected);
                }} style={{ fontSize: 12, backgroundColor: noneSelected ? "var(--accent)" : "transparent", width: "50%", padding: 10, color: noneSelected ? "#111" : "white", borderRadius: 4, border: noneSelected ? "1px solid transparent" : "1px solid white", cursor: "pointer" }}>
                    An keinem der Termine
                </div>
            </div>
            {(noneSelected || selectedDays.length > 0) && <div onClick={onSubmit} style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "var(--elevation-shadow)",
                position: "absolute",
                bottom: 10,
                right: 0,
                width: 50,
                height: 50,
                backgroundColor: "#303030",
                borderRadius: "50%"
            }}>
                <Check style={{color: "var(--accent)"}}/>
            </div>}
        </div>
    )
}