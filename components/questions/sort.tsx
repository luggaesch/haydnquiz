import {WrapperChildProps} from "./wrapper";
import styles from "../../styles/question.module.css";
import {motion} from "framer-motion";
import React, {useEffect, useMemo, useState} from "react";
import {OrderElement} from "../../data/questions";
import getAverageIndex from "../../lib/median";
import PopupContainer from "../view/popup-container";
import {FaSortUp} from "react-icons/fa";
import {FcDown, FcUp} from "react-icons/fc";

const successAnimation = {
    backgroundColor: ["#fff", "rgba(0,255,139,0.67)", "#fff"]
}

const failureAnimation = {
    backgroundColor: ["#fff", "rgba(255,83,83,0.67)", "#fff"]
}

const selectedAnimation = {
    backgroundColor: ["#fff", "#eee", "#ddd"]
}

export default function SortQuestion({ question, ...rest }: WrapperChildProps) {
    const [orderedItems, setOrderedItems] = useState<OrderElement[]>([question.sortElements![getAverageIndex(question.sortElements!.map((e) => e.value))]])
    const [selectedElementIndex, setSelectedElementIndex] = useState(-1);
    const [showGame, setShowGame] = useState(false);
    const [isInitialScreen, setIsInitialScreen] = useState(true);
    const isFinished = useMemo(() => {
        return orderedItems.length === question.sortElements!.length
    }, [orderedItems, question]);
    const [successIndex, setSuccessIndex] = useState(-1);
    const [failureIndex, setFailureIndex] = useState(-1);

    useEffect(() => {
        console.log(isFinished);
    }, [isFinished]);

    function handleElementClick(index: number) {
        setSuccessIndex(-1);
        setFailureIndex(-1);
        console.log(question.sortElements![index]);
        if (selectedElementIndex === index) {
            setSelectedElementIndex(-1);
        } else {
            setSelectedElementIndex(index);
        }
    }

    function handleSortAttempt(currentIndex: number, modifier: 1 | -1) {
        if (selectedElementIndex === -1) return;
        setSelectedElementIndex(-1);
        const targetIndex = currentIndex + modifier;
        const selectedElement = question.sortElements![selectedElementIndex];
        let success = false;
        if (targetIndex === -1) {
            if (selectedElement.value < orderedItems[0].value) {
                orderedItems.push(selectedElement);
                setSuccessIndex(0);
                success = true;
            }
        } else if (targetIndex === orderedItems.length) {
            if (selectedElement.value > orderedItems[orderedItems.length - 1].value) {
                orderedItems.push(selectedElement);
                setSuccessIndex(orderedItems.length - 1);
                success = true;
            }
        } else {
            if (modifier > 0) {
                if (selectedElement.value > orderedItems[currentIndex].value && selectedElement.value < orderedItems[targetIndex].value) {
                    orderedItems.push(selectedElement);
                    setSuccessIndex(targetIndex);
                    success = true;
                }
            } else {
                if (selectedElement.value < orderedItems[currentIndex].value && selectedElement.value > orderedItems[targetIndex].value) {
                    orderedItems.push(selectedElement);
                    setSuccessIndex(targetIndex);
                    success = true;
                }
            }
        }
        if (success) {
            setOrderedItems([...orderedItems.sort((a, b) => {
                if (a.value > b.value) return 1;
                else if (a.value < b.value) return -1;
                return 0;
            })]);
        } else {
            setFailureIndex(selectedElementIndex);
        }
    }

    return (
        <div {...rest}>
            <div className={styles.content}>
                <p>{question.caption}</p>
            </div>
            <div>
                <div className={styles.popupButtonContainer}>
                    <div className={styles.popupButton}
                                onClick={() => {
                        setShowGame(true);
                        setIsInitialScreen(false);
                    }}>
                        <FaSortUp style={{ fontSize: "inherit" }} />
                    </div>
                </div>
                <PopupContainer isInitialScreen={isInitialScreen} showContent={showGame} setShowContent={setShowGame} backgroundColor={"#fff"}>
                    <div className={styles.sortColumnContainer}>
                        <div className={styles.sortRowGrid}>
                            {question.sortElements!.map((e, index, arr) => (
                                <motion.div
                                    animate={(failureIndex !== -1 && e.value === arr[failureIndex].value) ? failureAnimation : (selectedElementIndex === index) ? selectedAnimation : {}}
                                    transition={{
                                        duration: 1,
                                        ease: "easeInOut",
                                        repeat: 0
                                    }}
                                    className={styles.sortItem}
                                    onClick={() => handleElementClick(index)} key={question._id! + index} style={{ display: orderedItems.indexOf(e) !== -1 ? "none" : "flex" }}>
                                    {e.name}
                                </motion.div>
                            ))}
                        </div>
                        <div className={styles.sortRowGrid}>
                            {[...orderedItems].reverse().map((v, index, arr) => (
                                <motion.div key={question._id + "_v_" + v.name} className={styles.sortItem} style={{ position: "relative" }}
                                            animate={(successIndex !== -1 && v.value === orderedItems[successIndex].value) ? successAnimation : {}}
                                            transition={{
                                                duration: 1,
                                                ease: "easeInOut",
                                                repeat: 0
                                            }}
                                >
                                    {v.name}{isFinished && ` - ${question.unit! === "Date" ? new Date(v.value).toLocaleDateString() : (v.value + " " + question.unit!)}`}
                                    {selectedElementIndex !== -1 &&
                                        <>
                                            <div className={styles.sortButton} onClick={() => handleSortAttempt(orderedItems.indexOf(v), 1)} style={{ borderRadius: "4px 4px 0 0", top: 0, transform: "translateY(5px)" }}>
                                                <FcUp />
                                            </div>
                                            {index === arr.length -1 && <div className={styles.sortButton} onClick={() => handleSortAttempt(orderedItems.indexOf(v), -1)} style={{ borderRadius: "0 0 4px 4px", bottom: 0, transform: "translateY(-5px)" }}>
                                                <FcDown />
                                            </div>}
                                        </>
                                    }
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </PopupContainer>
            </div>
        </div>
    )
}
