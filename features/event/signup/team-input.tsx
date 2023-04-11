import {AvailableColors} from "../../../types/team";
import React, {Dispatch, SetStateAction, useEffect, useMemo, useState} from "react";
import {Pagination} from 'swiper';
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Input, Spin} from "antd";
import {CirclePicker} from "react-color";
import {Check, ChevronRight, Person, PersonAdd} from "@mui/icons-material";
import QuizEvent, {QuizEventSchema} from "../../../types/quizEvent";
import {TeamSignupRequest} from "../../../pages/api/event/[eventId]/signupTeam";
import axios from "axios";
import {LoadingOutlined} from "@ant-design/icons";
import {motion} from "framer-motion";
import PaginationContent from "../../../components/dialogs/with-pagination";
import {useDialog} from "../../../components/dialogs/use-dialog";
import TeamName from "./team-name";
import Players from "./players";
import DaySelection from "./day-selection";

export default function TeamInput({ event, onSubmit }: { event: QuizEvent, onSubmit: (event: QuizEvent) => void }) {
    const colors = useMemo(() => {
        return AvailableColors.filter((c) => event.teams.findIndex((el) => el.color === c) === -1);
    }, [event]);
    const [name, setName] = useState("");
    const [color, setColor] = useState(colors[0]);
    const [numOfMembers, setNumOfMembers] = useState(1);
    const [memberNames, setMemberNames] = useState<string[]>([""]);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const { setOpen, setLoading } = useDialog();

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
        const data: TeamSignupRequest = {
            name,
            color,
            players: memberNames,
            selectedDays
        };
        setLoading(true);
        const res = await axios.post(`/api/event/${event._id!}/signupTeam`, data);
        setLoading(false);
        onSubmit(QuizEventSchema.parse(res.data));
        setOpen(false);
    }

    return (
        <PaginationContent title="Team anmelden">
            <TeamName name={name} setName={setName} availableColors={colors} color={color} setColor={setColor} numOfMembers={numOfMembers} setNumOfMembers={setNumOfMembers} />
            <Players memberNames={memberNames} setMemberNames={setMemberNames} />
            <DaySelection onSubmit={handleSubmit} days={event.availableDays} selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
        </PaginationContent>
    )
}
