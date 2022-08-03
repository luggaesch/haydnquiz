import {IconButton, Progress} from "rsuite";
import {useEffect, useMemo, useState} from "react";
import {PauseOutline, PlayOutline} from "@rsuite/icons";
import {useTimer} from "react-timer-hook";
import styles from "../../styles/timer.module.css";

interface TimerProps {
    totalTime: number,
    playCountdown: () => void,
    [x:string]: any
}

export default function TimerControl({ totalTime, playCountdown, ...rest}: TimerProps) {
    const expiryTimestamp = useMemo(() => {
        const date = new Date();
        return new Date(date.getTime() + totalTime * 1000);
    }, [totalTime]);
    const { seconds, isRunning, pause, resume } = useTimer({ expiryTimestamp });
    const [currentTime, setCurrentTime] = useState(0);
    const [showControl, setShowControl] = useState(false);
    const percent = useMemo(() => {
        return (currentTime / totalTime) * 100;
    }, [currentTime, totalTime]);

    useEffect(() => {
        const nextValue = currentTime + 1;
        if (nextValue <= totalTime) setCurrentTime(currentTime + 1);
        if (nextValue === totalTime - 2) playCountdown();
    }, [seconds]);

    return (
        <div {...rest}>
            <div className={styles.container} onMouseEnter={() => setShowControl(true)} onMouseLeave={() => setShowControl(false)}>
                <Progress.Circle strokeLinecap="round" trailColor="#aaaaaab0" strokeColor="rgb(0,255,139)" style={{ gridColumn: 1, gridRow: 1 }} showInfo={false} percent={Math.floor(percent)} />
                {showControl ?
                    <IconButton className={styles.iconButton}
                                icon={isRunning ? <PauseOutline style={{ fontSize: "inherit" }} /> : <PlayOutline style={{ fontSize: "inherit" }} />}
                                onClick={() => {
                                    if (!isRunning) {
                                        resume();
                                    } else {
                                        pause();
                                    }
                                }
                    } />
                    : <div className={styles.secondDisplay}>
                        <p>{currentTime}</p>
                    </div>}
            </div>
        </div>
    )
}
