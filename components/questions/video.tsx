import {WrapperChildProps} from "./wrapper";
import React, {useState} from "react";
import styles from "../../styles/question.module.css";
import ReactPlayer from "react-player";
import {IconButton} from "rsuite";
import {EmojiObjects, PlayArrowRounded} from "@mui/icons-material";
import PopupContainer from "../view/popup-container";
import SolutionView from "../view/solution-view";
import {GameState, useGameContext} from "../../contexts/GameContext";
import Image from "next/image";

export default function VideoQuestion({ question, showtimer, ...rest }: WrapperChildProps) {
    const {gameState} = useGameContext();
    const [showPlayer, setShowPlayer] = useState(false);
    const [isInitialScreen, setIsInitialScreen] = useState(true);
    const [showSolution, setShowSolution] = useState(false);
    const [isInitialSolutionScreen, setIsInitialSolutionScreen] = useState(true);

    return (
        <div {...rest}>
            <div className={styles.content}>
                <p>{question.caption}</p>
            </div>
            <div>
                <div className={styles.popupButtonContainer}>
                    <IconButton className={styles.popupButton}
                                icon={<PlayArrowRounded style={{ fontSize: "inherit" }} />} onClick={() => {
                                    setShowPlayer(true);
                                    setIsInitialScreen(false);
                    }} />
                </div>
                <PopupContainer isInitialScreen={isInitialScreen} showContent={showPlayer} setShowContent={setShowPlayer}>
                    <ReactPlayer controls={true} onEnded={() => showtimer!()}  width="100%" height="95%" url={question.media!.source} />
                </PopupContainer>
            </div>
            {gameState === GameState.Solutions && <>
                <IconButton className={styles.solutionButton}
                            icon={<EmojiObjects style={{ fontSize: "inherit" }} />} onClick={() => {
                    setShowSolution(true);
                    setIsInitialSolutionScreen(false);
                }} />
                <SolutionView showSolution={showSolution} setShowSolution={setShowSolution} isInitialScreen={isInitialSolutionScreen}>
                    {question.solutionUrl ?
                        <div className={styles.popupContainerContent}>
                            <Image layout="fill" objectFit="contain" src={question.solutionUrl}
                                   style={{background: question.media?.transparent ? "white" : "transparent"}} alt=""/>
                        </div>
                        :
                        typeof question.solution === "string" ? <div>{question.solution}</div> :
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

/*
<ReactPlayer url={"https://www.youtube.com/watch?v=SuqU904ZHA4"} />*/
