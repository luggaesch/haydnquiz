import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
// @ts-ignore
import {faAnglesUp, faEye, faPeopleRobbery, faPhone, faStarHalfStroke, faAppleWhole} from "@fortawesome/free-solid-svg-icons"
import {faWikipediaW} from "@fortawesome/free-brands-svg-icons";

library.add(faPeopleRobbery, faEye, faStarHalfStroke, faAnglesUp, faPhone, faAppleWhole);
library.add(faWikipediaW);

export enum Jokers {
    "Wikipedia"= "Wikipedia",
    "DoubleDown" = "Doppelt oder Nichts",
    "Teamwork" = '"Teamwork"',
    "VierGewinnt" = "Vier Gewinnt",
    "Ueberfall" = "Hände Hoch",
    "Telefon" = "Call me maybe",
    "Lehrerliebling" = "Lehrerliebling"
}

export function getIconByJoker(joker: Jokers, color?: string, width?: number, height?: number) {
    switch (joker) {
        case Jokers.Wikipedia:
            //return <Wikipedia width={width ?? 84} height={height ?? 84} style={{ fill: color ?? "white", marginRight: 15, width: width ?? "100%", height: height ?? "100%" }} />;
            return <FontAwesomeIcon style={{ color: color ?? "#fff", width: width ?? 84, height: height ?? 84 }} width={width ?? 84} height={height ?? 84} icon={["fab", "wikipedia-w"]} />
        case Jokers.Ueberfall:
            return <FontAwesomeIcon style={{ color: color ?? "#fff",  width: width ?? 84, height: height ?? 84 }} width={width ?? 84} height={height ?? 84} icon="people-robbery" />
        case Jokers.Teamwork:
            return <FontAwesomeIcon style={{ color: color ?? "#fff",  width: width ?? 84, height: height ?? 84 }} width={width ?? 84} height={height ?? 84} icon="eye" />
        case Jokers.VierGewinnt:
            return <FontAwesomeIcon style={{ color: color ?? "#fff",  width: width ?? 84, height: height ?? 84 }} width={width ?? 84} height={height ?? 84} icon="star-half-stroke" />
        case Jokers.DoubleDown:
            return <FontAwesomeIcon style={{ color: color ?? "#fff", width: width ?? 84, height: height ?? 84 }} width={width ?? 84} height={height ?? 84} icon="angles-up" />
        case Jokers.Telefon:
            return <FontAwesomeIcon style={{ color: color ?? "#fff", width: width ?? 84, height: height ?? 84 }} width={width ?? 84} height={height ?? 84} icon="phone" />
        case Jokers.Lehrerliebling:
            return <FontAwesomeIcon style={{ color: color ?? "#fff", width: width ?? 64, height: height ?? 64 }} width={width ?? 64} height={height ?? 64} icon="apple-whole" />
    }
}
