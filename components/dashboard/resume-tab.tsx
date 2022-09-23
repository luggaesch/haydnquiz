import Match from "../../types/match";
import MatchItem from "../view/match-item";
import Link from "next/link";

export default function ResumeTab({ match }: { match: Match }) {
    return (
        <MatchItem match={match} />
    )
}
