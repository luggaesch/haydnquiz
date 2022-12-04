import Match from "../../types/match";
import MatchItem from "../../features/match/match-item";
import {Dispatch, SetStateAction, useMemo} from "react";
import {Empty} from "antd";
import {DashboardTabs} from "../../pages/dashboard";

export default function ResumeTab({ matches, setTab }: { matches: Match[], setTab: Dispatch<SetStateAction<DashboardTabs>> }) {
    const mostRecentUnfinishedMatch = useMemo(() => {
        return matches.length > 0 ? matches.reduce((a, b) => (a.startTime > b.startTime ? a : b)) : null;
    }, [matches]);

    return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
        {mostRecentUnfinishedMatch ?
        <MatchItem match={mostRecentUnfinishedMatch} />
        :
            <div style={{ width: "70%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
                <Empty imageStyle={{ width: 400, height: 400 }} description={false} />
                <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontSize: "3em" }}>
                    <p style={{ margin: "0 0 1em 0" }}>No active Matches!</p>
                    <span onClick={() => setTab(DashboardTabs.New)} style={{ cursor: "pointer", padding: 20, width: "100%", backgroundColor: "var(--accent)", color: "#222", borderRadius: 50, display: "flex", justifyContent: "center", alignItems: "center",  }}>Start a new Game</span>
                </div>
            </div>
        }
    </div> )
}
