import {ThumbUp} from "@mui/icons-material";

export default function InputSuccess({ uploadRound }: { uploadRound: number }) {

    return (
        <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)", padding: 20, backgroundColor: "var(--question-item)", borderRadius: 12, width: "100%", maxWidth: 350, height: "50%",  gap: 30 }}>
                <ThumbUp style={{ fontSize: "12rem", color: "var(--accent)" }} />
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", color: "white", fontSize: 24, textAlign: "center" }}>
                    <div style={{ fontWeight: "bold" }}>Round {uploadRound + 1}</div>
                    <div >Successfully uploaded your Teams Answers!</div>
                </div>
            </div>
        </div>
    )
}
