export interface Emotion {
    id: string;
    name: string;
    color: string; // Tailwind class or hex
    description: string;
    opposites: string[];
    intensity?: number; // 1-10
}

export const emotions: Emotion[] = [
    {
        id: "joy",
        name: "Joy",
        color: "#FCD34D", // yellow-400
        description: "A feeling of great pleasure and happiness.",
        opposites: ["sadness"],
        intensity: 8,
    },
    {
        id: "trust",
        name: "Trust",
        color: "#86EFAC", // green-300
        description: "Firm belief in the reliability, truth, ability, or strength of someone or something.",
        opposites: ["disgust"],
        intensity: 7,
    },
    {
        id: "fear",
        name: "Fear",
        color: "#166534", // green-800
        description: "An unpleasant emotion caused by the belief that someone or something is dangerous.",
        opposites: ["anger"],
        intensity: 8,
    },
    {
        id: "surprise",
        name: "Surprise",
        color: "#38BDF8", // sky-400
        description: "The feeling or emotion excited by something unexpected.",
        opposites: ["anticipation"],
        intensity: 9,
    },
    {
        id: "sadness",
        name: "Sadness",
        color: "#60A5FA", // blue-400
        description: "The condition or quality of being sad.",
        opposites: ["joy"],
        intensity: 6,
    },
    {
        id: "disgust",
        name: "Disgust",
        color: "#A78BFA", // violet-400
        description: "A feeling of revulsion or strong disapproval aroused by something unpleasant or offensive.",
        opposites: ["trust"],
        intensity: 7,
    },
    {
        id: "anger",
        name: "Anger",
        color: "#F87171", // red-400
        description: "A strong feeling of annoyance, displeasure, or hostility.",
        opposites: ["fear"],
        intensity: 9,
    },
    {
        id: "anticipation",
        name: "Anticipation",
        color: "#F97316", // orange-500
        description: "The action of anticipating something; expectation or prediction.",
        opposites: ["surprise"],
        intensity: 6,
    },
];
