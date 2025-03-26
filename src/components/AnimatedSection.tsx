"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
}

export default function AnimatedSection({ children, className }: AnimatedSectionProps) {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            variants={sectionVariants}
            viewport={{ once: true }}
            className={className}
        >
            {children}
        </motion.section>
    );
}
