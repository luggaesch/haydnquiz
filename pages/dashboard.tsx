import {GetServerSideProps} from "next";
import {Add, Edit, PlayCircle} from "@mui/icons-material";
import Link from "next/link";
import {IconButton} from "@mui/material";
import {getColorByTopic, getIconByTopic} from "../data/topics";
import Quiz from "../types/quiz";
import Question from "../types/question";
import axios from "axios";
import {getSession} from "next-auth/react";
import {useRouter} from "next/router";
import Match from "../types/match";
import {useMemo, useState} from "react";
import TeamDisplay from "../components/view/team-display";
import {Input, Form, Popover, Button} from "antd";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    const result = await axios.get(`${process.env.SERVER_URL}/api/quiz/fetchForUserId/${session?.user.id}`);
    const quizzes = result.data;
    const matchQueryRes = await axios.get(`${process.env.SERVER_URL}/api/match/fetchOngoingForUserId/${session?.user.id}`);
    const matches = matchQueryRes.data;
    return {
        props: { quizzes: JSON.parse(JSON.stringify(quizzes)), unfinishedMatches: JSON.parse(JSON.stringify(matches)) }
    }
}

export default function Dashboard({ quizzes, unfinishedMatches }: { quizzes: Quiz[], unfinishedMatches: Match[] }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [quizName, setQuizName] = useState("");
    const mostRecentUnfinishedMatch = useMemo(() => {
        return unfinishedMatches.length > 0 ? unfinishedMatches.reduce((a, b) => (a.startTime > b.startTime ? a : b)) : null;
    }, [unfinishedMatches]);
    const router = useRouter();

    console.log(mostRecentUnfinishedMatch);

    async function handlePlayClicked(quizId: string) {
        const res = await axios.post(`/api/match/create`, { quizId });
        router.push("/quiz/play/" + res.data._id);
    }

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

    return (
        <div style={{ position: "relative", background: "#222", color: "white", width: "100vw", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", padding: 40 }}>
            <p style={{ fontSize: "4rem", width: "100%", margin: 0 }}>Dashboard</p>
            {mostRecentUnfinishedMatch &&
            <Link href={`/quiz/play/${mostRecentUnfinishedMatch._id}`}>
                <a>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div>
                            <p>{mostRecentUnfinishedMatch._id}</p>
                            <p>{mostRecentUnfinishedMatch.quiz.name}</p>
                            <p>{mostRecentUnfinishedMatch.state}</p>
                            <p>{mostRecentUnfinishedMatch.currentQuestionIndex}</p>
                        </div>
                        <TeamDisplay teams={mostRecentUnfinishedMatch.teams} />
                    </div>
                </a>
            </Link>}
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
        </div>
    )
}