import {Topics} from "../data/topics";

type Team = {
    _id?: string,
    user: string,
    name: string,
    color: string,
    numOfPlayers: number,
    selectedTopic?: Topics
}

export default Team;
