import {getIconByJoker, Jokers} from "../data/jokers";

export default function JokerPage() {

    return (
        <div style={{ justifyContent: "center", padding: 10, width: "100vw", height: "100vh", background: "white", color: "#222222280", fontSize: "1.9rem", display: "grid", gridTemplateColumns: "31% 31% 31%", gridTemplateRows: "40% 40%", gridGap: 10 }}>
            {Object.values(Jokers).map((j, index) => (
                <div key={index} style={{ color: "#222", fontWeight: "normal", background: "#fff", display: "grid", gridTemplateColumns: "45% 45%", textAlign: "center", alignItems: "center", borderRadius: 8, border: "1px solid #22222280", padding: 20 }}>
                    <div style={{ color: "222", borderRadius: "50%", border: "2px solid #22222280", width: 120, height: 120, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {getIconByJoker(j, "#222", 60, 60)}
                    </div>
                    <div>
                        {j}
                    </div>
                </div>
            ))}
        </div>
    )
}