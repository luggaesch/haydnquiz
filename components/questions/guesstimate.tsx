import {WrapperChildProps} from "./wrapper";
import React, {useMemo, useState} from "react";
import {getColorByTopic, getIconByTopic} from "../../data/topics";
import styles from "../../styles/question.module.css";
import {useTeamContext} from "../../contexts/TeamContext";
import {IconButton, Input} from "rsuite";
import {CheckOutline} from "@rsuite/icons";

export default function GuesstimateQuestion({ question, ...rest }: WrapperChildProps) {
    const Icon = useMemo(() => {
        return getIconByTopic(question.topic);
    }, [question])
    const { teams } = useTeamContext();
    const [values, setValues] = useState<string[]>(teams.map(() => ""));
    const [isSubmitted, setIsSubmitted] = useState(false);
    const results = useMemo(() => {
        if (isSubmitted) {
            return values.map((v) => {
                const solution = Number(question.solution);
                return solution - Number(v);
            });
        }
    }, [values, isSubmitted, question]);

    function handleValueChange(nextValue: string, index: number) {
        const currentValues = [...values];
        currentValues[index] = nextValue;
        setValues(currentValues);
    }

    return (
        <div {...rest}>
            <div className={styles.content} style={{ top: "18vh", height: "40%" }}>
                <p>{question.caption}</p>
                {isSubmitted && <p>Antwort: {question.solution}</p> }
            </div>
            <div className={styles.guessContainer}>
                {teams.map((c, index) => (
                    <div className={styles.inputContainer} key={question.id + "_" + index}>
                        <Input className={styles.input} style={{ borderColor: c.color }}
                               inputMode="numeric" placeholder={`Team ${c.name}`}
                               value={values[index]} onChange={(value) => handleValueChange(value, index)}
                               type="number"
                        />
                        {results && <p style={{ fontSize: "2rem" }}>{results[index]}</p>}
                    </div>
                ))}
            </div>
            {values.indexOf("") === -1 && !isSubmitted && <IconButton className={styles.submitButton} onClick={() => setIsSubmitted(true)} icon={<CheckOutline style={{ fontSize: "inherit" }} />} />}
        </div>
    )
}
