import {GetServerSideProps} from "next";
import connectMongo from "../../lib/db/connectMongo";
import Quiz from "../../types/quiz";
import axios from "axios";
import MetaContainer from "../../components/view/meta-container";
import styles from "../../styles/question.module.css";
import React from "react";

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
            <p style={{ margin: 0 }}>{quiz.name}</p>
            <div style={{ display: "grid", gridGap: 10, gridAutoFlow: "column", overflow: "auto", padding: 20 }}>
                {quiz.questions.map((question) => {
                    return (
                        <div key={question._id} style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 3fr", gridGap: 10, borderRadius: 8, minWidth: 320, minHeight: 180, boxShadow: "0 3px 6px rgba(0,0,0,0.19), 0 2px 2px rgba(0,0,0,0.23)" }}>
                            <MetaContainer orientation={"column"} topic={question.topic} type={question.type} value={question.value} />
                            <div style={{ height: "100%", backgroundColor: "white", color: "#111", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <p>{question.caption}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}