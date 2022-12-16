import {getColorByTopic, getIconByTopic} from "../../data/topics";
import {Topics as TopicList} from "../../data/topics";

export default function Topics() {

    return (
        <div style={{ width: "100%", height: "100%", padding: 20, display: "grid", gridTemplateColumns: "40% 40%", gridGap: 20, justifyContent: "center", alignItems: "center" }}>
            {Object.values(TopicList).map((t, index) => {
                const Icon = getIconByTopic(t);
                return (
                    <div key={index} style={{ backgroundColor: "var(--question-item)", fontSize: "2.1rem", height: "11vh", color: "var(--text)", borderRadius: 12, boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)", display: "grid", gridColumnGap: 15, gridTemplateColumns: "35% 55%" }}>
                        <div style={{ color: "#222", fontSize: "6rem", backgroundColor: getColorByTopic(t), borderRadius: "12px 0 0 12px", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)", }}>
                            <Icon style={{ fontSize: "inherit" }} />
                        </div>
                        <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}>{t}</div>
                    </div>
                )
            })}
        </div>
    )
}