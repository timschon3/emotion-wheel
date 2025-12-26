"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { emotions, Emotion } from "@/data/emotions";

const WHEEL_SIZE = 1000;
const CENTER = WHEEL_SIZE / 2;
const INNER_RADIUS = 0;
const RING_1_RADIUS = 200; // Increased from 120
const RING_2_RADIUS = 450; // Increased from 250
const GAP = 2;

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

    // Rotate text to align with wedge, but keep readable
    let rotation = angle;
    if (rotation > 90 && rotation < 270) {
        rotation += 180;
    }

    return { ...pos, rotation, angle };
};

export const EmotionWheel = () => {
    const [activeEmotionId, setActiveEmotionId] = useState<string | null>(null);
    const [hoveredEmotion, setHoveredEmotion] = useState<Emotion | null>(null);

    const primaryCount = emotions.length;
    const primaryAngleStep = 360 / primaryCount;

    // We determine the "active family" based on hover. 
    // If we hover Joy (primary) OR Pleasure (sub), the whole "Joy" family is active.
    const getFamilyId = (id: string) => {
        // Is it a primary?
        const primary = emotions.find(e => e.id === id);
        if (primary) return primary.id;
        // Is it a sub?
        const parent = emotions.find(e => e.subEmotions?.some(sub => sub.id === id));
        return parent?.id;
    };

    const activeFamilyId = hoveredEmotion ? getFamilyId(hoveredEmotion.id) : null;

    return (
        <div className="relative flex flex-col items-center justify-center p-4">
            <div className="relative w-full max-w-[600px] aspect-square">
                <svg
                    viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
                    className="w-full h-full drop-shadow-2xl overflow-visible"
                >
                    {emotions.map((primary, index) => {
                        const startAngle = index * primaryAngleStep;
                        const endAngle = startAngle + primaryAngleStep;
                        const isFamilyActive = activeFamilyId === primary.id;

                        // --- Primary Sector Animation ---
                        // If family active -> move out slightly (10px)
                        // If this SPECIFIC wedge is hovered -> move out more (20px)
                        const isSpecificHover = hoveredEmotion?.id === primary.id;

                        const primaryTranslate = isSpecificHover ? 20 : (isFamilyActive ? 10 : 0);

                        // Calculate translation vector
                        const midAngle = startAngle + (primaryAngleStep / 2);
                        const rad = (midAngle - 90) * (Math.PI / 180);
                        const tx = Math.cos(rad) * primaryTranslate;
                        const ty = Math.sin(rad) * primaryTranslate;

                        // --- Sub Emotions ---
                        // They split the primary wedge angle. 
                        // If primary covers 0-45 degrees, and there are 2 subs: 0-22.5, 22.5-45.
                        const subCount = primary.subEmotions?.length || 0;
                        const subAngleStep = primaryAngleStep / (subCount || 1);

                        return (
                            <g key={primary.id}>
                                {/* PRIMARY SECTOR */}
                                <motion.g
                                    initial={false}
                                    animate={{ x: tx, y: ty }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <path
                                        d={describeArc(CENTER, CENTER, 40, RING_1_RADIUS, startAngle, endAngle)}
                                        fill={primary.color}
                                        stroke="black"
                                        strokeWidth="2"
                                        onMouseEnter={() => setHoveredEmotion(primary)}
                                        onMouseLeave={() => setHoveredEmotion(null)}
                                        className="cursor-pointer hover:brightness-110 transition-all"
                                    />
                                    {/* Label for Primary */}
                                    {(() => {
                                        const labelPos = getLabelPos((40 + RING_1_RADIUS) / 2, startAngle, endAngle);
                                        return (
                                            <text
                                                x={labelPos.x}
                                                y={labelPos.y}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                fill="black"
                                                fontSize="12"
                                                fontWeight="bold"
                                                style={{ pointerEvents: "none" }} // Ensure click goes to path
                                                transform={`rotate(${labelPos.rotation - (labelPos.rotation > 90 && labelPos.rotation < 270 ? 180 : 0) === labelPos.rotation ? labelPos.rotation - 90 : 0}, ${labelPos.x}, ${labelPos.y})`} // Simple rotation fix not applied here, relying on group or raw math
                                            >
                                                {/* We'll use a standardized rotation transform logic below or just keep horizontal for now if complex. 
                                    Actually, let's just use the rotation we calculated. 
                                */}
                                                <tspan transform={`rotate(${labelPos.rotation}, ${labelPos.x}, ${labelPos.y})`}>{primary.name}</tspan>
                                            </text>
                                        );
                                    })()}
                                    {/* Hacky Label Fix: Re-rendering text with proper transform logic */}
                                    <text
                                        transform={`translate(${getLabelPos((40 + RING_1_RADIUS) / 2, startAngle, endAngle).x}, ${getLabelPos((40 + RING_1_RADIUS) / 2, startAngle, endAngle).y}) rotate(${getLabelPos((40 + RING_1_RADIUS) / 2, startAngle, endAngle).angle > 180 ? getLabelPos((40 + RING_1_RADIUS) / 2, startAngle, endAngle).angle - 90 - 180 : getLabelPos((40 + RING_1_RADIUS) / 2, startAngle, endAngle).angle - 90})`}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fill="black"
                                        fontSize="14"
                                        fontWeight="900"
                                        className="uppercase tracking-wider pointer-events-none select-none"
                                    >
                                        {primary.name}
                                    </text>
                                </motion.g>

                                {/* SUB EMOTIONS */}
                                {primary.subEmotions?.map((sub, i) => {
                                    const subStart = startAngle + (i * subAngleStep);
                                    const subEnd = subStart + subAngleStep;

                                    const isSubHover = hoveredEmotion?.id === sub.id;
                                    // Move out logic: 
                                    // If this sub is hovered -> 20px
                                    // If family active (primary hovered or neighbor sub hovered) -> 10px
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
                                                fill={sub.color} // Using the specific sub-color (lighter/neighbor)
                                                stroke="black"
                                                strokeWidth="2"
                                                onMouseEnter={() => setHoveredEmotion(sub)}
                                                onMouseLeave={() => setHoveredEmotion(null)}
                                                className="cursor-pointer hover:brightness-110"
                                            />
                                            <text
                                                transform={`translate(${getLabelPos((RING_1_RADIUS + RING_2_RADIUS) / 2, subStart, subEnd).x}, ${getLabelPos((RING_1_RADIUS + RING_2_RADIUS) / 2, subStart, subEnd).y}) rotate(${getLabelPos((RING_1_RADIUS + RING_2_RADIUS) / 2, subStart, subEnd).angle > 180 ? getLabelPos((RING_1_RADIUS + RING_2_RADIUS) / 2, subStart, subEnd).angle + 90 : getLabelPos((RING_1_RADIUS + RING_2_RADIUS) / 2, subStart, subEnd).angle - 90})`}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                fill="black" // Black text on vibrant colors
                                                fontSize="12"
                                                fontWeight="600"
                                                className="pointer-events-none select-none"
                                            >
                                                {sub.name}
                                            </text>
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
                            className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl w-full text-center shadow-xl"
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
