import Layout from "../components/layout";
import styles from "../styles/landing.module.css";

const Index = () => {
    return (
        <Layout>
            <div className={styles.heroImage}>
                <div className={styles.heroText} >
                    <h1 style={{ margin: 0, color: "white" }}>Haydnquiz</h1>
                    <div style={{ fontSize: "1.3rem", marginTop: 0 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div>
                </div>
                <div style={{ cursor: "pointer", fontWeight: "bold", boxShadow: "var(--elevation-shadow)", color: "white", textAlign: "center", fontSize: "2.5rem", width: "30%", background: "var(--dark-paper)", borderRadius: 40, padding: "20px 100px", marginTop: 30 }}>Sign up now!</div>
            </div>
        </Layout>
    )
}

export default Index;