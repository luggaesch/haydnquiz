import DatePickerMulti from "react-multi-date-picker";
import React, {useState} from "react";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import {Form, Input, Select} from "antd";
import Quiz from "../../types/quiz";
import axios from "axios";

const {Option} = Select;

export default function CreateEvent({ quizzes }: { quizzes: Quiz[] }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [dates, setDates] = useState<Date[]>([]);
    const [quizId, setQuizId] = useState(quizzes[0] ? quizzes[0]._id : undefined);

    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: 10, justifyContent: "center", alignItems: "center" }}>
            <Form.Item name="name" label="Name">
                <Input onChange={(event) => setName(event.target.value)} value={name} maxLength={30} />
            </Form.Item>
            <Form.Item name="description" label="Description">
                <Input onChange={(event) => setDescription(event.target.value)} value={description} maxLength={500} />
            </Form.Item>
            <Select value={quizId} onChange={(value) => setQuizId(value)} style={{ background: "#222" }}>
                {quizzes.map((q, index) => (
                    <Option value={q._id} key={index}>{q.name}</Option>
                ))}
            </Select>
            <DatePickerMulti placeholder="Select Days" value={dates} onChange={(values) => {
                if (!values || !Array.isArray(values)) return;
                setDates(values.map((d) => d.toDate()));
            }} multiple hideYear style={{ color: "black" }} plugins={[<DatePanel key={1} />]} />
            <div style={{ padding: 20, backgroundColor: "var(--accent)", cursor: "pointer" }}
                 onClick={async () => {
                     const res = await axios.post("/api/event/create", { name, description, quizId, availableDays: dates });
                     console.log(res);
                 }}>Start Event</div>
        </div>
    )
}