import {InputNumber} from "antd";
import SolutionContent from "./solution-content";
import React, {useMemo, useState} from "react";
import Team from "../../../types/team";
import Answer from "../../../types/answer";
import Question from "../../../types/questions";
import {Done} from "@mui/icons-material";
import CoverOverlay from "../../view/cover-overlay";
import Joker, {Jokers} from "../../../types/joker";
import {getIconByJoker} from "../../../data/jokers";
import {BsEyeglasses} from "react-icons/bs";

export type Credit = {
    id: string,
    points: number
}

export default function CreditDistribution({ teams, answers, currentJokers, question, onFinished }: { teams: Team[], answers: Answer[], currentJokers: Joker[], question: Question, onFinished: (credits: Credit[]) => void }) {
    const [credits, setCredits] = useState<Credit[]>(teams ? teams.map((t) =>
        ({ id: t._id!, points:
                answers.find((a) => a.teamId === t._id!)?.points ?? 0
        }
        ))
        : []
    );
    const listFontSize = useMemo(() => {
        return 38 - teams.length/3;
    }, [teams]);

    function updateCredits(teamId: string, value: number) {
        const credit = credits.find((c) => c.id === teamId);
        const team = teams.find((team) => team._id === teamId);
        if (credit) {
            const joker = currentJokers.find((j) => j.teamId === teamId);
            credit.points = value;
            if (joker) {
                switch (joker.name) {
                    case Jokers.VierGewinnt:
                        credit.points = value === question.value / 2 ? question.value : value;
                        break;
                    case Jokers.DoubleDown:
                        credit.points = value === question.value ? question.value * 2 : value;
                        break;
                }
            }

            setCredits([...credits]);
        }
    }

    function isBest(points: number, team: Team) {
        if (team && team.selectedTopic && team.selectedTopic === question.topic) {
            return points === Math.max(...credits.map((credit) => credit.points));
        }
        return false;
    }

    function getMaxPoints(joker: Joker | undefined, points: number, team: Team) {
        let max = question.value;
        if (joker && joker.name === Jokers.DoubleDown) max *= 2;
        if (isBest(points, team)) max += 1;
        return max;
    }

    function handleDoneClick() {
        onFinished(credits);
    }

    function getJokerIndicator(joker: Joker, color: string) {
        switch (joker.name) {
            case Jokers.VierGewinnt: case Jokers.DoubleDown: return getIconByJoker(joker.name, color, 24, 24);
        }
        return <></>;
    }

    return (
        <div style={{ position: "relative", width: "100%", height: "100%", color: "var(--text)", display: "grid", gridTemplateRows: "1fr 1fr", gridGap: 5, padding: 5 }}>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${teams.length}, 1fr)`, gridGap: 5, alignItems: "center" }}>
                {teams.map((team) => {
                    const answer = answers.find((a) => a.teamId === team._id);
                    const joker = currentJokers.find((j) => j.teamId === team._id);
                    const points = credits.find((c) => c.id === team._id)?.points!;
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
                                    {joker && getJokerIndicator(joker, team.color)}
                                    {team.selectedTopic === question.topic && <BsEyeglasses style={{ width: 24, height: 24, color: team.color }} />}
                                    <InputNumber step={0.25} min={0} max={getMaxPoints(joker, points, team)} style={{ textAlign: "center", border: "none", borderBottom: "1px solid #fff", fontSize: "1.7rem", color: "var(--text)", width: "30%", backgroundColor: "transparent", margin: 0, boxShadow: "none" }}
                                                 value={points}
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