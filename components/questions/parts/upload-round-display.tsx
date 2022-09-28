import {Carousel, Progress} from "antd";
import {QRCodeCanvas} from "qrcode.react";
import 'antd/dist/antd.css';
import styles from "../../../styles/question.module.css";
import PopupContainer from "./popup-container";
import {CSSProperties, useMemo, useState} from "react";
import Link from "next/link";
import {LockOutlined, UnlockOutlined} from "@ant-design/icons";
import {Done} from "@mui/icons-material";
import LoadingOverlay from "../../view/loading-overlay";
import {useGameContext} from "../../../contexts/GameContext";
import { motion } from "framer-motion";


const contentStyle: CSSProperties = {
    height: '100vh',
    width: "100%",
    color: '#fff',
    lineHeight: '100vh',
    textAlign: 'center',
};

export default function UploadRoundDisplay({ onUploadFinished }: { onUploadFinished: () => void }) {
    const { match, targetUploadRound, loading, unlockUploadRound, lockUploadRound } = useGameContext();
    const [open, setOpen] = useState(false);
    const targetQuestions = useMemo(() => {
        const startIndex = targetUploadRound === 0 ? 0 : match.quiz.stops[targetUploadRound - 1];
        const endIndex = targetUploadRound === match.quiz.stops.length ? match.quiz.questions.length : match.quiz.stops[targetUploadRound];
        return match.quiz.questions.slice(startIndex, endIndex).filter((q) => q.value !== -1);
    }, [match, targetUploadRound]);

    async function activateUploadRound() {
        unlockUploadRound();
        setOpen(true);
    }

    async function closeRound() {
        lockUploadRound();
        setOpen(false);
    }

    function calculateAnswerPercentage() {
        const currentAnswers = match.answers.filter((a) => targetQuestions.findIndex((q) => a.questionId === q._id) !== -1);
        return currentAnswers.length / (targetQuestions.length * match.teams.length);
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, repeat: 0 }} exit={{ opacity: 0 }}  style={{ position: "relative", width: "100vw", height: "100vh" }}>
            {loading && <LoadingOverlay />}
            <Carousel dots={{className: styles.dots}}>
                {match.teams.map((team, index) => {
                    return (
                        <div key={index}>
                            <div style={contentStyle}>
                                <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Link href={`${process.env.NEXT_PUBLIC_IP_ADDR + ":3000" || location?.origin}/quiz/play/${match._id}/${targetUploadRound}/${team._id}`}>
                                        <a>
                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", border: `2px dashed ${team.color}`, borderRadius: 8, padding: 100 }}>
                                                {<QRCodeCanvas style={{ border: "20px solid white" }} size={512} value={`${process.env.NEXT_PUBLIC_IP_ADDR + ":3000" || location?.origin}/quiz/play/${match._id}/${targetUploadRound}/${team._id}`} />}
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
        </motion.div>
    )
}
