import styles from "../../../styles/question.module.css";
import {motion} from "framer-motion";
import React, {useMemo, useState} from "react";
import getAverageIndex from "../../../lib/median";
import {SortElement} from "../../../types/question";
import {FaArrowDown, FaArrowUp} from "react-icons/fa";

const successAnimation = {
    backgroundColor: ["#222", "rgba(0,255,139,0.67)", "#222"]
}

const failureAnimation = {
    backgroundColor: ["#222", "rgba(255,83,83,0.67)", "#222"]
}

const selectedAnimation = {
    backgroundColor: ["#222", "#333", "#444"],
}

export default function SortMiniGameView({ sortElements, unit }: { sortElements: SortElement[], unit: string }) {
    const [orderedItems, setOrderedItems] = useState<SortElement[]>([sortElements[getAverageIndex(sortElements.map((e) => e.value))]]);
    const [selectedElementIndex, setSelectedElementIndex] = useState(-1);
    const isFinished = useMemo(() => {
        return orderedItems.length === sortElements.length
    }, [orderedItems, sortElements]);
    const [successIndex, setSuccessIndex] = useState(-1);
    const [failureIndex, setFailureIndex] = useState(-1);

    function handleElementClick(index: number) {
        setSuccessIndex(-1);
        setFailureIndex(-1);
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
        const selectedElement = sortElements![selectedElementIndex];
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
        <div className={styles.sortColumnContainer}>
            {sortElements.length > 0 && orderedItems.length > 0 && <>
                <div className={styles.sortRowGrid}>
                    {sortElements.map((e, index, arr) => (
                        <motion.div
                            animate={(failureIndex !== -1 && e.value === arr[failureIndex].value) ? failureAnimation : (selectedElementIndex === index) ? selectedAnimation : {}}
                            transition={{
                                duration: 1,
                                ease: "easeInOut",
                                repeat: 0
                            }}
                            className={styles.sortItem}
                            onClick={() => handleElementClick(index)} key={index} style={{ display: orderedItems.indexOf(e) !== -1 ? "none" : "flex" }}>
                            {e.name}
                        </motion.div>
                    ))}
                </div>
                <div className={styles.sortRowGrid}>
                    {[...orderedItems].reverse().map((v, index, arr) => (
                        <motion.div key={v.name + index} className={styles.sortItem} style={{ display: "grid", gridTemplateColumns: "15fr 1fr" }}
                                    animate={(successIndex !== -1 && v.value === orderedItems[successIndex].value) ? successAnimation : {}}
                                    transition={{
                                        duration: 1,
                                        ease: "easeInOut",
                                        repeat: 0
                                    }}
                        >
                            <div>{v.name}{isFinished && ` - ${unit === "Date" ? new Date(v.value).toLocaleDateString() : (v.value + " " + unit)}`}</div>
                            {selectedElementIndex !== -1 &&
                                <div style={{ height: "100%", display: "grid", gridTemplateRows: "1fr 1fr", alignItems: "center", justifyContent: "center"  }}>
                                    <div onClick={() => handleSortAttempt(orderedItems.indexOf(v), 1)} style={{ height: 5,  display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <FaArrowUp style={{ fontSize: "0.5em" }} />
                                    </div>
                                    {index === arr.length -1 && <div onClick={() => handleSortAttempt(orderedItems.indexOf(v), -1)} style={{ height: 5, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <FaArrowDown style={{ fontSize: "0.5em" }}  />
                                    </div>}
                                </div>
                            }
                        </motion.div>
                    ))}
                </div>
            </>}
        </div>
    )
}
