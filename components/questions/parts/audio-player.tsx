import styles from "../../../styles/question.module.css";
import {Progress} from "antd";
import React, {useMemo, useState} from "react";
import {PauseRounded, PlayArrowRounded, RestartAltRounded} from "@mui/icons-material";
import ReactPlayer from "react-player";

export default function AudioPlayer({ audio, onFinished, shrink }: { audio: string, shrink?: boolean, onFinished: () => void }) {
    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [hasFinished, setHasFinished] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const percent = useMemo(() => {
        if (duration) return (currentTime / (duration)) * 100;
        return 0;
    }, [currentTime, duration]);
    const PlaybackIcon = useMemo(() => {
        if (hasFinished) {
            return RestartAltRounded;
        } else if (playing) {
            return PauseRounded;
        } else {
            return PlayArrowRounded;
        }
    }, [playing, hasFinished]);

    return (
        <div className={styles.audioPlayerContainer}>
            <Progress width={shrink ? 50 : 200} type={"circle"} trailColor="#11111180" strokeColor="rgb(0,255,139)" style={{ gridRow: 1, gridColumn: 1 }} percent={percent} showInfo={false}  />
            <div className={styles.popupButton} onClick={() => {
                setPlaying(!playing);
                if (hasFinished) setHasFinished(false);
            }}>
                <PlaybackIcon style={{ fontSize: "inherit" }} />
            </div>
            <ReactPlayer playing={playing} onEnded={() => {
                setHasFinished(true);
                onFinished();
            }} onProgress={(state) => setCurrentTime(state.playedSeconds)} onDuration={(duration) => setDuration(duration)} url={audio} width={0} height={0} />
        </div>
    )
}
