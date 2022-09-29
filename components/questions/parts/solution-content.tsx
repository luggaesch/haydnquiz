import Question, {QuestionTypes, SolutionTypes} from "../../../types/question";
import React from "react";
import styles from "../../../styles/index.module.css";
import Image from "next/image";
import {Lightbulb} from "@mui/icons-material";
import AudioPlayer from "./audio-player";

export default function SolutionContent({ question }: { question: Question }) {

    function getComponentByType() {
        switch (question.solutionType) {
            case SolutionTypes.Text:
                return <div>{question.solution}</div>
            case SolutionTypes.List:
                return question.solutionArray!.map((text, index) => <div key={index}>{text}</div>)
            case SolutionTypes.Image:
                return <div className={styles.imageWrap}><Image layout="fill" objectFit="contain" src={question.solution} alt=""/></div>
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column", alignItems: "center", height: "100%" }}>
            {question.type === QuestionTypes.Hearing && Number(question.media!.content) === 0 &&
                <AudioPlayer audio={Number(question.media!.content) + 1} onFinished={() => {}} />
            }
            <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: "50%", height: "88%", boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)", background: "#151515", borderRadius: 20, fontSize: "3.5em", padding: "10px 20px"  }}>
                <div style={{ position: "absolute", left: 10, top: 10 }} ><Lightbulb style={{ fontSize: "1.8em" }} /></div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", maxHeight: "100%", overflowY: "auto", width: "50%" }}>
                    {getComponentByType()}
                </div>
            </div>
        </div>
    )
}