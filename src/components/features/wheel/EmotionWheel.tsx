"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { emotions, Emotion } from "@/data/emotions";

const WHEEL_SIZE = 500;
const RADIUS = WHEEL_SIZE / 2;
const CENTER = WHEEL_SIZE / 2;
const INNER_RADIUS = 60; // Hole in the middle

export const EmotionWheel = () => {
    const [activeEmotion, setActiveEmotion] = useState<Emotion | null>(null);

    // Helper to calculate SVG path for a sector
    const describeArc = (
        x: number,
        y: number,
        innerRadius: number,
        outerRadius: number,
        startAngle: number,
        endAngle: number
    ) => {
        const start = polarToCartesian(x, y, outerRadius, endAngle);
        const end = polarToCartesian(x, y, outerRadius, startAngle);
        const innerStart = polarToCartesian(x, y, innerRadius, endAngle);
        const innerEnd = polarToCartesian(x, y, innerRadius, startAngle);

        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        const d = [
            "M", start.x, start.y,
            "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
            "L", innerEnd.x, innerEnd.y,
            "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
            "Z"
        ].join(" ");

        return d;
    };

    const polarToCartesian = (
        centerX: number,
        centerY: number,
        radius: number,
        angleInDegrees: number
    ) => {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + radius * Math.cos(angleInRadians),
            y: centerY + radius * Math.sin(angleInRadians),
        };
    };

    const anglePerSector = 360 / emotions.length;

    return (
        <div className="relative flex flex-col items-center justify-center p-8">
            <div className="relative w-full max-w-[500px] aspect-square">
                <svg
                    viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
                    className="w-full h-full drop-shadow-2xl"
                >
                    <AnimatePresence>
                        {emotions.map((emotion, index) => {
                            const startAngle = index * anglePerSector;
                            const endAngle = startAngle + anglePerSector;
                            const isSelected = activeEmotion?.id === emotion.id;

                            return (
                                <motion.path
                                    key={emotion.id}
                                    d={describeArc(
                                        CENTER,
                                        CENTER,
                                        INNER_RADIUS,
                                        RADIUS,
                                        startAngle,
                                        endAngle
                                    )}
                                    fill={emotion.color}
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth="2"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: 1,
                                        scale: isSelected ? 1.05 : 1,
                                        filter: isSelected ? "brightness(1.1)" : "brightness(1)"
                                    }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    onHoverStart={() => setActiveEmotion(emotion)}
                                    onHoverEnd={() => setActiveEmotion(null)}
                                    onClick={() => setActiveEmotion(emotion)}
                                    className="cursor-pointer transition-all duration-300 ease-out origin-center hover:z-10"
                                    style={{ transformBox: "fill-box" }}
                                />
                            );
                        })}
                    </AnimatePresence>

                    {/* Inner Circle Label */}
                    <circle cx={CENTER} cy={CENTER} r={INNER_RADIUS - 5} fill="#1a1a1a" />
                </svg>

                {/* Floating Label in Center */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <AnimatePresence mode="wait">
                        {activeEmotion ? (
                            <motion.div
                                key={activeEmotion.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="text-center"
                            >
                                <p className="text-white font-bold text-lg tracking-wider uppercase">
                                    {activeEmotion.name}
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="default"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-gray-500 text-xs font-medium uppercase tracking-widest"
                            >
                                Feel
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Detail Card Overlay */}
            <AnimatePresence>
                {activeEmotion && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute bottom-0 translate-y-full mt-8 p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl max-w-md w-full shadow-2xl z-50"
                    >
                        <h3
                            className="text-2xl font-bold mb-2"
                            style={{ color: activeEmotion.color }}
                        >
                            {activeEmotion.name}
                        </h3>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                            {activeEmotion.description}
                        </p>
                        <div className="flex gap-4 text-sm text-gray-400">
                            <div>
                                <span className="opacity-50 uppercase text-xs tracking-wider">Opposite:</span>
                                <span className="ml-2 text-white capitalize">{activeEmotion.opposites.join(", ")}</span>
                            </div>
                            <div>
                                <span className="opacity-50 uppercase text-xs tracking-wider">Intensity:</span>
                                <span className="ml-2 text-white">{activeEmotion.intensity}/10</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
