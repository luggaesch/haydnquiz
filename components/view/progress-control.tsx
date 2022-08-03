import {useMemo} from "react";
import {IconButton, Progress} from "rsuite";
import styles from "../../styles/progress.module.css";
import 'rsuite/dist/rsuite.min.css';
import Left from "@rsuite/icons/legacy/Left";
import Right from "@rsuite/icons/legacy/Right";

export default function ProgressControl({ currentIndex, maxIndex, onTransition }: { currentIndex: number, maxIndex: number, onTransition: (modifier: number) => void }) {
    const percent = useMemo(() => {
        return ((currentIndex + 1) / (maxIndex + 1)) * 100;
    }, [currentIndex, maxIndex]);

    return (
        <div className={styles.container}>
            <div>
                <IconButton icon={<Left />} style={{ visibility: currentIndex === 0 ? "hidden" : "visible", color: "white", background: "transparent" }} className={styles.button} onClick={() => onTransition(-1)}/>
                <IconButton icon={<Right />} style={{ visibility: currentIndex === maxIndex ? "hidden" : "visible", color: "white", background: "transparent" }} className={styles.button} onClick={() => onTransition(1)} />
            </div>
            <Progress.Line style={{ color: "white" }} trailColor="#11111180" percent={Number(percent.toFixed(2))} strokeColor="rgb(0,255,139)"/>
        </div>
    )
}
