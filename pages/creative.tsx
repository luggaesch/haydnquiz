import React, {useState} from "react";
import Popover from '@mui/material/Popover';
import PopupState, {bindPopover, bindTrigger} from 'material-ui-popup-state';
import {FaPlus} from "react-icons/fa";
import {Input} from "antd";

export default function Creative() {
    const [answers, setAnswers] = useState<string[]>([]);
    const [inputText, setInputText] = useState("");

    return (
        <div style={{ width: "100vw", height: "100vh", overflowY: "scroll" }}>
             <div style={{ width: "100%", minHeight: "100%", background: "#222", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, padding: 10 }}>
                 {answers.map((answer, index) => (
                     <div style={{ height: 300, boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)", display: "flex", justifyContent: "center", alignItems: "center", color: "color", fontSize: 30, textAlign: "center" }} key={index}>
                         {answer}
                     </div>
                 ))}
                 <PopupState variant="popover" popupId="demo-popup-popover">
                     {(popupState) => (
                         <>
                             <div  {...bindTrigger(popupState)} style={{ cursor: "pointer", width: "100%", minHeight: "100%", background: "#333", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, padding: 10 }}>
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
                                 <Input onSubmit={() => {
                                     setAnswers([...answers, inputText]);
                                     setInputText("");
                                 }} type={"text"} placeholder={"Text"} style={{ color: "var(--text)", fontSize: "1.5rem", width: "100%", backgroundColor: "transparent", margin: 0, boxShadow: "none" }}
                                        value={inputText} onChange={(event) => setInputText(event.target.value)} />
                             </Popover>
                         </>
                     )}
                 </PopupState>

             </div>
        </div>
    )
}