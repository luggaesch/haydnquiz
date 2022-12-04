import React, {ReactNode, useMemo, useState} from "react";
import Match, {GamePhases} from "../types/match";
import axios from "axios";
import {Credit} from "../components/questions/parts/credit-distribution";
import Team from "../types/team";
import Joker, {Jokers} from "../types/joker";

interface GameValue {
    match: Match,
    targetUploadRound: number,
    loading: boolean,
    setPhase: (nextPhase: GamePhases) => void,
    setCurrentQuestionNum: (nextQuestionNum: number) => void,
    unlockUploadRound: () => void,
    lockUploadRound: () => void,
    uploadCredits: (credits: Credit[], questionId: string) => void,
    addJokerToTeam: (team: Team, jokerName: Jokers) => void,
    assignJokerToQuestion: (jokerId: string, questionId: string) => void,
}

const GameContext = React.createContext<GameValue | undefined>(undefined);

export function useGameContext() {
    const context = React.useContext(GameContext);
    if (!context) {
        throw Error("Context can only be consumed from within a GameProvider or its children.")
    }
    return context;
}

export const GameProvider = (props: { match: Match, children: ReactNode } ) => {
    const [match, setMatch] = useState(props.match);
    const targetUploadRound = useMemo(() => {
        const round = match.quiz.stops.indexOf(match.currentQuestionIndex)
        if (round === -1 ) {
            if (match.phase === GamePhases.Transition && match.currentQuestionIndex === match.quiz.questions.length - 1) {
                return match.quiz.stops.length;
            }
        }
        return round;
    }, [match])
    const [loading, setLoading] = useState(false);
    const [updateInterval, setUpdateInterval] = useState<NodeJS.Timer | null>(null);

    function uploadState() {
        setLoading(true);
        axios.post("/api/match/updateState", { match })
            .then((res) => {
                console.log(res);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }

    function setPhase(nextPhase: GamePhases) {
        if (nextPhase !== match.phase && (nextPhase >= 0 && nextPhase <= GamePhases.Rankings)) {
            if (nextPhase === GamePhases.Solutions && nextPhase > match.phase) {
                match.currentQuestionIndex = 0;
            } else if (nextPhase === GamePhases.Playing && nextPhase < match.phase) {
                match.currentQuestionIndex = match.quiz.questions.length - 1;
            }
            match.phase = nextPhase;
            match.finished = nextPhase === GamePhases.Rankings;
            if (updateInterval) {
                clearInterval(updateInterval);
                setUpdateInterval(null);
            }
            setMatch({...match});
            uploadState();
        }
    }

    function setCurrentQuestionNum(nextQuestionNum: number) {
        if (nextQuestionNum !== match.currentQuestionIndex) {
            match.currentQuestionIndex = nextQuestionNum;
            setMatch({...match});
            uploadState();
        }
    }

    function unlockUploadRound() {
        if (targetUploadRound !== -1) {
            match.currentlyOpenUploadRound = targetUploadRound;
            setLoading(true);
            axios.post("/api/match/enableUpload", { matchId: match._id, uploadRound: targetUploadRound }).then(async (res) => {
                console.log(res);
                setLoading(false);
                if (!updateInterval) {
                    const id = setInterval(async () => {
                        const res = await axios.get(`/api/match/fetchById/` + match._id!);
                        const m = res.data as Match;
                        console.log(res);
                        if (JSON.stringify(m.answers) !== JSON.stringify(match.answers)) {
                            match.answers = m.answers;
                            setMatch({...m});
                        }
                    }, 2000);
                    setUpdateInterval(id);
                }
            }).catch((err) => {
                console.error(err);
                setLoading(false);
            });
        }
    }

    function lockUploadRound() {
        const uploadRound = match.currentlyOpenUploadRound;
        if (uploadRound !== -1) {
            if (!match.pastUploadRounds.includes(uploadRound)) {
                match.pastUploadRounds.push(uploadRound);
            }
            match.currentlyOpenUploadRound = -1;
            setLoading(true);
            axios.post("/api/match/disableUpload", { matchId: match._id, uploadRound }).then((res) => {
                setLoading(false);
                console.log(res);
                if (updateInterval) {
                    clearInterval(updateInterval);
                    setUpdateInterval(null);
                }
            }).catch((err) => {
                console.error(err);
                setLoading(false);
            });
        }
    }

    function uploadCredits(credits: Credit[], questionId: string) {
        match.answers.filter((answer) => answer.questionId === questionId).forEach((answer) => {
            const credit = credits.find((c) => c.id === answer.teamId);
            if (credit) {
                answer.points = credit.points;
            }
        });
        setLoading(true);
        axios.post("/api/match/updatePoints", { matchId: match._id, answers: match.answers, uploadRound: -1 })
            .then((res) => {
                setLoading(false);
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }

    function addJokerToTeam(team: Team, jokerName: Jokers) {
        setLoading(true);
        const joker: Joker = { name: jokerName, teamId: team._id!, assignedQuestionId: undefined };
        axios.post("/api/match/addJoker", { matchId: match._id, joker })
            .then((res) => {
                setLoading(true);
                console.log(res);
                setMatch({...res.data});
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            })
    }

    function assignJokerToQuestion(jokerId: string, questionId: string) {
        setLoading(true);
        axios.post("/api/match/assignJokerToQuestion", { matchId: match._id, jokerId, questionId })
            .then((res) => {
                setLoading(true);
                console.log(res);
                setMatch({...res.data});
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            })
    }

    const value = {
        match,
        targetUploadRound,
        loading,
        setPhase,
        setCurrentQuestionNum,
        unlockUploadRound,
        lockUploadRound,
        uploadCredits,
        addJokerToTeam,
        assignJokerToQuestion
    };

    return <GameContext.Provider value={value}>
        {props.children}
    </GameContext.Provider>;
};
