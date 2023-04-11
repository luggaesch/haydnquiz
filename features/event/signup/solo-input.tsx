import React, {useState} from "react";
import 'swiper/css';
import 'swiper/css/pagination';
import QuizEvent, {QuizEventSchema} from "../../../types/quizEvent";
import PaginationContent from "../../../components/dialogs/with-pagination";
import {useDialog} from "../../../components/dialogs/use-dialog";
import Players from "./players";
import DaySelection from "./day-selection";
import {SoloSignupRequest} from "../../../pages/api/event/[eventId]/signupSolo";
import axios from "axios";

export default function SoloInput({ event, onSubmit }: { event: QuizEvent, onSubmit: (event: QuizEvent) => void }) {
    const [memberNames, setMemberNames] = useState<string[]>([""]);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const { setOpen, setLoading } = useDialog();

    async function handleSubmit() {
        const data: SoloSignupRequest = {
            name: memberNames[0],
            selectedDays
        };
        setLoading(true);
        const res = await axios.post(`/api/event/${event._id!}/signupSolo`, data);
        setLoading(false);
        onSubmit(QuizEventSchema.parse(res.data));
        setOpen(false);
    }

    return (
        <PaginationContent title="Alleine anmelden" label={"Wenn du dich alleine anmeldest, weisen wir dich vor Ort einem Team zu."}>
            <Players memberNames={memberNames} setMemberNames={setMemberNames} />
            <DaySelection isSolo onSubmit={handleSubmit} days={event.availableDays} selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
        </PaginationContent>
    )
}
