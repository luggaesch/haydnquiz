import {WrapperChildProps} from "./wrapper";
import styles from "../../styles/question.module.css";
import React, {useEffect, useMemo, useState} from "react";
import {IconButton, Progress} from "rsuite";
import {EmojiObjects, PauseRounded, PlayArrowRounded, RestartAltRounded} from "@mui/icons-material";
import useSound from "use-sound";
// @ts-ignore
import songSfx from "../../assets/songs/song.mp3"
import {useTimer} from "react-timer-hook";
import SolutionView from "../view/solution-view";
import {GameState, useGameContext} from "../../contexts/GameContext";

export default function AudioQuestion({ question, showtimer, ...rest }: WrapperChildProps) {
    const {gameState} = useGameContext();
    const [play, { pause, stop, duration }] = useSound(question.media!.file!, {volume: 1});
    const [currentTime, setCurrentTime] = useState<number>(0);
    const expiryTimestamp = new Date(new Date().getTime() + 100000000000000);
    const { seconds, isRunning, start: startSeeker, pause: pauseSeeker, restart: restartSeeker } = useTimer({ expiryTimestamp, autoStart: false });
    const percent = useMemo(() => {
        if (duration) return (currentTime / (duration/1000)) * 100;
        return 0;
    }, [currentTime, duration]);
    const [hasFinished, setHasFinished] = useState(false);
    const [showSolution, setShowSolution] = useState(false);
    const [isInitialScreen, setIsInitialScreen] = useState(true);

    const PlaybackIcon = useMemo(() => {
        if (hasFinished) {
            return RestartAltRounded;
        } else if (isRunning) {
            return PauseRounded;
        } else {
            return PlayArrowRounded;
        }
    }, [isRunning, hasFinished]);

    function handlePlay() {
        if (duration && currentTime >= duration/1000) {
            setHasFinished(false);
            setCurrentTime(0);
            restartSeeker(expiryTimestamp);
            stop();
        }
        play();
        startSeeker();
    }

    function handlePause() {
        pause();
        pauseSeeker();
    }

    useEffect(() => {
        if (!isRunning) return;
        const nextValue = currentTime + 1;
        setCurrentTime(nextValue);
        if (duration && nextValue >= duration/1000) {
            pause();
            pauseSeeker();
            showtimer!();
            setHasFinished(true);
        }
    }, [seconds]);

    return (
        <div {...rest}>
            <div className={styles.content} style={{ top: "15%" }}>
                <p>{question.caption}</p>
            </div>
            <div className={styles.audioPlayerContainer}>
                <Progress.Circle trailColor="#11111180" strokeColor="rgb(0,255,139)" style={{ gridRow: 1, gridColumn: 1 }} percent={percent} showInfo={false}  />
                <IconButton className={styles.popupButton}
                            icon={<PlaybackIcon style={{ fontSize: "inherit" }} />} onClick={() => {
                    if (isRunning) {
                        handlePause();
                    } else {
                        handlePlay();
                    }
                }} />
            </div>
            {gameState === GameState.Solutions && <>
                <IconButton className={styles.solutionButton}
                            icon={<EmojiObjects style={{ fontSize: "inherit" }} />} onClick={() => {
                    setShowSolution(true);
                    setIsInitialScreen(false);
                }} />
                <SolutionView showSolution={showSolution} setShowSolution={setShowSolution} isInitialScreen={isInitialScreen}>
                    {typeof question.solution === "string" ? <div>{question.solution}</div>:
                        <div style={{ width: "100%", height: "90%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "4rem" }}>
                            {(question.solution as string[]).map((s, index) => (
                                <p key={index}>{s}</p>
                            ))}
                        </div>
                    }
                </SolutionView>
            </>}
        </div>
    )
}
