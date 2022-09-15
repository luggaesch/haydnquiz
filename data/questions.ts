import {Topics} from "./topics";
import {v4} from "uuid";
// @ts-ignore
import mixdown from "../assets/songs/mixdown.mp3";
// @ts-ignore
import intro_mixdown from "../assets/songs/intro_mixdown.mp3";
// @ts-ignore
import classic from "../assets/songs/classic.mp3";
import {Hearing, Image, Numbers, Sort, TextSnippet, VideoLibrary} from "@mui/icons-material";
import shuffle from "../lib/shuffle";
import {Jokers} from "./jokers";
import {List} from "antd";

export const baseImagePath = "/images/questions_resized/";

export enum MediaTypes {
    "Audio" = "Audio",
    "Video" = "Video",
    "Image" = "Image",
    "Text" = "Text"
}
export type OrderElement = {
    name: string,
    value: number
}

export function getIconByQuestionType(question: Question) {
    if (question.items) {
        return Sort;
    } else if (question.choices) {
        return List;
    } else if (typeof question.solution === "number") {
        return Numbers;
    }
    switch (question.media?.type) {
        case MediaTypes.Audio:
            return Hearing;
        case MediaTypes.Image:
            return Image;
        case MediaTypes.Video:
            return VideoLibrary;
        default:
            return TextSnippet;
    }
}

export type Question = {
    id: string,
    topic: Topics,
    caption: string,
    media?: { type: MediaTypes, source?: string | string[], file?: string, content?: string, transparent?: boolean },
    choices?: string[],
    items?: OrderElement[],
    unit?: string,
    solution: string | number | string[],
    solutionUrl?: string,
    value: number | Jokers,
    timeInSeconds: number
}

const questions: Question[] = [
    {
        id: v4(),
        topic: Topics.FoodAndDrinks,
        caption: "Wie viele Portionen befinden sich in einer handelsüblichen Packung dieses Produkts?",
        media: {type: MediaTypes.Image, source: "rolle.webp"},
        solution: "17",
        value: 2,
        timeInSeconds: 180
    },
    {
        id: v4(),
        topic: Topics.Linguistics,
        caption: 'Was bedeutet das Wort "Sahara" wörtlich übersetzt?',
        choices: ["Sand", "Trocken", "Wüste", "Tod"],
        solution: 2,
        value: 2,
        timeInSeconds: 150
    },
    {
        id: v4(),
        topic: Topics.Finance,
        caption: "Ordne folgende Produktionsstoffe nach ihrem Preis pro Kilogramm in Euro:",
        items: shuffle([
            { name: "Kupfer", value: 7.62 },
            { name: "Palmöl", value: 0.88 },
            { name: "Uran", value: 57.12 },
            { name: "Gold", value: 56785.20 },
            { name: "Zucker", value: 0.39 },
            { name: "Silber", value: 639.79 },
            { name: "Aluminium", value: 2.4 },
            { name: "Baumwolle", value: 2.2 },
            { name: "Lebendrind", value: 2.9 },
            { name: "Hopfen", value: 6.01 },
        ]),
        unit: "€/kg",
        solution: -1,
        value: Jokers.Wikipedia,
        timeInSeconds: -1,
    },
    {
        id: v4(),
        topic: Topics.Nature,
        caption: "Zu welcher Pflanze gehört dieses Blatt?",
        media: {type: MediaTypes.Image, source: "leaf.jpg"},
        solution: "Apfelbaum",
        value: 2,
        timeInSeconds: 180
    },
    {
        id: v4(),
        topic: Topics.PopCulture,
        caption: "Welche Unternehmen warben mit diesen Werbeslogans?",
        solution: [
            "Spiegel", "DM", "Apple", "Erasco", "Ferrero (Rocher)", "LBS", "L'Oreal", "Persil"
        ],
        value: 4,
        timeInSeconds: -1
    },
    {
        id: v4(),
        topic: Topics.Mystery,
        caption: "Wo findet man diese Zahlenfolge?",
        media: { type: MediaTypes.Text, content: "20 1 18 4 13 6 10 15 2 17 3 19 7 16 8 11 14 9 12 5" },
        solution: "Dartscheibe",
        solutionUrl: `${baseImagePath}dart.png`,
        value: 2,
        timeInSeconds: 150
    },
    {
        id: v4(),
        topic: Topics.Society,
        caption: "Wie viele Menschen sterben jährlich etwa in Folge eines Hundebisses?",
        solution: 25000,
        value: Jokers.VierGewinnt,
        timeInSeconds: 180
    },
    {
        id: v4(),
        topic: Topics.History,
        caption: "Wie heißen die beiden Söhne Thors?",
        solution: "Modi und Magni",
        value: 2,
        timeInSeconds: 180
    },
    {
        id: v4(),
        topic: Topics.Literature,
        caption: "Von welcher fiktionalen Figur stammt dieser Satz?",
        media: { type: MediaTypes.Text, content: "„Bis zum Letzten ring ich mit dir, aus dem Herzen der Hölle stech ich nach dir, dem Haß zu liebe spei' ich meinen letzten Hauch nach dir.“" },
        solution: "Kapitän Ahab (Moby Dick, Kapitel 135, S. 532)",
        value: 2,
        timeInSeconds: 150
    },
    {
        id: v4(),
        topic: Topics.Science,
        caption: 'Welches physikalische Phänomen soll das Gedankenexperiment "Schrödingers Katze" veranschaulichen?',
        solution: "Quantenmechanik",
        value: 2,
        timeInSeconds: 180
    },
    {
        id: v4(),
        topic: Topics.History,
        caption: 'Welche historischen Bauwerke zählen gemeinhin zu den Sieben "neuen Weltwundern"?',
        solution: [ "Taj Mahal (Indien)", "Felsenstadt Petra (Jordanien)", "Chinesische Mauer", "Chichen Itza (Mexiko)", "Machu Picchu (Peru)", "Kolloseum", "Christusstatue (Brasilien)" ],
        value: 4,
        timeInSeconds: 240
    },
    {
        id: v4(),
        topic: Topics.FoodAndDrinks,
        caption: "Ordne folgende Lebensmittel nach ihrem Kaloriengehalt pro 100 Gramm.",
        items: shuffle([
            { name: "Kartoffeln", value: 73 },
            { name: "Maoam", value: 394 },
            { name: "Mayonnaise", value: 680 },
            { name: "Pringles Original", value: 540 },
            { name: "Hafermilch", value: 42 },
            { name: "Räuchertofu", value: 170 },
            { name: "Rinderhack", value: 332 },
            { name: "Avocado", value: 160 },
            { name: "Käsekuchen", value: 321 },
            { name: "Mozarella", value: 280 },
        ]),
        unit: "kcal",
        solution: -1,
        value: Jokers.Telefon,
        timeInSeconds: -1
    },
    {
        id: v4(),
        topic: Topics.PopCulture,
        caption: "Aus welchen Medien, d.h. Filmen, Serien oder Videospielen, sind folgende Zehn Audiosequenzen entnommen?",
        media: {type: MediaTypes.Audio, file: intro_mixdown},
        solution: [
            "Findet Nemo", "Modern Family", "Digimon Tamers", "The Sopranos", "Yoshi's Story",
            "Der Herr der Ringe", "Grey's Anatomy", "Westworld", "Skyrim", "Chip und Chap"
        ],
        value: 5,
        timeInSeconds: 60
    },
    //// ---- BREAK
    {
        id: v4(),
        topic: Topics.Nature,
        caption: "Wofür steht die Abkürzung DNS/DNA und aus welchen Basen besteht diese?",
        solution: ["Desoxyribonukleinsäure", "Adenin", "Cytosin", "Guanin", "Thymin"],
        value: 3,
        timeInSeconds: 180
    },
    {
        id: v4(),
        topic: Topics.PopCulture,
        caption: "Aus welchem Film stammt dieser Ausschnitt?",
        media: { type: MediaTypes.Video, source: "https://streamable.com/rp5g18" },
        solution: "The Shining",
        solutionUrl: `${baseImagePath}shining.jpg`,
        value: 2,
        timeInSeconds: 60
    },
    {
        id: v4(),
        topic: Topics.History,
        caption: "Ordne folgende historischen Ereignisse nach ihrer Jahreszahl.",
        items: shuffle([
            { name: "Beirut Explosion", value: new Date(2020, 8, 4).getTime() },
            { name: "Brexit", value: new Date(2020, 2, 1).getTime() },
            { name: "Brand Notre Dame", value: new Date(2019, 4, 15).getTime() },
            { name: "Schwarzer Sommer Australien", value: new Date(2019, 6, 15).getTime() },
            { name: "Regierungsstillstand USA", value: new Date(2018, 12, 22).getTime() },
            { name: "Scheidung Kimye", value: new Date(2021, 2, 19).getTime() },
            { name: "Parasite gewinnt Oscar", value: new Date(2020, 2, 10).getTime()},
            { name: "GME Allzeithoch", value: new Date(2021, 1, 29).getTime() },
            { name: "Taliban Offensive Afghanistan", value: new Date(2021, 5, 21).getTime() },
            { name: "Hochwasser Westdeutschland", value: new Date(2021, 7, 14).getTime() }
        ]),
        unit: "Date",
        solution: -1,
        value: Jokers.Teamwork,
        timeInSeconds: -1
    },
    {
        id: v4(),
        topic: Topics.Music,
        caption: "Zu welchem Tanz gehört diese Schrittfolge?",
        media: { type: MediaTypes.Image, source: "dance.png", transparent: true },
        solution: "Walzer, Rumba, Foxtrot - (Box Step)",
        value: 2,
        timeInSeconds: 150
    },
    {
        id: v4(),
        topic: Topics.Science,
        caption: "Wie heißt das Verbindungsstück zwischen Kurbelwelle und Kolben?",
        choices: ["Pleuel", "Klöppel", "Grindel", "Biss"],
        solution: 0,
        value: 2,
        timeInSeconds: 150
    },
    {
        id: v4(),
        topic: Topics.Nature,
        caption: "Wie lauten die deutschen Namen dieser Tierarten?",
        media: {
            type: MediaTypes.Image, source: [
                "a0.jpg", "a1.jpg", "a2.jpg", "a3.jpg", "a4.jpg", "a5.jpg", "a6.jpg", "a7.jpg"]
        },
        solution: ["Elefantenspitzmaus", "Saola", "Serval", "Malaienbär", "Inland Taipan", "Beluga Wal", "Goldfasan", "Mandrill"],
        value: 5,
        timeInSeconds: 300
    },
    {
        id: v4(),
        topic: Topics.Finance,
        caption: "Welches Ergebnis erhält man, wenn man alle Zahlen eines Roulette Rades aufaddiert?",
        solution: "666",
        solutionUrl: `${baseImagePath}roulette.jpg`,
        value: 2,
        timeInSeconds: 180,
    },
    {
        id: v4(),
        topic: Topics.Geography,
        caption: "Wie tief ist die tiefste menschliche Bohrung in der Geschichte?",
        solution: 12262,
        value: Jokers.DoubleDown,
        timeInSeconds: 150
    },
    {
        id: v4(),
        topic: Topics.Music,
        caption: "Von welchem Komponisten stammt dieses Werk?",
        media: { type: MediaTypes.Audio, file: classic },
        solution: "Die Hochzeit des Figaro - Wolfgang Amadeus Mozart",
        value: 2,
        timeInSeconds: 30
    },
    {
        id: v4(),
        topic: Topics.FoodAndDrinks,
        caption: "Auf einer Seite im Rezeptbuch meiner Mama sind folgende Zutaten aufgelistet, doch einige Stellen sind wegen Schokoladenflecken nicht mehr lesbar. Wie lautet der Titel?",
        media: {type: MediaTypes.Image, source: "recipe.jpg"},
        solution: "Bienenstich",
        solutionUrl: `${baseImagePath}bienenstich.jpg`,
        value: 2,
        timeInSeconds: 180
    },
    {
        id: v4(),
        topic: Topics.History,
        caption: "Welchen Namen trägt der Vater von Megaras Kindern?",
        solution: "Herakles",
        solutionUrl: `${baseImagePath}heracles.webp`,
        value: 2,
        timeInSeconds: 150
    },
    {
        id: v4(),
        topic: Topics.Society,
        caption: "Wie heißen diese Personen des öffentlichen Lebens?",
        media: {
            type: MediaTypes.Image,
            source: ["p0.jpg", "p3.jpg", "p2.jpg", "p1.jpg", "p7.jpg", "p5.jpg", "p6.jpg", "p4.jpg"]
        },
        solution: [
            "Donald Falson", "Mai Thi NguyenKim", "Mike Shinoda", "Melinda French Gates", "Mitch McConnel",
            "Isla Fisher", "Serena Williams", "Floyd Mayweather",
        ],
        value: 4,
        timeInSeconds: 300
    },
    // ---- BREAK
    {
        id: v4(),
        topic: Topics.Linguistics,
        caption: "Wer oder was sind Muhme und Oheim?",
        solution: "Tante und Onkel (Altdeutsch)",
        value: 2,
        timeInSeconds: 150
    },
    {
        id: v4(),
        topic: Topics.Mystery,
        caption: "Die folgenden Einträge gehören jeweils zu einem Überbegriff. Nenne diesen.",
        // Tollenser, Juhla, Manchego, Batzos, Montasio, Ricotta, Gouda, Mozarella
        // Carida, Fondor, Mimban, Hoth, Alderaan, Endor, Mandalore, Tatooine
        // Briard, Hovawart, Papillon, Saluki, Vizsla, Leonberger, Collie, Labrador, Dackel
        solution: ["Käsesorten", "Star Wars Planeten", "Hunderassen"],
        value: 6,
        timeInSeconds: -1,
    },
    {
        id: v4(),
        topic: Topics.PopCulture,
        caption: "Ordne folgende Disney/Pixar Filme nach ihrem IMDB-Rating:",
        items: shuffle([
            { name: "Der König der Löwen", value: 8.5 },
            { name: "Aladdin", value: 8.00 },
            { name: "Dschungelbuch", value: 7.6 },
            { name: "Frozen", value: 7.4 },
            { name: "Lilo und Stich", value: 7.3 },
            { name: "Pocahontas", value: 6.7 },
            { name: "Der Glöckner v. Notre Dame", value: 7 },
            { name: "Toy Story", value: 8.3 },
            { name: "WALL-E", value: 8.4 },
            { name: "Findet Nemo", value: 8.2 },
        ]),
        unit: "",
        solution: -1,
        value: Jokers.Ueberfall,
        timeInSeconds: -1
    },
    {
        id: v4(),
        topic: Topics.Sports,
        caption: "Die Nationalmannschaften welcher Länder waren im 21. Jahrhundert bereits Fußball-Weltmeister?",
        solution: ["Brasilien (2002)", "Italien (2006)", "Spanien (2010)", "Deutschland (2014)", "Frankreich (2018)"],
        value: 3,
        timeInSeconds: 180
    },
    {
        id: v4(),
        topic: Topics.Mystery,
        caption: 'In welchem dieser Bereiche findet der Begriff "schwarze Wanne" Anwendung?',
        choices: ["Fossile Brennstoffe", "Bauwesen", "Kosmetik", "Landwirtschaft"],
        solution: 1,
        value: 2,
        timeInSeconds: 120
    },
    {
        id: v4(),
        topic: Topics.Geography,
        caption: "Die Umrisse welcher Länder sind hier dargestellt??",
        media: { type: MediaTypes.Image, source: ["c0.jpg", "c1.jpg", "c2.jpg", "c3.jpg"] },
        solution: ["Norwegen", "Peru", "Ägypten", "China"],
        value: 4,
        timeInSeconds: 240
    },
    {
        id: v4(),
        topic: Topics.Society,
        caption: "Welche Bundesministerien gibt es in Deutschland?",
        solution: [
            "Wirtschaft/Klimaschutz", "Finanzen", "Inneres und Heimat", "Auswärtiges Amt", "Justiz", "Arbeit und Soziales",
            "Verteidigung", "Ernährung und Landwirtschaft", "Familie, Senioren, Frauen und Jugend", "Gesundheit", "Digitales und Verkehr",
            "Umwelt, Naturschutz, nukleare Sicherheit und Verbraucherschutz", "Bildung und Forschung", "Wirtschaftliche Zusammenarbeit und Entwicklung",
            "Wohnen, Stadtentwicklung und Bauwesen"
        ],
        value: 4,
        timeInSeconds: 240
    },
    {
        id: v4(),
        topic: Topics.Science,
        caption: "Wie lauten die Sieben Basiseinheiten in der Physik?",
        solution: ["Meter (Distanz), Gramm (Gewicht)", "Sekunde (Zeit)", "Ampere (Stromstärke)", "Kelvin (Temperatur)",
            "Mol (Stoffmenge)", "Candela (Lichtstärke)"],
        value: 4,
        timeInSeconds: 240
    },
    {
        id: v4(),
        topic: Topics.Finance,
        caption: "Die Aktienverläufe welcher drei Unternehmen sind hier zu sehen?",
        media: {type: MediaTypes.Image, source: ["stock1.jpg", "stock2.jpg", "stock3.jpg"]},
        solution: [
            "Wirecard", "Tesla", "Netflix"
        ],
        value: 3,
        timeInSeconds: 240
    },
    {
        id: v4(),
        topic: Topics.Mystery,
        caption: 'Von folgender Darstellung wurde vollständig die Beschriftung entfernt. Was soll sie veranschaulichen?',
        media: { type: MediaTypes.Image, source: "code.jpg" },
        solution: "Morse Code",
        solutionUrl: `${baseImagePath}morse_o.jpg`,
        value: 2,
        timeInSeconds: 150
    },
    {
        id: v4(),
        topic: Topics.Music,
        caption: "Wie lauten die Titel dieser Zehn Songs und ihre Interpreten?",
        media: {type: MediaTypes.Audio, file: mixdown},
        solution: ["Kryptonite - 3 Doors Down", "Rather Be - Clean Bandit",
            "What I've Done - Linkin Park", "Take Me Home Tonight - Eddie Money",
            "Sandstorm - Darude", "Rapper's Delight - Sugarhill Gang",
            "Out of the Dark - Falco", "The Pretender - Foo Fighters",
            "Cool Kids - Echosmith", "Still Waiting - Sum 41"
        ],
        value: 5,
        timeInSeconds: 60
    },
]

export default questions;
