import React, {ReactNode, SetStateAction} from "react";
import PopupContainer from "./popup-container";

export default function SolutionView({children, showSolution, setShowSolution, isInitialScreen}: { children: ReactNode, showSolution: boolean, setShowSolution: React.Dispatch<SetStateAction<boolean>>, isInitialScreen: boolean }) {

    return (
            <PopupContainer isInitialScreen={isInitialScreen} showContent={showSolution}
                            setShowContent={setShowSolution} backgroundColor={"var(--paper)"}>
                {children}
            </PopupContainer>
    )
}