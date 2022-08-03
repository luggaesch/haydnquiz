import QRCodeSVG from "qrcode.react";
import styles from "../../styles/codedisplay.module.css";

export default function CodeDisplay({ url }: { url: string }) {

    return (
        <div className={styles.container}>
            <QRCodeSVG size={450} style={{ gridColumn: 1, gridRow: 1}} value={url} />
        </div>
    )
}
