import React, {Dispatch, SetStateAction} from "react";
import {useSwiper} from "swiper/react";
import {Input} from "antd";
import {CirclePicker} from "react-color";
import {ChevronRight, Person, PersonAdd} from "@mui/icons-material";

export default function TeamName({ name, setName, availableColors, color, setColor, numOfMembers, setNumOfMembers }: { name: string, setName: Dispatch<SetStateAction<string>>, availableColors: string[], color: string, setColor: Dispatch<SetStateAction<string>>, numOfMembers: number, setNumOfMembers: Dispatch<SetStateAction<number>> }) {
    const swiper = useSwiper();

    return (
        <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p style={{ marginTop: 18, width: "100%", textAlign: "left", fontSize: 11, color: "#bbb" }}>Name</p>
            <Input maxLength={25} style={{ background: "transparent", color: "white" }} value={name} onChange={(event) => setName(event.target.value)} placeholder={"Teamname eingeben"}  />
            <p style={{ marginTop: 18, width: "100%", textAlign: "left", fontSize: 11, color: "#bbb" }}>Farbe</p>
            <CirclePicker color={color} onChange={(color) => setColor(color.hex)} colors={availableColors} />
            <p style={{ marginTop: 18, width: "100%", textAlign: "left", fontSize: 11, color: "#bbb" }}>Anzahl der Mitglieder</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
                {[...Array(numOfMembers)].map((e, index) => (
                    <Person onClick={() => setNumOfMembers(numOfMembers - 1)} style={{ cursor: "pointer", fontSize: "2rem", color: color }} key={"p_" + index} />
                ))}
                {numOfMembers <= 7 && <div onClick={() => setNumOfMembers(numOfMembers + 1)} style={{ cursor: "pointer", fontSize: "2rem", backgroundColor: "transparent", color: `${color}80` }}>
                    <PersonAdd style={{ fontSize: "inherit" }} />
                </div>}
            </div>
            {name !== "" && <div onClick={() => swiper.slideNext()} style={{ cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "var(--elevation-shadow)", position: "absolute", bottom: 10, right: 0, width: 50, height: 50, backgroundColor: "#303030", borderRadius: "50%" }}>
                <ChevronRight style={{ color: "var(--accent)" }} />
            </div>}
        </div>
    )
}