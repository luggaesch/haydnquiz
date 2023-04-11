import EventPage from "../../features/event";
import QuizEvent from "../../types/quizEvent";
import {GetServerSideProps} from "next";
import connectMongo from "../../lib/db/connectMongo";
import {resetServerContext} from "react-beautiful-dnd";
import {QuizEventModel} from "../../lib/db/models";

export const getServerSideProps: GetServerSideProps = async (context) => {
    await connectMongo;
    const { eventId } = context.query;
    const event = await QuizEventModel.findOne({ _id: eventId }).populate("teams");

    return {
        props: { event: JSON.parse(JSON.stringify(event)) }
    }
}

resetServerContext();

export default function EventRoute({ event }: { event: QuizEvent }) {

    return (
        <EventPage event={event} />
    )
}