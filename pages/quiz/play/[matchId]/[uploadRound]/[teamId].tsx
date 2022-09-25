import {GetServerSideProps} from "next";
import axios from "axios";
import React, {useEffect, useMemo, useState} from "react";
import {Input} from "@mui/material";
import MetaContainer from "../../../../../components/questions/parts/meta-container";
import Match from "../../../../../types/match";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { uploadRound, teamId, matchId } = context.query;
    const result = await axios.get(`${process.env.SERVER_URL}/api/match/fetchById/` + matchId);
    return {
        props: { match: JSON.parse(JSON.stringify(result.data)), uploadRound: Number(uploadRound), teamId }
    }
}

export default function AnswerInput({ match, uploadRound, teamId }: { match: Match, uploadRound: number, teamId: string }) {
    const [currentMatch, setCurrentMatch] = useState(match);
    const questions = useMemo(() => {
        const startIndex = uploadRound === 0 ? 0 : currentMatch.quiz.stops[uploadRound - 1];
        const endIndex = currentMatch.quiz.stops[uploadRound];
        return currentMatch.quiz.questions.slice(startIndex, endIndex).filter((q) => q.value !== -1);
    }, [currentMatch, uploadRound]);
    const [values, setValues] = useState<Array<string[]>>(questions.map((q) => {
        if (q.solutionArray && q.solutionArray.length > 0) {
            return q.solutionArray.map((s) => "");
        }
        return [""]
    }));
    const inputOpen = useMemo(() => {
        return currentMatch.currentlyOpenUploadRound === uploadRound;
    }, [currentMatch, uploadRound]);
    const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);

    useEffect(() => {
        if (!inputOpen) {
            if (!intervalId) {
                const id = setInterval(async () => {
                    const res = await axios.get(`/api/match/fetchById/` + currentMatch._id);
                    const match = res.data as Match;
                    if (match.currentlyOpenUploadRound !== currentMatch.currentlyOpenUploadRound) {
                        setCurrentMatch(match);
                    }
                }, 1000);
                setIntervalId(id);
            }
        } else {
            if (intervalId) clearInterval(intervalId);
        }
    }, [inputOpen]);

    if (currentMatch.pastUploadRounds.includes(uploadRound)) return <div style={{ color: "white" }}>This round is already closed.</div>
    if (!inputOpen) return <div style={{ color: "white" }}>Please wait until Input is opened.</div>

    function handleValueChanged(nextValue: string, index: number, innerIndex?: number) {
        values[index][innerIndex || 0] = nextValue;
        setValues([...values]);
    }

    function handleSubmit() {
        values.forEach((v, index) => {
            const i = currentMatch.answers.findIndex((a) => a.teamId === teamId && a.questionId === questions[index]._id);
            if (i !== -1) {
                currentMatch.answers[i].values = v;
            } else {
                currentMatch.answers.push({ teamId, questionId: questions[index]._id!, values: v });
            }
        });
        axios.post("/api/match/update", { match: currentMatch }).then((res) => console.log(res));
    }

    return (
        <div style={{ padding: 20, width: "100vw", color: "var(--text)", display: "flex", flexDirection: "column" }}>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", fontSize: 24, marginBottom: "0.5em" }}>Team {currentMatch.teams.find((t) => t._id === teamId)?.name}, Round: {uploadRound + 1}</div>
            <div style={{ width: "100%", display: "grid", gridAutoRows: 500, gridGap: "1em" }}>
                {questions.map((q, index) => (
                    <div key={index} style={{ display: "grid", gridTemplateRows: "1fr 5fr", backgroundColor: "var(--question-item)", fontSize: 8, borderRadius: 12, boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)" }}>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "3em" }}>{match.quiz.questions.findIndex((e) => e._id === q._id) + 1}. {q.caption}</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 8fr", fontSize: 6 }}>
                            <MetaContainer question={q} />
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0 5vw" }}>
                                {!q.solutionArray || q.solutionArray.length === 0 ?
                                    <Input style={{ width: "100%", color: "var(--text)", fontSize: "5em", borderBottom: "1px solid var(--text)" }} value={values[index][0]}
                                           onChange={(event) => handleValueChanged(event.target.value, index)}/>
                                    :
                                    <div key={q._id} style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                        {q.solutionArray.map((s, innerIndex) => (
                                            <Input style={{ color: "var(--text)", fontSize: "5em", borderBottom: "1px solid var(--text)" }} key={q._id + "_" + innerIndex} value={values[index][innerIndex]}
                                                   onChange={(event) => handleValueChanged(event.target.value, index, innerIndex)}/>
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ margin: "3vh 0", color: "#111", height: 60, width: "100%", borderRadius: 20, backgroundColor: "var(--accent)", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "2em", cursor: "pointer" }} onClick={handleSubmit}>Submit</div>
        </div>
    )
}
