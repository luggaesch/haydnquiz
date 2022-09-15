import {WrapperChildProps} from "./wrapper";
import styles from "../../styles/question.module.css";
import React, {useMemo, useState} from "react";
import {motion} from "framer-motion";
import Image from "next/image";
import {baseImagePath} from "../../data/questions";
import {EmojiObjects} from "@mui/icons-material";
import SolutionView from "../view/solution-view";
import {GameState, useGameContext} from "../../contexts/GameContext";
import {SolutionTypes} from "../../types/question";
import {FaImage} from "react-icons/fa";
import {BsChevronDown} from "react-icons/bs"

export default function ImageQuestion({question, ...rest}: WrapperChildProps) {
    if (!question.media) {
        throw "No question.Media supplied";
    }
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

    return (
        <div {...rest}>
            <div className={styles.content}>
                <p>{question.caption}</p>
            </div>
            <div>
                <div className={styles.popupButtonContainer}>
                    <div
                        className={styles.popupButton}
                        onClick={() => {
                        setShowImage(true);
                        setIsInitialScreen(false);
                    }}>
                        <FaImage className={styles.buttonIcon}/>
                    </div>
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
                        {question.media.content ?
                            <Image layout="fill" objectFit="contain" src={question.media.content}
                                   style={{background: "white"}} alt=""/>
                            :
                            question.media.sources!.length === 8 ?
                                <div className={styles.imageGrid} style={{
                                    gridTemplateColumns: "25% 25% 25% 25%"
                                }}>
                                    {question.media.sources!.map((url: string, index: number) => (
                                        <div key={question._id + "_" + url} className={styles.imageWrap}>
                                            <div className={styles.imageLabel}>{index + 1}</div>
                                            <Image layout="fill" objectFit="cover" src={`${baseImagePath}${url}`}
                                                   alt={""}/>
                                        </div>))
                                    }
                                </div>
                                :
                                question.media.sources!.length === 4 ?
                                    <div className={styles.imageGrid} style={{
                                        gridTemplateColumns: "50% 50%",
                                        backgroundColor: "white"
                                    }}>
                                        {question.media.sources!.map((url: string, index: number) => (
                                            <div key={question._id + "_" + url} className={styles.imageWrap}
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
                                        {question.media.sources!.map((url: string) => (
                                            <div key={question._id + "_" + url}
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
                    <div className={styles.popupContainerCollapse}

                                onClick={() => {
                                    setShowImage(false);
                                }}>
                        <BsChevronDown style={{fontSize: "inherit"}}/>
                    </div>
                </motion.div>
            </div>
            {gameState === GameState.Solutions && <>
                <div className={styles.solutionButton}
                            onClick={() => {
                    setShowSolution(true);
                    setIsInitialSolutionScreen(false);
                }}>
                    <EmojiObjects style={{ fontSize: "inherit" }} />
                </div>
                <SolutionView showSolution={showSolution} setShowSolution={setShowSolution} isInitialScreen={isInitialSolutionScreen}>
                    {question.solutionType === SolutionTypes.Image ?
                        <div className={styles.popupContainerContent}>
                            <Image layout="fill" objectFit="contain" src={question.solution}
                                   style={{background: "white" }} alt=""/>
                        </div>
                        :
                        question.solutionType === SolutionTypes.List ?
                        <div style={{ width: "100%", height: "90%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "4rem" }}>
                            {(question.solutionArray!).map((s, index) => (
                                <p key={index}>{s}</p>
                            ))}
                        </div> : <div>{question.solution}</div>
                    }
                </SolutionView>
            </>}
        </div>
    )
}
