import { EmotionWheel } from "@/components/features/wheel/EmotionWheel";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center relative overflow-hidden selection:bg-white/20">

            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full mix-blend-screen animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full mix-blend-screen animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-8 tracking-tighter">
                    Emotion Wheel
                </h1>
                <p className="text-gray-400 mb-12 text-center max-w-md mx-auto leading-relaxed">
                    Explore the spectrum of human emotion. Hover over the wheel to discover relationships and meanings.
                </p>

                <EmotionWheel />
            </div>

        </main>
    );
}
