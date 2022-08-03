import * as React from "react";
import {ReactNode, SetStateAction, useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import styles from "../../styles/slideshow.module.css";

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        };
    }
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

export default function Slideshow({ nodes, currentIndex, setCurrentIndex }: { nodes: ReactNode[], currentIndex: number, setCurrentIndex: React.Dispatch<SetStateAction<number>> }) {
    const [[page, direction], setPage] = useState([currentIndex, 0]);

    const paginate = (newDirection: number) => {
        if (page + newDirection === nodes.length || page + newDirection < 0) return;
        setPage([page + newDirection, newDirection]);
        setCurrentIndex(page + newDirection);
    };

    useEffect(() => {
        setPage([currentIndex, currentIndex - page]);
    }, [currentIndex]);

    return (
        <div className={styles.slideshow}>
            <AnimatePresence initial={false} custom={direction} exitBeforeEnter={true}>
                <motion.div
                    key={page}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.1 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                            paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                            paginate(-1);
                        }
                    }}
                >
                    {nodes[currentIndex]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
