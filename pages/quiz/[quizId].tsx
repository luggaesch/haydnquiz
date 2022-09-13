import {GetServerSideProps} from "next";
import connectMongo from "../../lib/db/connectMongo";
import Quiz from "../../types/quiz";
import axios from "axios";
import MetaContainer from "../../components/view/meta-container";
import styles from "../../styles/question.module.css";
import React from "react";
import Question from "../../types/question";
import {getColorByTopic, getIconByTopic} from "../../data/topics";
import {IconButton} from "@mui/material";
import {Add, Edit, PlayCircle} from "@mui/icons-material";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
    await connectMongo;
    const { quizId } = context.query;
    const res = await axios.get(`${process.env.SERVER_URL}/api/quiz/${quizId}`);
    const quiz = res.data;

    return {
        props: { quiz: JSON.parse(JSON.stringify(quiz)) }
    }
}

export default function QuizPage({ quiz }: { quiz: Quiz }) {
    console.log(quiz);

    return (
        <div style={{ background: "#222", color: "white", height: "100vh", width: "100vw", margin: 0 }}>
            <div style={{ padding: 10 }}>
                <p style={{ margin: 0, fontSize: "4rem" }}>{quiz.name}</p>
            </div>
            <div style={{ position: "absolute", bottom: 10, gridAutoFlow: "column", overflow: "auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gridGap: 10, padding: 10 }}>
                <Link href={"/quiz/question/add"}>
                    <a style={{ border: "1px dashed white", fontSize: "3rem", color: "white", width: "60vh", maxWidth: "60vh", minWidth: "60vh", height: "40vh", borderRadius: 8, cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Add fontSize="inherit" />
                    </a>
                </Link>
                {quiz.questions.map((question) => {
                    return (
                        <div key={question._id} style={{ background: "#333", color: "white", width: "60vh", maxWidth: "60vh", minWidth: "60vh", position: "relative", padding: 20, boxShadow: "0 3px 6px rgba(0,0,0,0.19), 0 2px 2px rgba(0,0,0,0.23)", height: "40vh", borderRadius: 8, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <span style={{ fontSize: "3rem", color: "white" }}>{question.topic}</span>
                            <span>{question.type}</span>
                            <span>{question.value}</span>
                            <span>{question.caption}</span>
                            <div style={{ display: "flex", flexDirection: "row", position: "absolute", bottom: 10 }}>
                                <IconButton style={{ fontSize: "4rem" }} onClick={async () => {}}>
                                    <PlayCircle fontSize="inherit" />
                                </IconButton>
                                <Link href={`/quiz/${quiz._id}`}>
                                    <a>
                                        <IconButton style={{ fontSize: "4rem" }}>
                                            <Edit fontSize="inherit" />
                                        </IconButton>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
