import {WrapperChildProps} from "./wrapper";
import styles from "../../styles/question.module.css";
import React, {useMemo, useState} from "react";
import {IconButton} from "rsuite";
import {motion} from "framer-motion";
import Down from "@rsuite/icons/legacy/Down";
import {Image as ImageIcon} from "@rsuite/icons";
import Image from "next/image";
import {baseImagePath} from "../../data/questions";
import {EmojiObjects} from "@mui/icons-material";
import SolutionView from "../view/solution-view";
import {GameState, useGameContext} from "../../contexts/GameContext";

export default function ImageQuestion({question, ...rest}: WrapperChildProps) {
    const {gameState} = useGameContext();
    const [showImage, setShowImage] = useState(false);
    const [isInitialScreen, setIsInitialScreen] = useState(true);
    const animation = useMemo(() => {
        if (isInitialScreen) return {scale: 0};
        return {
            scale: showImage ? [0, 1] : [1, 0],
            y: showImage ? ["100vh", "0vh"] : ["0vh", "100vh"]
        }
    }, [showImage, isInitialScreen]);
    const [showSolution, setShowSolution] = useState(false);
    const [isInitialSolutionScreen, setIsInitialSolutionScreen] = useState(true);

    const source = question.media!.source!;

    return (
        <div {...rest}>
            <div className={styles.content}>
                <p>{question.caption}</p>
            </div>
            <div>
                <div className={styles.popupButtonContainer}>
                    <IconButton
                        className={styles.popupButton}
                        icon={<ImageIcon className={styles.buttonIcon}/>} onClick={() => {
                        setShowImage(true);
                        setIsInitialScreen(false);
                    }}/>
                </div>
                <motion.div
                    animate={animation}
                    transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                        times: [0, 1],
                        repeat: 0,
                        repeatDelay: 0
                    }}
                    onClick={() => setShowImage(false)}
                    style={{
                        visibility: isInitialScreen ? "hidden" : "visible",
                    }}
                    className={styles.popupContainer}
                >
                    <div className={styles.popupContainerContent}>
                        {typeof source === "string" ?
                            <Image layout="fill" objectFit="contain" src={`${baseImagePath}${source}`}
                                   style={{background: question.media?.transparent ? "white" : "transparent"}} alt=""/>
                            :
                            source.length === 8 ?
                                <div className={styles.imageGrid} style={{
                                    gridTemplateColumns: "25% 25% 25% 25%"
                                }}>
                                    {source.map((url, index) => (
                                        <div key={question.id + "_" + url} className={styles.imageWrap}>
                                            <div className={styles.imageLabel}>{index + 1}</div>
                                            <Image layout="fill" objectFit="cover" src={`${baseImagePath}${url}`}
                                                   alt={""}/>
                                        </div>))
                                    }
                                </div>
                                :
                                source.length === 4 ?
                                    <div className={styles.imageGrid} style={{
                                        gridTemplateColumns: "50% 50%",
                                        backgroundColor: "white"
                                    }}>
                                        {source.map((url, index) => (
                                            <div key={question.id + "_" + url} className={styles.imageWrap}
                                                 style={{backgroundColor: "white", border: "1px solid #22222240", padding: 10 }}>
                                                <div className={styles.imageLabel}>{index + 1}</div>
                                                <Image layout="fill"
                                                       objectFit="contain"
                                                       src={`${baseImagePath}${url}`}
                                                       alt={""}/>
                                            </div>
                                        ))}
                                    </div>
                                    :
                                    <div className={styles.imageGrid} style={{
                                        gridRowGap: 10,
                                        gridTemplateRows: "33% 33% 33%",
                                        justifyContent: "center",
                                        backgroundColor: "#fff"
                                    }}>
                                        {source.map((url) => (
                                            <div key={question.id + "_" + url}
                                                 style={{
                                                     position: "relative",
                                                     width: "55vw",
                                                     height: "100%",
                                                     display: "flex",
                                                     justifyContent: "center"
                                                 }}>
                                                <Image layout="fill" objectFit="cover" src={`${baseImagePath}${url}`}
                                                       alt={""}/>
                                            </div>
                                        ))}
                                    </div>
                        }
                    </div>
                    <IconButton className={styles.popupContainerCollapse}
                                icon={<Down style={{fontSize: "inherit"}}/>}
                                onClick={() => {
                                    setShowImage(false);
                                }}/>
                </motion.div>
            </div>
            {gameState === GameState.Solutions && <>
                <IconButton className={styles.solutionButton}
                            icon={<EmojiObjects style={{ fontSize: "inherit" }} />} onClick={() => {
                    setShowSolution(true);
                    setIsInitialSolutionScreen(false);
                }} />
                <SolutionView showSolution={showSolution} setShowSolution={setShowSolution} isInitialScreen={isInitialSolutionScreen}>
                    {typeof question.solution === "string" ? question.solution :
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
