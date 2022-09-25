import {GetServerSideProps} from "next";
import {History, ListAltOutlined, PlayArrowOutlined} from "@mui/icons-material";
import Quiz from "../types/quiz";
import axios from "axios";
import {getSession} from "next-auth/react";
import Match from "../types/match";
import {Avatar} from "antd";
import {IoMdApps} from "react-icons/io";
import {User} from "next-auth";
import {VscDebugContinue} from "react-icons/vsc";
import {TeamOutlined} from "@ant-design/icons";
import styles from "../styles/dashboard.module.css";
import {useState} from "react";
import ResumeTab from "../components/dashboard/resume-tab";
import {motion} from "framer-motion";
import NewGameTab from "../components/dashboard/start-game-tab";
import TeamTab from "../components/dashboard/team-tab";
import Team from "../types/team";
import QuizzesTab from "../components/dashboard/quizzes-tab";
import {useRouter} from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    const result = await axios.get(`${process.env.SERVER_URL}/api/quiz/fetchForUserId/${session?.user.id}`);
    const quizzes = result.data;
    const matchQueryRes = await axios.get(`${process.env.SERVER_URL}/api/match/fetchOngoingForUserId/${session?.user.id}`);
    const matches = matchQueryRes.data;
    const teamQueryRes = await axios.get(`${process.env.SERVER_URL}/api/team/fetchByUserId/${session?.user.id}`)
    const teams = teamQueryRes.data;
    return {
        props: { user: session!.user, quizzes: JSON.parse(JSON.stringify(quizzes)), unfinishedMatches: JSON.parse(JSON.stringify(matches)), teams: JSON.parse(JSON.stringify(teams)) }
    }
}

export enum DashboardTabs {
    Resume,
    New,
    Quizzes,
    Teams,
    Previous
}

export default function Dashboard({ user, quizzes, unfinishedMatches, teams }: { user: User, quizzes: Quiz[], unfinishedMatches: Match[], teams: Team[] }) {
    const { push } = useRouter();
    const [currentQuizzes, setCurrentQuizzes] = useState(quizzes);
    const [currentTeams, setCurrentTeams] = useState(teams);
    const [tab, setTab] = useState<DashboardTabs>(DashboardTabs.Resume);
    const [selectedQuizId, setSelectedQuizId] = useState(quizzes[0] ? quizzes[0]._id : undefined);

    async function updateTeams(name: string, numOfMembers: number, color: string) {
        const res = await axios.post("/api/team/create", { team: { user: user.id, name, numOfPlayers: numOfMembers, color } });
        const team = res.data;
        console.log(team);
        setCurrentTeams([...currentTeams, team]);
    }

    async function updateQuizzes(name: string) {
        const res = await axios.post("/api/quiz/create", { quizName: name });
        const quiz = res.data;
        console.log(quiz);
        setCurrentQuizzes([...currentQuizzes, quiz]);
        push("/quiz/" + quiz._id);
    }

    function getComponentByTab() {
        switch (tab) {
            case DashboardTabs.Resume:
                return <ResumeTab matches={unfinishedMatches} setTab={setTab} />
            case DashboardTabs.New:
                return <NewGameTab selectedQuizId={selectedQuizId} setSelectedQuizId={setSelectedQuizId} quizzes={quizzes} teams={currentTeams} setTab={setTab} />
            case DashboardTabs.Teams:
                return <TeamTab teams={currentTeams} updateTeams={updateTeams} />
            case DashboardTabs.Quizzes:
                return <QuizzesTab setTab={setTab} setSelectedQuizId={setSelectedQuizId} quizzes={currentQuizzes} updateQuizzes={updateQuizzes} />
            default:
                return <div>Test</div>
        }
    }

    return (
        <div className={styles.root}>
            <div className={styles.sidebar}>
                <div className={styles.sidebarTitle}>
                    <div className={styles.navigation}><IoMdApps /></div>
                    <div className={styles.title}>Dashboard</div>
                </div>
                <div className={styles.sidebarUser}>
                    <Avatar src={<img src={"https://images.unsplash.com/photo-1467810563316-b5476525c0f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"} />} style={{ width: "10em", height: "10em" }} />
                    <div style={{ fontSize: "1.5em" }}>{user.name}</div>
                </div>
                <div className={styles.sideMenu}>
                    <div onClick={() => setTab(DashboardTabs.Resume)}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "0.8em" }}><VscDebugContinue /></div>
                        <div>Resume</div>
                    </div>
                    <div onClick={() => setTab(DashboardTabs.New)}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "0.8em" }}><PlayArrowOutlined /></div>
                        <div>Start new Game</div>
                    </div>
                    <div onClick={() => setTab(DashboardTabs.Quizzes)}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "0.8em" }}><ListAltOutlined /></div>
                        <div>Quizzes</div>
                    </div>
                    <div onClick={() => setTab(DashboardTabs.Teams)}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "0.8em" }}><TeamOutlined /></div>
                        <div>Teams</div>
                    </div>
                    <div onClick={() => setTab(DashboardTabs.Previous)}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "0.8em" }}><History /></div>
                        <div>Previous Games</div>
                    </div>
                    <motion.span initial={{ top: 0 }} animate={{ top: tab * 12.5 + "%" }} style={{ position: "absolute", top: 0, left: 2, width: 4, height: "10%", background: "var(--accent)", borderRadius: 10, transform: "translateY(12.5%)" }}></motion.span>
                </div>
            </div>
            <div style={{ overflow: "hidden" }}>
                {getComponentByTab()}
            </div>
        </div>
    )
}
