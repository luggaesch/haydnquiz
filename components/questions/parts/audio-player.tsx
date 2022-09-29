import styles from "../../../styles/question.module.css";
import {Progress} from "antd";
import React, {useEffect, useMemo, useState} from "react";
import {PauseRounded, PlayArrowRounded, RestartAltRounded} from "@mui/icons-material";
import useSound from "use-sound";
import {useTimer} from "react-timer-hook";
// @ts-ignore
import s0 from "../../../assets/songs/s0.mp3"
// @ts-ignore
import s1 from "../../../assets/songs/s1.mp3"
// @ts-ignore
import s2 from "../../../assets/songs/s2.mp3"
// @ts-ignore
import s3 from "../../../assets/songs/s3.mp3"

const sounds = [s0, s1, s2, s3];

export default function AudioPlayer({ audio, onFinished, shrink }: { audio: number, shrink?: boolean, onFinished: () => void }) {
    const [hasFinished, setHasFinished] = useState(false);
    const [play, { pause, stop, duration }] = useSound(sounds[audio], {volume: 1});
    const [currentTime, setCurrentTime] = useState<number>(0);
    const expiryTimestamp = new Date(new Date().getTime() + 100000000000000);
    const { seconds, isRunning, start: startSeeker, pause: pauseSeeker, restart: restartSeeker } = useTimer({ expiryTimestamp, autoStart: false });
    const percent = useMemo(() => {
        if (duration) return (currentTime / (duration/1000)) * 100;
        return 0;
    }, [currentTime, duration]);
    const PlaybackIcon = useMemo(() => {
        if (hasFinished) {
            return RestartAltRounded;
        } else if (isRunning) {
            return PauseRounded;
        } else {
            return PlayArrowRounded;
        }
    }, [isRunning, hasFinished]);

    useEffect(() => {
        return () => {
            pause();
            stop();
        }
    }, []);

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
            onFinished();
            setHasFinished(true);
        }
    }, [seconds]);

    return (
        <div className={styles.audioPlayerContainer}>
            <Progress width={shrink ? 50 : 200} type={"circle"} trailColor="#11111180" strokeColor="rgb(0,255,139)" style={{ gridRow: 1, gridColumn: 1 }} percent={percent} showInfo={false}  />
            <div className={styles.popupButton}
                 onClick={() => {
                     if (isRunning) {
                         handlePause();
                     } else {
                         handlePlay();
                     }
                 }}>
                <PlaybackIcon style={{ fontSize: "inherit" }} />
            </div>
        </div>
    )
}
