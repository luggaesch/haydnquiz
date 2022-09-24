import Quiz from "../../types/quiz";
import React, {Dispatch, SetStateAction, useState} from "react";
import PopupState, {bindPopover, bindTrigger} from "material-ui-popup-state";
import {FaPlus} from "react-icons/fa";
import styles from "../../styles/dashboard.module.css";
import Popover from "@mui/material/Popover";
import Question from "../../types/question";
import {getColorByTopic, getIconByTopic} from "../../data/topics";
import {EditOutlined, PlayArrowOutlined} from "@mui/icons-material";
import {DashboardTabs} from "../../pages/dashboard";
import {Input} from "antd";
import Link from "next/link";

export default function QuizzesTab({ quizzes, setTab, setSelectedQuizId, updateQuizzes }: { quizzes: Quiz[], setTab: Dispatch<SetStateAction<DashboardTabs>>, setSelectedQuizId: Dispatch<SetStateAction<string | undefined>>, updateQuizzes: (name: string) => void }) {
    const [quizName, setQuizName] = useState("")

    return (
        <div className={styles.dashboardTab}>
            <div style={{ width: "100%", height: "100%", padding: 20, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridAutoRows: 600, gridGap: 20, overflowY: "scroll" }}>
                <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                        <div>
                            <div style={{ width: "100%", height: "100%", border: "2px dashed var(--text)", borderRadius: 12, display: "flex", justifyContent: "center", alignItems: "center", fontSize: "2em" }} {...bindTrigger(popupState)}>
                                <FaPlus />
                            </div>
                            <Popover
                                {...bindPopover(popupState)}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: -5,
                                    horizontal: 'center',
                                }}
                                style={{ background: "transparent" }}
                            >
                                <div style={{ background: "#282828", height: 300, width: 400, borderRadius: 12 }}>
                                    <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", padding: 10, height: "100%" }}>
                                        <Input type={"text"} placeholder={"Name"} style={{ color: "var(--text)", fontSize: "1.5rem", width: "100%", backgroundColor: "transparent", margin: 0, border: "none", boxShadow: "none" }} value={quizName} onChange={(event) => setQuizName(event.target.value)} />
                                        <div onClick={() => {
                                            updateQuizzes(quizName);
                                            popupState.close();
                                        }} style={{ backgroundColor: "var(--accent)", color: "#222", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 12 }}>Submit</div>
                                    </div>
                                </div>
                            </Popover>
                        </div>
                    )}
                </PopupState>
                {[...quizzes].reverse().map((quiz) => (
                    <div key={quiz._id} style={{ borderRadius: 12, backgroundColor: "var(--question-item)", display: "grid", gridTemplateRows: "1fr 2fr 1fr" }}>
                        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", fontSize: "3em", borderBottom: "1px solid var(--dark-paper)" }}>{quiz.name}</div>
                        <div style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fill, 50px)", marginTop: 20, padding: 20 }}>
                            {quiz.questions.map((q, index) => {
                                const question = q as Question;
                                const Icon = getIconByTopic(question.topic);
                                return (
                                    <div onClick={() => {}} key={index} style={{ cursor: "pointer", fontSize: "1.8rem", height: 50, minWidth: 50, backgroundColor: getColorByTopic(question.topic), color: "#222", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Icon style={{ fontSize: "inherit" }} />
                                    </div>
                                )
                            })}
                        </div>
                        <div style={{ borderTop: "1px solid var(--dark-paper)", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                            <div onClick={() => {
                                setSelectedQuizId(quiz._id);
                                setTab(DashboardTabs.New);
                            }} style={{ fontSize: "4rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <PlayArrowOutlined fontSize="inherit" />
                            </div>
                            <div style={{ fontSize: "4rem", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "1px solid var(--dark-paper)" }}>
                                <Link href={`/quiz/${quiz._id}`}>
                                    <a>
                                        <EditOutlined fontSize="inherit" style={{ color: "var(--text)" }} />
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
    /*
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
}
    */
