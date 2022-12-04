import {GetServerSideProps} from "next";
import axios from "axios";
import Match from "../../../types/match";
import MatchComponent from "../../../features/match";
import {GameProvider} from "../../../contexts/GameContext";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const result = await axios.get(`${process.env.SERVER_URL}/api/match/fetchById/` + context.query.matchId);
    return {
        props: { match: JSON.parse(JSON.stringify(result.data)) }
    }
}

export default function MatchWrapper({ match }: { match: Match }) {
    return (
        <GameProvider match={match} >
            <MatchComponent />
        </GameProvider>
    )
}