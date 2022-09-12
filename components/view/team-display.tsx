import {Person} from "@mui/icons-material";
import styles from "../../styles/team.module.css";
import Team from "../../types/team";

export default function TeamDisplay({ teams }: { teams: Team[] }) {

    return (
        <div className={styles.container}>
            <h3>Teams</h3>
            <div>
                {teams.map((t, index) => (
                    <div key={index} className={styles.teamItem}>
                        <p>{t.name}</p>
                        <div>
                            {[...Array(t.numOfPlayers)].map((e, index) => (
                                <Person style={{ color: t.color }} key={"p_" + index} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
