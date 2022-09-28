import {signIn, signOut, useSession} from "next-auth/react"
import styles from "./header.module.css"
import {GiHamburgerMenu} from "react-icons/gi";
import PopupState, {bindPopover, bindTrigger} from 'material-ui-popup-state';
import Popover from "@mui/material/Popover";
import React from "react";
import {HomeFilled} from "@ant-design/icons";
import {Explore, Info} from "@mui/icons-material";
import {BiPurchaseTag,} from "react-icons/bi";
import {Empty} from "antd";
import Link from "next/link";

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
    const { data: session, status } = useSession()
    const loading = status === "loading"

    return (
        <header>
            <div style={{ position: "fixed", top: 10, right: 10, display: "flex", justifyContent: "center", alignItems: "center", gap: 10, zIndex: 10 }}>

                <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                        <div>
                            <div {...bindTrigger(popupState)} style={{ cursor: "pointer", fontSize: "1em", color: "white", borderRadius: "50%", width: "4rem", height: "4rem", display: "flex", justifyContent: "center", alignItems: "center", background: "#282828", boxShadow: "var(--elevation-shadow)" }}>
                                <GiHamburgerMenu />
                            </div>
                            <Popover
                                {...bindPopover(popupState)}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: -5,
                                    horizontal: 'center',
                                }}
                                style={{ background: "transparent" }}
                            >
                                <div style={{ background: "#282828", height: 400, width: 400, borderRadius: 12, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                    {session ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "80%", height: "80%" }}>
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", width: "100%", height: "100%", gridGap: 5 }}>
                                            <div style={{  display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <Link href={"/dashboard"} >
                                                    <a style={{ width: "80%", height: "80%" }}>
                                                        <div style={{ cursor: "pointer", fontSize: "2rem", borderRadius: 8, color: "white", boxShadow: "var(--elevation-shadow", backgroundColor: "var(--paper)", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            <HomeFilled />
                                                        </div>
                                                    </a>
                                                </Link>
                                            </div>
                                            <div style={{  display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <div style={{ fontSize: "2rem", borderRadius: 8, color: "white", boxShadow: "var(--elevation-shadow", backgroundColor: "var(--paper)", width: "80%", height: "80%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                    <Explore />
                                                </div>
                                            </div>
                                            <div style={{  display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <div style={{ fontSize: "2rem", borderRadius: 8, color: "white", boxShadow: "var(--elevation-shadow", backgroundColor: "var(--paper)", width: "80%", height: "80%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                    <Info />
                                                </div>
                                            </div>
                                            <div style={{  display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <div style={{ fontSize: "2rem", borderRadius: 8, color: "white", boxShadow: "var(--elevation-shadow", backgroundColor: "var(--paper)", width: "80%", height: "80%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                    <BiPurchaseTag />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                        <Empty style={{ fontSize: 16, color: "white", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }} description={"Sign in to use this App."} />
                                    }
                                </div>
                            </Popover>
                        </div>
                    )}
                </PopupState>
                {(session && session.user.image) ?
                    <PopupState variant="popover" popupId="demo-popup-popover">
                        {(popupState) => (
                            <div>
                                <span {...bindTrigger(popupState)}
                                    style={{ cursor: "pointer", backgroundImage: `url('https://images.unsplash.com/photo-1588167056840-13caf6e4562a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80')` }}
                                    className={styles.avatar}
                                />
                                <Popover
                                    {...bindPopover(popupState)}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: -5,
                                        horizontal: 'center',
                                    }}
                                    style={{ background: "transparent" }}
                                >
                                    <div style={{ background: "#282828", height: 400, width: 400, borderRadius: 12, color: "var(--text)" }}>
                                        <div style={{ display: "grid", gridTemplateRows: "2fr 1fr", height: "100%" }}>
                                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", borderBottom: "1px solid #11111180", color: "white", padding: 10 }}>
                                                <span
                                                    style={{ width: "6rem", height: "6rem", backgroundImage: `url('https://images.unsplash.com/photo-1588167056840-13caf6e4562a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80')` }}
                                                    className={styles.avatar}
                                                />
                                                <small style={{ fontSize: "0.8em", marginTop: 10, color: "#ffffffa0" }}>{session?.user.email}</small>
                                                <strong style={{ fontSize: "1.6em" }}>{session.user.name}</strong>
                                                <span style={{ boxShadow: "var(--elevation-shadow)", marginTop: 20, textAlign: "center", width: "80%", fontSize: "1.1rem", borderRadius: 20, backgroundColor: "var(--accent)", color: "#111", padding: "5px 15px" }}>Manage Account</span>
                                            </div>
                                            <div style={{ fontSize: "1.3rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                                <span>Not you?</span>
                                                <Link href={`/api/auth/signout`}>
                                                    <a
                                                        className={styles.button}
                                                        style={{ boxShadow: "var(--elevation-shadow)", marginTop: 10, textAlign: "center", width: "80%", fontSize: "1.1rem", borderRadius: 20, backgroundColor: "var(--paper)", color: "white", padding: "10px 15px" }}
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            signOut()
                                                        }}
                                                    >
                                                        Sign out
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Popover>
                            </div>
                        )}
                    </PopupState>
                    :
                    <span style={{ width: "10rem", height: "100%",  boxShadow: "var(--elevation-shadow)", textAlign: "center", fontSize: "1.2rem", borderRadius: 8, backgroundColor: "var(--accent)", color: "#111", padding: "8px 20px" }}>
                        <Link href={`/api/auth/signin`}>

                        <a
                            style={{ color: "inherit" }}
                            onClick={(e) => {
                                e.preventDefault()
                                signIn()
                            }}
                        >
                                Sign in
                            </a>
                        </Link>
                    </span>
                }
            </div>
        </header>
    )
}
