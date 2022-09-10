import Layout from "../components/layout"
import {GetServerSideProps} from "next";
import clientPromise from "../lib/mongodb";
import {getSession} from "next-auth/react";
import styles from "../styles/question.module.css";
import {Input} from "rsuite";
import React, {useState} from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const session = await getSession(context);
        const client = await clientPromise;
        // `await clientPromise` will use the default database passed in the MONGODB_URI
        // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
        //
        // `const client = await clientPromise`
        // `const db = client.db("myDatabase")`
        //
        // Then you can execute queries against your database like so:
        // db.find({}) or any of the MongoDB Node Driver commands
        if (session) {
            /*const db = client.db("hubquiz");
            const collection = db.collection("quizzes");
            const findResult = await collection.find({ owner: new mongo.ObjectId(session.user.id) }).toArray();
            console.log(findResult);*/
            /*await connectMongo;
            const quiz = new Quiz("haydnquiz", session.user.id, []);
            const result = await QuizModel.create(quiz);
            console.log(result);*/
        }
        return {
            props: { isConnected: true },
        }
    } catch (e) {
        console.error(e)
        return {
            props: { isConnected: false },
        }
    }
}

export default function ClientPage({ isConnected }: { isConnected: boolean }) {
    const [value, setValue] = useState("");

    async function onClick() {
        const res = await fetch("/api/hello", { method: "post", body: value });
        console.log(res.json());
    }

    return (
        <Layout>
            <h1>Client Side Rendering</h1>
            <p>
                This page uses the <strong>useSession()</strong> React Hook in the{" "}
                <strong>&lt;Header/&gt;</strong> component.
            </p>
            <p>
                The <strong>useSession()</strong> React Hook is easy to use and allows
                pages to render very quickly.
            </p>
            <p>
                The advantage of this approach is that session state is shared between
                pages by using the <strong>Provider</strong> in <strong>_app.js</strong>{" "}
                so that navigation between pages using <strong>useSession()</strong> is
                very fast.
            </p>
            <p>
                The disadvantage of <strong>useSession()</strong> is that it requires
                client side JavaScript.
            </p>
            <Input className={styles.input} value={value} onChange={(value) => setValue(value)} type="text"/>
            <div onClick={onClick} style={{ width: 300, height: 300, borderRadius: 8, background: "#222", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                Test
            </div>
        </Layout>
    )
}
