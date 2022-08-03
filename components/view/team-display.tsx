import {useTeamContext} from "../../contexts/TeamContext";
import {Person} from "@mui/icons-material";
import styles from "../../styles/team.module.css";

export default function TeamDisplay() {
    const { teams } = useTeamContext();

    return (
        <div className={styles.container}>
            <h3>Teams</h3>
            <div>
                {teams.map((t, index) => (
                    <div key={index} className={styles.teamItem}>
                        <p>{t.name}</p>
                        <div>
                            {[...Array(t.members)].map((e, index) => (
                                <Person style={{ color: t.color }} key={"p_" + index} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
