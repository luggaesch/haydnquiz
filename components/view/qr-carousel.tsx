import {Carousel, Progress} from "antd";
import {QRCodeCanvas} from "qrcode.react";
import Match from "../../types/match";
import 'antd/dist/antd.css';
import styles from "../../styles/question.module.css";
import axios from "axios";
import PopupContainer from "../questions/parts/popup-container";
import {useEffect, useMemo, useState} from "react";
import Link from "next/link";


const contentStyle: React.CSSProperties = {
    height: '100vh',
    width: "100%",
    color: '#fff',
    lineHeight: '100vh',
    textAlign: 'center',
};

export default function QrCarousel({ match, uploadRound, setShowAnswerInput }: { match: Match, uploadRound: number, setShowAnswerInput: (value: boolean) => void }) {
    const [currentMatch, setCurrentMatch] = useState(match);
    const [uploadRunning, setUploadRunning] = useState(false);
    const [open, setOpen] = useState(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
    const targetQuestions = useMemo(() => {
        const startIndex = uploadRound === 0 ? 0 : currentMatch.quiz.stops[uploadRound - 1];
        const endIndex = currentMatch.quiz.stops[uploadRound];
        return currentMatch.quiz.questions.slice(startIndex, endIndex).filter((q) => q.value !== -1);
    }, [currentMatch, uploadRound]);

    useEffect(() => {
        if (uploadRunning) {
            if (!intervalId) {
                const id = setInterval(async () => {
                    const res = await axios.get(`/api/match/fetchById/` + currentMatch._id);
                    const match = res.data as Match;
                    console.log(match);
                    if (match.answers.length !== currentMatch.answers.length) {
                        setCurrentMatch(match);
                    }
                }, 3000);
                setIntervalId(id);
            }
        } else {
            intervalId && clearInterval(intervalId);
        }
    }, [uploadRunning])

    async function activateUploadRound() {
        const res = await axios.post("/api/match/enableUpload", { matchId: match._id, uploadRound });
        console.log(res);
        setOpen(true);
        setUploadRunning(true);
    }

    async function closeRound() {
        const res = await axios.post("/api/match/disableUpload", { matchId: match._id, uploadRound });
        console.log(res);
        setOpen(false);
        setUploadRunning(false);
    }

    function calculateAnswerPercentage() {
        const currentAnswers = currentMatch.answers.filter((a) => targetQuestions.findIndex((q) => a.questionId === q._id) !== -1);
        return currentAnswers.length / (targetQuestions.length * currentMatch.teams.length);
    }

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <Carousel dots={{className: styles.dots}}>
                {match.teams.map((team, index) => {
                    return (
                        <div key={index}>
                            <div style={contentStyle}>
                                <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Link href={`http://${process.env.NEXT_PUBLIC_IP_ADDR}:3000/quiz/play/${match._id}/${uploadRound}/${team._id}`}>
                                        <a>
                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", border: `2px dashed ${team.color}`, borderRadius: 8, padding: 100 }}>
                                                <QRCodeCanvas style={{ border: "20px solid white" }} size={512} value={`http://${process.env.NEXT_PUBLIC_IP_ADDR}:3000/quiz/play/${match._id}/${uploadRound}/${team._id}`} />
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </Carousel>
            <div style={{ width: "100%", position: "absolute", bottom: 20, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 20, textAlign: "center", fontSize: "2em" }}>
                <div style={{ width: "25%", backgroundColor: "var(--accent)", color: "#222", borderRadius: 40, cursor: "pointer", padding: 20 }} onClick={activateUploadRound}>Unlock Upload</div>
                <div style={{ width: "25%", backgroundColor: calculateAnswerPercentage() === 1 ? "var(--accent)" : "var(--accent-negative)", color: calculateAnswerPercentage() === 1 ? "#222" : "white", borderRadius: 40, cursor: "pointer", padding: 20 }} onClick={() => setShowAnswerInput(false)}>Done</div>
            </div>
            <PopupContainer open={open} setOpen={setOpen}>
                <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <Progress showInfo={false} strokeColor={"var(--accent)"} trailColor={"var(--dark-background)"} strokeWidth={30} style={{ width: "70%" }} percent={calculateAnswerPercentage() * 100} />
                    <span onClick={closeRound} style={{ position: "absolute", bottom: "10%", display: "flex", justifyContent: "center", alignItems: "center", width: "50%", height: 100, backgroundColor: "#111", borderRadius: 20, border: "2px dashed var(--accent)", color: "var(--accent)", fontSize: "3em", }}>Close Input</span>
                </div>
            </PopupContainer>
        </div>
    )
}
