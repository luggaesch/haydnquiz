import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Wikipedia from "../public/wikipedia.svg";
import { library } from "@fortawesome/fontawesome-svg-core";
// @ts-ignore
import { faPeopleRobbery, faEye, faStarHalfStroke, faAnglesUp, faPhone } from "@fortawesome/free-solid-svg-icons"
import { faWikipediaW } from "@fortawesome/free-brands-svg-icons";

library.add(faPeopleRobbery, faEye, faStarHalfStroke, faAnglesUp, faPhone);
library.add(faWikipediaW);

export enum Joker {
    "Wikipedia"= "Wikipedia",
    "DoubleDown" = "Doppelt oder Nichts",
    "Teamwork" = '"Teamwork"',
    "VierGewinnt" = "Vier Gewinnt",
    "Ueberfall" = "Hände Hoch",
    "Telefon" = "Call me maybe"
}

export function getIconByJoker(joker: Joker, color?: string, width?: number, height?: number) {
    switch (joker) {
        case Joker.Wikipedia:
            //return <Wikipedia width={width ?? 128} height={height ?? 128} style={{ fill: color ?? "white", marginRight: 15, width: width ?? "100%", height: height ?? "100%" }} />;
            return <FontAwesomeIcon style={{ width: width ?? 128, height: height ?? 128 }} width={width ?? 128} height={height ?? 128} icon={["fab", "wikipedia-w"]} />
        case Joker.Ueberfall:
            return <FontAwesomeIcon style={{ width: width ?? 128, height: height ?? 128 }} width={width ?? 128} height={height ?? 128} icon="people-robbery" />
        case Joker.Teamwork:
            return <FontAwesomeIcon style={{ width: width ?? 128, height: height ?? 128 }} width={width ?? 128} height={height ?? 128} icon="eye" />
        case Joker.VierGewinnt:
            return <FontAwesomeIcon style={{ width: width ?? 128, height: height ?? 128 }} width={width ?? 128} height={height ?? 128} icon="star-half-stroke" />
        case Joker.DoubleDown:
            return <FontAwesomeIcon style={{ width: width ?? 128, height: height ?? 128 }} width={width ?? 128} height={height ?? 128} icon="angles-up" />
        case Joker.Telefon:
            return <FontAwesomeIcon style={{ width: width ?? 128, height: height ?? 128 }} width={width ?? 128} height={height ?? 128} icon="phone" />
    }   
}
