import Question, {QuestionTypes, SolutionTypes} from "../../../types/questions";
import React from "react";
import styles from "../../../styles/index.module.css";
import Image from "next/image";
import {Lightbulb} from "@mui/icons-material";
import CoverOverlay from "../../view/cover-overlay";

export default function SolutionContent({ question }: { question: Question }) {

    function getComponentByType() {
        switch (question.solutionType) {
            case SolutionTypes.Text:
                return <div>{question.type === QuestionTypes.Choice && question.choices ? question.choices[Number.parseInt(question.solution)] : question.solution}</div>
            case SolutionTypes.List:
                return question.solutionArray!.map((text, index) => <div style={{ fontSize: "1em" }} key={index}>{text}</div>)
            case SolutionTypes.Image:
                return <div className={styles.imageWrap}><Image layout="fill" objectFit="contain" src={question.solution} alt=""/></div>
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center", height: "100%", maxHeight: 560, gap: 10 }}>
            <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: "50%", height: "100%", boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)", background: "#151515", borderRadius: 20, fontSize: "3.5em", padding: "10px 20px"  }}>
                <div className={styles.metaItem} style={{ position: "absolute", top: "50%", left: 0, transform: "translateX(-120%) translateY(-50%)" }}>{question.value}</div>
                <CoverOverlay />
                <div style={{ position: "absolute", left: 10, top: 10 }} ><Lightbulb style={{ fontSize: "1.8em" }} /></div>
                <div style={{ flexWrap: "wrap", overflowY: "scroll", fontSize: "1.2em", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: question.solutionType === SolutionTypes.Image ? "100%" : "fit-content", maxHeight: "100%", width: "100%" }}>
                    {getComponentByType()}
                </div>
            </div>
        </div>
    )
}