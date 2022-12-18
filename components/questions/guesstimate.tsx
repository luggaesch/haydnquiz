import React, {useMemo, useState} from "react";
import styles from "../../styles/question.module.css";
import {Input} from "antd";
import Team from "../../types/team";
import {Done} from "@mui/icons-material";

export default function GuesstimateGame({ solution, teams }: { solution: number, teams: Team[] }) {
    const [values, setValues] = useState<string[]>(teams.map(() => ""));
    const [isSubmitted, setIsSubmitted] = useState(false);
    const results = useMemo(() => {
        if (isSubmitted) {
            return values.map((v) => {
                return solution - Number(v);
            });
        }
    }, [values, isSubmitted, solution]);

    function handleValueChange(nextValue: string, index: number) {
        const currentValues = [...values];
        currentValues[index] = nextValue;
        setValues(currentValues);
    }

    return (
        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
            <div className={styles.guessContainer}>
                {teams.map((c, index) => (
                    <div className={styles.inputContainer} key={index}>
                        <div style={{ borderBottom: "2px solid #111", width: "100%", textAlign: "center", background: c.color + "10", borderRadius: 8, padding: 5 }}>{c.name}</div>
                        {!results ?
                            <Input className={styles.input} style={{ borderColor: c.color }}
                               inputMode="numeric" placeholder={`Schätzung eingeben...`}
                               value={values[index]} onChange={(event) => handleValueChange(event.target.value, index)}
                               type="number"
                            />
                            :
                        <p style={{ color: [...results].sort((a, b) => {
                                return Math.abs(a) - Math.abs(b);
                            })[0] === results[index] ? "var(--accent)" : "#fff" }}>{Math.abs(results[index]).toFixed(3)}</p>
                        }
                    </div>
                ))}
            </div>
            {values.indexOf("") === -1 && !isSubmitted && <div className={styles.submitButton} onClick={() => setIsSubmitted(true)}>
                <Done style={{ fontSize: "inherit" }} />
            </div>}
        </div>
    )
}
