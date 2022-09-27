import {Carousel, Progress} from "antd";
import {QRCodeCanvas} from "qrcode.react";
import Match from "../../types/match";
import 'antd/dist/antd.css';
import styles from "../../styles/question.module.css";
import axios from "axios";
import PopupContainer from "../questions/parts/popup-container";
import {useEffect, useMemo, useState} from "react";
import Link from "next/link";
import {LockOutlined, UnlockOutlined} from "@ant-design/icons";
import {Done} from "@mui/icons-material";
import LoadingOverlay from "./loading-overlay";


const contentStyle: React.CSSProperties = {
    height: '100vh',
    width: "100%",
    color: '#fff',
    lineHeight: '100vh',
    textAlign: 'center',
};

export default function QrCarousel({ match, uploadRound, onUploadFinished }: { match: Match, uploadRound: number, onUploadFinished: () => void }) {
    const [currentMatch, setCurrentMatch] = useState(match);
    const [uploadRunning, setUploadRunning] = useState(false);
    const [open, setOpen] = useState(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
    const targetQuestions = useMemo(() => {
        const startIndex = uploadRound === 0 ? 0 : currentMatch.quiz.stops[uploadRound - 1];
        const endIndex = uploadRound === currentMatch.quiz.stops.length ? currentMatch.quiz.questions.length : currentMatch.quiz.stops[uploadRound];
        return currentMatch.quiz.questions.slice(startIndex, endIndex).filter((q) => q.value !== -1);
    }, [currentMatch, uploadRound]);
    const [loading, setLoading] = useState(false);

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
        if (!uploadRunning) {
            setLoading(true);
            const res = await axios.post("/api/match/enableUpload", { matchId: match._id, uploadRound });
            setLoading(false);
            console.log(res);
            setUploadRunning(true);
        }
        setOpen(true);
    }

    async function closeRound() {
        setLoading(true);
        const res = await axios.post("/api/match/disableUpload", { matchId: match._id, uploadRound });
        setLoading(false);
        console.log(res);
        setOpen(false);
        setUploadRunning(false);
    }

    function calculateAnswerPercentage() {
        const currentAnswers = currentMatch.answers.filter((a) => targetQuestions.findIndex((q) => a.questionId === q._id) !== -1);
        return currentAnswers.length / (targetQuestions.length * currentMatch.teams.length);
    }

    return (
        <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
            {loading && <LoadingOverlay />}
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
            <div style={{ position: "absolute", right: 20, bottom: 20, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 10, textAlign: "center", fontSize: "2em" }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: 80, height: 80, backgroundColor: "var(--accent)", color: "#222", borderRadius: 40, cursor: "pointer", padding: 20 }} onClick={activateUploadRound}><UnlockOutlined /> </div>
                <div style={{ width: 80, height: 80, backgroundColor: calculateAnswerPercentage() === 1 ? "var(--accent)" : "var(--accent-negative)", color: calculateAnswerPercentage() === 1 ? "#222" : "white", borderRadius: 40, cursor: "pointer", padding: 20 }} onClick={() => onUploadFinished()}><Done /> </div>
            </div>
            <PopupContainer open={open} setOpen={setOpen}>
                <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <Progress showInfo={false} strokeColor={"var(--accent)"} trailColor={"var(--dark-background)"} strokeWidth={30} style={{ width: "70%" }} percent={calculateAnswerPercentage() * 100} />
                    <span onClick={closeRound} style={{ cursor: "pointer", position: "absolute", bottom: "10%", display: "flex", justifyContent: "center", alignItems: "center", width: 150, height: 150, backgroundColor: calculateAnswerPercentage() === 1 ? "var(--accent)" : "var(--accent-negative)", color: calculateAnswerPercentage() === 1 ? "#222" : "white", borderRadius: 20, fontSize: "3em", }}><LockOutlined /></span>
                </div>
            </PopupContainer>
        </div>
    )
}
