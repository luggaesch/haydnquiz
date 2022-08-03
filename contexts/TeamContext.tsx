import React, {ReactNode, SetStateAction, useState} from "react";

export type Team = {
    name: string,
    color: string,
    members: number,
}

interface TeamValue {
    teams: Team[],
    setTeams: React.Dispatch<SetStateAction<Team[]>>
}

const TeamContext = React.createContext<TeamValue | undefined>(undefined);

export function useTeamContext() {
    const context = React.useContext(TeamContext);
    if (!context) {
        throw Error("Context can only be consumed from within a TeamProvider or its children.")
    }
    return context;
}

export const TeamProvider = ({ children }: { children: ReactNode } ) => {
    const [teams, setTeams] = useState<Team[]>([]);

    const value = {
        teams,
        setTeams
    };

    return <TeamContext.Provider value={value}>
        {children}
    </TeamContext.Provider>;
};
