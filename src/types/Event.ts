export interface Event {
    adminEmail: string;
    id: string;
    name: string;
    type: "Individual" | "Team";
    category: "Technical" | "Cultural" | "Mega Shows" | "Workshops";
    description: string;
    startDate: string;
    endDate: string;
    venue: string;
    ruleBook: string;
    image: string;
    tags: Array<
        | "Dance"
        | "Music"
        | "Coding"
        | "Hardware"
        | "Art"
        | "Photography"
        | "Cinematography"
        | "Literary"
        | "Quiz"
        | "Dramatics"
        | "Gaming"
        | "Fun"
    >;
    minTeamSize: number;
    maxTeamSize: number;
    pocName: string;
    pocNumber: string;
    paidRegistration: boolean;
}