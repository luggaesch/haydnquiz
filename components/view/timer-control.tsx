import {useEffect, useMemo, useState} from "react";
import {useTimer} from "react-timer-hook";
import styles from "../../styles/timer.module.css";
import {Progress} from "antd";
import {PauseOutlined} from "@ant-design/icons";
import {PlayArrowOutlined} from "@mui/icons-material";
import {useMediaQuery} from "react-responsive";

interface TimerProps {
    totalTime: number,
    playCountdown: () => void,
    [x:string]: any
}

export default function TimerControl({ totalTime, playCountdown, ...rest}: TimerProps) {
    const isMobile = useMediaQuery({ query: "(orientation: portrait)" })
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
            <div style={{ zIndex: 105, position: "relative", width: isMobile ? 80 : 200 }}  className={styles.container} onMouseEnter={() => setShowControl(true)} onMouseLeave={() => setShowControl(false)}>
                {showControl ?
                    <div className={styles.iconButton} style={{ zIndex: 2 }} onClick={() => {
                        if (!isRunning) {
                            resume();
                        } else {
                            pause();
                        }}}>
                        {isRunning ? <PauseOutlined style={{ fontSize: "inherit" }} /> : <PlayArrowOutlined style={{ fontSize: "inherit" }} />}
                    </div>
                    : <div className={styles.secondDisplay}>
                        <p style={isMobile ? { fontSize: 24 } : {}}>{totalTime - currentTime}</p>
                    </div>}
                <div style={{ width: "100%", height: "100%", gridColumn: 1, gridRow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Progress type={"circle"} width={isMobile ? 80 : 200} trailColor="#aaaaaab0" strokeColor="rgb(0,255,139)"  showInfo={false} percent={percent} />
                </div>
            </div>
        </div>
    )
}
