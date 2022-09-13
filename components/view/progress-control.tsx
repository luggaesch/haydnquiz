import {useMemo} from "react";
import styles from "../../styles/progress.module.css";
import Left from "@rsuite/icons/legacy/Left";
import Right from "@rsuite/icons/legacy/Right";
import {Progress} from "antd";

export default function ProgressControl({ currentIndex, maxIndex, onTransition }: { currentIndex: number, maxIndex: number, onTransition: (modifier: number) => void }) {
    const percent = useMemo(() => {
        return ((currentIndex + 1) / (maxIndex + 1)) * 100;
    }, [currentIndex, maxIndex]);

    return (
        <div className={styles.container}>
            <div style={{ width: "100%", flexDirection: "row", display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <Left style={{ visibility: currentIndex === 0 ? "hidden" : "visible", color: "white", background: "transparent" }} className={styles.button} onClick={() => onTransition(-1)}/>
                <Right style={{ visibility: currentIndex === maxIndex ? "hidden" : "visible", color: "white", background: "transparent" }} className={styles.button} onClick={() => onTransition(1)} />
            </div>
            <Progress showInfo={false} style={{ color: "white" }} trailColor="#11111180" percent={Number(percent.toFixed(2))} strokeColor="rgb(0,255,139)"/>
        </div>
    )
}
