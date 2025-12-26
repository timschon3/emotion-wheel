"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { emotions, Emotion } from "@/data/emotions";

const WHEEL_SIZE = 1000;
const CENTER = WHEEL_SIZE / 2;
const CORE_RADIUS = 60; // Central circle radius
const RING_1_RADIUS = 200;
const RING_2_RADIUS = 450;

// Geometry Helpers
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

// Helper for Text Rotation/Placement
const getLabelPos = (
    radius: number,
    startAngle: number,
    endAngle: number
) => {
    const angle = startAngle + (endAngle - startAngle) / 2;
    const pos = polarToCartesian(CENTER, CENTER, radius, angle);

    // Rotate text to align with wedge
    let rotation = angle;
    if (rotation > 90 && rotation < 270) {
        rotation += 180;
    }

    return { ...pos, rotation, angle };
};

export const EmotionWheel = () => {
    const [hoveredEmotion, setHoveredEmotion] = useState<Emotion | null>(null);

    const primaryCount = emotions.length;
    const primaryAngleStep = 360 / primaryCount;

    const getFamilyId = (id: string) => {
        const primary = emotions.find(e => e.id === id);
        if (primary) return primary.id;
        const parent = emotions.find(e => e.subEmotions?.some(sub => sub.id === id));
        return parent?.id;
    };

    const activeFamilyId = hoveredEmotion ? getFamilyId(hoveredEmotion.id) : null;

    return (
        <div className="relative flex flex-col items-center justify-center p-4 min-h-[80vh]">
            <div className="relative w-full max-w-[1000px] aspect-square">
                <svg
                    viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
                    className="w-full h-full drop-shadow-2xl overflow-visible"
                >
                    {/* Central Core Circle */}
                    <circle
                        cx={CENTER}
                        cy={CENTER}
                        r={CORE_RADIUS}
                        fill="#1a1a1a"
                        stroke="black" // Thick black border for organic sketch look
                        strokeWidth="3"
                        className="z-10 relative"
                    />

                    {emotions.map((primary, index) => {
                        const startAngle = index * primaryAngleStep;
                        const endAngle = startAngle + primaryAngleStep;
                        const isFamilyActive = activeFamilyId === primary.id;

                        // --- Primary Sector Animation ---
                        const isSpecificHover = hoveredEmotion?.id === primary.id;
                        const primaryTranslate = isSpecificHover ? 20 : (isFamilyActive ? 10 : 0);

                        const midAngle = startAngle + (primaryAngleStep / 2);
                        const rad = (midAngle - 90) * (Math.PI / 180);
                        const tx = Math.cos(rad) * primaryTranslate;
                        const ty = Math.sin(rad) * primaryTranslate;

                        // --- Sub Emotions ---
                        const subCount = primary.subEmotions?.length || 0;
                        const subAngleStep = primaryAngleStep / (subCount || 1);

                        return (
                            <g key={primary.id}>
                                {/* PRIMARY SECTOR - INNER PETAL */}
                                <motion.g
                                    initial={false}
                                    animate={{ x: tx, y: ty }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <path
                                        d={describeArc(CENTER, CENTER, CORE_RADIUS, RING_1_RADIUS, startAngle, endAngle)}
                                        fill={primary.color}
                                        stroke="black"
                                        strokeWidth="3" // Thicker border for sketch feel
                                        strokeLinejoin="round" // Rounds the corners slightly
                                        onMouseEnter={() => setHoveredEmotion(primary)}
                                        onMouseLeave={() => setHoveredEmotion(null)}
                                        className="cursor-pointer hover:brightness-110 transition-all"
                                    />
                                    {/* Label for Primary */}
                                    {(() => {
                                        const labelPos = getLabelPos((CORE_RADIUS + RING_1_RADIUS) / 2, startAngle, endAngle);
                                        return (
                                            <text
                                                x={labelPos.x}
                                                y={labelPos.y}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                fill="black"
                                                fontSize="24"
                                                fontWeight="bold"
                                                style={{ pointerEvents: "none" }}
                                                transform={`rotate(${labelPos.rotation - (labelPos.rotation > 90 && labelPos.rotation < 270 ? 180 : 0) === labelPos.rotation ? labelPos.rotation - 90 : 0}, ${labelPos.x}, ${labelPos.y})`}
                                            >
                                                <tspan transform={`rotate(${labelPos.rotation}, ${labelPos.x}, ${labelPos.y})`}>{primary.name}</tspan>
                                            </text>
                                        );
                                    })()}
                                </motion.g>

                                {/* SUB EMOTIONS - OUTER PETALS */}
                                {primary.subEmotions?.map((sub, i) => {
                                    const subStart = startAngle + (i * subAngleStep);
                                    const subEnd = subStart + subAngleStep;

                                    const isSubHover = hoveredEmotion?.id === sub.id;
                                    const subTranslate = isSubHover ? 30 : (isFamilyActive ? 15 : 0);

                                    const subMid = subStart + (subAngleStep / 2);
                                    const subRad = (subMid - 90) * (Math.PI / 180);
                                    const subTx = Math.cos(subRad) * subTranslate;
                                    const subTy = Math.sin(subRad) * subTranslate;

                                    return (
                                        <motion.g
                                            key={sub.id}
                                            initial={false}
                                            animate={{ x: subTx, y: subTy }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        >
                                            <path
                                                d={describeArc(CENTER, CENTER, RING_1_RADIUS, RING_2_RADIUS, subStart, subEnd)}
                                                fill={sub.color}
                                                stroke="black"
                                                strokeWidth="3"
                                                strokeLinejoin="round"
                                                onMouseEnter={() => setHoveredEmotion(sub)}
                                                onMouseLeave={() => setHoveredEmotion(null)}
                                                className="cursor-pointer hover:brightness-110"
                                            />
                                            {/* Label for Sub */}
                                            {(() => {
                                                const labelPos = getLabelPos((RING_1_RADIUS + RING_2_RADIUS) / 2, subStart, subEnd);
                                                return (
                                                    <text
                                                        x={labelPos.x}
                                                        y={labelPos.y}
                                                        textAnchor="middle"
                                                        dominantBaseline="middle"
                                                        fill="black"
                                                        fontSize="16" // Slightly reduced for 3-split but still large
                                                        fontWeight="600"
                                                        style={{ pointerEvents: "none" }}
                                                        transform={`rotate(${labelPos.rotation - (labelPos.rotation > 90 && labelPos.rotation < 270 ? 180 : 0) === labelPos.rotation ? labelPos.rotation - 90 : 0}, ${labelPos.x}, ${labelPos.y})`}
                                                    >
                                                        <tspan transform={`rotate(${labelPos.rotation}, ${labelPos.x}, ${labelPos.y})`}>{sub.name}</tspan>
                                                    </text>
                                                );
                                            })()}
                                        </motion.g>
                                    );
                                })}
                            </g>
                        );
                    })}
                </svg>
            </div>

            {/* Detail Card Overlay */}
            <div className="h-32 mt-8 flex items-center justify-center w-full max-w-xl px-4">
                <AnimatePresence mode="wait">
                    {hoveredEmotion ? (
                        <motion.div
                            key={hoveredEmotion.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl w-full text-center shadow-xl z-50 relative"
                        >
                            <h3 className="text-2xl font-black mb-2 uppercase tracking-tight" style={{ color: hoveredEmotion.color }}>
                                {hoveredEmotion.name}
                            </h3>
                            <p className="text-gray-400 font-medium">
                                {hoveredEmotion.description}
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-zinc-600 font-medium text-sm uppercase tracking-widest"
                        >
                            Hover over a segment
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
