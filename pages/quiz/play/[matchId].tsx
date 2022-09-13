import {GetServerSideProps} from "next";
import axios from "axios";
import Match from "../../../types/match";
import MatchView from "../../../components/questions/match-view";
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';

const themes = {
    light: '/theme/light.css',
    dark: '/theme/dark.css',
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const result = await axios.get(`${process.env.SERVER_URL}/api/match/fetchById/` + context.query.matchId);
    return {
        props: { match: JSON.parse(JSON.stringify(result.data)) }
    }
}

export default function MatchPage({ match }: { match: Match }) {

    return (
        <ThemeSwitcherProvider defaultTheme="light" themeMap={themes}>
            <MatchView match={match} />
        </ThemeSwitcherProvider>
    )
}
