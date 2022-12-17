import React, {useState} from "react";
import Popover from '@mui/material/Popover';
import PopupState, {bindPopover, bindTrigger} from 'material-ui-popup-state';
import {FaPlus} from "react-icons/fa";
import TextArea from "antd/lib/input/TextArea";
import {Check} from "@mui/icons-material";
import shuffle from "../lib/shuffle";

export default function Creative() {
    const [answers, setAnswers] = useState<{ text: string, votes: number }[]>([]);
    const [inputText, setInputText] = useState("");
    const [done, setDone] = useState(false);

    return (
        <div style={{ width: "100vw", height: "100vh", overflowY: "scroll" }}>
            <div style={{ cursor: done ? "pointer" : "default", width: "100%", minHeight: "100%", background: "#222", display: "flex", flexDirection: "row", justifyContent: "center", flexFlow: "wrap", gap: 10, padding: 10, position: "relative" }}>
                {answers.map((answer, index) => (
                    <div onContextMenu={(event) => {
                        event.preventDefault();
                        if (done) {
                            const nextAnswers = [...answers];
                            nextAnswers[index].votes -= 1;
                            setAnswers(nextAnswers);
                        }
                    }
                    } onClick={() => {
                        if (done) {
                            const nextAnswers = [...answers];
                            nextAnswers[index].votes += 1;
                            setAnswers(nextAnswers);
                        }
                    }
                    } style={{ position: "relative", borderRadius: 8, color: "white", height: 300, width: 600, boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)", display: "flex", justifyContent: "center", alignItems: "center", fontSize: 42, textAlign: "center" }} key={index}>
                        <div style={{ position: "absolute", top: 0, left: 0, fontSize: 30, borderRadius: "8px 0 0 0", background: "#333", padding: 10, }}>{index}</div>
                        <div>{answer.text}</div>
                        {done && <div onClick={() => {
                            if (done) {
                                const nextAnswers = [...answers];
                                nextAnswers[index].votes -= 1;
                                setAnswers(nextAnswers);
                            }
                        }
                        } style={{ cursor: "pointer", background: "var(--accent)", color: "#111", width: 50, height: 50, position: "absolute", bottom: 0, right: 0, transform: "translateY(50%)", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", fontSize: 22 }}>
                            {answer.votes}
                        </div>}
                    </div>
                ))}
                {!done &&
                    <>
                        <PopupState variant="popover" popupId="demo-popup-popover">
                            {(popupState) => (
                                <>
                                    <div  {...bindTrigger(popupState)} style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "white", height: 300, width: 600, cursor: "pointer", background: "#333", gap: 10, padding: 10 }}>
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
                                        <div style={{ background: "#181818", height: 400, width: 400, display: "grid", gridTemplateRows: "4fr 1fr", alignItems: "center", padding: 10 }}>
                                            <TextArea placeholder={"Text"} style={{ height: 250, color: "var(--text)", fontSize: "1.5rem", width: "100%", backgroundColor: "transparent", margin: 0, boxShadow: "none" }}
                                                      value={inputText} onChange={(event) => setInputText(event.target.value)} />
                                            <div onClick={() => {
                                                setAnswers([...answers, { text: inputText, votes: 0 }]);
                                                setInputText("");
                                                popupState.close();
                                            }
                                            } style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", background: "var(--accent)", height: 80, borderRadius: 8, textAlign: "center" }}>
                                                Submit
                                            </div>
                                        </div>
                                    </Popover>
                                </>
                            )}
                        </PopupState>
                        <div onClick={() => {
                            setDone(true);
                            setAnswers(shuffle(answers));
                        }} style={{ display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", position: "absolute", bottom: 10, right: 10, width: 50, height: 50, borderRadius: "50%", backgroundColor: "var(--accent)" }}>
                            <Check />
                        </div>
                    </>
                }
            </div>
        </div>
    )
}