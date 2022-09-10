import {GetServerSideProps} from "next";
import connectMongo from "../../lib/db/connectMongo";
import QuestionWrapper from "../../components/questions/wrapper";
import Quiz from "../../types/quiz";
import {QuizModel} from "../../lib/db/models";

export const getServerSideProps: GetServerSideProps = async (context) => {
    await connectMongo;
    const quiz = await QuizModel.findOne({ _id: context.query.qid }).populate({ path: "questions", populate: { path: "media", model: "Media" } });

    console.log(quiz);

    return {
        props: { quiz: JSON.parse(JSON.stringify(quiz)) }
    }
}

export default function QuizPage({ quiz }: { quiz: Quiz }) {

    return (
        <div style={{ background: "#222", color: "white", height: "100vh", width: "100vw", margin: 0 }}>
            <p>{quiz.name}</p>
            <div style={{ display: "grid", gridGap: 10, gridAutoFlow: "column", overflow: "auto", height: "60vh", padding: 20 }}>
                {quiz.questions.map((question) => {
                    return (
                        <div key={question._id} style={{ minWidth: 320, minHeight: 180, boxShadow: "0 3px 6px rgba(0,0,0,0.19), 0 2px 2px rgba(0,0,0,0.23)" }}>
                            <QuestionWrapper  hideOverlay={true} question={question} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}