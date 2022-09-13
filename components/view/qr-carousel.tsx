import {Carousel} from "antd";
import {QRCodeCanvas} from "qrcode.react";
import Match from "../../types/match";
import Question from "../../types/question";
import 'antd/dist/antd.css';
import styles from "../../styles/question.module.css";


const contentStyle: React.CSSProperties = {
    height: '100vh',
    width: "100%",
    color: '#fff',
    lineHeight: '100vh',
    textAlign: 'center',
};

export default function QrCarousel({ match, currentQuestion, setShowAnswerInput }: { match: Match, currentQuestion: Question, setShowAnswerInput: (value: boolean) => void }) {

    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <Carousel afterChange={onChange} dots={{className: styles.dots}}>
                {match.teams.map((team, index) => {
                    return (
                        <div key={index}>
                            <div style={contentStyle}>
                                <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", border: `2px dashed ${team.color}`, borderRadius: 8, padding: 100 }}>
                                        <QRCodeCanvas style={{ border: "20px solid white" }} size={512} value={`http://192.168.178.30:3000/quiz/play/${match._id}/${match.quiz.questions[0]._id}/${currentQuestion._id}/${team._id}`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </Carousel>
            <div style={{ color: "black", position: "absolute", bottom: 10, right: 20 }} onClick={() => setShowAnswerInput(false)}>Weiter</div>
        </div>
    )
}
