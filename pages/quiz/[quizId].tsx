import {GetServerSideProps} from "next";
import connectMongo from "../../lib/db/connectMongo";
import Quiz from "../../types/quiz";
import axios from "axios";
import React, {useState} from "react";
import {Close, DeleteOutline, EditOutlined, Stop, StopOutlined} from "@mui/icons-material";
import QuestionWrapper from "../../components/questions/wrapper";
import {FaPlus} from "react-icons/fa";
import PopupContainer from "../../components/questions/parts/popup-container";
import QuestionForm from "../../components/dashboard/question-form";
import Question from "../../types/question";

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
    const [currentQuiz, setCurrentQuiz] = useState(quiz);
    const [questionToEdit, setQuestionToEdit] = useState<Question | undefined>(undefined);
    const [stops, setStops] = useState<string[]>([]);
    const [open, setOpen] = useState(false);

    async function addQuestion(question: Question) {
        const res = await axios.post(`/api/quiz/${quiz._id}/addQuestion`, {question});
        console.log(res);
        if (res.status === 200) {
            setCurrentQuiz(res.data);
            setOpen(false);
        }
    }

    async function deleteQuestion(questionId: string) {
        const res = await axios.post(`/api/quiz/${quiz._id}/deleteQuestion`, { questionId });
        console.log(res);
        if (res.status === 200) {
            setCurrentQuiz(res.data);
        }
    }

    // TODO: Stops to DB, Drag and Drop Question Order, Fix Editing and add update API

    return (
        <div style={{ position: "relative", color: "var(--text)", height: "100vh", width: "100vw", margin: 0}}>
            <div style={{ position: "absolute", top: "1em", left: "2em", width: "30em", display: "grid", gridTemplateColumns: "1fr 4fr", gridGap: 10 }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "var(--accent)", color: "#222", borderRadius: "50%", boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)" }}><Close /></div>
                <div style={{ display: "flex", justifyContent: "center", padding: 10, backgroundColor: "var(--question-item)", borderRadius: 40, margin: 0, fontSize: "2.5em", boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)" }}>{quiz.name}</div>
            </div>
            <div style={{ height: "100%", width: "100%", display: "grid", gridTemplateRows: "1fr", gridTemplateColumns: "1fr 2fr", overflowY: "hidden" }}>
                <div style={{ backgroundColor: "var(--dark-paper)", boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)", paddingTop: 150 }}>
                    <div>Stops: {stops.map((s) => s)}</div>
                </div>
                <div style={{ alignItems: "center", gridRowStart: 1, gridRowEnd: 3, gridColumn: 2, display: "grid", gridAutoRows: 500, padding: 10, overflowY: "auto" }}>
                    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
                        <div onClick={() => setOpen(true)} style={{ height: "100%", width: "50%", border: "2px dashed var(--text)", borderRadius: 12, display: "flex", justifyContent: "center", alignItems: "center", fontSize: "2em" }}>
                            <FaPlus />
                        </div>
                    </div>
                    {currentQuiz.questions.map((question, index) => (
                        <div key={index} style={{ borderBottom: "2px solid #333", display: "grid", gridTemplateColumns: "7fr 1fr", height: "100%", padding: 10 }}>
                            <QuestionWrapper question={question} fontSize={12} hideTimer={true} hideOverlay={true} />
                            <div style={{ borderLeft: "2px solid #333", display: "flex", alignItems: "center", justifyContent: "space-evenly", flexDirection: "column" }}>
                                <div onClick={() => {
                                    setQuestionToEdit(question);
                                    setOpen(true);
                                }} style={{ width: 100, height: 100, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "var(--question-item)", borderRadius: "50%", boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)" }}>
                                    <EditOutlined />
                                </div>
                                <div onClick={() => {
                                    if (!stops.includes(question._id!)) {
                                        setStops([...stops, question._id!])
                                    } else {
                                        setStops([...stops.filter((s) => s !== question._id)])
                                    }
                                }} style={{ width: 100, height: 100, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: stops.includes(question._id!) ? "var(--accent-negative)" : "var(--question-item)", borderRadius: "50%", boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)" }}>
                                    <StopOutlined />
                                </div>
                                <div onClick={() => deleteQuestion(question._id!)} style={{ width: 100, height: 100, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "var(--question-item)", borderRadius: "50%", boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)" }}>
                                    <DeleteOutline />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <PopupContainer open={open} setOpen={setOpen}>
                    <QuestionForm question={questionToEdit} addQuestion={addQuestion} />
                </PopupContainer>
            </div>
            {/*<div style={{ position: "absolute", bottom: 10, display: "grid", gridAutoFlow: "column", overflow: "auto", width: "100%", whiteSpace: "nowrap", gridGap: 10, padding: 10 }}>
                <Link href={`/quiz/${quiz._id}/question/add`}>
                    <a style={{ border: "1px dashed white", fontSize: "3rem", color: "white", width: "100%", minWidth: "60vh", height: "40vh", borderRadius: 8, cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Add fontSize="inherit" />
                    </a>
                </Link>
                {quiz.questions.map((question) => {
                    return (
                        <div key={question._id} style={{ background: "#333", color: "white", width: "100%", minWidth: "60vh", position: "relative", padding: 20, boxShadow: "0 3px 6px rgba(0,0,0,0.19), 0 2px 2px rgba(0,0,0,0.23)", height: "40vh", borderRadius: 8, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }}>
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
            </div>*/}
        </div>
    )
}
