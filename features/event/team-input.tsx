import {AvailableColors} from "../../types/team";
import React, {Dispatch, SetStateAction, useEffect, useMemo, useState} from "react";
import {Pagination} from 'swiper';
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Input, Spin} from "antd";
import {CirclePicker} from "react-color";
import {Check, ChevronRight, Person, PersonAdd} from "@mui/icons-material";
import QuizEvent, {QuizEventSchema} from "../../types/quizEvent";
import {SignupRequest} from "../../pages/api/event/[eventId]/signupTeam";
import axios from "axios";
import {LoadingOutlined} from "@ant-design/icons";
import {motion} from "framer-motion";

export default function TeamInput({ event, onSubmit }: { event: QuizEvent, onSubmit: (event: QuizEvent) => void }) {
    const colors = useMemo(() => {
        return AvailableColors.filter((c) => event.teams.findIndex((el) => el.color === c) === -1);
    }, [event]);
    const [name, setName] = useState("");
    const [color, setColor] = useState(colors[0]);
    const [numOfMembers, setNumOfMembers] = useState(1);
    const [memberNames, setMemberNames] = useState<string[]>([""]);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const mn = [...memberNames];
        if (numOfMembers > mn.length) {
            mn.push(...[...new Array(numOfMembers - mn.length)].map((e) => ""));
        } else if (numOfMembers < mn.length) {
            mn.splice(numOfMembers, mn.length - numOfMembers);
        }
        setMemberNames(mn);
    }, [numOfMembers]);

    async function handleSubmit() {
        const data: SignupRequest = {
            name,
            color,
            players: memberNames,
            selectedDays
        };
        setLoading(true);
        const res = await axios.post(`/api/event/${event._id!}/signupTeam`, data);
        setLoading(false);
        onSubmit(QuizEventSchema.parse(res.data));
    }

    return (
        <>
            {loading &&
                <motion.div style={{ backgroundColor: "#111111F0", position: "absolute", zIndex: 100, width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
                            animate={{ color: ["rgb(0,255,139)", "rgb(0,128,255)", "rgb(255, 0, 89)" , "rgb(0,255,139)"] }}
                            transition={{ repeatType: "reverse", repeat: Infinity, ease: "easeInOut", duration: 2.5, times: [0, 0.5, 1.5, 2.5] }}
                >
                    <Spin style={{ color: "inherit" }} indicator={<LoadingOutlined style={{ fontSize: "3rem", color: "inherit" }} spin />}  />
                </motion.div>
            }
            <div style={{ height: "100%", width: "100%", padding: 8 }}>
                <h2 style={{ color: "var(--text)" }}>Team anmelden</h2>
                <Swiper
                    modules={[ Pagination ]}
                    spaceBetween={50}
                    allowTouchMove={false}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                >
                    <SwiperSlide>
                        <FirstSection name={name} setName={setName} availableColors={colors} color={color} setColor={setColor} numOfMembers={numOfMembers} setNumOfMembers={setNumOfMembers} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SecondSection memberNames={memberNames} setMemberNames={setMemberNames} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ThirdSection onSubmit={handleSubmit} days={event.availableDays} selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    )
}

function FirstSection({ name, setName, availableColors, color, setColor, numOfMembers, setNumOfMembers }: { name: string, setName: Dispatch<SetStateAction<string>>, availableColors: string[], color: string, setColor: Dispatch<SetStateAction<string>>, numOfMembers: number, setNumOfMembers: Dispatch<SetStateAction<number>> }) {
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

function SecondSection({ memberNames, setMemberNames }: { memberNames: string[], setMemberNames: Dispatch<SetStateAction<string[]>> }) {
    const swiper = useSwiper();

    return (
        <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p style={{ marginTop: 18, width: "100%", textAlign: "left", fontSize: 11, color: "#bbb" }}>Teammitglieder</p>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
                {memberNames.map((m, index) => (
                    <Input style={{ background: "transparent", color: "white", width: "100%" }} key={index} placeholder={"Mitglied " + (index + 1)} value={m} onChange={(event) => setMemberNames([...memberNames.slice(0, index), event.target.value, ...memberNames.slice(index + 1)] )} />
                ))}
            </div>
            {memberNames.findIndex((b) => b === "") === -1 && <div onClick={() => swiper.slideNext()} style={{ cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "var(--elevation-shadow)", position: "absolute", bottom: 10, right: 0, width: 50, height: 50, backgroundColor: "#303030", borderRadius: "50%" }}>
                <ChevronRight style={{ color: "var(--accent)" }} />
            </div>}
        </div>
    )
}

function ThirdSection({ days, selectedDays, setSelectedDays, onSubmit }: { days: string[], selectedDays: string[], setSelectedDays: Dispatch<SetStateAction<string[]>>, onSubmit: () => void }) {
    const [noneSelected, setNoneSelected] = useState(false);

    return (
        <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p style={{ marginTop: 18, width: "100%", textAlign: "left", fontSize: 11, color: "#bbb" }}>Wann habt ihr Zeit?</p>
            <div style={{ width: "100%", overflowY: "auto", maxHeight: "80%", display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                {days.map((d, index) => (
                    <div onClick={() => {
                        if (selectedDays.includes(d)) {
                            const s = [...selectedDays];
                            s.splice(selectedDays.findIndex((el) => el === d), 1);
                            setSelectedDays(s);
                        } else {
                            setSelectedDays([...selectedDays, d]);
                            setNoneSelected(false);
                        }
                    }
                    } style={{ fontSize: 12, backgroundColor: selectedDays.includes(d) ? "var(--accent)" : "transparent", width: "50%", padding: 10, color: selectedDays.includes(d) ? "#111" : "white", borderRadius: 4, border: selectedDays.includes(d) ? "1px solid transparent" : "1px solid white", cursor: "pointer" }} key={index}>
                        {new Date(Date.parse(d)).toLocaleDateString("de-DE", { day: "numeric", month: "long" })}
                    </div>
                ))}
                <div onClick={() => {
                    setSelectedDays([]);
                    setNoneSelected(!noneSelected);
                }} style={{ fontSize: 12, backgroundColor: noneSelected ? "var(--accent)" : "transparent", width: "50%", padding: 10, color: noneSelected ? "#111" : "white", borderRadius: 4, border: noneSelected ? "1px solid transparent" : "1px solid white", cursor: "pointer" }}>
                    An keinem der Termine
                </div>
            </div>
            {(noneSelected || selectedDays.length > 0) && <div onClick={onSubmit} style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "var(--elevation-shadow)",
                position: "absolute",
                bottom: 10,
                right: 0,
                width: 50,
                height: 50,
                backgroundColor: "#303030",
                borderRadius: "50%"
            }}>
                <Check style={{color: "var(--accent)"}}/>
            </div>}
        </div>
    )
}