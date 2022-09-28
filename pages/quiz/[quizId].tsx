import {GetServerSideProps} from "next";
import connectMongo from "../../lib/db/connectMongo";
import Quiz from "../../types/quiz";
import axios from "axios";
import React, {useState} from "react";
import {Close, DeleteOutline, EditOutlined, StopOutlined} from "@mui/icons-material";
import QuestionWrapper from "../../components/questions/wrapper";
import {FaPlus} from "react-icons/fa";
import PopupContainer from "../../components/questions/parts/popup-container";
import QuestionForm from "../../components/dashboard/question-form";
import Question from "../../types/question";
import {
    DragDropContext,
    Draggable,
    Droppable,
    DroppableProvided,
    DroppableStateSnapshot,
    DropResult,
    resetServerContext
} from "react-beautiful-dnd";
import {Empty} from "antd";
import styles from "../../styles/dashboard.module.css";
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

resetServerContext();

export default function QuizPage({ quiz }: { quiz: Quiz }) {
    const [currentQuiz, setCurrentQuiz] = useState(quiz);
    const [questionToEdit, setQuestionToEdit] = useState<Question | undefined>(undefined);
    const [open, setOpen] = useState(false);

    async function addQuestion(question: Question) {
        const res = await axios.post(`/api/quiz/${quiz._id}/addQuestion`, {question});
        if (res.status === 200) {
            setCurrentQuiz(res.data);
            setOpen(false);
        }
    }

    async function updateQuestion(question: Question) {
        if (!questionToEdit) return;
        question._id = questionToEdit._id;
        const res = await axios.post(`/api/quiz/${quiz._id}/updateQuestion`, { question });
        if (res.status === 200) {
            setOpen(false);
            setCurrentQuiz(res.data);
        }
        setQuestionToEdit(undefined);
    }

    async function deleteQuestion(questionId: string) {
        const res = await axios.post(`/api/quiz/${quiz._id}/deleteQuestion`, { questionId });
        if (res.status === 200) {
            setCurrentQuiz(res.data);
        }
    }

    async function updateStops(questionIndex: number) {
        const stops = [...(currentQuiz.stops ?? [])];
        if (!stops.includes(questionIndex)) {
            stops.push(questionIndex);
        } else {
            stops.splice(stops.indexOf(questionIndex), 1);
        }
        currentQuiz.stops = stops;
        setCurrentQuiz({...currentQuiz});
        const res = await axios.post(`/api/quiz/update`, { quiz: currentQuiz });
        console.log(res);
    }

    const onDragEnd = async (result: DropResult) => {
        const { destination, source } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;
        const questions = [...currentQuiz.questions];
        const reorderedQuestion = questions.splice(source.index, 1)[0];
        questions.splice(destination.index, 0, reorderedQuestion);
        currentQuiz.questions = questions;
        setCurrentQuiz({...currentQuiz});
        const res = await axios.post(`/api/quiz/update`, { quiz: currentQuiz });
        console.log(res);
    }

    // TODO: Fix Editing

    const InnerList = React.memo(function InnerList(props: { questions: Question[]}) {
        return (
            <>
                {props.questions.map((question, index) => (
                    <Draggable
                        key={question._id}
                        draggableId={question._id!}
                        index={index}
                    >
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef}
                                 {...provided.draggableProps}
                                 {...provided.dragHandleProps}>
                                <div key={index} style={{ borderBottom: index !== props.questions.length - 1 ?  "2px solid #333" : "none", display: "grid", gridTemplateColumns: "7fr 1fr", height: "100%", padding: 10 }}
                                >
                                    <QuestionWrapper question={question} fontSize={12} hideTimer={true} hideOverlay={true} />
                                    <div style={{ borderLeft: "2px solid #333", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexDirection: "column" }}>
                                        <div onClick={() => {
                                            setQuestionToEdit(question);
                                            setOpen(true);
                                        }} style={{ width: 100, height: 100, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "var(--question-item)", borderRadius: "50%", boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)" }}>
                                            <EditOutlined />
                                        </div>
                                        {index !== 0 && <div onClick={() => updateStops(index)} style={{ width: 100, height: 100, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: currentQuiz.stops?.includes(index) ? "var(--accent-negative)" : "var(--question-item)", borderRadius: "50%", boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)" }}>
                                            <StopOutlined />
                                        </div>}
                                        <div onClick={() => deleteQuestion(question._id!)} style={{ width: 100, height: 100, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "var(--question-item)", borderRadius: "50%", boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)" }}>
                                            <DeleteOutline />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Draggable>
                ))}
            </>
        )
    })

    return (
        <div className={styles.root}>
            <div className={styles.sidebar}>
                <div className={styles.sidebarTitle}>
                    <Link href={"/dashboard"}>
                        <a>
                            <div className={styles.navigation}><Close /></div>
                        </a>
                    </Link>
                    <div className={styles.title}>Manage Quiz</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridAutoRows: 80, fontSize: 22, gridRowStart: 2, gridRowEnd: 4, backgroundColor: "var(--question-item)", borderRadius: 12, boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)", padding: 20 }}>
                    <div>Name</div>
                    <div>{currentQuiz.name}</div>
                    <div>Pauses at</div>
                    <div style={{ display: "flex", flexDirection: "row", gap: 5  }}>
                        {currentQuiz.stops.map((s) => (
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: 40, height: 40, borderRadius: 8, backgroundColor: "var(--accent-negative)", color: "#111", fontSize: "1.3em", fontWeight: "bold" }} key={s}>{s}</div>
                        ))}
                    </div>
                    <div>Number of Questions</div>
                    <div>{currentQuiz.questions.length}</div>
                    <div>Total Points</div>
                    <div>{currentQuiz.questions.map((q) => q.value !== -1 ? q.value : 0).reduce((partialSum, a) => partialSum + a, 0)}</div>
                    <div>Total Duration</div>
                    <div>{Math.round(currentQuiz.questions.map((q) => q.timeInSeconds !== -1 ? q.timeInSeconds : 0).reduce((partialSum, a) => partialSum + a, 0) / 60)} Minutes</div>
                </div>
            </div>
            <div style={{ overflow: "hidden" }}>
                <div style={{ position: "relative", alignItems: "center", gridRowStart: 1, gridRowEnd: 3, gridColumn: 2, height: "100%" }}>
                    <div style={{ position: "absolute", bottom: 20, right: 20, display: "flex", justifyContent: "center", height: 100, width: 100 }}>
                        <div onClick={() => setOpen(true)} style={{ cursor: "pointer", boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)", backgroundColor: "var(--accent)", color: "#222", zIndex: 5, height: "100%", width: "100%", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "2em" }}>
                            <FaPlus />
                        </div>
                    </div>
                    {currentQuiz.questions.length > 0 ?
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId={"list"}>
                                {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={{
                                            backgroundColor: snapshot.isDraggingOver ? '#33333380' : 'transparent',
                                            display: "grid", gridAutoRows: 500, padding: 10, overflowY: "auto",
                                            height: "100%"
                                        }}
                                        {...provided.droppableProps}
                                    >
                                        <InnerList questions={currentQuiz.questions} />
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        :
                        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
                            <Empty imageStyle={{ width: 400, height: 400 }} description={false} />
                            <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontSize: "3em" }}>
                                <p style={{ margin: "0 0 1em 0" }}>No Questions yet!</p>
                            </div>
                        </div>
                    }
                </div>
                <PopupContainer open={open} setOpen={setOpen}>
                    <QuestionForm question={questionToEdit} onSubmit={(question) => questionToEdit ? updateQuestion(question) : addQuestion(question)} />
                </PopupContainer>
            </div>
        </div>
    )
}
