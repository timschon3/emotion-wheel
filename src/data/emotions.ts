export interface Emotion {
    id: string;
    name: string;
    color: string; // Vibrant Hex
    description: string;
    opposites: string[];
    intensity?: number;
    subEmotions?: Emotion[]; // Recursion for outer ring
}

export const emotions: Emotion[] = [
    {
        id: "joy",
        name: "Joy",
        color: "#FFD700", // Gold
        description: "A feeling of great pleasure and happiness.",
        opposites: ["sadness"],
        intensity: 8,
        subEmotions: [
            { id: "pleasure", name: "Pleasure", color: "#FDE047", description: "Happy satisfaction and enjoyment.", opposites: [] },
            { id: "happiness", name: "Happiness", color: "#FEF08A", description: "The state of being happy.", opposites: [] },
            { id: "delight", name: "Delight", color: "#FFF176", description: "Great pleasure.", opposites: [] }
        ]
    },
    {
        id: "trust",
        name: "Trust",
        color: "#32CD32", // LimeGreen
        description: "Firm belief in the reliability or truth of someone.",
        opposites: ["disgust"],
        intensity: 7,
        subEmotions: [
            { id: "acceptance", name: "Acceptance", color: "#86EFAC", description: "Consenting to receive something offered.", opposites: [] },
            { id: "admiration", name: "Admiration", color: "#4ADE80", description: "Respect and warm approval.", opposites: [] },
            { id: "safety", name: "Safety", color: "#69F0AE", description: "The condition of being protected from danger.", opposites: [] }
        ]
    },
    {
        id: "fear",
        name: "Fear",
        color: "#008000", // Green
        description: "An unpleasant emotion caused by the belief that something is dangerous.",
        opposites: ["anger"],
        intensity: 8,
        subEmotions: [
            { id: "apprehension", name: "Apprehension", color: "#22C55E", description: "Anxiety or fear that something bad will happen.", opposites: [] },
            { id: "terror", name: "Terror", color: "#15803D", description: "Extreme fear.", opposites: [] },
            { id: "panic", name: "Panic", color: "#16A34A", description: "Sudden uncontrollable fear.", opposites: [] }
        ]
    },
    {
        id: "surprise",
        name: "Surprise",
        color: "#00BFFF", // DeepSkyBlue
        description: "The feeling excited by something unexpected.",
        opposites: ["anticipation"],
        intensity: 9,
        subEmotions: [
            { id: "amazement", name: "Amazement", color: "#38BDF8", description: "A feeling of great surprise or wonder.", opposites: [] },
            { id: "distraction", name: "Distraction", color: "#7DD3FC", description: "Prevents full attention.", opposites: [] },
            { id: "shock", name: "Shock", color: "#0EA5E9", description: "A sudden upsetting or surprising event.", opposites: [] }
        ]
    },
    {
        id: "sadness",
        name: "Sadness",
        color: "#1E90FF", // DodgerBlue
        description: "The condition of being sad.",
        opposites: ["joy"],
        intensity: 6,
        subEmotions: [
            { id: "grief", name: "Grief", color: "#60A5FA", description: "Deep sorrow.", opposites: [] },
            { id: "pensive", name: "Pensive", color: "#93C5FD", description: "Deep or serious thought.", opposites: [] },
            { id: "melancholy", name: "Melancholy", color: "#3B82F6", description: "A feeling of pensive sadness.", opposites: [] }
        ]
    },
    {
        id: "disgust",
        name: "Disgust",
        color: "#8A2BE2", // BlueViolet
        description: "A feeling of strong disapproval.",
        opposites: ["trust"],
        intensity: 7,
        subEmotions: [
            { id: "loathing", name: "Loathing", color: "#A78BFA", description: "Intense dislike or disgust.", opposites: [] },
            { id: "boredom", name: "Boredom", color: "#C4B5FD", description: "Feeling weary and restless.", opposites: [] },
            { id: "aversion", name: "Aversion", color: "#8B5CF6", description: "A strong dislike or disinclination.", opposites: [] }
        ]
    },
    {
        id: "anger",
        name: "Anger",
        color: "#FF0000", // Red
        description: "A strong feeling of annoyance or hostility.",
        opposites: ["fear"],
        intensity: 9,
        subEmotions: [
            { id: "rage", name: "Rage", color: "#F87171", description: "Violent, uncontrollable anger.", opposites: [] },
            { id: "annoyance", name: "Annoyance", color: "#FCA5A5", description: "The feeling of being irritated.", opposites: [] },
            { id: "hostility", name: "Hostility", color: "#EF4444", description: "Unfriendliness or opposition.", opposites: [] }
        ]
    },
    {
        id: "anticipation",
        name: "Anticipation",
        color: "#FF8C00", // DarkOrange
        description: "The action of anticipating something.",
        opposites: ["surprise"],
        intensity: 6,
        subEmotions: [
            { id: "vigilance", name: "Vigilance", color: "#FB923C", description: "Keeping careful watch.", opposites: [] },
            { id: "interest", name: "Interest", color: "#FDBA74", description: "Wanting to know or learn about something.", opposites: [] },
            { id: "expectancy", name: "Expectancy", color: "#F97316", description: "The state of hoping or expecting.", opposites: [] }
        ]
    },
];
