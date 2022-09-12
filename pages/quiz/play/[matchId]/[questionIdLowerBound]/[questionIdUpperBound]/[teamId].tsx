import {GetServerSideProps} from "next";
import axios from "axios";
import Match from "../../../../../../types/match";
import {useMemo, useState} from "react";
import {Input} from "@mui/material";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { questionIdLowerBound, questionIdUpperBound, teamId } = context.query;
    const result = await axios.get(`${process.env.SERVER_URL}/api/match/fetchById/` + context.query.matchId);
    return {
        props: { match: JSON.parse(JSON.stringify(result.data)), questionIdLowerBound, questionIdUpperBound, teamId }
    }
}

export default function AnswerInput({ match, questionIdLowerBound, questionIdUpperBound, teamId }: { match: Match, questionIdLowerBound: string, questionIdUpperBound: string, teamId: string }) {
    const questions = useMemo(() => {
        return match.quiz.questions.slice(match.quiz.questions.findIndex((q) => q._id === questionIdLowerBound), match.quiz.questions.findIndex((q) => q._id === questionIdUpperBound));
    }, [match, questionIdLowerBound, questionIdUpperBound]);
    const [values, setValues] = useState<Array<string[]>>(questions.map((q) => {
        if (q.solutionArray && q.solutionArray.length > 0) {
            return q.solutionArray.map((s) => "");
        }
        return [""]
    }));

    function handleValueChanged(nextValue: string, index: number, innerIndex?: number) {
        values[index][innerIndex || 0] = nextValue;
        setValues([...values]);
    }

    function handleSubmit() {
        values.forEach((v, index) => {
            match.answers.push({ teamId, question: questions[index], values: v })
        });
        axios.post("/api/match/update", { match }).then((res) => console.log(res));
    }

    return (
        <div style={{ padding: 20 }}>
            <p>{match._id}</p>
            <p>{match.teams.find((t) => t._id === teamId)?.name}</p>
            {questions.map((q, index) => {
                if (!q.solutionArray || q.solutionArray.length === 0) {
                    return <Input key={q._id} value={values[index][0]} onChange={(event) => handleValueChanged(event.target.value, index)} />
                }
                return (
                    <div key={q._id}>
                        {q.solutionArray.map((s, innerIndex) => (
                            <Input key={q._id + "_" + innerIndex} value={values[index][innerIndex]} onChange={(event) => handleValueChanged(event.target.value, index, innerIndex)} />
                        ))}
                    </div>
                )
            })}
            <div style={{ marginTop: 50 }} onClick={handleSubmit}>Submit</div>
        </div>
    )
}
