import Question, {QuestionTypes, SolutionTypes} from "../../../types/questions";
import React from "react";
import styles from "../../../styles/index.module.css";
import Image from "next/image";
import {Lightbulb} from "@mui/icons-material";
import AudioPlayer from "./audio-player";
import CoverOverlay from "../../view/cover-overlay";
import MediaQuestion from "../../../types/questions/media-question";

export default function SolutionContent({ question }: { question: Question }) {

    function getComponentByType() {
        switch (question.solutionType) {
            case SolutionTypes.Text:
                return <div>{question.type === QuestionTypes.Choice && question.choices ? question.choices[Number.parseInt(question.solution)] : question.solution}</div>
            case SolutionTypes.List:
                return question.solutionArray!.map((text, index) => <div style={{ fontSize: "0.5em" }} key={index}>{text}</div>)
            case SolutionTypes.Image:
                return <div className={styles.imageWrap}><Image layout="fill" objectFit="contain" src={question.solution} alt=""/></div>
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center", height: "100%", gap: 10 }}>
            {question.type === QuestionTypes.Hearing &&
                <AudioPlayer audio={(question as MediaQuestion).media.content!} onFinished={() => {}} />
            }
            <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: "50%", height: "100%", boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)", background: "#151515", borderRadius: 20, fontSize: "3.5em", padding: "10px 20px"  }}>
                <CoverOverlay />
                <div style={{ position: "absolute", left: 10, top: 10 }} ><Lightbulb style={{ fontSize: "1.8em" }} /></div>
                <div style={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: question.solutionType === SolutionTypes.Image ? "100%" : "fit-content", maxHeight: "100%", overflowY: "auto", width: "100%" }}>
                    {getComponentByType()}
                </div>
            </div>
        </div>
    )
}