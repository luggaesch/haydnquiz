import Question from "../../types/questions";
import MetaContainer from "../../components/questions/parts/meta-container";
import React, {useState} from "react";
import QuestionWrapper from "./index";
import {DeleteOutline, EditOutlined, StopOutlined} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {BsChevronDown, BsChevronUp} from "react-icons/bs";

export default function CollapsableQuestion({ question, index, fontSize, height, isStop, onSetEdit, onSetOpen, onUpdateStops, onDelete }: { question: Question, index: number, fontSize?: number, height?: number, isStop: boolean, onSetEdit: (question: Question) => void, onSetOpen: (value: boolean) => void, onUpdateStops: (index: number) => void, onDelete: (id: string) => void }) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <div style={{ height: height ?? isCollapsed ? 170 : 500, width: "100%" }}
        >
            {isCollapsed ?
            <CollapsedQuestion toggleCollapse={() => setIsCollapsed(!isCollapsed)} question={question} isStop={isStop} />
            :
            <div style={{  borderLeft: "2px solid #333", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexDirection: "row" }}>
                <QuestionWrapper question={question} hideTimer={true} hideOverlay={true} />
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 10, height: "100%" }}>
                    <div onClick={() => {
                        onSetEdit(question);
                        onSetOpen(true);
                    }} style={{ display: "flex", width: 100, height: 100, justifyContent: "center", alignItems: "center", backgroundColor: "var(--question-item)", borderRadius: "50%", boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)" }}>
                        <EditOutlined />
                    </div>
                    {index !== 0 && <div onClick={() => onUpdateStops(index)} style={{ width: 100, height: 100, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: isStop ? "var(--accent-negative)" : "var(--question-item)", borderRadius: "50%", boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)" }}>
                        <StopOutlined />
                    </div>}
                    <div onClick={() => onDelete(question._id!)} style={{ width: 100, height: 100, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "var(--question-item)", borderRadius: "50%", boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)" }}>
                        <DeleteOutline />
                    </div>
                    <IconButton style={{ width: 100, height: 100, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "var(--question-item)", borderRadius: "50%", boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)", color: "white" }} onClick={() => setIsCollapsed(true)}>
                        <BsChevronUp />
                    </IconButton>
                </div>
            </div>}
        </div>
    )
}

export function CollapsedQuestion({ question, isStop, toggleCollapse }: { question: Question, isStop: boolean, toggleCollapse: () => void }) {

    return (
        <div style={{ height: "100%", width: "100%", display: "grid", gridTemplateColumns: "1fr 10fr 1.5fr", fontSize: 5, backgroundColor: "#222", borderRadius: 8 }}>
            <MetaContainer question={question} />
            <div style={{ fontSize: 16, height: "100%", display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>{question.caption}</div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                <div style={{ visibility: isStop ? "visible" : "hidden", cursor: "default", display: "flex", justifyContent: "center", alignItems: "center", color: "var(--accent-negative)" }}>
                    <StopOutlined />
                </div>
                <IconButton style={{ color: "white" }} onClick={toggleCollapse}>
                    <BsChevronDown />
                </IconButton>
            </div>
        </div>
    )
}