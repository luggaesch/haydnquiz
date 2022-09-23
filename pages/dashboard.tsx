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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    const result = await axios.get(`${process.env.SERVER_URL}/api/quiz/fetchForUserId/${session?.user.id}`);
    const quizzes = result.data;
    const matchQueryRes = await axios.get(`${process.env.SERVER_URL}/api/match/fetchOngoingForUserId/${session?.user.id}`);
    const matches = matchQueryRes.data;
    return {
        props: { user: session.user, quizzes: JSON.parse(JSON.stringify(quizzes)), unfinishedMatches: JSON.parse(JSON.stringify(matches)) }
    }
}

export default function Dashboard({ user, quizzes, unfinishedMatches }: { user: User, quizzes: Quiz[], unfinishedMatches: Match[] }) {

    return (
        <div className={styles.root}>
            <div className={styles.sidebar}>
                <div className={styles.sidebarTitle}>
                    <div><IoMdApps /></div>
                    <p>Dashboard</p>
                </div>
                <div className={styles.sidebarUser}>
                    <Avatar src={<img src={"https://images.unsplash.com/photo-1467810563316-b5476525c0f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"} />} style={{ width: "10em", height: "10em" }} />
                    <div style={{ fontSize: "1.5em" }}>{user.name}</div>
                </div>
                <div className={styles.sideMenu}>
                    <div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "0.8em" }}><VscDebugContinue /></div>
                        <div>Resume</div>
                    </div>
                    <div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "0.8em" }}><PlayArrowOutlined /></div>
                        <div>Start new Game</div>
                    </div>
                    <div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "0.8em" }}><ListAltOutlined /></div>
                        <div>Quizzes</div>
                    </div>
                    <div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "0.8em" }}><TeamOutlined /></div>
                        <div>Teams</div>
                    </div>
                    <div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "0.8em" }}><History /></div>
                        <div>Previous Games</div>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}
