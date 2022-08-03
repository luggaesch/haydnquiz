import React, {ReactNode, SetStateAction, useMemo, useState} from "react";
import styles from "../../styles/question.module.css";
import {IconButton} from "rsuite";
import {Image as ImageIcon} from "@rsuite/icons/lib/icons";
import {EmojiObjects} from "@mui/icons-material";
import PopupContainer from "./popup-container";

export default function SolutionView({children, showSolution, setShowSolution, isInitialScreen}: { children: ReactNode, showSolution: boolean, setShowSolution: React.Dispatch<SetStateAction<boolean>>, isInitialScreen: boolean }) {

    return (
            <PopupContainer isInitialScreen={isInitialScreen} showContent={showSolution}
                            setShowContent={setShowSolution} backgroundColor={"var(--paper)"}>
                {children}
            </PopupContainer>
    )
}