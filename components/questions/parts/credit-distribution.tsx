import {InputNumber} from "antd";
import SolutionContent from "./solution-content";
import React, {useMemo, useState} from "react";
import Team from "../../../types/team";
import Answer from "../../../types/answer";
import Question from "../../../types/question";
import {Done} from "@mui/icons-material";
import CoverOverlay from "../../view/cover-overlay";

export type Credit = {
    id: string,
    points: number
}

export default function CreditDistribution({ teams, answers, question, onFinished }: { teams: Team[], answers: Answer[], question: Question, onFinished: (credits: Credit[]) => void }) {
    const [credits, setCredits] = useState<Credit[]>(teams ? teams.map((t) => ({ id: t._id!, points: 0 })) : []);
    const listFontSize = useMemo(() => {
        return 38 - teams.length/3;
    }, [teams]);

    function updateCredits(teamId: string, value: number) {
        const credit = credits.find((c) => c.id === teamId);
        if (credit) {
            credit.points = value;
            setCredits([...credits]);
        }
    }

    function handleDoneClick() {
        onFinished(credits);
    }

    return (
        <div style={{ position: "relative", width: "100%", height: "100%", color: "var(--text)", display: "grid", gridTemplateRows: "55% 55%", gridGap: 5, padding: 5 }}>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${teams.length}, 1fr)`, gridGap: 5, alignItems: "center" }}>
                {teams.map((team) => {
                    const answer = answers.find((a) => a.teamId === team._id);
                    return (
                        <div key={team._id} style={{ height: "100%", width: "100%", fontSize: "3.5em", display: "grid", gridTemplateRows: "0.3fr 5fr 0.5fr"  }}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", fontSize: "0.3em" }}>
                                {team.name}
                            </div>
                            <div style={{ position: "relative", width: "100%", maxHeight: "100%", boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)", background: "#151515", borderRadius: 20, border: `3px dashed ${team.color}80`,  display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", overflow: "auto" }}>
                                <CoverOverlay />
                                {answer?.values.map((v, index, list) => (
                                        <div style={{ fontSize: listFontSize - list.length/3 }} key={index} >{v}</div>
                                ))}
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", width: "100%", fontSize: "1.5rem", gap: 10 }}>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", width: "100%", fontSize: "1.5rem", gap: 10 }}>
                                    <InputNumber step={0.25} min={0} max={question.value} style={{ textAlign: "center", border: "none", borderBottom: "1px solid #fff", fontSize: "1.7rem", color: "var(--text)", width: "30%", backgroundColor: "transparent", margin: 0, boxShadow: "none" }}
                                                 value={credits.find((c) => c.id === team._id)?.points}
                                                 onChange={(value) => updateCredits(team._id!, Number(value))} />
                                    <div>Points</div>
                                </div>
                            </div>
                        </div>
                    )}
                )}
            </div>
            <SolutionContent question={question} />
            <div style={{ boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)", position: "absolute", right: 20, bottom: 20, display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "3rem", width: 120, height: 120, backgroundColor: "var(--accent)", color: "#222", borderRadius: "50%", cursor: "pointer", padding: 20 }} onClick={handleDoneClick}><Done fontSize={"inherit"} /> </div>
        </div>
    )
}