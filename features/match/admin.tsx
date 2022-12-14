import Match from "../../types/match";
import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton} from "@mui/material";
import styles from "./match.module.css";
import {Close, Delete} from "@mui/icons-material";
import {useGameContext} from "../../contexts/GameContext";

const AnswerTableHead = () => {
    return (
        <TableHead>
            <TableRow className={styles.adminTableRow}>
                <TableCell style={{ textAlign: "center" }}>Question Index</TableCell>
                <TableCell style={{ textAlign: "center" }}>Text</TableCell>
                <TableCell style={{ textAlign: "center" }}>Assigned Points</TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
    )
}
export default function MatchAdmin({ match }: { match: Match }) {
    const { deleteAnswer } = useGameContext();
    function handleAnswerDelete(answerId: string) {
        deleteAnswer(answerId);
    }

    return (
        <div style={{ width: "100vw", height: "100vh", overflow: "scroll", position: "relative", zIndex: 9, backgroundColor: "#222", padding: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${match.teams.length}, 1fr)`, width: "99%", minHeight: "100%", gap: 20, color: "white" }}>
                {match.teams.map((team) => {
                    return (
                        <div key={team._id!} style={{ minWidth: 400, boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)", padding: 8, borderRadius: 8, backgroundColor: "#282828", height: "100%" }}>
                            <div style={{ textAlign: "center", fontSize: 22 }}>{team.name}</div>
                            <TableContainer>
                                <Table style={{ color: "white" }}>
                                    <AnswerTableHead />
                                    <TableBody className={styles.adminTableBody}>
                                        {match.answers.filter((answer) => answer.teamId === team._id!).map((answer) => {
                                            return (
                                                <TableRow key={answer._id!} className={styles.adminTableRow}>
                                                    <TableCell>{match.quiz.questions.findIndex((q) => q._id === answer.questionId)}</TableCell>
                                                    <TableCell>{answer.values.join(", ")}</TableCell>
                                                    <TableCell>{answer.points}</TableCell>
                                                    <TableCell><IconButton onClick={() => handleAnswerDelete(answer._id!)}><Delete style={{ color: "white" }} /></IconButton></TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}