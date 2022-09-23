import Quiz from "../../types/quiz";
import {Button, Form, Input, Popover} from "antd";
import {Add, Edit, PlayCircle} from "@mui/icons-material";
import Question from "../../types/question";
import {getColorByTopic, getIconByTopic} from "../../data/topics";
import {IconButton} from "@mui/material";
import Link from "next/link";
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";

export default function QuizzesTab({ quizzes }: { quizzes: Quiz[] }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [quizName, setQuizName] = useState("");
    const router = useRouter();

    function handleAddClick() {
        setModalOpen(true);
    }

    const handleOpenChange = (newOpen: boolean) => {
        setModalOpen(newOpen);
    };

    async function handleSubmit() {
        const res = await axios.post(`/api/quiz/create`, { quizName });
        console.log(res);
        router.push("/quiz/" + res.data._id);
        setModalOpen(false);
    }

    async function handlePlayClicked(quizId: string) {
        const res = await axios.post(`/api/match/create`, { quizId });
        router.push("/quiz/play/" + res.data._id);
    }

    return (
        <div style={{ position: "absolute", bottom: 10,  gridAutoFlow: "column", overflow: "auto", width: "100%", display: "grid", gridGap: 10, padding: 10 }}>
            <Popover
                content={
                    <div style={{ width: 400 }}>
                        <Form>
                            <Form.Item label="Name">
                                <Input value={quizName} onChange={(event) => setQuizName(event.target.value)} />
                            </Form.Item>
                            <Form.Item >
                                <Button style={{ width: "100%" }} type="primary" onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                }
                style={{ background: "#222" }}
                title="Create Quiz"
                trigger="click"
                open={modalOpen}
                onOpenChange={handleOpenChange}
            >
                <div onClick={handleAddClick} style={{ border: "1px dashed white", fontSize: "3rem", color: "white", minWidth: "40vh", height: "40vh", borderRadius: 8, cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Add fontSize="inherit" />
                </div>
            </Popover>
            {quizzes.map((quiz, index) => (
                <div key={quiz._id! + index} style={{ background: "#333", color: "white", minWidth: "40vh", position: "relative", padding: 20, boxShadow: "0 3px 6px rgba(0,0,0,0.19), 0 2px 2px rgba(0,0,0,0.23)", height: "40vh", borderRadius: 8, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <span style={{ fontSize: "3rem", color: "white" }}>{quiz.name}</span>
                    <div style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fill, 50px)", marginTop: 20 }}>
                        {quiz.questions.map((q, index) => {
                            const question = q as Question;
                            const Icon = getIconByTopic(question.topic);
                            return (
                                <div onClick={() => {}} key={index} style={{ cursor: "pointer", fontSize: "1.8rem", height: 50, minWidth: 50, backgroundColor: getColorByTopic(question.topic), color: "var(--text)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Icon style={{ fontSize: "inherit" }} />
                                </div>
                            )
                        })}
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", position: "absolute", bottom: 10 }}>
                        <IconButton style={{ fontSize: "4rem" }} onClick={async () => handlePlayClicked(quiz._id!)}>
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
            ))}
        </div>
    )
}
