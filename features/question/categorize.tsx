import {Category} from "../../types/questions/categorize-question";
import React, {useCallback, useMemo, useReducer, useState} from "react";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import produce from "immer";
import styles from "./question.module.css";
import {v4} from "uuid";
import {motion} from "framer-motion";
import shuffle from "../../lib/shuffle";

const successAnimation = {
    backgroundColor: ["#282828", "rgba(0,255,139,0.67)", "#282828"]
}

const failureAnimation = {
    backgroundColor: ["#282828", "rgba(255,83,83,0.67)", "#282828"]
}

const dragReducer = produce((draft, action) => {
    switch (action.type) {
        case "MOVE": {
            draft[action.from] = draft[action.from] || [];
            draft[action.to] = draft[action.to] || [];
            const [removed] = draft[action.from].splice(action.fromIndex, 1);
            draft[action.to].splice(action.toIndex, 0, removed);
        }
    }
});

export default function CategorizeMiniGame({ categories }: { categories: Category[] }) {
    const {groups, items} = useMemo(() => {
        console.log("here");
        return {
            groups: categories.map((c) => c.name).map((g) => ({ id: v4(), str: g })),
            items: shuffle(categories.map((c) => c.items).flat(1).map((i) => ({ id: v4(), str: i}))),
        }
    }, [categories]);

    return (
        <View groups={[...groups]} items={[...items]} categories={[...categories]} />
    )
}

function View({ groups, items, categories }: { categories: Category[], groups: { id: string, str: string }[], items: { id: string, str: string }[] }) {
    const [state, dispatch] = useReducer(dragReducer, {
        g0: [],
        g1: [],
        g2: [],
        c0: items.slice(0, 4),
        c1: items.slice(4, 8),
        c2: items.slice(8, 12)
    });
    const [failId, setFailId] = useState<string | null>(null);
    const [successId, setSuccessId] = useState<string | null>(null);


    const onDragEnd = useCallback((result: DropResult) => {
        if (result.reason === "DROP") {
            if (!result.destination) {
                return;
            }
            if (result.destination.droppableId.includes("c")) return;
            const item = items.find((i) => {
                return result.draggableId === i.id;
            });
            const group = groups[Number(result.destination.droppableId.split("g")[1])];
            if (!item || !group) return;
            const category = categories.find((c) => c.name === group.str && c.items.includes(item.str));
            if (!category) {
                setFailId(item.id);
                return;
            }
            console.log(group);
            setSuccessId(group.id);
            dispatch({
                type: "MOVE",
                from: result.source.droppableId,
                to: result.destination.droppableId,
                fromIndex: result.source.index,
                toIndex: result.destination.index,
            });
        }
    }, []);

    return (
        <div style={{ width: "100%", height: "100%", padding: 10, display: "grid", gap: 10, gridTemplateRows: "1fr 1fr" }}>
            <DragDropContext onDragEnd={onDragEnd}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                    {groups.map((group, i) => (
                        <Droppable key={i} droppableId={"g"+i}>
                            {(provided, snapshot) => {
                                return (
                                    <motion.div ref={provided.innerRef}
                                         {...provided.droppableProps}
                                        animate={successId === group.id ? successAnimation : {}}
                                        transition={{ repeat: 0, duration: 1 }}
                                        onAnimationComplete={() => setSuccessId(null)}
                                         style={{ position: "relative", boxShadow: "var(--elevation-shadow)", width: 400, height: 400, color: "white", backgroundColor: "#282828", borderRadius: "50%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
                                    >
                                        <div style={{ fontSize: 26, transition: "all 0.2s ease-in-out", position: "absolute", top: state["g"+i]?.length === 0 ? "50%" : 15, left: "50%", transform: "translateX(-50%)" + (state["g"+i]?.length === 0 ? " translateY(-50%)" : "") }}>{group.str}</div>
                                        {state["g"+i]?.map((item: { id: string, str: string }, index: number) => {
                                            return (
                                                <Draggable isDragDisabled={true} draggableId={item.id} index={index} key={item.id}>
                                                    {(provided, snapshot) => {
                                                        return (
                                                            <div
                                                                ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                            >
                                                                {item.str}
                                                            </div>
                                                        )
                                                    }}
                                                </Draggable>
                                            )
                                        })}
                                        {provided.placeholder}
                                    </motion.div>
                                )
                            }}
                        </Droppable>
                    ))}
                </div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", gap: 10  }}>
                    {[...Array(3)].map((el, i) => (
                        <Droppable key={i} droppableId={"c"+i}>
                            {(provided, snapshot) => {
                                return (
                                    <div ref={provided.innerRef}
                                         {...provided.droppableProps}
                                         style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", height: "100%" }}
                                    >
                                        {state["c"+i]?.map((item: { id: string, str: string }, index: number) => {
                                            return (
                                                <Draggable draggableId={item.id} index={index} key={item.id}>
                                                    {(provided, snapshot) => {
                                                        return (
                                                            // @ts-ignore
                                                            <motion.div
                                                                animate={failId === item.id ? failureAnimation : {}}
                                                                transition={{ repeat: 0, duration: 1 }}
                                                                onAnimationComplete={() => setFailId(null)}
                                                                className={`${styles.categorizeItem} ${snapshot.isDragging ? styles.categorizeItemGrabbed : ""}`}
                                                                ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                            >
                                                                {item.str}
                                                            </motion.div>
                                                        )
                                                    }}
                                                </Draggable>
                                            )
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )
                            }}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
        /*<div style={{ display: "grid", gridTemplateRows: "1fr 1fr", width: "100%", height: "100%", padding: 10 }}>
            <DragDropContext onDragEnd={onDragEnd}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                    {groups.map((group, index) => (
                        <Droppable key={index} droppableId={group}>
                            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={{ fontSize: 34, boxShadow: "var(--elevation-shadow", color: "white", height: 400, width: 400, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: 10,
                                        backgroundColor: snapshot.isDraggingOver ? "#444" : "#333", borderRadius: "50%" }}
                                    {...provided.droppableProps}
                                >
                                    {group}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: `repeat(3, 1fr)`, gridGap: 12,  }}>
                    {[...Array(3)].map((i) => (
                        <Droppable key={i} droppableId={"r" + i}>
                            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={{ backgroundColor: snapshot.isDraggingOver ? "transparent" : "#444", display: "grid", gridTemplateRows: "repeat(4, 1fr)", gridRowGap: 10 }}
                                    {...provided.droppableProps}
                                >
                                    <InnerList items={items.slice(items.length / 3, items.length/3 + 4)} />
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>*/
    )
}