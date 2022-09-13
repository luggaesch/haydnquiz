import React, {Dispatch, ReactNode, SetStateAction} from "react";
import {Drawer, Space} from "antd";
import Link from "next/link";
import styles from "../../styles/drawer.module.css";
import {Home} from "@mui/icons-material";
import {PageNext, PagePrevious} from "@rsuite/icons";
import {useGameContext} from "../../contexts/GameContext";

export default function RightDrawer({ open, setOpen, children }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, children: ReactNode }) {
    const { gameState, setGameState, currentQuestionNum, maxQuestionNum } = useGameContext();

    return (
        <Drawer headerStyle={{  borderBottom: "1px solid #333333", color: "white", height: "100%" }} bodyStyle={{ padding: 15 }} drawerStyle={{ color: "white", backgroundColor: "#222222", height: "100%" }} width={500} placement={'right'} open={open} onClose={() => setOpen(false)}
            extra={
            <Space style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
                <Link href={"/dashboard"} style={{ textDecoration: "none" }}>
                    <a className={styles.container}>
                        <Home style={{ fontSize: "inherit" }} />
                    </a>
                </Link>
                <div className={styles.container} onClick={() => setGameState(gameState - 1)}>
                    <PagePrevious style={{ fontSize: "inherit" }}  />
                </div>
                <div className={styles.container} onClick={() => currentQuestionNum === maxQuestionNum - 1 && setGameState(gameState + 1)}>
                    <PageNext style={{ fontSize: "inherit" }} />
                </div>
            </Space>
            }
        >
            <div style={{ height: "100%", overflowY: "hidden", background: "#222222", display: "grid", gridTemplateRows: "1fr 10fr 2fr" }}>
                {children}
            </div>
        </Drawer>
    )
}
